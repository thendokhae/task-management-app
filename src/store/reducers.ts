import {ADD_ASSIGNEE, ADD_TASK, FILTER_TASKS, UPDATE_TASK} from "./actionTypes";
import {TaskActionTypes, TaskManagerState} from "../type";
import {ITeamMember} from "../models/ITeamMember";
import {Priority} from "../models/Priority";

const assigneeList: ITeamMember[] = [
    {
      color: '',
      name: 'All Team members',
      id: '-1'
    },
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
            assignee: assigneeList[1],
            name: 'Upgrade framework',
            priority: Priority.LOW,
            complete: false,
            id: 'YY00922'
        },
        {
            assignee: assigneeList[3],
            name: 'Fix lag issue',
            priority: Priority.HIGH,
            complete: false,
            id: '98322-122'
        },
        {
            assignee: assigneeList[2],
            name: 'Create user stories',
            priority: Priority.CRITICAL,
            complete: true,
            id: 'YY00JAGE'
        },
    ],
    assigneeList: assigneeList,
    selectedAssignee: {
        label: assigneeList[0].name,
        value: assigneeList[0]
    }
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
                ...state, taskList: state.taskList, assigneeList: state.assigneeList
            }
        case ADD_ASSIGNEE:
            const currentList = state.assigneeList;
            currentList.push(action.payload);
            return { ...state, assigneeList: currentList}
        case FILTER_TASKS:
            let filteredList = initialState.taskList;
            if (action.assignee.id !== "-1") {
                filteredList = initialState.taskList.filter(t => t.assignee.id === action.assignee.id)
            }
            return {...state, taskList: filteredList}
        default:
            return state
    }
}
