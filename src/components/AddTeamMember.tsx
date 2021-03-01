import React, {Component} from "react";
import {IAddTeamMemberProps} from "../models/IAddTeamMemberProps";
import {IAddTeamMemberState} from "../models/IAddTeamMemberState";
import {ITeamMember} from "../models/ITeamMember";
import { Guid } from "guid-typescript";
import Select from "react-select";
import {ISelectOption} from "../models/ISelectOption";

class AddTeamMember extends Component<IAddTeamMemberProps, IAddTeamMemberState> {
    constructor(props: IAddTeamMemberProps) {
        super(props);
        this.state = {
            name: '',
            color: {
                value: '',
                label: ''
            }
        }
    }

    colorList: ISelectOption[] = this.populateColorsList();

    handleTeamMemberData = (e: React.FormEvent<HTMLInputElement>) => {
        const name  = e.currentTarget.value
        this.setState({ name });
    };

    populateColorsList(): ISelectOption[] {
        const colorList: ISelectOption[] = [];
        colorList.push({label: 'Blue', value: 'darkblue'})
        colorList.push({label: 'Purple', value: 'rebeccapurple'})
        colorList.push({label: 'Green', value: 'darkgreen'})
        colorList.push({label: 'Maroon', value: 'maroon'})
        colorList.push({label: 'Indigo', value: 'indigo'})
        return  colorList;
    }

    addNewTeamMember = (e: React.FormEvent) => {
        e.preventDefault();
        const teamMember: ITeamMember = {
            name: this.state.name,
            color: this.state.color.value,
            id: Guid.create().toString()
        }
        this.props.addTeamMember(teamMember)
    };

    handleColorChange = (event: any) => {
        const color = event;
        this.setState({ color });
    };

    handleCancel = (e: any) => {
        this.props.cancelAddTeamMember(false);
    }

    render() {

        return (
            <div className="AddTeamMember">
                <h3>Add New Team Member</h3>
                <form className="pa4 black-80">
                    <div className="measure">
                        <label htmlFor="name" className="f6 b db mb2">Name</label>
                        <input id="name" className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text"
                               onChange={this.handleTeamMemberData}/>
                    </div>
                    <div className="measure">
                        <label htmlFor="color" className="f6 b db mb2">Color</label>
                        <Select
                            value={this.state.color}
                            onChange={this.handleColorChange}
                            options={this.colorList}
                        />
                    </div>
                    <div className="mt6">
                        <div className="cf">
                            <div className="fl w-50 tc">
                                <button disabled={this.state.name === '' || this.state.color.label === ''} className="ff6 link dim ba bw1 ph3 pv2 mb2 dib black" onClick={this.addNewTeamMember}>
                                    Save
                                </button>
                            </div>
                            <div className="fl w-50 tc">
                                <button className="ff6 link dim ba bw1 ph3 pv2 mb2 dib black" onClick={this.handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddTeamMember;
