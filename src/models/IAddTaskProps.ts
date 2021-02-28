import {ITask} from "./ITask";
import {ISelectOption} from "./ISelectOption";

export interface IAddTaskProps {
    addTask: (task: ITask) => void;
    assigneeOptions: ISelectOption[];
    priorityOptions: ISelectOption[];
    task: ITask;
}
