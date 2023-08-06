import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITask } from 'src/app/shared/models';
import { makeDate } from 'src/app/utils/date.util';

@Component({
  selector: 'cu-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TaskComponent {
  @Output()
  public edit = new EventEmitter();

  @Input()
  public workspace: any;

  @Input()
  public set task(t: ITask) {
    this._task = { ...t };
  }

  public get task() {
    return this._task;
  }

  private _task: ITask = {
    id: '',
    name: '',
    statusId: '',
    description: '',
    createdDate: makeDate(),
    startDate: makeDate(),
    duration: 0,
    position: 0,
  };

  public editTask() {
    this.edit.emit(this.task);
  }
}
