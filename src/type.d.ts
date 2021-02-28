import {ITask} from "./models/ITask";
import {ITeamMember} from "./models/ITeamMember";
import {AddTask, UpdateTask, AddAssignee, FilterTasks} from "./store/actionTypes"
import {ISelectOption} from "./models/ISelectOption";

type TaskManagerState = {
    taskList: ITask[],
    assigneeList: ITeamMember[],
    selectedAssignee: ISelectOption,
    showAddNewTeamMember: boolean,
    showAddNewTask: boolean,
    selectedTask: ITask
}

type TaskActionTypes = AddTask | UpdateTask | AddAssignee | FilterTasks;

type DispatchType = (args: TaskActionTypes) => TaskActionTypes;
