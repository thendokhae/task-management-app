import {ITask} from "./ITask";
import {ITeamMember} from "./ITeamMember";
import {Priority} from "./Priority";

export interface ITaskProps {
    assignee: ITeamMember,
    priority: Priority,
    name: string;
    complete: boolean,
    id: string,
    selectTask: (task: ITask) => void;
}
