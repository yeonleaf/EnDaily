import React, {Component} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./Header";
import Join from "./Join";
import FrontPage from "./FrontPage";
import Login from "./Login";
import Main from "./Main";
import SentenceSave from "./SentenceSave";
import PastDiarySearch from "./PastDiarySearch";
import Diary from "./Diary";
import DateFormatConverter from "./DateFormatConverter";
const App = () => {
  return (
      <div className='App'>
          <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<FrontPage />}></Route>
                <Route path="/join" element={<Join />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/main" element={<Main />}></Route>
                <Route path="/sentence" element={<SentenceSave />}></Route>
                <Route path="/diary/today" element={<Diary date={DateFormatConverter(new Date())}/>}></Route>
                <Route path="/diary/past" element={<PastDiarySearch/>}></Route>
            </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App;
