import React, {Component} from "react";
import MemberForm from "./MemberForm";
import axios from "axios";

const Login = () => {
    return (
        <LoginComp />
    )
}

class LoginComp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleClick(event) {
        event.preventDefault();
        const api = axios.create({
            baseURL: "http://localhost:8080/api"
        })

        api.post('/member/login', {
            email: this.state.email,
            password: this.state.password
        }).then(function(response) {
            if (response.data != -1) {
                sessionStorage.setItem("memberId", response.data);
                window.location = "/main";
            } else {
                document.getElementById("error").innerText = "없는 사용자이거나 비밀번호가 틀렸습니다."
            }
        }).catch(function(error) {
            console.log(error);
        })

    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <div>email: {this.state.email}</div>
                <div>password: {this.state.password}</div>
                <div id="error" name="error"></div>
                <MemberForm email={this.state.email} password={this.state.password} onChange={this.handleChange} onClick={this.handleClick} />
            </div>
        );
    }
}

export default Login;