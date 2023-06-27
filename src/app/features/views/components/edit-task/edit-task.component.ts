import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, tap } from 'rxjs';
import { IStatus } from 'src/app/shared/models';
import { IAppState } from 'src/app/shared/stores/app-state';
import { BoardActions } from 'src/app/shared/stores/board/board.actions';
import { selectActiveEdit, selectStatuses } from 'src/app/shared/stores/board/board.selector';
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
    ]
})
export class EditTaskComponent {
  public statuses$ = this.store.select(selectStatuses);
  public activeEdit$ = this.store.select(selectActiveEdit);

  public vm: any = {};
  public vm$ = combineLatest([
    this.statuses$,
    this.activeEdit$
  ])
    .pipe(
      map(([statuses, activeEdit]) => {
        return { statuses, activeEdit };
      }),
      tap(vm => this.vm = vm)
    );

  constructor(
    private store: Store<IAppState>
  ) { }

  public close() {
    this.store.dispatch(BoardActions.CloseEditTask());
  }

  public statusChange(status: IStatus) {
    let { activeEdit } = this.vm;
    let currentStatus: IStatus = activeEdit.column;

    this.store.dispatch(BoardActions.MoveTaskToNewColumn({
      prev: currentStatus,
      target: status,
      task: activeEdit.task,
      insertIndex: status.tasks.length
     }));

    this.store.dispatch(BoardActions.SetEditTask({
      task: activeEdit.task,
      column: status
     }));
  }
}
