import React, {Component} from 'react';
import {ITaskProps} from "../models/ITaskProps";
import {ITaskState} from "../models/ITaskState";
import {Priority} from "../models/Priority";
import {ITask} from "../models/ITask";

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

    componentDidMount(): void {
        const {complete} = this.props;
        this.setState({complete});
    }

    selectTask = () => {
        if (!this.state.complete) {
            const task: ITask = {
                complete: this.props.complete,
                name: this.props.name,
                assignee: this.props.assignee,
                priority: this.props.priority,
                id: this.props.id
            }
            this.props.selectTask(task);
        }
    }

    onCompletedChange = (e: React.ChangeEvent<HTMLInputElement>)  =>{
        e.preventDefault();
        const complete = e.target.checked;
        this.setState({complete});
        const task: ITask = {
            assignee: this.props.assignee,
            id: this.props.id,
            priority: this.props.priority,
            name: this.props.name,
            complete: complete
        }
        this.props.completeTask(task)
    }

    public render() {
        return (
            <div className="tc dib br3 pa3 ma2 bw2 shadow-5" style={{backgroundColor: this.props.assignee.color,
                opacity: this.state.complete ? 0.7 : 1}} onClick={this.selectTask}>
                <div>Assignee: {this.props.assignee.name}</div>
                <div>Priority: {this.props.priority}</div>
                <div>Task: {this.props.name}</div>
                <div className="flex items-center mb2">
                    <label htmlFor="homealone" className="lh-copy">Complete</label>
                    <input className="mr2" type="checkbox" checked={this.state.complete} onChange={this.onCompletedChange}
                           disabled={this.state.complete}/>
                </div>
            </div>
        );
    }
}

export default Task;
