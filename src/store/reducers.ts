import {
    ADD_TEAM_MEMBER,
    ADD_TASK,
    FILTER_TASKS,
    UPDATE_TASK,
    SHOW_ADD_NEW_TEAM_MEMBER,
    SHOW_ADD_NEW_TASK, SELECT_TASK, SEARCH_TASK
} from "./actionTypes";
import {TaskActionTypes, TaskManagerState} from "../type";
import {ITeamMember} from "../models/ITeamMember";
import {Priority} from "../models/Priority";
import {ITask} from "../models/ITask";

const assigneeList: ITeamMember[] = [
    {
      color: '',
      name: 'All Team members',
      id: '-1'
    },
    {
        color: '#500337',
        name: 'T Man',
        id: '122333'
    },
    {
        color: '#024750',
        name: 'X Man',
        id: '122tge333'
    },
    {
        color: '#526502',
        name: 'San Abe',
        id: '1229er0333'
    },
]

const getAppDateFromStorage  = (): TaskManagerState => {
    const data = localStorage.getItem("persist:root");
    const taskManagerState: TaskManagerState = {
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
                priority: Priority.MEDIUM,
                complete: true,
                id: 'YY00JAGE'
            },
        ],
        assigneeList: assigneeList,
        selectedAssignee: {
            label: 'All Team members',
            value:     {
                color: '',
                name: 'All Team members',
                id: '-1'
            }
        },
        showAddNewTask: false,
        showAddNewTeamMember: false,
        selectedTask: {
            id: '',
            priority: Priority.LOW,
            assignee: {
                name: '',
                id: '',
                color: ''
            },
            name: '',
            complete: false
        }
    }

    return taskManagerState;
}

const initialState = getAppDateFromStorage();

export function taskManagerReducer(
    state = initialState,
    action: TaskActionTypes
): TaskManagerState {
    switch (action.type) {
        case ADD_TASK:
            const currentTask = state.taskList;
            let existingTask: ITask = currentTask.filter(t => t.id === action.task.id)[0];
            if (existingTask) {
                currentTask[currentTask.indexOf(existingTask)] = action.task;
            } else {
                currentTask.push(action.task)
            }
            return {...state, taskList: currentTask, selectedTask: initialState.selectedTask}
        case UPDATE_TASK:
            return {
                ...state, taskList: state.taskList, assigneeList: state.assigneeList, selectedTask: initialState.selectedTask
            }
        case ADD_TEAM_MEMBER:
            const currentList = state.assigneeList;
            currentList.push(action.assignee);
            return { ...state, assigneeList: currentList}
        case FILTER_TASKS:
            let filteredList = initialState.taskList;
            if (action.assignee.id !== "-1") {
                filteredList = initialState.taskList.filter(t => t.assignee.id === action.assignee.id)
            }
            return {...state, taskList: filteredList}
        case SHOW_ADD_NEW_TEAM_MEMBER:
            return {...state, showAddNewTeamMember: action.addNewTeamMember}
        case SHOW_ADD_NEW_TASK:
            return {...state, showAddNewTask: action.addNewTask}
        case SELECT_TASK:
            return {...state, selectedTask: action.task}
        case SEARCH_TASK:
            if (action.text.length > 0) {
                const filteredTasks = initialState.taskList.filter(
                    t => t.name.toLowerCase().includes(action.text.toLowerCase())
                        || t.priority.toLowerCase().includes(action.text.toLowerCase()) || t.assignee.name.toLowerCase()
                            .includes(action.text.toLowerCase()));
                return {...state, taskList: filteredTasks}
            } else {
                return {...state, taskList: initialState.taskList}
            }
        default:
            return state
    }
}
