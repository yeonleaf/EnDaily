import React, {Component, useEffect, useState} from "react";
import DateFormatConverter from "./DateFormatConverter";
import KoreanExistValidator from "./KoreanExistValidator";
import API from "./API";

function TodayExpressions(props) {
    const [expressions, setExpressions] = useState([])
    const [expressionMsg, setExpressionMsg] = useState("");

    let date = DateFormatConverter(new Date());

    const addExpression = (data) => {
        setExpressions((curr) => [...curr, ...data]);
        props.handleFlag(1);
    }

    const updateExpression = (data) => {
        setExpressions(prevState => [...data]);
    }

    const handleClick = () => {
        // myLine이 모두 채워져 있는지 확인하기
        if (expressions.length !== 0 && checkMyLineFinished(expressions)) {
            props.handleExpressions(expressions);
            props.handleFlag(2);
        } else {
            setExpressionMsg("myLine을 모두 채워야 임시저장을 할 수 있습니다.");
            props.handleFlag(1);

        }
    }

    let btnCond = (props.flag === 1 || props.flag === 2) ? <button onClick={handleClick}>데이터 임시저장</button> : <div/>;
    let readyForRealSaveMsg = (props.flag === 2) ? "저장이 가능한 상태입니다." : "저장이 아직 불가능합니다. 표현을 작성하고 [데이터 임시저장] 버튼을 눌러주세요.";

    return (
        <div>
            <ExpressionList expressions={expressions} updateExpression={updateExpression} />
            <ExpressionSave date={date} memberId={props.memberId} addExpression={addExpression}/>
            <small>{expressionMsg}</small>
            {btnCond}

            <div>
                <small>{readyForRealSaveMsg}</small>
            </div>
        </div>
    )
}

function checkMyLineFinished(expressions) {
    let res = true;
    for (let i=0; i<expressions.length; i++) {
        if (expressions[i].myLine === "") {
            res = false;
            break
        }
    }
    return res;
}

function ExpressionList(props) {
    let keyCount = 0;

    return (
        <div> 
            {props.expressions.map(
                (expression) => <Expression key={keyCount++} id={expression.id} word={expression.word} meaning={expression.meaning} exLine={expression.exLine} myLine={expression.myLine} expressions={props.expressions} updateExpression={props.updateExpression} addExpression={props.addExpression}/>
            )}
        </div>
    )
}

function Expression(props) {
    let word = props.word;
    let meaning = props.meaning;
    let exLine = props.exLine;
    let expressions = props.expressions;

    const [myLine, setMyLine] = useState(props.myLine);
    const [editFlag, setEditFlag] = useState(false);

    function handleMyLineChange(data) {
        /*expressions 내의 expression의 id를 조사해서 id와 같은 것을 찾는다.*/
        for (const expression of expressions) {
            if (expression.word === word && expression.meaning === meaning && expression.exLine === exLine) {
                expression.myLine = data;
                setMyLine(data);
                break;
            }
        }

        /*해당 expression의 myLine을 event.target.value로 수정한다.*/
        props.updateExpression(expressions);
    }

    function handleEditFlagChange() {
        setEditFlag(prevState => !prevState);
    }

    function handleDelete() {
        if (props.id === undefined) {
            /*Real Save 이전 삭제 로직*/
            const idx = expressions.findIndex(function(expression) {return expression.word===word && expression.meaning===meaning && expression.exLine === exLine});
            if (idx > -1) expressions.splice(idx, 1);
        } else {
            /*Real Save 이후 삭제 로직*/
            const idx = expressions.findIndex(function(expression) {return expression.id===props.id});
            if (idx > -1) expressions.splice(idx, 1);
            API.delete("/expression/expressionId=" + props.id)
                .catch(r => console.log(r))
                .then(e => console.log(e));
        }
        props.updateExpression(expressions);
    }

    function handleEdit(data) {

        if (props.id === undefined) {
            /*Real Save 이전 수정 로직*/
            const newExpressions = expressions.map(expression => {
                if (expression.word === word && expression.meaning === meaning && expression.exLine === exLine && expression.myLine === myLine) {
                    return {...expression, word: data.word, meaning: data.meaning, exLine: data.exLine, myLine: data.myLine}
                }
                return expression;
            })
            props.updateExpression(newExpressions);
            handleEditFlagChange();

        } else {
            /*Real Save 이후 수정 로직*/
            const newExpressions = expressions.map(expression => {
                if (expression.id === props.id) {
                    return {...expression, word: data.word, meaning: data.meaning, exLine: data.exLine, myLine: data.myLine}
                }
                return expression;
            })
            props.updateExpression(newExpressions);

            API.patch("/expression", {
                id: props.id,
                word: data.word,
                meaning: data.meaning,
                exLine: data.exLine,
                myLine: data.myLine
            }).then(r => console.log(r))
                .catch(e => console.log(e));
        }
    }

    let myLineCond;

    if (myLine === "") {
        myLineCond = <div>
            <button onClick={handleDelete}>DEL</button>
            <ExpressionContentView word={word} meaning={meaning} exLine={exLine} myLine={myLine}/>
            My Sentence: <MyLineForm word={word} myLine={myLine} handleMyLineChange={handleMyLineChange}/>
        </div>
    } else {
        let editCond = editFlag ? <ExpressionEditForm word={word} meaning={meaning} exLine={exLine} myLine={myLine} handleEdit={handleEdit}/> : <ExpressionContentView word={word} meaning={meaning} exLine={exLine} myLine={myLine}/>

        myLineCond = <div>
            <button onClick={handleEditFlagChange}>EDT</button>
            <button onClick={handleDelete}>DEL</button>
            {editCond}
        </div>
    }

    return (
        <div>
            {myLineCond}
        </div>
    )
}

function ExpressionContentView(props) {
    let myLineCond = props.myLine === "" ? <div/> : <div>MyLine: {props.myLine}</div>
    return (
        <div>
            <div>
                Word: {props.word}
            </div>
            <div>
                Meaning: {props.meaning}
            </div>
            <div>
                Example Sentence: {props.exLine}
            </div>
            {myLineCond}
        </div>
    )
}

function ExpressionEditForm(props) {

    const [inputValues, setInputValues] = useState({
        word: props.word,
        meaning: props.meaning,
        exLine: props.exLine,
        myLine: props.myLine
    })

    function triggerEdit() {
        let newData = {
            word: inputValues.word,
            meaning: inputValues.meaning,
            exLine: inputValues.exLine,
            myLine: inputValues.myLine
        }
        props.handleEdit(newData);
    }

    const handleOnChange = event => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});
    }

    return (
        <div>
            <div>
                <label htmlFor="word">word</label>
                <input type="text" name="word" value={inputValues.word} onChange={handleOnChange}/>
            </div>
            <div>
                <label htmlFor="meaning">meaning</label>
                <input type="text" name="meaning" value={inputValues.meaning} onChange={handleOnChange}/>
            </div>
            <div>
                <label htmlFor="exLine">Example Sentence</label>
                <input type="text" name="exLine" value={inputValues.exLine} onChange={handleOnChange}/>
            </div>
            <div>
                <label htmlFor="myLine">My Sentence</label>
                <input type="text" name="myLine" value={inputValues.myLine} onChange={handleOnChange}/>
            </div>
            <div>
                <button onClick={triggerEdit}>수정 완료</button>
            </div>
        </div>
    )
}

function MyLineForm(props) {

    const [myLine, setMyLine] = useState("");
    const [myLineMsg, setMyLineMsg] = useState("");

    function handleChange(event) {
        setMyLine(event.target.value);
    }

    function handleClick() {
        setMyLineMsg("");
        if (myLine === "") {
            setMyLineMsg("myLine에 공백이 들어갈 수 없습니다.");
        } else if (myLine !== "" && KoreanExistValidator(myLine)) {
            setMyLineMsg("myLine은 반드시 영어로 작성해야 합니다.");
        } else {
            setMyLineMsg("");
            props.handleMyLineChange(myLine);
        }

    }

    return (
        <div>
            <div>
                <input name="myLine" onChange={handleChange}/>
                <small>{myLineMsg}</small>
            </div>
            <div>
                <button onClick={handleClick}>문장 만들기 완료</button>
            </div>
        </div>
    )
}

/*onclick 이벤트 발생 -> TodayExpressions의 sentences에 방금 생성된 데이터를 저장*/
class ExpressionSave extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            sentenceId: props.sentenceId,
            word: "",
            meaning: "",
            exLine: "",
        }
    }

    handleChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;

        this.setState({
            [name]: value
        })
    }

    handleClick(event) {
        let data = {
            date: this.props.date,
            memberId: this.props.memberId,
            word: this.state.word,
            meaning: this.state.meaning,
            exLine: this.state.exLine,
            myLine: ""
        }
        this.props.addExpression([data]);
        this.state.word = "";
        this.state.meaning = "";
        this.state.exLine = "";

    }

    render() {
        return (
            <div>
                <ExpressionForm word={this.state.word} meaning={this.state.meaning} exLine={this.state.exLine} onChange={this.handleChange} onClick={this.handleClick}/>
            </div>
        )
    }

}


function ExpressionForm(props) {

    let btnCond = (props.word !== "" && props.meaning !== "" && props.exLine !== "") ? <button onClick={props.onClick}>새 표현 등록</button> : <div></div>;

    return (
        <div>
            <div>
                <label>
                    word:
                    <input type="text" name="word" value={props.word} onChange={props.onChange}/>
                </label>
            </div>
            <div>
                <label>
                    meaning:
                    <input type="text" name="meaning" value={props.meaning} onChange={props.onChange}/>
                </label>
            </div>
            <div>
                <label>
                    example sentence:
                </label>
                <input type="text" name="exLine" value={props.exLine} onChange={props.onChange}/>
            </div>
            <div>
                {btnCond}
            </div>
        </div>
    )
}


export default TodayExpressions;