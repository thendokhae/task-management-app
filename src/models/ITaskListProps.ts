import {ITask} from "./ITask";

export interface ITaskListProps {
    taskList: ITask[];
    selectTask:(task: ITask) => void;
    completeTask:(task: ITask) => void;
}
