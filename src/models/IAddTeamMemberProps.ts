import {ITeamMember} from "./ITeamMember";

export interface IAddTeamMemberProps {
    addTeamMember: (teamMember: ITeamMember) => void,
    cancelAddTeamMember: (cancel: boolean) => void;
}
