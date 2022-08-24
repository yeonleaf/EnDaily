import React, {useState} from "react";
import API from "./API";

const Join = () => {
    return (
        <JoinComp />
    )
}

function JoinComp(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailMsg, setEmailMsg] = useState([]);
    const [passwordMsg, setPasswordMsg] = useState([]);

    function handleClick(event) {
        event.preventDefault();
        setEmailMsg([]);
        setPasswordMsg([]);

        API.post('/member/join', {
            email: email,
            password: password
        }).then(function (response) {
            window.location = "/login";
        }).catch(function (error) {
            let msgList = error.response.data.msgList;
            msgList.forEach(obj => {
                if (obj.field === "email") {
                    setEmailMsg(prevState => [...prevState, [obj.keyCnt, obj.errMsg]]);
                } else {
                    setPasswordMsg(prevState => [...prevState, [obj.keyCnt, obj.errMsg]]);
                }
            })
        })
    }

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    let emailMsgBag = emailMsg.map(msg => <li key={msg[0]}>{msg[1]}</li>);
    let passwordMsgBag = passwordMsg.map(msg => <li key={msg[0]}>{msg[1]}</li>);

    return (
        <div>
            <div>Join!</div>
            <div>
                <label>
                    Email:
                    <input type="text" name="email" defaultValue={email} onChange={handleEmail} />
                    {emailMsgBag}
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="password" name="password" defaultValue={password} onChange={handlePassword} />
                    {passwordMsgBag}
                </label>
            </div>
            <div>
                <button type="button" onClick={handleClick}>Submit</button>
            </div>
        </div>
    );
}

export default Join;