import { IBoardColumn } from "./board-column.interface";

export interface IBoard {
  id: string;
  name: string;
  columns: IBoardColumn[];
}