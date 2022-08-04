import React, {Component} from "react";
import MemberForm from "./MemberForm";

const Login = () => {
    return (
        <LoginComp />
    )
}

class LoginComp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('login submit!')
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
                <MemberForm email={this.state.email} password={this.state.password} onChange={this.handleChange} onSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default Login;