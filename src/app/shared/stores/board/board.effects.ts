import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, delay, map, of, switchMap } from "rxjs";
import { MockBoardData } from "src/app/features/views/board-view/mock-board-data";
import { IBoard } from "../../models";
import { makeGuid } from "../../utils/make-guid";
import { IAppState } from "../app-state";
import * as BoardActions from "./board.actions";
import { selectBoardState } from "./board.selector";

const modelVersion = '1.0';
const modelVersionKey = 'ClickUpModelVersion';

const loadStarterBoard = () => {
  return of({
    id: makeGuid(),
    name: 'Board 1',
    statuses: MockBoardData
  }).pipe(delay(200));
}

const loadBoards = () => {
  let json = localStorage.getItem('board');
  let board = JSON.parse(json);

  return of(board).pipe(delay(200));
}

@Injectable()
export class BoardEffects {

  constructor(
    private store: Store<IAppState>,
    private actions$: Actions
  ) { }

  getBoard$ = createEffect(() => this.actions$
    .pipe(
      ofType(BoardActions.LoadBoard),
      switchMap(() => {
        return this.loadBoards()
          .pipe(
            map((board: any) => {
              return BoardActions.LoadBoardSuccess({ board })
            }),
            catchError(() => of({ type: 'error' }))
          )
      })
    ))

  saveBoard$ = createEffect(() => this.actions$
    .pipe(
      ofType(BoardActions.MoveTaskToNewStatus, BoardActions.MoveTaskWithinStatus, BoardActions.AddTask),
      switchMap(() => {
        return this.store.select(selectBoardState)
          .pipe(
            map((board: any) => {
              localStorage.setItem('board', JSON.stringify(board));
              return board;
            })
          )
      }),
      map((b: IBoard) => BoardActions.SaveBoardToStorageSuccess({ board: b }))
    ))

  private loadBoards() {
    return loadBoards()
      .pipe(
        switchMap((board: IBoard) => {
          let version = localStorage.getItem(modelVersionKey);

          if (version !== modelVersion || !board) {
            localStorage.setItem(modelVersionKey, modelVersion);
            localStorage.removeItem('board');
            return loadStarterBoard();
          }

          return of(board);
        })
      )
  }
}
