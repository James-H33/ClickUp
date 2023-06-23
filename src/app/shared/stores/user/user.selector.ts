import { createSelector } from "@ngrx/store";
import { IAppState } from "../app-state";
import { IUserState } from "./user.reducer";

export const selectUserState = (state: IAppState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state: IUserState) => state.user
);

export const selectIsUserLoading = createSelector(
  selectUserState,
  (state: IUserState) => state.isLoading
);
