import * as actionTypes from "./actionTypes";
import {IAssignee} from "../models/IAssignee";
import {ITask} from "../models/ITask";
import {DispatchType, TaskActionTypes} from "../type";

export function addAssignee(assignee: IAssignee): TaskActionTypes {
    const action: TaskActionTypes = {
        type: actionTypes.ADD_ASSIGNEE,
        assignee
    }
    return request(action)
}

export function addTask(task: ITask): TaskActionTypes {
    const action: TaskActionTypes = {
        type: actionTypes.ADD_TASK,
        task
    }
    return request(action)
}

export function updateTask(task: ITask): TaskActionTypes {
    const action: TaskActionTypes = {
        type: actionTypes.UPDATE_TASK,
        task
    }
    return request(action)
}

export function filterTasks(assignee: IAssignee): TaskActionTypes {
    const action: TaskActionTypes = {
        type: actionTypes.FILTER_TASKS,
        assignee
    }
    return request(action)
}

export function request(action: TaskActionTypes) {
    return (dispatch: DispatchType) => {
        dispatch(action);
    };
}
