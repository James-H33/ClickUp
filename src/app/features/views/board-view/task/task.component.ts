import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITask } from '../board-view.component';

/*
  - When Editing, if no input added and user clicks outsie of input, then task is deleted
*/

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
export class TaskComponent implements OnInit {
  @Output()
  public editDone = new EventEmitter();

  @Input()
  public set task(t: ITask) {
    this._task = { ...t };
  }

  public get task() {
    return this._task;
  }

  private _task: ITask = { id: '', name: '' };

  constructor() { }

  ngOnInit() {
  }

}
