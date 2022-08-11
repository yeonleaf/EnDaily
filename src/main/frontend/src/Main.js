import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import TodayDiary from "./TodayDiary"
import DiarySearch from "./DiarySearch";
const Main = () => {
    return (
        <div>
            <TodayDiary />
            <DiarySearch />
        </div>
    )
}

function SearchBtn(props) {
    return <button></button>
}

export default Main;