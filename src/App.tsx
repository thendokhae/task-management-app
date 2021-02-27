import React, {Dispatch} from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import './App.css';
import { TaskManagerState} from "./type";
import {filterTasks} from "./store/actionsCreators";
import {IAssignee} from "./models/IAssignee";
import {connect} from "react-redux";
import {ITask} from "./models/ITask";
import TaskList from "./components/TaskList";
import AssigneeList from "./components/AssigneeList";
import {ISelectOption} from "./models/ISelectOption";

const mapStateToProps = (state: TaskManagerState) => {
  return {
    taskList: state.taskList,
    assigneeList: state.assigneeList,
    selectedAssignee: {
    }
  }
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onFilterList: (assignee: IAssignee) => dispatch(filterTasks(assignee))
  }
};

function getAssigneeOption(assigneeList: IAssignee[]): ISelectOption[]{
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

  const assigneeList: IAssignee[] = useSelector(
      (state: TaskManagerState) => state.assigneeList,
      shallowEqual
  );

  const selectedAssignee: IAssignee = useSelector(
      (state: TaskManagerState) => state.selectedAssignee,
      shallowEqual
  );

  // const dispatch: Dispatch<any> = useDispatch();

  return (
      <main className="App">
        <article className="cf">
          <div className="fl w-60 tc">
            <h1>My Task Manager</h1>
          </div>
          <div className="fl w-40 tc ButtonAlign">
            <div className="cf">
              <div className="fl w-60 tc">
                <AssigneeList selectOptions={getAssigneeOption(assigneeList)} selectedOption={selectedAssignee}/>
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
