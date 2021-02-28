import React, {Component} from "react";
import {ITeamMemberProps} from "../models/ITeamMemberProps";
import {ITeamMemberState} from "../models/ITeamMemberState";
import Select from "react-select";
import {ITaskListProps} from "../models/ITaskListProps";

class TeamMemberList extends Component<ITeamMemberProps, ITeamMemberState>{

    constructor(props: ITeamMemberProps) {
        super(props);
        this.state = {
            selectedOption: {
                value: {
                    color: '',
                    id: '',
                    name: ''
                },
                label: ''
            }
        };
    }

    componentDidMount() {
        const { selectedOption} = this.props;
        this.setState({ selectedOption });
    }

    componentDidUpdate(prevProps: ITeamMemberProps) {
        if (prevProps.selectedOption !== this.props.selectedOption) {
            const {selectedOption} = this.props;
            this.setState({selectedOption})
        }
    }

    handleChange = (event: any) => {
        const selectedOption = event;
        this.setState({ selectedOption });
        this.props.filterTeamMember(selectedOption);
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={this.props.selectOptions}
            />
        );
    }
}

export default TeamMemberList;
