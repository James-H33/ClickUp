import { IStatus } from "./status.interface";
import { ISubtask } from "./subtasks.interface";
import { ITask } from "./task.interface";

export interface IBoard {
  id: string;
  name: string;
  statuses: IStatus[];
  tasks: ITask[];
  subtasks: ISubtask[];
}
