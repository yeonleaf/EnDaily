import React, {useEffect, useState} from "react";

import API from "../common/API";
import DateFormatConverter from "../utils/DateFormatConverter";
import SentenceContent from "./Sentence/SentenceContent";

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

    const updateSentenceList = (data) => {
        setSentenceList(data);
    }

    /*sentences 조회 결과에 따라 view를 분기 처리*/
    let view;
    if (sentenceList.length === 0) {
        view = <div>데이터가 없습니다.</div>
    } else {
        let count = 1;
        view = <div>
            {
                sentenceList.map((sentence) => {
                    return <SentenceContent key={count++} sentenceId={sentence.id} date={props.date} viewId={count} dictation={sentence.dictation} answer={sentence.answer} sentenceList={sentenceList} updateSentenceList={updateSentenceList}/>
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


export default Diary;