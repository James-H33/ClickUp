import { createSelector } from "@ngrx/store";
import { IAppState } from "../app-state";

export const selectBoard = (s: IAppState) => s.board;

export const selectBoardState = createSelector(
  selectBoard,
  (s) => s.board
)

export const selectStatuses = createSelector(
  selectBoard,
  (s) => s?.board?.statuses ?? []
)

export const selectIsEditing = createSelector(
  selectBoard,
  (s) => s?.isEditingTask
)

export const selectTasksWithStatus = createSelector(
  selectBoard,
  (s) => {
    let b = s?.board;

    if (!b) {
      return [];
    }

    return b.statuses.map(status => {
      const tasks =  b.tasks.filter(t => t.statusId === status.id);
      tasks.sort((a, b) => a.position - b.position);
      return {
        ...status,
        tasks
      }
    });
  }
)

export const selectTasksByStatus = (statusId: string) => createSelector(
  selectBoard,
  (s) => {
    let b = s?.board;

    if (!b) {
      return [];
    }

    const tasks =  b.tasks.filter(c => c.statusId === statusId);
    tasks.sort((a, b) => a.position - b.position);

    return tasks;
  }
)

export const selectActiveEditTask = createSelector(
  selectBoard,
  (s) => {
    let { editingTaskId } = s;
    let tasks = s.board.tasks;

    let task = tasks.find(c => c.id === editingTaskId);

    return task;
  }
)

export const selectActiveEditStatus = createSelector(
  selectBoard,
  (s) => {
    let { editingStatusId } = s;

    let status = s.board.statuses.find(c => c.id === editingStatusId);

    return status;
  }
)
