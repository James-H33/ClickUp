import { ITask } from "./task.interface";

export interface IStatus {
  id: string;
  name: string;
  color: string;
  tasks: ITask[];
}
