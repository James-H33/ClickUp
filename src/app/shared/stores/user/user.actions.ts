import { createAction, props } from "@ngrx/store";
import { IUser, IUserState } from "./user.reducer";

export const SetUser = createAction(
  '[User] Set User',
    props<{ user: IUserState }>()
)

export const GetUser = createAction(
  '[User] Get User',
    props<{ id: number }>()
)

export const UserLoaded = createAction(
  '[User] Loading User',
    props<{ user: IUser }>()
)

export const IsLoadingUser = createAction(
  '[User] Is Loading User',
  props<{ isLoading: boolean }>()
)

export const UserActions = {
  GetUser,
  SetUser,
  UserLoaded,
  IsLoadingUser
}
