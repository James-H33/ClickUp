import { CommonModule } from '@angular/common';
import { Component, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordianComponent } from '../accordian/accordian.component';
import { IconComponent } from '../icon/icon.component';
import { SearchButtonComponent } from '../search-button/search-button.component';
import { IAppState } from '../../stores/app-state';
import { Store } from '@ngrx/store';
import { selectMenu, selectSimpleMenu } from '../../stores/shared/shared.selector';
import * as SharedActions from '../../stores/shared/shared.actions';
import { combineLatest, map, tap } from 'rxjs';
import { MenuControlDirective } from '../../directives/menu-control/menu-control.directive';

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
    AccordianComponent,
    MenuControlDirective
  ]
})
export class SidebarComponent {
  @ViewChildren(AccordianComponent)
  public accordians: AccordianComponent[] = [];

  public isMenuOpen$ = this.store.select(selectMenu);
  public isSimpleMenuOpen$ = this.store.select(selectSimpleMenu);
  public vm?: any = {};

  public vm$ = combineLatest([
    this.isMenuOpen$,
    this.isSimpleMenuOpen$
  ])
    .pipe(
      map(([isMenuOpen, isSimpleMenuOpen]) => {
        return {
          isMenuOpen,
          isSimpleMenuOpen
        };
      }),
      tap(s => this.vm = s)
    );

  constructor(
    private store: Store<IAppState>
  ) { }

  public accordianOpenedChange(isOpen: boolean, ref: AccordianComponent) {
    this.accordians.forEach((accordian, i) => {
      if (accordian !== ref) {
        accordian.isOpen = false;
      }
    });
  }

  public collapseSidebar() {
    this.store.dispatch(SharedActions.SetMenu({ isOpen: false }));
  }
}
