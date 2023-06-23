import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HorizontalControlDirective, NoPropagationDirective } from 'src/app/shared/directives';
import { makeGuid } from 'src/app/shared/utils/make-guid';
import { IconComponent } from "../../../shared/ui/icon/icon.component";
import { MockBoardData } from './mock-board-data';
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from './new-task/new-task.component';

export interface IBoard {
  id: string;
  name: string;
  tasks: ITask[];
  color: string;
}

export interface ITask {
  id: string;
  name: string;
  isEditing?: boolean;
}

export class TaskCreationState {
  public boardId: string = '';
  public position: string = 'bottom';
  public task: ITask | null = null;
}

@Component({
  standalone: true,
  selector: 'cu-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
  imports: [
    CommonModule,
    TaskComponent,
    NewTaskComponent,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    IconComponent,
    HorizontalControlDirective,
    NoPropagationDirective
  ]
})
export class BoardViewComponent {
  public boards: IBoard[] = MockBoardData;
  public taskCreateState = new TaskCreationState();
  public workspace = { name: 'Work' };

  public taskMove(event: CdkDragDrop<any[]>) {
    let previousContainerId = +event.previousContainer.id;
    let containerId = +event.container.id;

    if (previousContainerId === containerId) {
      const board = this.boards[containerId];
      moveItemInArray(board.tasks, event.previousIndex, event.currentIndex);
    } else {
      let [prevBoard]: any = event.previousContainer.data;
      let [task, taskIndex] = event.item.data;
      let insertIndex = event.currentIndex;

      const targetBoard = this.boards[containerId];
      const tasks = targetBoard.tasks;
      let pre = tasks.slice(0, insertIndex);
      let post = tasks.slice(insertIndex);

      prevBoard.tasks = prevBoard.tasks.filter((t: ITask, i: number) => i !== taskIndex);
      targetBoard.tasks = [...pre, task, ...post];
    }
  }

  public createNewTask(board: IBoard) {
    this.taskCreateState.boardId = board.id;
    this.taskCreateState.position = 'bottom';

    this.taskCreateState.task = {
      id: makeGuid(),
      name: ''
    }
  }

  public taskEditDone(name: string, board: IBoard) {
    if (name.length === 0) {
      this.taskCreateState = new TaskCreationState();
      return;
    }

    const task: ITask = {
      ...this.taskCreateState.task as any,
      name
    };

    if (this.taskCreateState.position === 'bottom') {
      board.tasks = [...board.tasks, task];
    } else {
      board.tasks = [task, ...board.tasks];
    }

    this.taskCreateState = new TaskCreationState();
  }

  public updateActivePosition(position: string) {
    this.taskCreateState.position = position;
  }
}
