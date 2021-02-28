import {ISelectOption} from "./ISelectOption";

export interface ITeamMemberProps {
    selectOptions: ISelectOption[],
    selectedOption: any,
    filterTeamMember: (selectedOption: any) => void;
}
