import {ITask} from "./ITask";
import {IAssignee} from "./IAssignee";
import {Priority} from "./Priority";

export interface ITaskProps {
    assignee: IAssignee,
    priority: Priority,
    name: string;
    complete: boolean
}
