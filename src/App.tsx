import { Link } from "react-router-dom";
import "./App.css";

import List from "./Component/list/List";

function App() {
  return (
    <>
     
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="columns">
              <div className="buttons">
              <Link to="/employees-list" className="button is-primary">Employees List</Link>
              <Link to="/todo-list" className="button is-link">Todo List</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
