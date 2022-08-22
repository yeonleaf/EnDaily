import React, {Component, useEffect, useState} from "react";
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
            cond: 0,
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
                console.log(response.status)
                if (response.status == "OK") {
                    let meanings = response.data[0]["meanings"];
                    console.log(meanings);
                    self.setState({
                        cond: 1,
                        meanings: meanings
                    })
                }
            })
            .catch(function(response) {
                self.setState({
                    cond: 2
                })
            })
    }

    render() {
        let searchRes;
        if (this.state.cond == 1) {
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
        } else if (this.state.cond == 0) {
            searchRes = <div></div>
        } else if (this.state.cond == 2) {
            searchRes = <div>검색 결과가 없습니다. 다른 검색어를 입력해 주세요.</div>
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

export default WordsSearch;