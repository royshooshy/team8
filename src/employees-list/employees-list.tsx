import axios from "axios";
import { useEffect, useState } from "react";
import { IEmployee } from "./employee.interface";
import configData from "../config.json";
import { IListItem } from "../Component/list-item/list-item.interface";
import { EEmployeeStatus } from "./employee-status.enum";
import List from "../Component/list/List";
import { IEmployeeStatus } from "./employee-status.interface";

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
    <div>
      <List
        data={{ items: [...listItems], onStatusChange: handleStatusChange }}
      ></List>
    </div>
  );
}

export default EmployeesList;
