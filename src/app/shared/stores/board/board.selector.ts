import { createSelector, select } from "@ngrx/store";
import { IAppState } from "../app-state";
import { IStatus, ITask } from "../../models";

export const selectBoard = (s: IAppState) => s.board;

export const selectBoardState = createSelector(
  selectBoard,
  (s) => s.board
)

export const selectStatuses = createSelector(
  selectBoardState,
  (b) => b?.statuses ?? []
)

export const selectTasks = createSelector(
  selectBoardState,
  (b) => b?.tasks ?? []
)

export const selectSubtasks = createSelector(
  selectBoardState,
  (b) => b?.subtasks ?? []
)

export const selectIsEditing = createSelector(
  selectBoard,
  (s) => s?.isEditingTask
)

export const selectAllStatusesWithTheirTasks = createSelector(
  selectStatuses,
  selectTasks,
  (statuses: IStatus[], tasks: ITask[]) => {
    return statuses.map(status => {
      const tasksForStatus = tasks.filter(t => t.statusId === status.id);
      tasksForStatus.sort((a, b) => a.position - b.position);

      return {
        ...status,
        tasks: tasksForStatus
      }
    });
  }
)

export const selectTasksByStatus = (statusId: string) => createSelector(
  selectTasks,
  (tasks: ITask[]) => {
    const tasksForStatus = tasks.filter(t => t.statusId === statusId);
    tasks.sort((a, b) => a.position - b.position);

    return tasksForStatus;
  }
)

export const selectActiveEditTask = createSelector(
  selectBoard,
  selectTasks,
  (s, tasks: ITask[]) => {
    let { editingTaskId } = s;
    let task = tasks.find(t => t.id === editingTaskId);

    return { ...task };
  }
)

export const selectActiveEditStatus = createSelector(
  selectBoard,
  selectStatuses,
  (s, statuses: IStatus[]) => {
    let { editingStatusId } = s;
    let status = statuses.find(c => c.id === editingStatusId);

    return status;
  }
)
