import React, {Component, useEffect, useState} from "react";
import DateFormatConverter from "./DateFormatConverter";
import ExpressionList from "./ExpressionList";

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