import React, {Component, useState, useEffect} from "react";
import TodayExpressions from "./TodayExpressions";
import DateFormatConverter from "./DateFormatConverter";
import KoreanExistValidator from "./KoreanExistValidator";
import API from "./API";
import WordsSearch from "./WordsSearch";

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
            window.location = "/main";
        }).catch((error) => {
            console.log(error);
        })
    }

    let expressionWindow;
    if (flag === 0) {
        expressionWindow = <div></div>
    } else {
        expressionWindow = <TodayExpressions memberId={memberId} flag={flag} handleFlag={setFlag} handleExpressions={handleExpression} triggerSave={triggerSave}/>
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


export default SentenceSave;