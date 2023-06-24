import { ITask } from "./task.interface";

export interface IBoardColumn {
  id: string;
  name: string;
  color: string;
  tasks: ITask[];
}
