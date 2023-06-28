import { createReducer, on } from "@ngrx/store";
import { IBoard, IStatus, ITask } from "../../models";
import * as BoardActions from "./board.actions";

export interface IBoardState {
  board: IBoard;
  isLoading: boolean;
  activeEdit: { status: IStatus, task: ITask }
}

const initialState: IBoardState = {
  board: null,
  isLoading: true,
  activeEdit: null
};

export const boardReducer = createReducer(
  initialState,

  on(BoardActions.LoadBoard, (s) => {
    return {
      ...s,
      isLoading: true
    }
  }),

  on(BoardActions.LoadBoardSuccess, (s, { board }) => {
    return {
      ...s,
      board,
      isLoading: false
    }
  }),

  on(BoardActions.UpdateBoard, (s, { board }) => {
    return {
      ...s,
      board
    }
  }),

  on(BoardActions.MoveTaskWithinStatus, (s, { status, previousIndex, nextIndex }) => {
    const tasks = status.tasks.slice();
    const [ task ] = tasks.splice(previousIndex, 1);
    tasks.splice(nextIndex, 0, task);

    const updateStatus = { ...status, tasks };

    const updatedStatuses = s.board.statuses.map(c => {
      if (c.id === status.id) {
        return updateStatus;
      }

      return c;
    });

    let updatedBoard = { ...s.board, statuses: updatedStatuses };

    return {
      ...s,
      board: updatedBoard
    }
  }),

  on(BoardActions.MoveTaskToNewStatus, (s, { prev, target, task, insertIndex }) => {
    const prevStatus = s.board.statuses.find(c => c.id === prev.id);
    const targetStatus = s.board.statuses.find(c => c.id === target.id);

    const updatedPrevStatusTasks = prevStatus.tasks.filter(t => t.id !== task.id);
    const updatedPrevStatus = { ...prevStatus, tasks: updatedPrevStatusTasks };

    const targetTasks = targetStatus.tasks;
    const pre = targetTasks.slice(0, insertIndex);
    const post = targetTasks.slice(insertIndex);

    const updatedTargetTasks = [...pre, task, ...post];
    const updatedTargetStatus = { ...targetStatus, tasks: updatedTargetTasks };

    const updatedStatuses = s.board.statuses.map(c => {
      if (c.id === prev.id) {
        return updatedPrevStatus;
      }

      if (c.id === target.id) {
        return updatedTargetStatus;
      }

      return c;
    });

    let updatedBoard = { ...s.board, statuses: updatedStatuses };

    return {
      ...s,
      board: updatedBoard
    }
  }),

  on(BoardActions.AddTask, (s, { status, task, position }) => {
    let tasks = status.tasks;
    let newTasks = [];

    if (position === 'bottom') {
      newTasks = [...tasks, task];
    } else {
      newTasks = [task, ...tasks];
    }

    const updatedStatus = { ...status, tasks: newTasks };
    const updatedStatuses = s.board.statuses.map(c => {
      if (c.id === status.id) {
        return updatedStatus;
      }

      return c;
    });

    const updatedBoard = { ...s.board, statuses: updatedStatuses };

    return {
      ...s,
      board: updatedBoard
    }
  }),

  on(BoardActions.SetEditTask, (s, { status, task }) => {
    return {
      ...s,
      activeEdit: {
        task,
        status
      }
    }
  }),

  on(BoardActions.CloseEditTask, (s) => {
    return {
      ...s,
      activeEdit: null
    }
  }),

  on(BoardActions.SaveBoardToStorageSuccess, (s, { board }) => {
    return {
      ...s,
      board
    }
  })
);
