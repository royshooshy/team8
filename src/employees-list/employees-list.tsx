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
  useEffect(() => {
    const getEmployyees = axios.get<IEmployee[]>(
      `${configData.SERVER_URL}/employees`
    );
    const getEmployeeStatuses = axios.get<IEmployeeStatus[]>(
      `${configData.SERVER_URL}/employees-statuses`
    );
    Promise.all([getEmployyees, getEmployeeStatuses]).then(
      ([employees, statuses]) => {
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
      }
    );
  }, []);

  const handleStatusChange = (data: IListItem) => {
    const getEmployyees = axios.patch<any>(
      `${configData.SERVER_URL}/employees/${data.id}`,
      { status: data.selectedState }
    );
    getEmployyees.then((data) => {});
  };
  return (
    <>
      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
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
        <ListFilter></ListFilter>
        </div>
        </div>
        <div className="container pt-0">
       <div className="section pt-0">
        <List
          data={{ items: [...listItems], onStatusChange: handleStatusChange }}
        ></List>
        </div>
        </div>
      </div>
     
    
      <div className="modal  has-background-grey-lighter">
  <div className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Create New User</p>
      <button className="delete" aria-label="close"></button>
    </header>
    <section className="modal-card-body">
     
    </section>
    <footer className="modal-card-foot">
      <button className="button is-info">Create</button>
      <button className="button">Cancel</button>
    </footer>
  </div>
</div>
    </>
  );
}

export default EmployeesList;
