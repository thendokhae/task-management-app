import {ITeamMember} from "./ITeamMember";
import {Priority} from "./Priority";

export interface ITaskState {
    assignee: ITeamMember,
    priority: Priority,
    name: string;
    complete: boolean
}
