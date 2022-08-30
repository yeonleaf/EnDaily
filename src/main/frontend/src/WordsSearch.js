import React, {useEffect, useState} from "react";
import API from "./API";
import $ from 'jquery';
import DateTimeFormatConverter from "./DateTimeFormatConverter";

function WordsSearch(props) {

    return (
        <div>
            <SearchForm />
        </div>
    )
}

function SearchForm(props) {

    const [cond, setCond] = useState(0);
    const [word, setWord] = useState("");
    const [meanings, setMeanings] = useState([]);

    const [records, setRecords] = useState([]);
    const [searchMsg, setSearchMsg] = useState("");

    useEffect(() => {
        let memberId = sessionStorage.getItem("memberId");
        if (memberId === null) {
            window.location = "/login";
        }

        /*record 정보 갱신*/
        API.get("/search/records?memberId=" + memberId)
            .then((response) => {
                if (response.data.length === 0) {
                    setSearchMsg("최근 7일 동안의 검색 기록이 없습니다.");
                } else {
                    setSearchMsg("");
                    setRecords(prevState => [...response.data])
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [meanings]);
    
    function handleWord(event) {
        setWord(event.target.value);
    }

    function handleClick(data) {
        let memberId = sessionStorage.getItem("memberId");

        if (memberId === null) {
            window.location = "/login";
        }

        API.get("/search/word?memberId=" + memberId + "&target=" + data)
            .then(function(response) {
                if (response.status === 200) {
                    let meanings = response.data[0]["meanings"];
                    setCond(1);
                    setMeanings(prevState => [...meanings]);
                }
            })
            .catch(function(response) {
                setCond(2);
            })
    }

    let searchRes;
    if (cond === 1) {
        searchRes = meanings.map((pos, idx1) => {
            return (
                <ul key={idx1}>
                    <h5>
                        {pos.partOfSpeech}:
                    </h5>

                    {
                        pos.definitions.map((def, idx2) => {
                            return (
                                <li key={idx2}>
                                    {def.definition}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        })
    } else if (cond === 0) {
        searchRes = <div></div>
    } else if (cond === 2) {
        searchRes = <div>검색 결과가 없습니다. 다른 검색어를 입력해 주세요.</div>
    }

    let searchBtn = word !== "" ? <button onClick={() => handleClick(word)}>Search</button> : <div></div>

    let recordsView = records.map((record, _) => {
        return (
            <div key={record.id}>
                <span>{DateTimeFormatConverter(new Date(record.datetime))}</span>
                <a onClick={()=> {
                    $("#word").val(record.word);
                    handleClick(record.word);
                }}>{record.word}</a>
            </div>
        );
    })

    return (
        <div>
            <h4>단어 검색</h4>
            <input id="word" type="text" name="word" onChange={handleWord}/>
            {searchBtn}
            {searchRes}
            <div>
                <h5>검색 기록</h5>
                {recordsView}
                {searchMsg}
            </div>
        </div>
    )
}

export default WordsSearch;