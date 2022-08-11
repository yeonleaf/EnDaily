import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import API from "./API";

class WordsSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SearchForm />
        )
    }
}

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            word: "",
            meanings: []
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

    handleClick() {
        let self = this;
        API.get("/search/word?target=" + this.state.word)
            .then(function(response) {
                let meanings = response.data[0]["meanings"];
                console.log(meanings);
                self.setState({
                    meanings: meanings
                })
            })
            .catch(function(response) {})
    }

    render() {
        let searchRes;
        if (this.state.meanings) {
            searchRes = this.state.meanings.map((pos, idx1) => {
                return (
                    <ul key={idx1}>
                        <h5>
                            {pos.partOfSpeech}:
                        </h5>

                        {
                            pos.definitions.map((def, idx2) => {
                                return (
                                    <li key={idx2}>
                                        {def.definition}
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            })
        } else {
            searchRes = <div></div>
        }

        return (
            <div>
                <h4>단어 검색</h4>
                <input type="text" name="word" onChange={this.handleChange}/>
                <button onClick={this.handleClick}>Search</button>
                {searchRes}
            </div>
        )
    }
}


class SearchRec extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            word: props.word,
            meaning: "",
            date: props.date,
            request: props.request
        }
    }

    handleClick(event) {
        let uri = "https://glosbe.com/gapi/translate?from=eng&dest=kor&format=json&pretty=true&phase="
        axios.get()
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>{this.state.word}</button>
                : {this.state.meaning}
            </div>
        )
    }
}

export default WordsSearch;