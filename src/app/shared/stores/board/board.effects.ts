import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, delay, map, of, switchMap } from "rxjs";
import { IAppState } from "../app-state";
import { BoardActions } from "./board.actions";
import { selectBoardState } from "./board.selector";
import { MockBoardData } from "src/app/features/views/board-view/mock-board-data";
import { makeGuid } from "../../utils/make-guid";
import { IBoard } from "../../models";

const loadBoardInitialBoards = () => {
  return of({
    id: makeGuid(),
    name: 'Board 1',
    columns: MockBoardData
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
      ofType(BoardActions.MoveTaskToNewColumn, BoardActions.MoveTaskWithinColumn, BoardActions.AddTask),
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
          if (!board) {
            return loadBoardInitialBoards();
          }

          return of(board);
        })
      )
  }
}
