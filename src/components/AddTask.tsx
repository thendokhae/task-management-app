import React, {Component} from "react";
import {IAddTaskProps} from "../models/IAddTaskProps";
import {IAddTaskState} from "../models/IAddTaskState";
import {Priority} from "../models/Priority";
import Select from "react-select";
import {Guid} from "guid-typescript";
import {ITask} from "../models/ITask";

class AddTask extends Component<IAddTaskProps, IAddTaskState>{
    constructor(props: IAddTaskProps) {
        super(props);
        this.state = {
            selectedAssignee: {
                value: {
                    name: '',
                    color: '',
                    id: ''
                },
                label: ''
            },
            name: '',
            selectedPriority: {
                label: 'Low',
                value: Priority.LOW
            },
            id: ''
        }
    }

    componentDidMount() {
        const name  = this.props.task.name;
        const selectedAssignee = {label: this.props.task.assignee.name, value: this.props.task.assignee};
        const selectedPriority = {label: this.props.task.priority, value: this.props.task.priority}
        const id = this.props.task.id;
        this.setState({ name, selectedAssignee, selectedPriority, id });
    }

    componentDidUpdate(prevProps: IAddTaskProps) {
        if (prevProps.task !== this.props.task) {
            const name  = this.props.task.name;
            const selectedAssignee = {label: this.props.task.assignee.name, value: this.props.task.assignee};
            const selectedPriority = {label: this.props.task.priority, value: this.props.task.priority}
            const id = this.props.task.id;
            this.setState({ name, selectedAssignee, selectedPriority, id });
        }
    }

    handleNameChangeData = (e: React.FormEvent<HTMLInputElement>) => {
        const name  = e.currentTarget.value
        this.setState({ name });
    };

    handleAssigneeChangeData = (event: any) => {
        const selectedAssignee = event;
        this.setState({ selectedAssignee });
    };

    handlePriorityChangeData = (event: any) => {
        const selectedPriority = event;
        this.setState({ selectedPriority });
    };

    addNewTask = (e: React.FormEvent) => {
        e.preventDefault();
        const task: ITask = {
            id: this.state.id !== '' ? this.state.id : Guid.create().toString(),
            complete: false,
            priority: this.state.selectedPriority.value,
            name: this.state.name,
            assignee: this.state.selectedAssignee.value
        }
        this.props.addTask(task)
    };

    render() {

        return (
            <div className="AddTeamMember">
                <h3>Add New Task</h3>
                <form onSubmit={this.addNewTask} className="pa4 black-80">
                    <div className="measure">
                        <label htmlFor="assignee" className="f6 b db mb2">Assignee</label>
                        <Select
                            value={this.state.selectedAssignee}
                            onChange={this.handleAssigneeChangeData}
                            options={this.props.assigneeOptions}
                        />
                    </div>
                    <div className="measure">
                        <label htmlFor="priority" className="f6 b db mb2">Priority</label>
                        <Select
                            value={this.state.selectedPriority}
                            onChange={this.handlePriorityChangeData}
                            options={this.props.priorityOptions}
                        />
                    </div>
                    <div className="measure">
                        <label htmlFor="description" className="f6 b db mb2">Description</label>
                        <input id="description" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" value={this.state.name}
                               onChange={this.handleNameChangeData}/>
                    </div>
                    <div className="mt3">
                        <button disabled={this.state.name === '' || this.state.selectedAssignee.label === ''
                        || this.state.selectedPriority.label === ''} className="ff6 link dim ba bw1 ph3 pv2 mb2 dib black">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddTask;
