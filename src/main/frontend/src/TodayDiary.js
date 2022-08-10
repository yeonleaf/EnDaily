import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import dateFormatConverter from "./DateFormatConverter";
import API from './API'

class TodayDiary extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            date: "",
            reference: "",
            content: ""
        }
    }

    handleChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        let self = this;
        // 로그인 확인
        let memberId = sessionStorage.getItem("memberId");
        if (memberId === null) {
            window.location = "/login"
        }

        // axios로 diary 데이터 가져오기
        API.get("/diary?memberId=" + memberId + "&date=" + dateFormatConverter(new Date()))
            .then(function(response) {
                self.setState({
                    date: response.data.date,
                    reference: response.data.reference,
                    content: response.data.content
                });
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    render() {
        let conditionRes;
        if (this.state.date) {
            conditionRes = <Diary date={this.state.date} content={this.state.content} reference={this.state.reference} />
        } else {
            conditionRes = <NotYet content={this.state.content} reference={this.state.reference} onChange={this.handleChange}/>
        }
        return (
            <div>
                {conditionRes}
            </div>
        );
    }

}

class NotYet extends Component {
    constructor(props) {
        super(props);
        this.showWriteForm = this.showWriteForm.bind(this);
        this.state = {
            writeWindow: false
        }
    }

    showWriteForm() {
        this.setState((state) => ({
            writeWindow: !state.writeWindow
        }))
    }

    render() {
        let form;
        if (this.state.writeWindow) {
            form = <SaveDiary content={this.props.content} reference={this.props.reference} onChange={this.props.onChange}/>
        } else {
            form = <div></div>
        }

        return (
          <div>
              <h2>오늘은 아직 일기를 쓰지 않았습니다.</h2>
              <button onClick={this.showWriteForm}>오늘 일기 쓰기</button>
              {form}
          </div>
        );
    }
}

function Diary(props) {
    return (
        <div>
            <div>
                date: {props.date.toString()}
            </div>
            <div>
                reference: {props.reference}
            </div>
            <div>
                content: {props.content}
            </div>
        </div>
    );
}


function DiaryForm(props) {
    return (
        <div>
            <div>
                <label>
                    reference:
                    <input type="text" name="reference" onChange={props.onChange}/>
                </label>
            </div>
            <div>
                <label>
                    content:
                </label>
                <textarea name="content" onChange={props.onChange}></textarea>
            </div>
            <div>
                <button onClick={props.onClick}>Submit</button>
            </div>
        </div>
    )
}

class SaveDiary extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        let memberId = sessionStorage.getItem("memberId");
        if (memberId === null) {
            window.location = "/login"
        }

        event.preventDefault();
        API.post("/diary/save", {
            memberId: sessionStorage.getItem("memberId"),
            date: dateFormatConverter(new Date()),
            content: this.props.content,
            reference: this.props.reference
        }).then(function (response) {
            window.location.reload();
        }).catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return <DiaryForm onClick={this.handleClick} onChange={this.props.onChange}/>
    }
}

export default TodayDiary;