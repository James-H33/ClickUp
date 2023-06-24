import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { IAppState } from './shared/stores/app-state';
import { selectMenu } from './shared/stores/shared/shared.selector';
import { UserActions } from './shared/stores/user/user.actions';

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

  constructor(
    private store: Store<IAppState>
  ) { }

  public ngOnInit() {
    this.store.dispatch(UserActions.GetUser({ id: 12 }));
  }
}