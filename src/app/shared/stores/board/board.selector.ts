import { createSelector } from "@ngrx/store";
import { IAppState } from "../app-state";

export const selectBoard = (s: IAppState) => s.board;

export const selectBoardState = createSelector(
  selectBoard,
  (s) => s.board
)
