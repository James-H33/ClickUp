import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, tap } from 'rxjs';
import { IAppState } from '../../stores/app-state';
import { SharedActions } from '../../stores/shared/shared.actions';
import { selectMenu, selectSimpleMenu } from '../../stores/shared/shared.selector';
import { IconComponent } from '../icon/icon.component';
import { MenuControlDirective } from '../../directives/menu-control/menu-control.directive';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

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
  ]
})
export class ViewsBarComponent implements OnInit {
  public isSideMenuOpen$ = this.store.select(selectMenu);
  public isSimpleMenuOpen$ = this.store.select(selectSimpleMenu);
  public activeRoute$ = this.router.events.pipe(
    filter((e: any) => e instanceof NavigationEnd),
    map((v: any) => {
      if (v.url?.includes('board')) {
        return 'board';
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
    this.store.dispatch(SharedActions.SetMenu(true));
    this.store.dispatch(SharedActions.SetSimpleMenu(false));
  }

  public sideBarIconHovered() {
    this.store.dispatch(SharedActions.SetSimpleMenu(true));
  }

  public sideBarIconUnhovered() {
    this.store.dispatch(SharedActions.SetSimpleMenu(false));
  }

  public setMenu(isOpen: boolean) {

  }
}
