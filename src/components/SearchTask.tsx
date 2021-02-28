import React, {Component} from "react";
import {ISearchProps} from "../models/ISearchProps";
import {ISearchState} from "../models/ISearchState";

class SearchTask extends Component<ISearchProps, ISearchState> {
    constructor(props: ISearchProps) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleSearch =(e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        this.setState({text});
        this.props.searchTask(this.state.text);
    }


    render() {
        return (
            <div className="pa2">
                <input
                    className="pa3 ba"
                    type="search"
                    placeholder="Search tasks"
                    onChange={this.handleSearch}
                />
            </div>
        );
    }
}

export default SearchTask;
