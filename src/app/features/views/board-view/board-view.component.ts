import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { HorizontalControlDirective, NoPropagationDirective } from 'src/app/shared/directives';
import { IBoard, IStatus, ITask } from 'src/app/shared/models';
import { IAppState } from 'src/app/shared/stores/app-state';
import * as BoardActions from 'src/app/shared/stores/board/board.actions';
import { selectBoardState } from 'src/app/shared/stores/board/board.selector';
import { makeGuid } from 'src/app/shared/utils/make-guid';
import { IconComponent } from "../../../shared/ui/icon/icon.component";
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskComponent } from "./task/task.component";
import { EditTaskComponent } from "../components/edit-task/edit-task.component";

export class TaskCreationState {
  public statusId: string = '';
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
    NoPropagationDirective,
    EditTaskComponent
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
      const status = this.board.statuses.find((c) => c.id === nextContainerId);
      this.store.dispatch(BoardActions.MoveTaskWithinStatus({
        status,
        previousIndex: event.previousIndex,
        nextIndex: event.currentIndex
      }));
    } else {
      let targetStatus = this.board.statuses.find((c) => c.id === nextContainerId);
      let prevStatus = event.previousContainer.data;
      let [task] = event.item.data;
      let insertIndex = event.currentIndex;

      this.store.dispatch(BoardActions.MoveTaskToNewStatus({
        prev: prevStatus,
        target: targetStatus,
        task,
        insertIndex
      }));
    }
  }

  public createNewTask(col: IStatus) {
    this.taskCreateState.statusId = col.id;

    this.taskCreateState.task = {
      id: makeGuid(),
      name: '',
      description: ''
    }
  }

  public taskCreationDone(name: string, status: IStatus) {
    if (name.length === 0) {
      this.taskCreateState = new TaskCreationState();
      return;
    }

    const task: ITask = {
      ...this.taskCreateState.task as any,
      name
    };

    const position = this.taskCreateState.position;

    this.store.dispatch(BoardActions.AddTask({ status, task, position }));
    this.taskCreateState = new TaskCreationState();
  }

  public editTask(status: IStatus, task: ITask) {
    this.store.dispatch(BoardActions.SetEditTask({ status, task }));
  }

  public updateActivePosition(position: string) {
    this.taskCreateState.position = position;
  }
}
