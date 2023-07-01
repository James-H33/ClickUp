import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, tap } from 'rxjs';
import { IStatus } from 'src/app/shared/models';
import { IAppState } from 'src/app/shared/stores/app-state';
import * as BoardActions from 'src/app/shared/stores/board/board.actions';
import { selectActiveEditStatus, selectActiveEditTask, selectStatuses } from 'src/app/shared/stores/board/board.selector';
import { StatusButtonComponent } from "../../../../shared/ui/status-button/status-button.component";
import { TaskTodoComponent } from '../task-todo/task-todo.component';

@Component({
    selector: 'cu-edit-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      StatusButtonComponent,
      TaskTodoComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTaskComponent {
  public statuses$ = this.store.select(selectStatuses);
  public task$ = this.store.select(selectActiveEditTask);
  public status$ = this.store.select(selectActiveEditStatus);

  public vm: any = {};
  public vm$ = combineLatest({
    statuses: this.statuses$,
    task: this.task$,
    status: this.status$
  })
    .pipe(
      tap(vm => this.vm = vm)
    );

  constructor(
    private store: Store<IAppState>
  ) { }

  public close() {
    this.store.dispatch(BoardActions.CloseEditTask());
  }

  public statusChange(status: IStatus) {
    let currentStatus: IStatus = this.vm.status;
    let currentTask = this.vm.task;

    this.store.dispatch(BoardActions.MoveTaskToNewStatus({
      prev: currentStatus,
      target: status,
      task: currentTask
     }));
  }

  public updateName(event: any) {
    let name = event.target.value;
    let { task, status } = this.vm;

    const updatedTask = { ...task, name };

    this.store.dispatch(BoardActions.UpdateTask({
      status,
      task: updatedTask
    }));
  }
}
