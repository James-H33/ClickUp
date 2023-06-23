import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from 'src/app/shared/directives';
import { IconComponent } from 'src/app/shared/ui/icon/icon.component';

@Component({
  selector: 'cu-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideDirective,
    IconComponent
  ]
})
export class NewTaskComponent {
  @ViewChild('EditInput')
  public set editInput(el: ElementRef) {
    if (el) {
      el.nativeElement.focus();
    }
  }

  @Output()
  public activePositonChange = new EventEmitter<string>();

  @Input()
  public name = '';

  @Input()
  public activePosition = 'bottom';

  @Output()
  public editDone = new EventEmitter();

  public save() {
    this.editDone.emit(this.name);
  }

  public cancel() {
    this.editDone.emit('');
  }

  public updateActivePosition(e: any, position: string) {
    e.stopPropagation();
    this.activePositonChange.emit(position);
  }
}
