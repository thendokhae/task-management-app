import {IAssignee} from "./IAssignee";
import {Priority} from "./Priority";

export interface ITask {
    id: string,
    assignee: IAssignee,
    priority: Priority,
    name: string;
    complete: boolean
}
