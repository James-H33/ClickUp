import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, tap } from 'rxjs';
import { MenuControlDirective } from '../../directives/menu-control.directive';
import { IAppState } from '../../stores/app-state';
import { SharedActions } from '../../stores/shared/shared.actions';
import { selectMenu, selectSimpleMenu } from '../../stores/shared/shared.selector';
import { IconComponent } from '../icon/icon.component';

@Component({
  standalone: true,
  selector: 'cu-views-bar',
  templateUrl: './views-bar.component.html',
  styleUrls: ['./views-bar.component.scss'],
  imports: [
    CommonModule,
    IconComponent,
    MenuControlDirective
  ]
})
export class ViewsBarComponent implements OnInit {
  public isSideMenuOpen$ = this.store.select(selectMenu);
  public isSimpleMenuOpen$ = this.store.select(selectSimpleMenu);

  public vm: any = {};
  public vm$ = combineLatest([
    this.isSideMenuOpen$,
    this.isSimpleMenuOpen$
  ])
    .pipe(
      map(([isSideMenuOpen, isSimpleMenuOpen]) => {
        return {
          isSideMenuOpen,
          isSimpleMenuOpen
        };
      }),
      tap(s => this.vm = s)
    );

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
  }

  public openSideMenu() {
    this.store.dispatch(SharedActions.SetMenu(true));
    this.store.dispatch(SharedActions.SetSimpleMenu(false));
  }

  public sideBarIconHovered() {
    this.store.dispatch(SharedActions.SetSimpleMenu(true));
  }

  public sideBarIconUnhovered() {
    this.store.dispatch(SharedActions.SetSimpleMenu(false));
  }
}
