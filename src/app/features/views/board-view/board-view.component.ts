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

      const board = this.boards[containerId];
      const tasks = board.tasks;
      let pre = tasks.slice(0, insertIndex);
      let post = tasks.slice(insertIndex);

      prevBoard.tasks = prevBoard.tasks.filter((t: any, i: number) => i !== taskIndex);

      board.tasks = [...pre, task, ...post];
    }
  }

  public createNewTask(board: any) {
    board.tasks.push({
      id: makeGuid(),
      name: '',
      isEditing: true
    });
  }

  public taskEditDone(name: string, task: ITask, board: IBoard) {
    if (name.length === 0) {
      this.deleteTask(board, task);
      return;
    }

    task = { ...task, name, isEditing: false };
    board.tasks = board.tasks.map(t => t.id === task.id ? task : t);
    board = { ...board };
    this.boards = this.boards.map(b => b.id === board.id ? board : b);
  }

  private deleteTask(board: IBoard, task: ITask) {
    board.tasks = board.tasks.filter(t => t.id !== task.id);
  }
}
