import axios from "axios";
import { useEffect, useState } from "react";
import { IEmployee } from "./employee.interface";
import configData from "../config.json";
import { IListItem } from "../Component/list-item/list-item.interface";
import { EEmployeeStatus } from "./employee-status.enum";
import List from "../Component/list/List";
import { IEmployeeStatus } from "./employee-status.interface";
import ListFilter from "../Component/list-filter/list-filter";
import ListItemEdit from "../Component/list-item/list-item-edit";

function EmployeesList() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [listItems, setListItems] = useState<IListItem[]>([]);
  const [empStatuses, setEmpStatuses] = useState<
    { id: number; value: string }[]
  >([]);
  useEffect(() => {
    const getEmployyees = axios.get<IEmployee[]>(
      `${configData.SERVER_URL}/employees`
    );
    const getEmployeeStatuses = axios.get<IEmployeeStatus[]>(
      `${configData.SERVER_URL}/employees-statuses`
    );
    Promise.all([getEmployyees, getEmployeeStatuses]).then(
      ([employees, statuses]) => {
        debugger
        setEmployees(employees.data);
        setListItems(
          employees.data.map((emp) => {
            return {
              id: emp.id,
              text: emp.name,
              // image
              selectedState: emp.status,
              states: statuses.data.map((s) => {
                return { id: s.id, value: s.value };
              }),
            };
          })
        );

        setEmpStatuses(
          statuses.data.map((s) => {
            return { id: s.id, value: s.value };
          })
        );
      }
    );
  }, []);

  const handleEmpStatusChange = (data: IListItem) => {
    const getEmployyees = axios.patch<any>(
      `${configData.SERVER_URL}/employees/${data.id}`,
      { status: data.selectedState }
    );
    getEmployyees.then((data) => {});
  };

  const handleFilterChange = (data: {
    str: string;
    status: { id: number; value: string };
  }) => {
    setListItems(
      employees
      .filter((e) => {
        if (data.status.id !== -1) {
          return e.status === data.status.id;
        } else {
          return e.status === e.status;
        }
      }).filter((e) => {
        if (data.str !== "") {
          return e.name.toLowerCase().includes(data.str.toLowerCase());
        } else {
          return e.name === e.name;
        }
      })
      .map((emp) => {
        return {
          id: emp.id,
          text: emp.name,
          // image
          selectedState: emp.status,
          states: empStatuses.map((s) => {
            return { id: s.id, value: s.value };
          }),
        };
      })
    );

  
  };

  const handleCreateUser = (data: IListItem) => {
  
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
              Employees
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-info is-outlined">Log Out</button>
            </div>
          </div>
        </div>
      </nav>
      <div className="has-background-grey-lighter">
        <div className="container">
          <div className="section mt-6">
            <ListFilter
              data={{
                statuses: [...empStatuses],
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
                onStatusChange: handleEmpStatusChange,
              }}
            ></List>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeesList;
