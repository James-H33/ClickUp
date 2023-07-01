import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, tap } from 'rxjs';
import { HorizontalControlDirective, NoPropagationDirective } from 'src/app/shared/directives';
import { IStatus, ITask } from 'src/app/shared/models';
import { IAppState } from 'src/app/shared/stores/app-state';
import * as BoardActions from 'src/app/shared/stores/board/board.actions';
import { selectBoardState, selectAllStatusesWithTheirTasks } from 'src/app/shared/stores/board/board.selector';
import { makeGuid } from 'src/app/shared/utils/make-guid';
import { makeDate } from 'src/app/utils/date.util';
import { IconComponent } from "../../../shared/ui/icon/icon.component";
import { EditTaskComponent } from "../components/edit-task/edit-task.component";
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskComponent } from "./task/task.component";

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
  public board$ = this.store.select(selectBoardState);
  public statuses$ = this.store.select(selectAllStatusesWithTheirTasks);

  public vm: any = {
    board: null,
    statuses: [],
  };
  public vm$ = combineLatest({
    board: this.board$,
    statuses: this.statuses$
  }).pipe(tap(vm => this.vm = vm))

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
      let [ task ] = event.item.data;
      this.store.dispatch(BoardActions.MoveTaskWithinStatus({
        task,
        nextIndex: event.currentIndex
      }));
    } else {
      let targetStatus = this.vm.statuses.find((c: any) => c.id === nextContainerId);
      let prevStatus = event.previousContainer.data;
      let [ task ] = event.item.data;
      let insertIndex = event.currentIndex;

      this.store.dispatch(BoardActions.MoveTaskToNewStatusAtPos({
        prev: prevStatus,
        target: targetStatus,
        task,
        insertIndex
      }));
    }
  }

  public createNewTask(status: IStatus) {
    this.taskCreateState.statusId = status.id;

    this.taskCreateState.task = {
      id: makeGuid(),
      statusId: status.id,
      name: '',
      description: '',
      createdDate: makeDate(),
      position: 0
    }
  }

  public taskCreationDone(name: string) {
    if (name.length === 0) {
      this.taskCreateState = new TaskCreationState();
      return;
    }

    const task: ITask = {
      ...this.taskCreateState.task as any,
      name
    };

    const position = this.taskCreateState.position;

    this.store.dispatch(BoardActions.AddTask({ task, position }));
    this.taskCreateState = new TaskCreationState();
  }

  public editTask(task: ITask) {
    this.store.dispatch(BoardActions.SetEdit({ statusId: task.statusId, taskId: task.id }));
  }

  public updateActivePosition(position: string) {
    this.taskCreateState.position = position;
  }
}
