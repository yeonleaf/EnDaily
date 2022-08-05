import React, {Component} from "react";

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.handleSearchBtnClick = this.handleSearchBtnClick.bind(this);
        this.state = {
            searchWindow: false
        }
    }

    handleSearchBtnClick() {
        this.setState((state) => ({
            searchWindow: !state.searchWindow
        }))
    }

    render() {
        let form;
        if (this.state.searchWindow) {
            form = <SearchForm />
        } else {
            form = <div></div>
        }
        return (
            <div>
                <button onClick={this.handleSearchBtnClick}>지난 일기 검색</button>
                {form}
            </div>
        );
    }
}


function SearchForm(props) {
    return (
        <div>
            <label>
                date:
                <input type="date" name="year"/>
            </label>
            <button>Submit</button>
        </div>
    )
}

export default SearchBox;