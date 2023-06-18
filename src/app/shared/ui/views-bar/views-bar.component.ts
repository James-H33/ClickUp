import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  standalone: true,
  selector: 'cu-views-bar',
  templateUrl: './views-bar.component.html',
  styleUrls: ['./views-bar.component.scss'],
  imports: [
    CommonModule,
    IconComponent
  ]
})
export class ViewsBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
