import React, {Component} from "react";

class MemberForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let submitBtn = <div></div> ? (!this.props.isEmail || !this.props.isPassword) : <button type="button" onClick={this.props.onClick}>Submit</button>
        let eMsgPiece = <div></div> ? this.props.emailMsg.length <= 0 : <small>{this.props.emailMsg}</small>
        let pMsgPiece = <div></div> ? this.props.passwordMsg.length <= 0 : <small>{this.props.passwordMsg}</small>
        return (
            <form>
                <label>
                    Email:
                    <input type="text" name="email" defaultValue={this.props.email} onChange={this.props.handleEmail} />
                    {eMsgPiece}
                </label>
                <label>
                    Password:
                    <input type="text" name="password" defaultValue={this.props.password} onChange={this.props.handlePassword} />
                    {pMsgPiece}
                </label>
                {submitBtn}
            </form>
        )
    }
}

export default MemberForm;