import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { IAppState } from './shared/stores/app-state';
import { selectMenu } from './shared/stores/shared/shared.selector';
import * as UserActions from './shared/stores/user/user.actions';
import { selectActiveEdit } from './shared/stores/board/board.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isSideMenuOpen = true;
  public isSideMenuOpen$ = this.store.select(selectMenu)
    .pipe(
      tap(isOpen => this.isSideMenuOpen = isOpen)
    );

  public activeTaskEdit$ = this.store.select(selectActiveEdit);

  constructor(
    private store: Store<IAppState>
  ) { }

  public ngOnInit() {
    this.store.dispatch(UserActions.GetUser({ id: 12 }));
  }
}
