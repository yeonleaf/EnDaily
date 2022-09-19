/*onclick 이벤트 발생 -> TodayExpressions의 sentences에 방금 생성된 데이터를 저장*/
import React, {Component} from "react";

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
export default ExpressionSave;