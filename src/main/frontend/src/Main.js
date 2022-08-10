import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import TodayDiary from "./TodayDiary"
import SearchBox from "./SearchBox";
const Main = () => {
    return (
        <div>
            <TodayDiary />
            <SearchBox />
        </div>
    )
}

function SearchBtn(props) {
    return <button></button>
}

export default Main;