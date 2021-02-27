import React, {Component} from 'react';
import {ITaskListProps} from "../models/ITaskListProps";
import {ITaskListState} from "../models/ITaskListState";
import Task from "./Task";

class TaskList extends Component<ITaskListProps, ITaskListState> {
    constructor(props: ITaskListProps) {
        super(props);
        this.state = {
            taskList: []
        };
    }

    public render() {
        const taskComponent = this.props.taskList.map((task) => {
            return (
                <Task
                    assignee={task.assignee}
                    complete={task.complete}
                    name={task.name}
                    priority={task.priority}
                />
            );
        });
        return <div>{taskComponent}</div>;
    }
}

export default TaskList;
