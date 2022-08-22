import React, {Component, useEffect, useState} from "react";
import TodayExpressions from "./TodayExpressions";

function TodaySentences(props) {

    useEffect(() => {
        /*해당 요일에 등록된 모든 sentences와 sentence에 엮인 Expressions들을 가져오기*/
    })
}

function SentenceSave(props) {
    const [click, setClick] = useState(false);
    const [id, setId] = useState(-1);
    const [dictation, setDictation] = useState("");
    const [answer, setAnswer] = useState("");

    let div_btm;
    if (!click) {
        div_btm = <div></div>
    } else {
        div_btm = <TodayExpressions date={props.date} memberId={props.memberId}/>
    }
    return (
        <div>
            <div>
                <SentenceForm />
            </div>
            <div>
                {div_btm}
            </div>
        </div>
    )
}

function SentenceContent(props) {
    return (
        <div>
            <div>
                dictation : {props.dictation}
            </div>
            <div>
                answer : {props.answer}
            </div>
        </div>
    )
}

function SentenceForm(props) {
    return (
        <div>
            <div>
                dictation : <textarea name="dictation" onChange={props.onChange}></textarea>
            </div>
            <div>
                answer : <textarea name="answer" onChange={props.onChange}></textarea>
            </div>
            <div>
                <button></button>
            </div>
        </div>
    )
}

export default TodaySentences;