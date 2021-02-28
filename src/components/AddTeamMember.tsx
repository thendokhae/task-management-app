import React, {Component} from "react";
import {IAddTeamMemberProps} from "../models/IAddTeamMemberProps";
import {IAddTeamMemberState} from "../models/IAddTeamMemberState";
import {ITeamMember} from "../models/ITeamMember";
import { Guid } from "guid-typescript";
import * as Utils from "../utils/Utilities";

class AddTeamMember extends Component<IAddTeamMemberProps, IAddTeamMemberState> {
    constructor(props: IAddTeamMemberProps) {
        super(props);
        this.state = {
            name: ''
        }
    }

    handleTeamMemberData = (e: React.FormEvent<HTMLInputElement>) => {
        const name  = e.currentTarget.value
        this.setState({ name });
    };

    addNewTeamMember = (e: React.FormEvent) => {
        e.preventDefault();
        const teamMember: ITeamMember = {
            name: this.state.name,
            color: Utils.generateRandomColor(),
            id: Guid.create().toString()
        }
        this.props.addTeamMember(teamMember)
    };

    render() {

        return (
            <div className="AddTeamMember">
                <h3>Add New Team Member</h3>
                <form onSubmit={this.addNewTeamMember} className="pa4 black-80">
                    <div className="measure">
                        <label htmlFor="name" className="f6 b db mb2">Name</label>
                        <input id="name" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text"
                               onChange={this.handleTeamMemberData}/>
                    </div>
                    <div className="mt3">
                        <button disabled={this.state.name === ''} className="ff6 link dim ba bw1 ph3 pv2 mb2 dib black">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddTeamMember;
