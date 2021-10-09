import axios from "axios";
import { useEffect, useState } from "react";
import {  ITodo } from "./todo.interface";
import configData from "../config.json";
import { IListItem } from "../Component/list-item/list-item.interface";
import List from "../Component/list/List";
import { ITodoStatus } from "./todo-status.interface";
import ListFilter from "../Component/list-filter/list-filter";
import { Link } from "react-router-dom";

function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [listItems, setListItems] = useState<IListItem[]>([]);
  const [todosStatuses, setTodoStatuses] = useState<
    { id: number; value: string }[]
  >([]);
  useEffect(() => {
    const getTodos = axios.get<ITodo[]>(
      `${configData.SERVER_URL}/todos`
    );
    const getTodoStatuses = axios.get<ITodoStatus[]>(
      `${configData.SERVER_URL}/todos-statuses`
    );
    Promise.all([getTodos, getTodoStatuses]).then(
      ([todos, statuses]) => {
        setTodos(todos.data);
        setListItems(
          todos.data.map((todo) => {
            return {
              id: todo.id,
              text: todo.name,
              // image
              selectedState: todo.status,
              states: statuses.data.map((s) => {
                return { id: s.id, value: s.value };
              }),
            };
          })
        );

        setTodoStatuses(
          statuses.data.map((s) => {
            return { id: s.id, value: s.value };
          })
        );
      }
    );
  }, []);

  const handleTodoStatusChange = (data: IListItem) => {
    const gettodos = axios.patch<any>(
      `${configData.SERVER_URL}/todos/${data.id}`,
      { status: data.selectedState }
    );
    gettodos.then((data) => {});
  };

  const handleFilterChange = (data: {
    str: string;
    status: { id: number; value: string };
  }) => {
    setListItems(
      todos
        .filter((e) => {
          if (data.status.id !== -1) {
            return e.status === data.status.id;
          } else {
            return e.status === e.status;
          }
        })
        .filter((e) => {
          if (data.str !== "") {
            return e.name.toLowerCase().includes(data.str.toLowerCase());
          } else {
            return e.name === e.name;
          }
        })
        .map((todo) => {
          return {
            id: todo.id,
            text: todo.name,
            // image
            selectedState: todo.status,
            states: todosStatuses.map((s) => {
              return { id: s.id, value: s.value };
            }),
          };
        })
    );
  };

  const handleCreateUser = (data: IListItem) => {
    axios
      .post<any>(`${configData.SERVER_URL}/todos`, {
        name: data.text,
        status: data.selectedState ? +data.selectedState : 1,
      })
      .then((todo) => {
        const newTodos = [...todos, todo.data as ITodo];
        setTodos(newTodos);
        setListItems(
          newTodos.map((todo) => {
            return {
              id: todo.id,
              text: todo.name,
              // image
              selectedState: todo.status,
              states: todosStatuses.map((s) => {
                return { id: s.id, value: s.value };
              }),
            };
          })
        );
      });
  };

  return (
    <>
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-start">
          <div className="navbar-item">
            <div className="is-family-primary has-text-weight-bold has-text-info is-size-3">
              Todo's
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
            <Link to="/" className="button is-info is-outlined">Log Out</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="has-background-grey-lighter">
        <div className="container">
          <div className="section mt-6">
            <ListFilter
              data={{
                statuses: [...todosStatuses],
                onFilterChange: handleFilterChange,
                onCreateUser: handleCreateUser,
              }}
            ></ListFilter>
          </div>
        </div>
        <div className="container pt-0">
          <div className="section pt-0">
            <List
              data={{
                items: [...listItems],
                onStatusChange: handleTodoStatusChange,
              }}
            ></List>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
