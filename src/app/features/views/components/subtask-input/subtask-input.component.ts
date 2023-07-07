import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ClickOutsideDirective } from 'src/app/shared/directives';

@Component({
  standalone: true,
  selector: 'cu-subtask-input',
  templateUrl: './subtask-input.component.html',
  styleUrls: ['./subtask-input.component.scss'],
  imports: [
    NgIf,
    ClickOutsideDirective
  ]
})
export class SubtaskInputComponent {
  @ViewChild('InputRef') public input: any;
  @Output()
  public add = new EventEmitter<string>();

  public isActive = false;

  constructor() { }

  public setActive() {
    this.isActive = true;
  }

  public setInactive() {
    this.isActive = false;
  }

  public addSubtask() {
    let value = this.input.nativeElement.value;

    if (value.length === 0) {
      return;
    }

    this.input.nativeElement.value = '';
    this.setInactive();
    this.add.emit(value);
  }
}
