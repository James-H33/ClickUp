import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cu-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class TaskComponent implements OnInit {
  @Input() task: any = '';

  constructor() { }

  ngOnInit() {
  }

}
