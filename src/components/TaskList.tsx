import React, {Component} from 'react';
import {ITaskListProps} from "../models/ITaskListProps";
import {ITaskListState} from "../models/ITaskListState";
import Task from "./Task";
import {ITask} from "../models/ITask";

class TaskList extends Component<ITaskListProps, ITaskListState> {
    constructor(props: ITaskListProps) {
        super(props);
        this.state = {
            taskList: []
        };
    }

    componentDidUpdate(prevProps: ITaskListProps) {
        if (prevProps.taskList.toString() !== this.props.taskList.toString()) {
            const taskList = this.props.taskList;
            this.setState({taskList})
        }
    }

    handleSelectTask = (task: ITask) => {
        this.props.selectTask(task);
    }

    handleCompleteTask = (task: ITask) => {
        this.props.completeTask(task);
    }

    public render() {
        const taskComponent = this.props.taskList.map((task) => {
            return (
                <Task
                    key={task.id}
                    assignee={task.assignee}
                    complete={task.complete}
                    name={task.name}
                    priority={task.priority}
                    completeTask={this.handleCompleteTask}
                    selectTask={this.handleSelectTask}
                    id={task.id}
                />
            );
        });
        return <div>{taskComponent}</div>;
    }
}

export default TaskList;
