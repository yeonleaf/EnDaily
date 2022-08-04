import React, {Component} from "react";

class MemberForm extends Component {
    render() {
        return (
            <form>
                <label>
                    Email:
                    <input type="text" name="email" defaultValue={this.props.email} onChange={this.props.onChange} />
                </label>
                <label>
                    Password:
                    <input type="text" name="password" defaultValue={this.props.password} onChange={this.props.onChange} />
                </label>
                <button type="button" onClick={this.props.onClick}>Submit</button>
            </form>
        )
    }
}

export default MemberForm;