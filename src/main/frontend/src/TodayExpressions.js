import React, {Component, useEffect, useState} from "react";
import DateFormatConverter from "./DateFormatConverter";
import KoreanExistValidator from "./KoreanExistValidator";

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
        console.log(expressions);
        if (expressions.length !== 0 && checkMyLineFinished(expressions)) {
            props.handleExpressions(expressions);
            props.handleFlag(2);
        } else {
            setExpressionMsg("myLine을 모두 채워야 임시저장을 할 수 있습니다.");
            props.handleFlag(1);

        }
    }

    let btnCond = (props.flag === 1 || props.flag === 2) ? <button onClick={handleClick}>데이터 임시저장</button> : <div></div>;
    let readyForRealSaveMsg = (props.flag === 2) ? "저장이 가능한 상태입니다." : "저장이 아직 불가능합니다. 표현을 작성하고 [데이터 임시저장] 버튼을 눌러주세요.";

    return (
        <div>
            <ExpressionList expressions={expressions} updateExpression={updateExpression}/>
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
    console.log(expressions);
    let res = true;
    for (let i=0; i<expressions.length; i++) {
        if (expressions[i].myLine === "") {
            res = false;
            break
        }
    }
    console.log(res);
    return res;
}

function ExpressionList(props) {
    let keyCount = 0;
    const arr = props.expressions;

    return (
        <div>
            {arr.map(
                (expression) => <Expression key={keyCount++} word={expression.word} meaning={expression.meaning} exLine={expression.exLine} myLine={expression.myLine} expressions={arr} updateExpression={props.updateExpression}/>
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

    let mine;

    if (myLine === "") {
        mine = <div>My Sentence: <MyLineForm word={word} myLine={myLine} handleMyLineChange={handleMyLineChange}/></div>
    } else {
        mine = <div>My Sentence: {myLine}</div>
    }

    return (
        <div>
            <div>
                Word: {word}
            </div>
            <div>
                Meaning: {meaning}
            </div>
            <div>
                Example Sentence: {exLine}
            </div>
            <div>
                {mine}
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