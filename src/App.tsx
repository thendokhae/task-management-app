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
import {filterTasks} from "./store/actionsCreators";


function getAssigneeOption(assigneeList: ITeamMember[]): ISelectOption[]{
  const result: ISelectOption[] = [];
  assigneeList.forEach(a => {
    result.push({ label: a.name, value: a});
  })
  return result;
}

const App: React.FC = () =>  {
  const taskList: ITask[] = useSelector(
      (state: TaskManagerState) => state.taskList,
      shallowEqual
  );

  const assigneeList: ITeamMember[] = useSelector(
      (state: TaskManagerState) => state.assigneeList,
      shallowEqual
  );

  const selectedAssignee: ISelectOption = useSelector(
      (state: TaskManagerState) => state.selectedAssignee,
      shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  const filterTeamMember = React.useCallback(
      (selectedOption: any) => dispatch(filterTasks(selectedOption.value)),
      [dispatch]
  );

  return (
      <main className="App">
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
                <a className="ff6 link dim ba bw1 ph3 pv2 mb2 dib black">Add</a>
              </div>
            </div>
          </div>
        </article>
        <TaskList taskList={taskList}/>
      </main>
  );
}

export default App;
