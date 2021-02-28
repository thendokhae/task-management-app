import {ITeamMember} from "./ITeamMember";
import {Priority} from "./Priority";

export interface ITask {
    id: string,
    assignee: ITeamMember,
    priority: Priority,
    name: string;
    complete: boolean
}
