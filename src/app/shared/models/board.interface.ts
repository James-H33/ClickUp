import { IStatus } from "./status.interface";
import { ITask } from "./task.interface";

export interface IBoard {
  id: string;
  name: string;
  statuses: IStatus[];
  tasks: ITask[];
}
