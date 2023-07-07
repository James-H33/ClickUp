import { createReducer, on } from "@ngrx/store";
import { IBoard, ITask } from "../../models";
import * as BoardActions from "./board.actions";
import { ISubtask } from "../../models/subtasks.interface";
import { makeGuid } from "../../utils/make-guid";

export interface IBoardState {
  board: IBoard;
  isLoading: boolean;
  isEditingTask: boolean,
  editingTaskId: string;
  editingStatusId: string;
}

const initialState: IBoardState = {
  board: null,
  isLoading: true,
  isEditingTask: false,
  editingTaskId: null,
  editingStatusId: null
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

  on(BoardActions.MoveTaskWithinStatus, (s, { task, nextIndex }) => {
    const tasks = s.board.tasks;
    const tasksForStatus = tasks.filter(t => t.statusId === task.statusId);
    tasksForStatus.sort((a, b) => a.position - b.position);

    let tasksWithNewPosition: ITask[] = [];

    for (let i = 0; i < tasksForStatus.length; i++) {
      let currTask = tasksForStatus[i];

      if (currTask.id === task.id) {
        continue;
      }

      if (tasksWithNewPosition.length === nextIndex) {
        tasksWithNewPosition.push(task);
        i--;
        continue;
      }

      tasksWithNewPosition.push(currTask);
    }

    if (tasksWithNewPosition.length === nextIndex) {
      tasksWithNewPosition.push(task);
    }

    tasksWithNewPosition = normalizeSortOnTasks(tasksWithNewPosition);

    const updatedTasks = tasks.map(t => {
      if (t.statusId === task.statusId) {
        return tasksWithNewPosition.find(c => c.id === t.id);
      }

      return t;
    })

    const updatedBoard = {
      ...s.board,
      tasks: updatedTasks
    }

    return {
      ...s,
      board: updatedBoard
    }
  }),

  on(BoardActions.MoveTaskToNewStatusAtPos, (s, { prev, target, task, insertIndex }) => {
    let newTask = {
      ...task,
      statusId: target.id,
      position: insertIndex
    }

    const tasks = s.board.tasks;

    const updatedTasks = tasks.map(t => {
      if (t.id === task.id) {
        return newTask;
      }

      return t;
    })

    const updatedPrevTasksForPosition = updatedTasks.map((t) => {
      if (t.statusId === prev.id && t.position > task.position) {
        return {
          ...t,
          position: t.position - 1
        }
      }

      return t;
    });

    const updatedNewTasksForPosition = updatedPrevTasksForPosition.map((t) => {
      if (t.statusId === target.id && t.position >= newTask.position && t.id !== task.id) {
        return {
          ...t,
          position: t.position + 1
        }
      }

      return t;
    });

    const updatedBoard = {
      ...s.board,
      tasks: updatedNewTasksForPosition
    }

    return {
      ...s,
      board: updatedBoard
    }
  }),

  on(BoardActions.MoveTaskToNewStatus, (s, { prev, target, task }) => {
    const tasks = s.board.tasks;
    const targetTasks = tasks.filter(t => t.statusId === target.id);

    let newTask = {
      ...task,
      statusId: target.id,
      position: targetTasks.length
    }

    const updatedTasks = tasks.map(t => {
      if (t.id === task.id) {
        return newTask;
      }

      return t;
    })

    const updatedBoard = {
      ...s.board,
      tasks: updatedTasks
    }

    return {
      ...s,
      board: updatedBoard,
      editingStatusId: target.id,
      editingTaskId: newTask.id
    }
  }),

  on(BoardActions.AddTask, (s, { task, position }) => {
    let tasks = s.board.tasks.slice();
    let taskForStatus = tasks.filter(t => {
      return t.statusId === task.statusId;
    });

    let newTasks: ITask[] = [];

    if (position === 'bottom') {
      newTasks = [...taskForStatus, task];
    } else {
      newTasks = [task, ...taskForStatus];
    }

    tasks.push(task);
    newTasks = normalizeSortOnTasks(newTasks);

    const updatedTasks = tasks.map(t => {
      if (t.statusId === task.statusId) {
        return newTasks.find(c => c.id === t.id);
      }

      return t;
    })

    const updatedBoard = { ...s.board, tasks: updatedTasks };

    return {
      ...s,
      board: updatedBoard
    }
  }),

  on(BoardActions.SetEdit, (s, { statusId, taskId }) => {
    return {
      ...s,
      isEditingTask: true,
      editingStatusId: statusId,
      editingTaskId: taskId
    }
  }),

  on(BoardActions.CloseEditTask, (s) => {
    return {
      ...s,
      isEditingTask: false,
      editingStatusId: null,
      editingTaskId: null
    }
  }),

  on(BoardActions.SaveBoardToStorageSuccess, (s, { board }) => {
    return {
      ...s,
      board
    }
  }),

  on(BoardActions.UpdateTask, (s, { status, task }) => {
    let newTask = { ...task }

    const tasks = s.board.tasks;

    const updatedTasks = tasks.map(t => {
      if (t.id === task.id) {
        return newTask;
      }

      return t;
    })

    const updatedBoard = {
      ...s.board,
      tasks: updatedTasks
    }

    return {
      ...s,
      board: updatedBoard
    }
  }),

  on(BoardActions.AddSubtask, (s, { taskId, subtaskContent }) => {
    const { subtasks } = s.board;
    const subtasksForStatus = subtasks.filter(s => s.taskId === taskId);
    const subtask: ISubtask = {
      id: makeGuid(),
      taskId: taskId,
      name: subtaskContent,
      position: subtasksForStatus.length - 1
    };

    const updatedSubtasks = [...subtasks, subtask];

    const updatedBoard = {
      ...s.board,
      subtasks: updatedSubtasks
    }

    return {
      ...s,
      board: updatedBoard
    };
  })
);

function normalizeSortOnTasks(tasks: ITask[]) {
  let output = [];

  for (let i = 0; i < tasks.length; i++) {
    let t = {
      ...tasks[i],
      position: i
    }

    output.push(t);
  }

  return output;
}
