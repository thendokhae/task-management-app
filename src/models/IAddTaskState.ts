import {ITeamMember} from "./ITeamMember";
import {Priority} from "./Priority";
import {ISelectOption} from "./ISelectOption";

export interface IAddTaskState {
    name: string,
    selectedAssignee: ISelectOption,
    selectedPriority: ISelectOption
}
