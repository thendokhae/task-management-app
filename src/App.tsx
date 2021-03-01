import React, {Dispatch} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import './App.css';
import {TaskManagerState} from "./type";
import {ITeamMember} from "./models/ITeamMember";
import {ITask} from "./models/ITask";
import TaskList from "./components/TaskList";
import TeamMemberList from "./components/TeamMemberList";
import {ISelectOption} from "./models/ISelectOption";
import {
  addTask,
  addTeamMember,
  filterTasks,
  searchTask,
  selectTask,
  showAddNewTask,
  showAddNewTeamMember,
  updateTask
} from "./store/actionsCreators";
import AddTeamMember from "./components/AddTeamMember";
import AddTask from "./components/AddTask";
import {Priority} from "./models/Priority";
import SearchTask from "./components/SearchTask";


function getAssigneeOption(assigneeList: ITeamMember[]): ISelectOption[]{
  const result: ISelectOption[] = [];
  assigneeList.forEach(a => {
    result.push({ label: a.name, value: a});
  })
  return result;
}

function getAssigneeListOptions(assigneeList: ITeamMember[]): ISelectOption[]{
  const result: ISelectOption[] =[];
  assigneeList.forEach(a => {
    if (a.id !== "-1") {
      result.push({label: a.name, value: a});
    }
  })
  return result;
}

function getPriorityOptionsList():ISelectOption[] {
  const result: ISelectOption[] = [];
  result.push({label: "Low", value: Priority.LOW})
  result.push({label: "Medium", value: Priority.MEDIUM})
  result.push({label: "High", value: Priority.HIGH})
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

  const selectedTask: ITask = useSelector(
      (state: TaskManagerState) => state.selectedTask,
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

  const dispatchShowAddNewTeamMember = (show: boolean): void => handleShowAddNewTeamMember(show);

  const dispatchShowAddNewTask = (show: boolean): void => handleShowAddNewTask(show);

  const dispatchSelectTask = (task: ITask): void => handleSelectTask(task);

  const dispatchUpdateTask = (task: ITask): void => handleUpdateTask(task);

  const handleAddTeam = (teamMember: ITeamMember) => {
    dispatchAddNewTeam(teamMember);
    dispatchShowAddNewTeamMember(false);
  }

  const dispatchSaveTask = (task: ITask): void => addNewTask(task);

  const handleAddNewTask =(task: ITask) => {
    dispatchSaveTask(task);
    dispatchShowAddNewTask(false);
  }

  const addNewTask = React.useCallback(
      (task: ITask) => dispatch(addTask(task)),
      [dispatch]
  );

  const handleShowAddNewTeamMember = React.useCallback(
      (show) => dispatch(showAddNewTeamMember(show)),
      [dispatch]
  );

  const handleShowAddNewTask = React.useCallback(
      (show) => dispatch(showAddNewTask(show)),
      [dispatch]
  );

  const handleSelectTask = React.useCallback(
      (task) => dispatch(selectTask(task)),
      [dispatch]
  );

  const handleUpdateTask = React.useCallback(
      (task) => dispatch(updateTask(task)),
      [dispatch]
  );

  const handleTaskSearch = React.useCallback(
      (text) => dispatch(searchTask(text)),
      [dispatch]
  );


  const onTaskSelect = (task: ITask) => {
    dispatchSelectTask(task);
    blankSpaceClicked(true);
  }

  const onCompleteTask =(task: ITask) => {
    dispatchUpdateTask(task)
    blankSpaceClicked(false);
  }

  const blankSpaceClicked = (show: boolean): void => handleShowAddNewTask(show);

  const onAddTeamMemberClick =()=> {
    handleAddClick(true);
  }

  const handleAddClick = (show: boolean): void => handleShowAddNewTeamMember(show)

  const onPageClick = (event: any) => {
    if (event.target.firstChild && event.target.firstChild.classList
        && event.target.firstChild.classList.length > 0
        && !event.target.firstChild.classList.contains("css-1uccc91-singleValue")
        && !event.target.firstChild.classList.contains("css-tj5bde-Svg")) {
      dispatchSelectTask({
        assignee: {name: '', id: '', color: ''},
        priority: Priority.LOW,
        name: '',
        complete: false,
        id: ''
      });
      blankSpaceClicked(true);
    }
  }

  const onCancelAddTask = (show: boolean) => handleShowAddNewTask(show);

  const onCancelAddTeamMember = (show: boolean): void => handleShowAddNewTeamMember(show);


  return (
      <main className="App" onClick={onPageClick}>
        <article className="cf">
          <div className="fl w-60 tc">
            <h1>Sticky Scheduler</h1>
          </div>
          <div className="fl w-40 tc ButtonAlign">
            <div className="cf">
              <div className="fl w-60 tc">
                <TeamMemberList selectOptions={getAssigneeOption(assigneeList)} selectedOption={selectedAssignee} filterTeamMember={filterTeamMember}/>
              </div>
              <div className="fl w-40 tc">
                <button className="ff6 link dim ba bw1 ph3 pv2 mb2 dib black" onClick={onAddTeamMemberClick}>Add</button>
              </div>
            </div>
          </div>
        </article>
        <div className="tc">
          <SearchTask searchTask={handleTaskSearch}/>
        </div>
        <div className="cf Container">
          <div className="fl w-80 tc">
            <TaskList taskList={taskList} selectTask={onTaskSelect} completeTask={onCompleteTask}/>
          </div>
          <div className="fl w-20 tc">
            {displayAddNewTeamMember ?
                <AddTeamMember addTeamMember={handleAddTeam} cancelAddTeamMember={onCancelAddTeamMember}/>: ''}
                <br/>
            {displayAddNewTask ?
                <AddTask addTask={handleAddNewTask} assigneeOptions={getAssigneeListOptions(assigneeList)}
                         priorityOptions={getPriorityOptionsList()} task={selectedTask} cancelAddTask={onCancelAddTask}/>
                : ''}
          </div>

        </div>
      </main>
  );
}

export default App;
