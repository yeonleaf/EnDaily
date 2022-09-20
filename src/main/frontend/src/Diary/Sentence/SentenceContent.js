import React, {useEffect, useState} from "react";
import API from "../../common/API";
import DateFormatConverter from "../../utils/DateFormatConverter";
import ExpressionList from "../Expression/ExpressionList";

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

export default SentenceContent;