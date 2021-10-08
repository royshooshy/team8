import { EEmployeeStatus } from "../../employees-list/employee-status.enum";

export interface IListItem {
  id: string;
  text?: string;
  image?: string;
  selectedState?: number;
  states?: { id: number; value: string }[];
}
