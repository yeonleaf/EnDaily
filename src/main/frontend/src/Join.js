import React, {Component} from "react";
import MemberForm from "./MemberForm";
import axios from "axios";

const Join = () => {
    return (
        <JoinComp />
    )
}

class JoinComp extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleClick(event) {
        event.preventDefault();
        console.log("clicked button")
        const api = axios.create({
            baseURL: "http://localhost:8080/api"
        })
        api.post('/member/join', {
            email: this.state.email,
            password: this.state.password
        }).then(function (response) {
            window.location = "/login";
        }).catch(function (error) {
            console.log(error);
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <div>Join!</div>
                <div>email: {this.state.email}</div>
                <div>password: {this.state.password}</div>
                <MemberForm email={this.state.email} password={this.state.password} onChange={this.handleChange} onClick={this.handleClick} />
            </div>
        );
    }
}

export default Join;