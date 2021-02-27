import React, {Component} from 'react';
import {ITaskProps} from "../models/ITaskProps";
import {ITaskState} from "../models/ITaskState";
import {Priority} from "../models/Priority";

class Task extends Component<ITaskProps, ITaskState> {
    constructor(props: ITaskProps) {
        super(props);
        this.state = {
            assignee: {
                color: "",
                id: "",
                name: ""
            },
            complete: false,
            name: "",
            priority: Priority.LOW
        }
    }
    public render() {
        return (
            <div className="tc dib br3 pa3 ma2 bw2 shadow-5" style={{backgroundColor: this.props.assignee.color}}>
                <div>Assignee: {this.props.assignee.name}</div>
                <div>Priority: {this.props.priority}</div>
                <div>Task: {this.props.name}</div>
                <div className="flex items-center mb2">
                    <label htmlFor="homealone" className="lh-copy">Complete</label>
                    <input className="mr2" type="checkbox" id="homealone" value="homealone" />
                </div>
            </div>
        );
    }
}

export default Task;
