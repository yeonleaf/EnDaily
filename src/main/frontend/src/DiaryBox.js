import React, {Component} from "react";
import MemberForm from "./MemberForm";

class DiaryBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alreadyWritten: false,
            date: props.date,
            reference: "",
            content: ""
        }
    }

    componentDidMount() {
        // axios로 diary 데이터 가져오기
    }

    render() {
        let conditionRes = DiaryCondition({isAlreadyWritten: this.state.alreadyWritten, date: this.state.date, content: this.state.constructor, reference: this.state.reference})
        return (
            <div>
                {conditionRes}
            </div>
        );
    }

}

function DiaryCondition(props) {
    if (props.isAlreadyWritten) {
        return <Diary date={props.date} content={props.content} reference={props.reference} />
    } else {
        return <NotYet />
    }
}

class NotYet extends Component {
    constructor(props) {
        super(props);
        this.handleWriteDiary = this.handleWriteDiary.bind(this);
        this.state = {
            writeWindow: false,
        }
    }

    handleWriteDiary() {
        this.setState((state) => ({
            writeWindow: !state.writeWindow
        }))
    }

    render() {
        let form;
        if (this.state.writeWindow) {
            form = <DiaryForm />
        } else {
            form = <div></div>
        }

        return (
          <div>
              <h2>오늘은 아직 일기를 쓰지 않았습니다.</h2>
              <button onClick={this.handleWriteDiary}>오늘 일기 쓰기</button>
              {form}
          </div>
        );
    }
}

class Diary extends Component {

    constructor(props) {
        super(props);
        this.state={
            date: "",
            reference: "",
            content: ""
        }
    }

    render() {
        return (
            <div>
                date: {this.state.date}
                reference: {this.state.reference}
                content: {this.state.content}
            </div>
        );
    }
}

class DiaryForm extends Component {
    render() {
        return (
            <div>
                <div>
                    <label>
                        reference:
                        <input type="text" name="reference" />
                    </label>
                </div>
                <div>
                    <label>
                        content:
                    </label>
                    <textarea name="content"></textarea>
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </div>
        )
    }
}

export default DiaryBox;