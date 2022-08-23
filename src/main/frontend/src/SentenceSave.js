import React, {Component, useState, useEffect} from "react";
import TodayExpressions from "./TodayExpressions";
import DateFormatConverter from "./DateFormatConverter";
import API from "./API";

function SentenceSave(props) {

    let memberId = sessionStorage.getItem("memberId");
    if (memberId == null) {
        window.location = "/login";
    }

    const [flag, setFlag] = useState(false);

    const [dictation, setDictation] = useState("");
    const [answer, setAnswer] = useState("");

    const [expressions, setExpressions] = useState([])

    useEffect(() => {
        console.log("SentenceSave expressions:")
        console.log(expressions);
    })

    const handleDictation = (event) => {
        setDictation(event.target.value);
    }

    const handleAnswer = (event) => {
        setAnswer(event.target.value);
    }

    const handleExpression = (data) => {
        setExpressions(prevState => [...prevState, ...data]);
    }

    const handleClick = () => {
        setFlag(prevState => !prevState);
    }

    const triggerSave = () => {
        console.log("Real Save!")
        let data = {
            memberId: memberId,
            date: DateFormatConverter(new Date()),
            dictation: dictation,
            answer: answer,
            expressions: expressions
        }
        console.log(data);
        API.post("/sentence", data).then((response) => {
            console.log("save success!")
            /*window.location = "/main";*/
        }).catch((error) => {
            console.log(error);
        })
    }

    let expressionWindow;
    if (!flag) {
        expressionWindow = <div></div>
    } else {
        expressionWindow = <TodayExpressions memberId={memberId} handleExpressions={handleExpression} triggerSave={triggerSave}/>
    }

    return (
        <div>
            <SentenceForm handleDictation={handleDictation} handleAnswer={handleAnswer} onClick={handleClick}/>
            {expressionWindow}
            <button onClick={triggerSave}>Real Save</button>
        </div>
    )
}


function SentenceForm(props) {

    return (
        <div>
            <div>
                dictation : <textarea name="dictation" onChange={props.handleDictation}></textarea>
            </div>
            <div>
                answer : <textarea name="answer" onChange={props.handleAnswer}></textarea>
            </div>
            <div>
                <button onClick={props.onClick}>Next</button>
            </div>
        </div>
    )
}


export default SentenceSave;