import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { HorizontalControlDirective, NoPropagationDirective } from 'src/app/shared/directives';
import { IBoard, IBoardColumn, ITask } from 'src/app/shared/models';
import { IAppState } from 'src/app/shared/stores/app-state';
import { BoardActions } from 'src/app/shared/stores/board/board.actions';
import { selectBoardState } from 'src/app/shared/stores/board/board.selector';
import { makeGuid } from 'src/app/shared/utils/make-guid';
import { IconComponent } from "../../../shared/ui/icon/icon.component";
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskComponent } from "./task/task.component";

export class TaskCreationState {
  public columnId: string = '';
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
export class BoardViewComponent implements OnInit {
  public board$ = this.store.select(selectBoardState)
    .pipe(
      tap(b => this.board = b)
    );

  public board: IBoard = null;
  public taskCreateState = new TaskCreationState();
  public workspace = { name: 'Work' };

  constructor(
    private store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(BoardActions.LoadBoard());
  }

  public taskMove(event: CdkDragDrop<any>) {
    let previousContainerId = event.previousContainer.id;
    let nextContainerId = event.container.id;

    if (previousContainerId === nextContainerId) {
      const column = this.board.columns.find((c) => c.id === nextContainerId);
      this.store.dispatch(BoardActions.MoveTaskWithinColumn({
        column,
        previousIndex: event.previousIndex,
        nextIndex: event.currentIndex
      }));
    } else {
      let targetColumn = this.board.columns.find((c) => c.id === nextContainerId);
      let prevColumn = event.previousContainer.data;
      let [ task ] = event.item.data;
      let insertIndex = event.currentIndex;

      this.store.dispatch(BoardActions.MoveTaskToNewColumn({
        prev: prevColumn,
        target: targetColumn,
        task,
        insertIndex
      }));
    }
  }

  public createNewTask(col: IBoardColumn) {
    this.taskCreateState.columnId = col.id;
    this.taskCreateState.position = 'bottom';

    this.taskCreateState.task = {
      id: makeGuid(),
      name: ''
    }
  }

  public taskEditDone(name: string, column: IBoardColumn) {
    if (name.length === 0) {
      this.taskCreateState = new TaskCreationState();
      return;
    }

    const task: ITask = {
      ...this.taskCreateState.task as any,
      name
    };

    if (this.taskCreateState.position === 'bottom') {
      column.tasks = [...column.tasks, task];
    } else {
      column.tasks = [task, ...column.tasks];
    }

    this.taskCreateState = new TaskCreationState();
  }

  public updateActivePosition(position: string) {
    this.taskCreateState.position = position;
  }
}
