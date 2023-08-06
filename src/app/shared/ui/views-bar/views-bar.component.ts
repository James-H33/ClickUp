import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, startWith, tap } from 'rxjs';
import { MenuControlDirective } from '../../directives/menu-control/menu-control.directive';
import { IAppState } from '../../stores/app-state';
import * as SharedActions from '../../stores/shared/shared.actions';
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
    RouterModule,
    MenuControlDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewsBarComponent implements OnInit {
  public isSideMenuOpen$ = this.store.select(selectMenu);
  public isSimpleMenuOpen$ = this.store.select(selectSimpleMenu);
  public activeRoute$ = this.router.events
    .pipe(
      filter(e => e instanceof NavigationEnd),
      startWith({ url: this.router.url }),
      map((v: any) => {
        if (v.url?.includes('board')) {
          return 'board';
        }

        if (v.url?.includes('gantt')) {
          return 'gantt';
        }

        return 'list';
      }),
    );

  public vm: any = {};
  public vm$ = combineLatest([
    this.isSideMenuOpen$,
    this.isSimpleMenuOpen$,
    this.activeRoute$
  ])
    .pipe(
      map(([isSideMenuOpen, isSimpleMenuOpen, activeRoute]) => {
        return {
          isSideMenuOpen,
          isSimpleMenuOpen,
          view: activeRoute
        };
      }),
      tap(s => this.vm = s)
    );

  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public openSideMenu() {
    this.store.dispatch(SharedActions.SetMenu({ isOpen: true }));
    this.store.dispatch(SharedActions.SetSimpleMenu({ isOpen: false }));
  }

  public sideBarIconHovered() {
    this.store.dispatch(SharedActions.SetSimpleMenu({ isOpen: true }));
  }

  public sideBarIconUnhovered() {
    this.store.dispatch(SharedActions.SetSimpleMenu({ isOpen: false }));
  }
}
