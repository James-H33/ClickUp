import {
  CdkMenu,
  CdkMenuBar,
  CdkMenuItem,
  CdkMenuTrigger,
} from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStatus } from '../../models';
import { IconComponent } from "../icon/icon.component";

@Component({
  standalone: true,
  selector: 'cu-status-button',
  templateUrl: './status-button.component.html',
  styleUrls: ['./status-button.component.scss'],
  imports: [
    CommonModule,
    CdkMenuBar,
    CdkMenuItem,
    CdkMenu,
    CdkMenuTrigger,
    IconComponent
  ]
})
export class StatusButtonComponent {
  @Input()
  public statuses: IStatus[] = [];

  @Input()
  public selectedStatus: IStatus | null = null;

  @Output()
  public statusChange = new EventEmitter();

  public statusSelected(status: IStatus) {
    if (status.id === this.selectedStatus?.id) {
      return;
    }

    this.statusChange.emit(status);
  }
}
