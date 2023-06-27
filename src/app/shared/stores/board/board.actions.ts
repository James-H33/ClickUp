import { createAction, props } from "@ngrx/store";
import { IBoard, IStatus, ITask } from "../../models";

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
  props<{ column: IStatus, previousIndex: number, nextIndex: number }>()
);

const MoveTaskToNewColumn  = createAction(
  '[Board] Move Task to New Column',
  props<{  prev: IStatus, target: IStatus, task: ITask, insertIndex: number }>()
);

const SaveBoardToStorage  = createAction(
  '[Board] Save Board to Storage'
);

const SaveBoardToStorageSuccess  = createAction(
  '[Board] Save Board to Storage Success',
  props<{ board: IBoard }>()
);

const AddTask = createAction(
  '[Board] Add Task',
  props<{ column: IStatus, task: ITask, position: string }>()
);

const SetEditTask = createAction(
  '[Board] Set Edit Task',
  props<{ column: IStatus, task: ITask }>()
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
  CloseEditTask,
}
