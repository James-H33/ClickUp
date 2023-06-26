import { Component } from '@angular/core';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';
import { SubtaskInputComponent } from '../subtask-input/subtask-input.component';

@Component({
  standalone: true,
  selector: 'cu-task-todo',
  templateUrl: './task-todo.component.html',
  styleUrls: ['./task-todo.component.scss'],
  imports: [
    IconComponent,
    SubtaskInputComponent
  ]
})
export class TaskTodoComponent {

}
