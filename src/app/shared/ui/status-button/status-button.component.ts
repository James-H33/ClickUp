import {
  CdkMenu,
  CdkMenuBar,
  CdkMenuItem,
  CdkMenuTrigger,
} from '@angular/cdk/menu';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  public statuses: any[] = [];

  @Input()
  public selectedStatus: any = null;
}
