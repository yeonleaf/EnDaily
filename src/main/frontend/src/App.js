import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Header from "./common/Header";
import Join from "./pages/Join";
import FrontPage from "./pages/FrontPage";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SentenceSave from "./Diary/Sentence/SentenceSave";
import PastDiary from "./pages/PastDiary";
import TodayDiary from "./pages/TodayDiary";

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
                <Route path="/diary/today" element={<TodayDiary />}></Route>
                <Route path="/diary/past" element={<PastDiary/>}></Route>
            </Routes>
          </BrowserRouter>
      </div>
  )
}

export default App;
