import React from "react";

function Main(props) {

    function handleTodayClick() {
        window.location = "/diary/today";
    }

    function handlePastClick() {
        window.location = "/diary/past";
    }

    return (
        <div>
            <button onClick={handleTodayClick}>오늘의 일기</button>
            <button onClick={handlePastClick}>지난 일기 조회</button>
        </div>
    )
}

export default Main;