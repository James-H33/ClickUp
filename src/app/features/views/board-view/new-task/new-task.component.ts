import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from 'src/app/shared/directives';

@Component({
  selector: 'cu-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideDirective
  ]
})
export class NewTaskComponent {
  @ViewChild('EditInput')
  public set editInput(el: ElementRef) {
    if (el) {
      el.nativeElement.focus();
    }
  }

  @Input()
  public name = '';

  @Output()
  public editDone = new EventEmitter();

  public save() {
    this.editDone.emit(this.name);
  }

  public cancel() {
    this.editDone.emit('');
  }
}
