import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface IUser {
  color: string;
  email: string;
  id: number;
  initials: string;
  profilePicture: string;
  username: string;
  workspaces: { id: string, name: string }[];
}

export interface IUserState {
  user: IUser;
  isLoading: boolean;
}

export const initialState: IUserState = {
  user: {
    color: "#1b5e20",
    email: "",
    id: 0,
    initials: "",
    profilePicture: null,
    username: "",
    workspaces: []
  },
  isLoading: true
}

export const userReducer = createReducer(

  initialState,

  on(UserActions.GetUserSuccess, (s, { user }) => {
    return {
      ...s,
      user,
      isLoading: false
    };
  }),

  on(UserActions.SetUser, (s, { user }) => {
    return {
      ...user
    };
  })
)
