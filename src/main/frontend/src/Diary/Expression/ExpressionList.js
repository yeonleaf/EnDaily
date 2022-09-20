import React, {useEffect, useState} from "react";
import API from "../../common/API";

import KoreanExistValidator from "../../utils/KoreanExistValidator";
import DateFormatConverter from "../../utils/DateFormatConverter";

function ExpressionList(props) {
    let keyCount = 0;

    let expressions = props.expressions;

    return (
        <div>
            {expressions.map(
                (expression) => <div key={keyCount++}><Expression key={keyCount} id={expression.id} date={props.date} word={expression.word} meaning={expression.meaning} exLine={expression.exLine} myLine={expression.myLine} expressions={props.expressions} updateExpression={props.updateExpression} addExpression={props.addExpression}/></div>
            )}
        </div>
    )
}

function Expression(props) {
    let expressions = props.expressions;

    const [myLine, setMyLine] = useState("");
    const [editFlag, setEditFlag] = useState(false);

    useEffect(() => {
        setMyLine(props.myLine);
    }, [myLine]);

    function handleMyLineChange(data) {
        /*expressions 내의 expression의 id를 조사해서 id와 같은 것을 찾는다.*/
        for (const expression of expressions) {
            if (expression.word === props.word && expression.meaning === props.meaning && expression.exLine === props.exLine) {
                expression.myLine = data;
                setMyLine(data);
                break;
            }
        }

        /*해당 expression의 myLine을 event.target.value로 수정한다.*/
        props.updateExpression(expressions);
    }

    function handleEditFlagChange() {
        setEditFlag(prevState => !prevState);
    }

    function handleDelete() {
        if (props.id === undefined) {
            /*Real Save 이전 삭제 로직*/
            const idx = expressions.findIndex(function(expression) {return expression.word===props.word && expression.meaning===props.meaning && expression.exLine === props.exLine});
            if (idx > -1) expressions.splice(idx, 1);
        } else {
            /*Real Save 이후 삭제 로직*/
            const idx = expressions.findIndex(function(expression) {return expression.id===props.id});
            if (idx > -1) expressions.splice(idx, 1);
            API.delete("/expression?expressionId=" + props.id)
                .catch(r => console.log(r))
                .then(e => console.log(e));
        }
        props.updateExpression(expressions);
    }

    function handleEdit(data) {
        if (props.id === undefined) {
            /*Real Save 이전 수정 로직*/
            const newExpressions = expressions.map(expression => {
                if (expression.word === props.word && expression.meaning === props.meaning && expression.exLine === props.exLine && expression.myLine === props.myLine) {
                    return {...expression, word: data.word, meaning: data.meaning, exLine: data.exLine, myLine: data.myLine}
                }
                return expression;
            })
            props.updateExpression(newExpressions);
            handleEditFlagChange();

        } else {
            /*Real Save 이후 수정 로직*/
            const newExpressions = expressions.map(expression => {
                if (expression.id === props.id) {
                    return {...expression, word: data.word, meaning: data.meaning, exLine: data.exLine, myLine: data.myLine}
                }
                return expression;
            })
            props.updateExpression(newExpressions);

            API.put("/expression", {
                id: props.id,
                word: data.word,
                meaning: data.meaning,
                exLine: data.exLine,
                myLine: data.myLine
            }).then(r => console.log(r))
                .catch(e => console.log(e));

            handleEditFlagChange();
        }
    }

    let myLineCond;
    if (myLine === "") {
        myLineCond = <div>
            <button onClick={handleDelete}>DEL</button>
            <ExpressionContentView word={props.word} meaning={props.meaning} exLine={props.exLine} myLine={myLine}/>
            My Sentence: <MyLineForm word={props.word} myLine={myLine} handleMyLineChange={handleMyLineChange}/>
        </div>
    } else {
        let editCond = editFlag ? <ExpressionEditForm word={props.word} meaning={props.meaning} exLine={props.exLine} myLine={myLine} handleEdit={handleEdit}/> : <ExpressionContentView word={props.word} meaning={props.meaning} exLine={props.exLine} myLine={props.myLine}/>
        if (props.date === DateFormatConverter(new Date())) {
            myLineCond = <div>
                <button onClick={handleEditFlagChange}>EDT</button>
                <button onClick={handleDelete}>DEL</button>
                {editCond}
            </div>
        } else {
            myLineCond = <div>{editCond}</div>
        }

    }

    return (
        <div>
            {myLineCond}
        </div>
    )
}

function ExpressionContentView(props) {
    let myLineCond = props.myLine === "" ? <div/> : <div>MyLine: {props.myLine}</div>
    return (
        <div>
            <div>
                Word: {props.word}
            </div>
            <div>
                Meaning: {props.meaning}
            </div>
            <div>
                Example Sentence: {props.exLine}
            </div>
            {myLineCond}
        </div>
    )
}

function ExpressionEditForm(props) {

    const [inputValues, setInputValues] = useState({
        word: props.word,
        meaning: props.meaning,
        exLine: props.exLine,
        myLine: props.myLine
    })

    function triggerEdit() {
        let newData = {
            word: inputValues.word,
            meaning: inputValues.meaning,
            exLine: inputValues.exLine,
            myLine: inputValues.myLine
        }
        props.handleEdit(newData);
    }

    const handleOnChange = event => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});
    }

    return (
        <div>
            <div>
                <label htmlFor="word">word</label>
                <input type="text" name="word" value={inputValues.word} onChange={handleOnChange}/>
            </div>
            <div>
                <label htmlFor="meaning">meaning</label>
                <input type="text" name="meaning" value={inputValues.meaning} onChange={handleOnChange}/>
            </div>
            <div>
                <label htmlFor="exLine">Example Sentence</label>
                <input type="text" name="exLine" value={inputValues.exLine} onChange={handleOnChange}/>
            </div>
            <div>
                <label htmlFor="myLine">My Sentence</label>
                <input type="text" name="myLine" value={inputValues.myLine} onChange={handleOnChange}/>
            </div>
            <div>
                <button onClick={triggerEdit}>수정 완료</button>
            </div>
        </div>
    )
}

function MyLineForm(props) {

    const [myLine, setMyLine] = useState("");
    const [myLineMsg, setMyLineMsg] = useState("");

    function handleChange(event) {
        setMyLine(event.target.value);
    }

    function handleClick() {
        setMyLineMsg("");
        if (myLine === "") {
            setMyLineMsg("myLine에 공백이 들어갈 수 없습니다.");
        } else if (myLine !== "" && KoreanExistValidator(myLine)) {
            setMyLineMsg("myLine은 반드시 영어로 작성해야 합니다.");
        } else {
            setMyLineMsg("");
            props.handleMyLineChange(myLine);
        }

    }

    return (
        <div>
            <div>
                <input name="myLine" onChange={handleChange}/>
                <small>{myLineMsg}</small>
            </div>
            <div>
                <button onClick={handleClick}>문장 만들기 완료</button>
            </div>
        </div>
    )
}
export default ExpressionList;