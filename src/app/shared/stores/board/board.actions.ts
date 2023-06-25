import { createAction, props } from "@ngrx/store";
import { IBoard, IBoardColumn, ITask } from "../../models";

const LoadBoard = createAction(
  '[Board] Load Board'
);

const LoadBoardSuccess = createAction(
  '[Board] Load Board Success',
  props<{ board: IBoard }>()
)

const UpdateBoard = createAction(
  '[Board] Update Board',
  props<{ board: IBoard }>()
)

const UpdateBoardSuccess = createAction(
  '[Board] Update Board Success'
)

const MoveTaskWithinColumn  = createAction(
  '[Board] Move Task Within Column',
  props<{ column: IBoardColumn, previousIndex: number, nextIndex: number }>()
);

const MoveTaskToNewColumn  = createAction(
  '[Board] Move Task to New Column',
  props<{  prev: IBoardColumn, target: IBoardColumn, task: ITask, insertIndex: number }>()
);

const SaveBoardToStorage  = createAction(
  '[Board] Save Board to Storage'
);

const SaveBoardToStorageSuccess  = createAction(
  '[Board] Save Board to Storage Success'
);

const AddTask = createAction(
  '[Board] Add Task',
  props<{ column: IBoardColumn, task: ITask, position: string }>()
);

const SetEditTask = createAction(
  '[Board] Set Edit Task',
  props<{ column: IBoardColumn, task: ITask }>()
);

const CloseEditTask = createAction(
  '[Board] Close Edit Task'
);

export const BoardActions = {
  LoadBoard,
  LoadBoardSuccess,
  UpdateBoard,
  UpdateBoardSuccess,
  SaveBoardToStorage,
  SaveBoardToStorageSuccess,
  MoveTaskWithinColumn,
  MoveTaskToNewColumn,
  AddTask,
  SetEditTask,
  CloseEditTask
}
