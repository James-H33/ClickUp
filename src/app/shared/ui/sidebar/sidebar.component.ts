import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordianComponent } from '../accordian/accordian.component';
import { IconComponent } from '../icon/icon.component';
import { SearchButtonComponent } from '../search-button/search-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'cu-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SearchButtonComponent,
    IconComponent,
    AccordianComponent
  ]
})
export class SidebarComponent {
  @ViewChildren(AccordianComponent) accordians: AccordianComponent[] = [];

  public accordianOpenedChange(isOpen: boolean, ref: AccordianComponent) {
    this.accordians.forEach((accordian, i) => {
      if (accordian !== ref) {
        accordian.isOpen = false;
      }
    });
  }

  public collapseSidebar() {

  }
}
