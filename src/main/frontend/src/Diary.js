import React, {useEffect, useState} from "react";
import API from "./API";
import DateFormatConverter from "./DateFormatConverter";
import ExpressionList from "./ExpressionList";

function Diary(props) {

    let memberId = sessionStorage.getItem("memberId");

    if (memberId === null) {
        window.location = "/login";
    }

    const [sentenceList, setSentenceList] = useState([]);

    useEffect(() => {
        /*axios get -> date로 sentence list 조회*/
        API.get("/sentence/sentences?memberId="+memberId+"&date="+props.date)
            .then(function(response) {
                setSentenceList(prevState => response.data);
            })
            .catch(function(response) {
                console.log(response);
            })
    }, [props.date])

    const updateSentenceList = (data) => {
        setSentenceList(data);
    }

    /*sentences 조회 결과에 따라 view를 분기 처리*/
    let view;
    if (sentenceList.length === 0) {
        view = <div>데이터가 없습니다.</div>
    } else {
        let count = 1;
        view = <div>
            {
                sentenceList.map((sentence) => {
                    return <SentenceContent key={count++} sentenceId={sentence.id} date={props.date} viewId={count} dictation={sentence.dictation} answer={sentence.answer} sentenceList={sentenceList} updateSentenceList={updateSentenceList}/>
                })
            }
        </div>
    }

    /*props.date === today일 경우에만 버튼을 렌더링*/
    let btn = <div/>;
    if (props.date === DateFormatConverter(new Date())) {
        btn = <button onClick={() => window.location = "/sentence"}>Sentence 추가</button>;
    }

    /*props.date === today와 아닌 경우를 구분해서 타이틀을 출력*/
    let title;
    if (props.date === DateFormatConverter(new Date())) {
        title = <h3>Today's sentences!</h3>;
    } else {
        title = <h3>{props.date}</h3>;
    }

    return (
        <div>
            {title}
            <div>
                {view}
            </div>
            <div>
                {btn}
            </div>
        </div>
    )
}



function SentenceContent(props) {

    const [expressions, setExpressions] = useState([]);
    const [editFlag, setEditFlag] = useState(false);
    const [editFormFlag, setEditFormFlag] = useState(false);

    /*expressions 조회*/
    useEffect(() => {
        API.get("/expression/expressions?sentenceId=" + props.sentenceId)
            .then(response => {
                setExpressions(response.data);
            })
            .catch(error => console.log(error));
    }, [])

    const addExpression = (data) => {
        setExpressions(prevState => [...prevState, ...data]);
    }

    const updateExpression = (data) => {
        setExpressions(prevState => [...data]);
    }

    const handleEditFlag = () => {
        setEditFlag(prevState => !prevState);
    }

    const handleSentenceEdit = (data) => {
        const newSentenceList = props.sentenceList.map((sentence) => {
            if (sentence.id === props.sentenceId) {
                return {...sentence, dictation: data.dictation, answer: data.answer}
            }
        })
        props.updateSentenceList(newSentenceList)
        API.put("/sentence", data)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        handleEditFlag();

    }

    const handleSentenceDelete = () => {
        let temp = props.sentenceList.splice();
        const idx = temp.findIndex(function (sentence) { return sentence.id === props.sentenceId });
        if (idx > -1) temp.splice(idx, 1);
        API.delete("/sentence?sentenceId=" + props.sentenceId)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        props.updateSentenceList(temp);
    }

    const handleEditFormFlag = () => {
        setEditFormFlag(prevState => !prevState);
    }

    let dateCond = props.date === DateFormatConverter(new Date()) ? <div>
            <button onClick={handleEditFlag}>EDT</button>
            <button onClick={handleSentenceDelete}>DEL</button>
        </div> : <div/>;

    let sentenceMain = editFlag ? <SentenceEditForm key={props.sentenceId} sentenceId={props.sentenceId} date={props.date} dictation={props.dictation} answer={props.answer} handleSentenceEdit={handleSentenceEdit}/> : <SentenceContentView dictation={props.dictation} answer={props.answer}/>
    let addExpressionBtn = editFlag ? <button onClick={handleEditFormFlag}>Expression 추가</button> : <div/>;
    let addExpressionForm = editFormFlag ? <SaveOneExpression sentenceId={props.sentenceId} addExpression={addExpression}/> : <div/>;

    return (
        <div>
            <div>
                <h5>{props.viewId}번 sentence</h5>
                {dateCond}
            </div>
            {sentenceMain}
            <div>
                <ExpressionList date={props.date} expressions={expressions} updateExpression={updateExpression} />
                {addExpressionBtn}
                {addExpressionForm}
            </div>
        </div>
    )
}

function SentenceEditForm(props) {

    const [input, setInput] = useState({
        dictation: props.dictation,
        answer: props.answer
    })

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInput({...input, [name]: value});
    }

    const handleClick = () => {
        let data = {
            id: props.sentenceId,
            date: props.date,
            dictation: input.dictation,
            answer: input.answer
        }
        props.handleSentenceEdit(data);
    }

    return (
        <div>
            <div>
                <label htmlFor={"dictation"}>Dictation</label>
                <input type={"text"} name={"dictation"} value={input.dictation} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor={"answer"}>Answer</label>
                <input type={"text"} name={"answer"} value={input.answer} onChange={handleChange}/>
            </div>
            <button onClick={handleClick}>Edit!</button>
        </div>
    );
}

function SentenceContentView(props) {
    return (
        <div>
            <div>
                Dictation: {props.dictation}
            </div>
            <div>
                Answer: {props.answer}
            </div>
        </div>
    )
}

/*
* sentenceId를 받아서 expression 저장 후 expressions에 데이터를 더한다.
* */
function SaveOneExpression(props) {

    const [input, setInput] = useState({
        word: "",
        meaning: "",
        exLine: "",
        myLine: ""
    })

    let btnCond = (props.word !== "" && props.meaning !== "" && props.exLine !== "") ? <button onClick={handleClick}>새 표현 등록</button> : <div></div>;

    function handleChange(event) {
        const {name, value} = event.target;
        setInput({...input, [name]: value});
    }

    function handleClick() {

        let data = {
            word: input.word,
            meaning: input.meaning,
            exLine: input.exLine,
            myLine: input.myLine
        }

        /*db에 저장*/
        API.post("/expression", {sentenceId: props.sentenceId, ...data})
            .then((response) => {
                props.addExpression([{id: response.data, ...data}]);
                setInput({word: "", meaning: "", exLine: "", myLine: ""});
            })
            .catch((error) => console.log(error));
    }

    return (
        <div>
            <div>
                <label>
                    word:
                    <input type="text" name="word" value={input.word} onChange={handleChange}/>
                </label>
            </div>
            <div>
                <label>
                    meaning:
                    <input type="text" name="meaning" value={input.meaning} onChange={handleChange}/>
                </label>
            </div>
            <div>
                <label>
                    example sentence:
                </label>
                <input type="text" name="exLine" value={input.exLine} onChange={handleChange}/>
            </div>
            <div>
                <label>
                    my sentence:
                </label>
                <input type="text" name="myLine" value={input.myLine} onChange={handleChange}/>
            </div>
            <div>
                {btnCond}
            </div>
        </div>
    )
}

export default Diary;