import { IBoardState } from "./board/board.reducer";
import { ISharedState } from "./shared/shared.reducer";
import { IUserState } from "./user/user.reducer";

export interface IAppState {
  shared: ISharedState;
  user: IUserState;
  board: IBoardState;
}
