import React, {Component, useEffect, useState} from "react";
import API from "./API";
import DateFormatConverter from "./DateFormatConverter";
import ExpressionList from "./ExpressionList";

function Diary(props) {

    let memberId = sessionStorage.getItem("memberId");

    if (memberId === null) {
        window.location = "/login";
    }

    const [sentenceList, setSentenceList] = useState([]);

    useEffect(() => {
        /*axios get -> date로 sentence list 조회*/
        API.get("/sentence/sentences?memberId="+memberId+"&date="+props.date)
            .then(function(response) {
                setSentenceList(prevState => response.data);
            })
            .catch(function(response) {
                console.log(response);
            })
    }, [props.date])

    console.log(sentenceList);
    /*sentences 조회 결과에 따라 view를 분기 처리*/
    let view;
    if (sentenceList.length === 0) {
        view = <div>데이터가 없습니다.</div>
    } else {
        let count = 1;
        view = <div>
            {
                sentenceList.map((sentence) => {
                    return <SentenceContent key={count++} sentenceId={sentence.id} viewId={count} dictation={sentence.dictation} answer={sentence.answer} />
                })
            }
        </div>
    }

    /*props.date === today일 경우에만 버튼을 렌더링*/
    let btn = <div/>;
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

    const [expressions, setExpressions] = useState([]);

    /*expressions 조회*/
    useEffect(() => {
        API.get("/expression/expressions?sentenceId=" + props.sentenceId)
            .then(response => {
                setExpressions(response.data);
            })
            .catch(error => console.log(error));
    }, [])

    const updateExpression = (data) => {
        setExpressions(prevState => [...data]);
    }
    return (
        <div>
            <div>
                <h5>{props.viewId}번 sentence</h5>
            </div>
            <div>
                Dictation: {props.dictation}
            </div>
            <div>
                Answer: {props.answer}
            </div>
            <div>
                <ExpressionList expressions={expressions} updateExpression={updateExpression} />
            </div>
        </div>
    )
}

export default Diary;