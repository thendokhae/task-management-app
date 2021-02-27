import {ITask} from "./models/ITask";
import {IAssignee} from "./models/IAssignee";
import {AddTask, UpdateTask, AddAssignee, FilterTasks} from "./store/actionTypes"

type TaskManagerState = {
    taskList: ITask[],
    assigneeList: IAssignee[],
    selectedAssignee: IAssignee
}

type TaskActionTypes = AddTask | UpdateTask | AddAssignee | FilterTasks;

type DispatchType = (args: TaskActionTypes) => TaskActionTypes;
