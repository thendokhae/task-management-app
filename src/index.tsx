import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Store } from "redux"
import { createLogger } from 'redux-logger'
import thunkMiddleWare from "redux-thunk"
import { Provider } from "react-redux"
import './index.css';
import App from './App';
import "tachyons";
import reportWebVitals from './reportWebVitals';
import {taskManagerReducer} from "./store/reducers"
import {TaskActionTypes, TaskManagerState} from "./type";

const logger = createLogger();
const store: Store<TaskManagerState, TaskActionTypes> =
    createStore(taskManagerReducer, applyMiddleware(thunkMiddleWare, logger))

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
