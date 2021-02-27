import {ADD_ASSIGNEE, ADD_TASK, FILTER_TASKS, UPDATE_TASK} from "./actionTypes";
import {TaskActionTypes, TaskManagerState} from "../type";
import {IAssignee} from "../models/IAssignee";
import {Priority} from "../models/Priority";

const assigneeList: IAssignee[] = [
    {
        color: '#87366D',
        name: 'T Man',
        id: '122333'
    },
    {
        color: '#0e50b6',
        name: 'X Man',
        id: '122tge333'
    },
    {
        color: '#97b60e',
        name: 'San Abe',
        id: '1229er0333'
    },
]
const initialState: TaskManagerState = {
    taskList: [
        {
            assignee: assigneeList[0],
            name: 'Upgrade framework',
            priority: Priority.LOW,
            complete: false,
            id: 'YY00922'
        },
        {
            assignee: assigneeList[2],
            name: 'Fix lag issue',
            priority: Priority.HIGH,
            complete: false,
            id: '98322-122'
        },
        {
            assignee: assigneeList[1],
            name: 'Create user stories',
            priority: Priority.CRITICAL,
            complete: true,
            id: 'YY00JAGE'
        },
    ],
    assigneeList: assigneeList
}

export function taskManagerReducer(
    state = initialState,
    action: TaskActionTypes
): TaskManagerState {
    switch (action.type) {
        case ADD_TASK:
            const currentTask = state.taskList;
            currentTask.push(action.payload)
            return {...state, taskList: currentTask}
        case UPDATE_TASK:
            return {
                taskList: state.taskList, assigneeList: state.assigneeList
            }
        case ADD_ASSIGNEE:
            const currentList = state.assigneeList;
            currentList.push(action.payload);
            return { ...state, assigneeList: currentList}
        case FILTER_TASKS:
            let filteredList = state.taskList;
            if (action.payload) {
                filteredList = state.taskList.filter(t => t.assignee.id === action.payload.id)
            }
            return {...state, taskList: filteredList}
        default:
            return state
    }
}
