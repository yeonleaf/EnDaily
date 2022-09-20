import React, {useState} from "react";

import API from "../../common/API";

import DateFormatConverter from "../../utils/DateFormatConverter";
import KoreanExistValidator from "../../utils/KoreanExistValidator";
import WordsSearch from "../../WordsSearch/WordsSearch";
import ExpressionSave from "../Expression/ExpressionSave";
import ExpressionList from "../Expression/ExpressionList";

function SentenceSave(props) {

    let memberId = sessionStorage.getItem("memberId");
    if (memberId == null) {
        window.location = "/login";
    }

    const [flag, setFlag] = useState(0);

    const [dictation, setDictation] = useState("");
    const [answer, setAnswer] = useState("");

    const [dictationMsg, setDictationMsg] = useState("");
    const [answerMsg, setAnswerMsg] = useState("");

    const [dictationReady, setDictationReady] = useState(false);
    const [answerReady, setAnswerReady] = useState(false);

    const [expressions, setExpressions] = useState([]);

    const handleDictation = (event) => {
        let value = event.target.value;
        if (KoreanExistValidator(value)) {
            setDictationReady(false);
            setDictationMsg("dictation 항목은 영어로 작성해야 합니다.");
        } else {
            setDictationReady(true);
            setDictationMsg("");
            setDictation(value);
        }
    }

    const handleAnswer = (event) => {
        let value = event.target.value;
        if (KoreanExistValidator(value)) {
            setAnswerReady(false);
            setAnswerMsg("answer 항목은 영어로 작성해야 합니다.");
        } else {
            setAnswerReady(true);
            setAnswerMsg("");
            setAnswer(value);
        }

    }

    const handleExpression = (data) => {
        setExpressions(prevState => [...prevState, ...data]);
    }

    const handleClick = (event) => {
        event.preventDefault();
        if (dictationReady && answerReady) {
            setFlag(1);
        }
    }

    const triggerSave = () => {
        let data = {
            memberId: memberId,
            date: DateFormatConverter(new Date()),
            dictation: dictation,
            answer: answer,
            expressions: expressions
        }
        console.log(data);
        API.post("/sentence", data).then((response) => {
            window.location = "/diary/today";
        }).catch((error) => {
            console.log(error);
        })
    }

    let expressionWindow;
    if (flag === 0) {
        expressionWindow = <div></div>
    } else {
        expressionWindow = <ExpressionSaveContainer memberId={memberId} flag={flag} handleFlag={setFlag} handleExpressions={handleExpression} triggerSave={triggerSave}/>
    }

    let realSaveCond = (flag === 2) ? <button onClick={triggerSave}>Real Save</button> : <div></div>
    return (
        <div>
            <SentenceForm dictation={dictation} answer={answer} dictationMsg={dictationMsg} answerMsg={answerMsg} handleDictation={handleDictation} handleAnswer={handleAnswer} onClick={handleClick}/>
            {expressionWindow}
            {realSaveCond}

            <WordsSearch />
        </div>
    )
}


function SentenceForm(props) {

    let btnCond = (props.dictation !== "" && props.answer !== "") ? <button onClick={props.onClick}>Next</button> : <div></div>;

    return (
        <div>
            <div>
                dictation : <textarea name="dictation" onChange={props.handleDictation}></textarea>
                <small>{props.dictationMsg}</small>
            </div>
            <div>
                answer : <textarea name="answer" onChange={props.handleAnswer}></textarea>
                <small>{props.answerMsg}</small>
            </div>
            <div>
                {btnCond}
            </div>
        </div>
    )
}

function ExpressionSaveContainer(props) {
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

    const checkMyLineFinished = (expressions) => {
        let res = true;
        for (let i=0; i<expressions.length; i++) {
            if (expressions[i].myLine === "") {
                res = false;
                break
            }
        }
        return res;
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


export default SentenceSave;