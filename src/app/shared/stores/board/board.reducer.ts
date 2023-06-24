import { createReducer, on } from "@ngrx/store";
import { IBoard } from "../../models";
import { BoardActions } from "./board.actions";

export interface IBoardState {
  board: IBoard;
  isLoading: boolean;
}

const initialState: IBoardState = {
  board: null,
  isLoading: true
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

  on(BoardActions.MoveTaskWithinColumn, (s, { column, previousIndex, nextIndex }) => {
    const tasks = column.tasks.slice();
    const [ task ] = tasks.splice(previousIndex, 1);
    tasks.splice(nextIndex, 0, task);

    const updatedColumn = { ...column, tasks };

    const updatedColumns = s.board.columns.map(c => {
      if (c.id === column.id) {
        return updatedColumn;
      }

      return c;
    });

    let updatedBoard = { ...s.board, columns: updatedColumns };

    return {
      ...s,
      board: updatedBoard
    }
  }),

  on(BoardActions.MoveTaskToNewColumn, (s, { prev, target, task, insertIndex }) => {
    const prevColumn = s.board.columns.find(c => c.id === prev.id);
    const targetColumn = s.board.columns.find(c => c.id === target.id);

    const updatePrevColumnTasks = prevColumn.tasks.filter(t => t.id !== task.id);
    const updatePrevColumn = { ...prevColumn, tasks: updatePrevColumnTasks };

    const targetTasks = targetColumn.tasks;
    const pre = targetTasks.slice(0, insertIndex);
    const post = targetTasks.slice(insertIndex);

    const updateTargetTasks = [...pre, task, ...post];
    const updateTargetColumn = { ...targetColumn, tasks: updateTargetTasks };

    const updatedColumns = s.board.columns.map(c => {
      if (c.id === prev.id) {
        return updatePrevColumn;
      }

      if (c.id === target.id) {
        return updateTargetColumn;
      }

      return c;
    });

    let updatedBoard = { ...s.board, columns: updatedColumns };

    return {
      ...s,
      board: updatedBoard
    }
  }),

  on(BoardActions.AddTask, (s, { column, task, position }) => {
    let tasks = column.tasks;
    let newTasks = [];

    if (position === 'bottom') {
      newTasks = [...tasks, task];
    } else {
      newTasks = [task, ...tasks];
    }

    const updatedColumn = { ...column, tasks: newTasks };
    const updatedColumns = s.board.columns.map(c => {
      if (c.id === column.id) {
        return updatedColumn;
      }

      return c;
    });

    const updatedBoard = { ...s.board, columns: updatedColumns };

    return {
      ...s,
      board: updatedBoard
    }
  })
);
