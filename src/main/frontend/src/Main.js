import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import DiaryBox from "./DiaryBox";
import SearchBox from "./SearchBox";
const Main = () => {
    return (
        <div>
            <DiaryBox />
            <SearchBox />
        </div>
    )
}

function SearchBtn(props) {
    return <button></button>
}

export default Main;