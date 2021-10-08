import { EEmployeeStatus } from "./employee-status.enum";

export interface IEmployee{
    id:string,
    name:string,
    status:EEmployeeStatus
}