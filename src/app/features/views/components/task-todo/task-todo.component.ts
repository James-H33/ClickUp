import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, combineLatest, of, switchMap } from 'rxjs';
import { ITask } from 'src/app/shared/models';
import { IAppState } from 'src/app/shared/stores/app-state';
import * as BoardActions from 'src/app/shared/stores/board/board.actions';
import { selectSubtasks } from 'src/app/shared/stores/board/board.selector';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { SubtaskInputComponent } from '../subtask-input/subtask-input.component';
import { FormsModule } from '@angular/forms';
import { ISubtask } from 'src/app/shared/models/subtasks.interface';

@Component({
  standalone: true,
  selector: 'cu-task-todo',
  templateUrl: './task-todo.component.html',
  styleUrls: ['./task-todo.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IconComponent,
    SubtaskInputComponent
  ]
})
export class TaskTodoComponent {
  @Input()
  public set task(task: ITask) {
    this._task = task;
    this.task$.next(task);
  }

  private _task: ITask;

  public task$ = new ReplaySubject<ITask>(1);
  public allSubtasks$ = this.store.select(selectSubtasks);
  public subtasksForTask$: Observable<ISubtask[]> = combineLatest([
    this.task$,
    this.allSubtasks$,
  ])
    .pipe(
      switchMap(
        ([task, subtasks]) => {
          return of(subtasks.filter(subtask => subtask.taskId === task.id));
        })
    )

  constructor(
    private store: Store<IAppState>
  ) { }

  public addSubtask(value: string) {
    this.store.dispatch(BoardActions.AddSubtask({
      taskId: this._task.id,
      subtaskContent: value
    }));
  }
}
