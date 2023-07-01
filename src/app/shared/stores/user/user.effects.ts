import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, delay, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import  * as UserActions from './user.actions';
import { makeGuid } from '../../utils/make-guid';
import { IAppState } from '../app-state';
import { Store } from '@ngrx/store';

function getUser() {
  return of({
    color: "#1b5e20",
    email: "llahwj33@gmail.com",
    id: 48212745,
    initials: "JH",
    profilePicture: null,
    username: "James Hall",
    workspaces: [
      { id: makeGuid(), name: 'Work' },
      { id: makeGuid(), name: 'Personal Growth' },
    ]
  }).pipe(delay(500));
}

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>
  ) { }

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GetUser),
      tap(() => this.store.dispatch(UserActions.IsLoadingUser({ isLoading: true }))),
      exhaustMap(() =>
        getUser()
          .pipe(
            map(user => UserActions.GetUserSuccess({
              user
            })),
            catchError(() => EMPTY)
          ))
      )
  );
}
