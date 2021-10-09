
import { Link } from 'react-router-dom';
import './App.css';

import List from './Component/list/List';

function App() {
  return (
    <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/employees-list">Employees List</Link>
      </li>
      <li>
        <Link to="/todo-list">Todo List</Link>
      </li>
    </ul>
  </nav>
  );
}

export default App;
