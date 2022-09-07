import React, {Component, useEffect, useState} from "react";
import API from "./API";
import DateFormatConverter from "./DateFormatConverter";

function Diary(props) {

    let memberId = sessionStorage.getItem("memberId");

    if (memberId === null) {
        window.location = "/login";
    }

    const [sentenceList, setSentenceList] = useState([]);

    console.log(props.date);

    useEffect(() => {
        /*axios get -> date로 sentence list 조회*/
        API.get("/sentence/sentences?memberId="+memberId+"&date="+props.date)
            .then(function(response) {
                setSentenceList(prevState => [...prevState, response.data]);
            })
            .catch(function(response) {
                console.log(response);
            })
    }, [props.date])


    /*sentences 조회 결과에 따라 view를 분기 처리*/
    let view;
    if (sentenceList.length === 0 || Object.keys(sentenceList[0]).length === 0) {
        view = <div>데이터가 없습니다.</div>
    } else {
        let count = 1;
        view = <div>
            {
                Object.keys(sentenceList[0]).map((sentenceKey, idx) => {
                    const sentence = JSON.parse(sentenceKey);
                    return <SentenceContent key={sentence.id} sentenceId={count++} dictation={sentence.dictation} answer={sentence.answer} expressions={sentenceList[0][sentenceKey]} />
                })
            }
        </div>
    }

    /*props.date === today일 경우에만 버튼을 렌더링*/
    let btn = <div></div>;
    if (props.date === DateFormatConverter(new Date())) {
        btn = <button onClick={() => window.location = "/sentence"}>Sentence 추가</button>;
    }

    /*props.date === today와 아닌 경우를 구분해서 타이틀을 출력*/
    let title;
    if (props.date === DateFormatConverter(new Date())) {
        title = <h3>Today's sentences!</h3>;
    } else {
        title = <h3>{props.date}</h3>;
    }

    return (
        <div>
            {title}
            <div>
                {view}
            </div>
            <div>
                {btn}
            </div>
        </div>
    )
}



function SentenceContent(props) {
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

export default Diary;