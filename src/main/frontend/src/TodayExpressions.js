import React, {Component, useEffect, useState} from "react";
import DateFormatConverter from "./DateFormatConverter";

function TodayExpressions(props) {
    const [expressions, setExpressions] = useState([])

    let date = DateFormatConverter(new Date());

    const addExpression = (data) => {
        setExpressions((curr) => [...curr, ...data]);
    }

    const updateExpression = (data) => {
        setExpressions(prevState => [...data]);
    }

    const handleClick = () => {
        console.log("Temporary Storage")
        props.handleExpressions(expressions);
    }

    return (
        <div>
            <ExpressionList expressions={expressions} updateExpression={updateExpression}/>
            <ExpressionSave date={date} memberId={props.memberId} addExpression={addExpression}/>
            <button onClick={handleClick}>Temporary Storage</button>
        </div>
    )
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
        mine = <div>My Sentence: <MyLineForm handleMyLineChange={handleMyLineChange}/></div>
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

    const [myLine, setMyLine] = useState("")

    function handleChange(event) {
        setMyLine(event.target.value);
    }

    function handleClick() {
        props.handleMyLineChange(myLine);
    }

    return (
        <div>
            <div>
                <input name="myLine" onChange={handleChange}/>
            </div>
            <div>
                <button onClick={handleClick}>Save</button>
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
    }

    render() {
        return (
            <div>
                <ExpressionForm onChange={this.handleChange} onClick={this.handleClick}/>
            </div>
        )
    }

}


function ExpressionForm(props) {
    return (
        <div>
            <div>
                <label>
                    word:
                    <input type="text" name="word" onChange={props.onChange}/>
                </label>
            </div>
            <div>
                <label>
                    meaning:
                    <input type="text" name="meaning" onChange={props.onChange}/>
                </label>
            </div>
            <div>
                <label>
                    example sentence:
                </label>
                <input type="text" name="exLine" onChange={props.onChange}/>
            </div>
            <button onClick={props.onClick}>Temporary Save</button>
        </div>
    )
}


export default TodayExpressions;