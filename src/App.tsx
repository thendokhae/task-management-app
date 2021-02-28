import React, {Dispatch} from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import './App.css';
import { TaskManagerState} from "./type";
import {ITeamMember} from "./models/ITeamMember";
import {connect} from "react-redux";
import {ITask} from "./models/ITask";
import TaskList from "./components/TaskList";
import TeamMemberList from "./components/TeamMemberList";
import {ISelectOption} from "./models/ISelectOption";
import {addTask, addTeamMember, filterTasks, showAddNewTask, showAddNewTeamMember} from "./store/actionsCreators";
import AddTeamMember from "./components/AddTeamMember";
import AddTask from "./components/AddTask";
import {Priority} from "./models/Priority";


function getAssigneeOption(assigneeList: ITeamMember[]): ISelectOption[]{
  const result: ISelectOption[] = [];
  assigneeList.forEach(a => {
    result.push({ label: a.name, value: a});
  })
  return result;
}

function getPriorityOptionsList():ISelectOption[] {
  const result: ISelectOption[] = [];
  result.push({label: "Low", value: Priority.LOW})
  result.push({label: "Medium", value: Priority.MEDIUM})
  result.push({label: "High", value: Priority.HIGH})
  result.push({label: "Critical", value: Priority.CRITICAL})
  return result;
}

const App: React.FC = () =>  {
  const assigneeList: ITeamMember[] = useSelector(
      (state: TaskManagerState) => state.assigneeList,
      shallowEqual
  );

  const taskList: ITask[] = useSelector(
      (state: TaskManagerState) => state.taskList,
      shallowEqual
  );

  const selectedAssignee: ISelectOption = useSelector(
      (state: TaskManagerState) => state.selectedAssignee,
      shallowEqual
  );

  const displayAddNewTeamMember: boolean = useSelector(
      (state: TaskManagerState) => state.showAddNewTeamMember,
      shallowEqual
  );

  const displayAddNewTask: boolean = useSelector(
      (state: TaskManagerState) => state.showAddNewTask,
      shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const filterTeamMember = React.useCallback(
      (selectedOption: any) => dispatch(filterTasks(selectedOption.value)),
      [dispatch]
  );

  const addNewTeamMember = React.useCallback(
      (teamMember: ITeamMember) => dispatch(addTeamMember(teamMember)),
      [dispatch]
  );

  const dispatchAddNewTeam = (team: ITeamMember): void => addNewTeamMember(team);

  const dispatchFilterTasks = (selectedAssignee: ISelectOption): void => filterTeamMember(selectedAssignee);

  const dispatchShowAddNewTeamMember = (): void => handleShowAddNewTeamMember();

  const handleAddTeam = (teamMember: ITeamMember) => {
    dispatchAddNewTeam(teamMember);
    dispatchFilterTasks(selectedAssignee);
    dispatchShowAddNewTeamMember();
  }

  const addNewTask = React.useCallback(
      (task: ITask) => dispatch(addTask(task)),
      [dispatch]
  );

  const handleShowAddNewTeamMember = React.useCallback(
      () => dispatch(showAddNewTeamMember(displayAddNewTeamMember)),
      [dispatch]
  );

  const handleShowAddNewTask = React.useCallback(
      () => dispatch(showAddNewTask(displayAddNewTask)),
      [dispatch]
  );

  const blankSpaceClicked = (): void => handleShowAddNewTask();

  const handleAddClick = (
  ): void => handleShowAddNewTeamMember()

  const onPageClick = (event: any) => {
    console.log('event', event);
    if (event.target.innerText && event.target.innerText.includes("My Task Manager")) {
        blankSpaceClicked();
    }
  }


  return (
      <main className="App" onClick={onPageClick}>
        <article className="cf">
          <div className="fl w-60 tc">
            <h1>My Task Manager</h1>
          </div>
          <div className="fl w-40 tc ButtonAlign">
            <div className="cf">
              <div className="fl w-60 tc">
                <TeamMemberList selectOptions={getAssigneeOption(assigneeList)} selectedOption={selectedAssignee} filterTeamMember={filterTeamMember}/>
              </div>
              <div className="fl w-40 tc">
                <button className="ff6 link dim ba bw1 ph3 pv2 mb2 dib black" onClick={handleAddClick}>Add</button>
              </div>
            </div>
          </div>
        </article>
        <div className="cf Container">
          <div className="fl w-80 tc">
            <TaskList taskList={taskList}/>
          </div>
          <div className="fl w-20 tc">
            {displayAddNewTeamMember ?
                <AddTeamMember addTeamMember={handleAddTeam}/>: ''}
                <br/>
            {displayAddNewTask ?
                <AddTask addTask={addNewTask} assigneeOptions={getAssigneeOption(assigneeList)} priorityOptions={getPriorityOptionsList()}/>
                : ''}
          </div>

        </div>
      </main>
  );
}

export default App;
