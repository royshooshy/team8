import axios from "axios";
import { useEffect, useState } from "react";
import { IEmployee } from "./employee.interface";
import configData from "../config.json";
import { IListItem } from "../Component/list-item/list-item.interface";
import { EEmployeeStatus } from "./employee-status.enum";
import List from "../Component/list/List";

function EmployeesList() {
  useEffect(() => {
    const getEmployyees = async () => {
      const result = await axios.get<IEmployee[]>(
        `${configData.SERVER_URL}/employees`
      );
      setEmployees(result.data);
      setListItems(
        result.data.map((emp) => {
          return {
            id: emp.id,
            text: emp.name,
            // image
            selectedState: {
              key: emp.status,
              value: EEmployeeStatus[emp.status],
            },
            // states
          };
        })
      );
    };
    getEmployyees();
  }, []);

  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [listItems, setListItems] = useState<IListItem[]>([]);

  return (
    <div>
      <List items={[...listItems]}></List>
    </div>
  );
}

export default EmployeesList;
