import React, {Component, useEffect, useState} from "react";
import API from "./API";

function TodayDiary(props) {

    let memberId = sessionStorage.getItem("memberId");

    const [sentenceList, setSentenceList] = useState([]);

    useEffect(() => {
        /*axios get -> date로 sentence list 조회*/
        API.get("/sentence/sentences?memberId="+memberId+"&date="+props.date)
            .then(function(response) {
                setSentenceList(prevState => [...prevState, response.data]);
            })
            .catch(function(response) {
                console.log(response);
            })
    }, [])

    console.log(sentenceList);
    /*sentences 조회 결과에 따라 view를 분기 처리*/
    let view;
    if (sentenceList.length === 0 || Object.keys(sentenceList[0]).length === 0) {
        view = <div></div>
    } else {
        view = Object.keys(sentenceList[0]).map((sentenceKey, idx) => {
            const sentence = JSON.parse(sentenceKey);
            return <SentenceContent key={sentence.id} sentenceId={sentence.id} dictation={sentence.dictation} answer={sentence.answer} expressions={sentenceList[0][sentenceKey]} />
        });
    }

    return (
        <div>
            <h3>Today's sentences!</h3>
            <div>
                {view}
            </div>
            <div>
                <button onClick={() => window.location = "/sentence"}>Sentence 추가</button>
            </div>
        </div>
    )
}



function SentenceContent(props) {
    console.log(props.expressions);
    let view = props.expressions.map((expression) => <li key={expression.id}>
        <ExpressionContent key={expression.id} id={expression.id} word={expression.word} exLine={expression.exLine} myLine={expression.myLine}/>
    </li>)

    return (
        <div>
            <div>
                <h5>{props.sentenceId}번 sentence</h5>
            </div>
            <div>
                Dictation: {props.dictation}
            </div>
            <div>
                Answer: {props.answer}
            </div>
            <div>
                {view}
            </div>
        </div>
    )
}


function ExpressionContent(props) {
    return (
        <div>
            <div>
                <h6>Word: {props.word}</h6>
            </div>
            <div>
                ExLine: {props.exLine}
            </div>
            <div>
                MyLine: {props.myLine}
            </div>
        </div>
    )
}

export default TodayDiary;