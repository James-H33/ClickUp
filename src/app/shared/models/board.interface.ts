import { IStatus } from "./status.interface";

export interface IBoard {
  id: string;
  name: string;
  statuses: IStatus[];
}
