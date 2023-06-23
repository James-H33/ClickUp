import { ISharedState } from "./shared/shared.reducer";
import { IUserState } from "./user/user.reducer";

export interface IAppState {
  shared: ISharedState;
  user: IUserState;
}
