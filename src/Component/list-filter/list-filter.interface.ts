import { EEmployeeStatus } from "../../employees-list/employee-status.enum";

export interface IListFilter {
  searchString?: string;
  selectedState?: number;
  states?: { id: number; value: string }[];
}
