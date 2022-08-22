import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import TodayDiary from "./TodayDiary"
import DiarySearch from "./DiarySearch";
import DateFormatConverter from "./DateFormatConverter";

const Main = () => {
    return (
        <div>
            <TodayDiary date={DateFormatConverter(new Date())}/>
        </div>
    )
}

export default Main;