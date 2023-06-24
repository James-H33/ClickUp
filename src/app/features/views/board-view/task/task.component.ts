import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITask } from 'src/app/shared/models';

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
  public editDone = new EventEmitter();

  @Input()
  public set task(t: ITask) {
    this._task = { ...t };
  }

  public get task() {
    return this._task;
  }

  @Input()
  public workspace: any;

  private _task: ITask = { id: '', name: '' };
}
