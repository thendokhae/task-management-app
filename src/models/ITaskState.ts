import {IAssignee} from "./IAssignee";
import {Priority} from "./Priority";

export interface ITaskState {
    assignee: IAssignee,
    priority: Priority,
    name: string;
    complete: boolean
}
