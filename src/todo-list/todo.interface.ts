import { ETodoStatus } from "./todo-status.enum";

export interface ITodo{
    id:string,
    name:string,
    status:ETodoStatus
}