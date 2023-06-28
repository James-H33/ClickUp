import { createAction, props } from "@ngrx/store";
import { IBoard, IStatus, ITask } from "../../models";

export const LoadBoard = createAction(
  '[Board] Load Board'
);

export const LoadBoardSuccess = createAction(
  '[Board] Load Board Success',
  props<{ board: IBoard }>()
)

export const UpdateBoard = createAction(
  '[Board] Update Board',
  props<{ board: IBoard }>()
)

export const UpdateBoardSuccess = createAction(
  '[Board] Update Board Success'
)

export const MoveTaskWithinStatus  = createAction(
  '[Board] Move Task Within Status',
  props<{ status: IStatus, previousIndex: number, nextIndex: number }>()
);

export const MoveTaskToNewStatus  = createAction(
  '[Board] Move Task to New Status',
  props<{  prev: IStatus, target: IStatus, task: ITask, insertIndex: number }>()
);

export const SaveBoardToStorage  = createAction(
  '[Board] Save Board to Storage'
);

export const SaveBoardToStorageSuccess  = createAction(
  '[Board] Save Board to Storage Success',
  props<{ board: IBoard }>()
);

export const AddTask = createAction(
  '[Board] Add Task',
  props<{ status: IStatus, task: ITask, position: string }>()
);

export const SetEditTask = createAction(
  '[Board] Set Edit Task',
  props<{ status: IStatus, task: ITask }>()
);

export const CloseEditTask = createAction(
  '[Board] Close Edit Task'
);
