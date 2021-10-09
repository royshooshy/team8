import React from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import 'bulma/css/bulma.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import EmployeesList from './employees-list/employees-list';
import TodoList from './todo-list/todo-list';

ReactDOM.render(
  <React.StrictMode>
   <Router>
    <div>
     

      <Switch>
        <Route path="/employees-list">
          <EmployeesList />
        </Route>
        <Route path="/todo-list">
          <TodoList />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </div>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
