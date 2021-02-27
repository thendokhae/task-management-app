import React, {Component} from "react";
import {IAssigneeProps} from "../models/IAssigneeProps";
import {IAssigneeState} from "../models/IAssigneeState";
import {IAssignee} from "../models/IAssignee";
import {shallowEqual, useSelector} from "react-redux";
import {TaskManagerState} from "../type";
import {ISelectOption} from "../models/ISelectOption";
import Select from "react-select";

class AssigneeList extends Component<IAssigneeProps, IAssigneeState>{

    constructor(props: IAssigneeProps) {
        super(props);
        this.state = {
            selectOptions: [],
            selectedOption: null
        };
    }

    handleChange = (selectedOption: ISelectOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={this.props.selectOptions}
            />
        );
    }
}

export default AssigneeList;
