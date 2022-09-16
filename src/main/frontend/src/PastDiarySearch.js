import {useState, useEffect} from "react";
import Diary from "./Diary";
import DateFormatConverter from "./DateFormatConverter";

function PastDiarySearch(props) {

    /*로그인 확인*/
    let memberId = sessionStorage.getItem("memberId");
    if (memberId === null) {
        window.location = "/login";
    }

    /*검색이 가능한 날짜의 최대값 (어제) 설정*/
    let d = new Date();
    d.setDate(d.getDate() - 1);
    const [qDate, setQDate] = useState(d);
    const [clicked, setClicked] = useState(false);

    /*버튼 클릭 */
    let queryResult;
    if (clicked) {
        queryResult = <Diary date={qDate}/>;
    } else {
        queryResult = <div/>
    }

    function handleQDateChange(event) {
        setQDate(event.target.value);
    }

    function handleClick() {
        setClicked(true);
    }

    return (
        <div>
            <input id="qDate" name="qDate" type="date" max={DateFormatConverter(d)} onChange={handleQDateChange}/>
            <button onClick={handleClick}>Search!</button>
            {queryResult}
        </div>
    )
}



export default PastDiarySearch;