import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchButtonComponent } from '../search-button/search-button.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  standalone: true,
  selector: 'cu-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    SearchButtonComponent,
    IconComponent
  ]
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
