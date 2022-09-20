import React, {Component} from "react";
import {Route, Link} from 'react-router-dom';

const FrontPage = () => {
    return (
        <div>
            <Link to="/join">회원가입</Link>
            <Link to="/login">로그인</Link>
        </div>
    )
}

export default FrontPage;