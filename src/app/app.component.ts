import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, tap } from 'rxjs';
import { IAppState } from './shared/stores/app-state';
import { selectIsEditing } from './shared/stores/board/board.selector';
import { selectMenu } from './shared/stores/shared/shared.selector';
import * as UserActions from './shared/stores/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isSideMenuOpen$ = this.store.select(selectMenu);
  public isEditingTask$ = this.store.select(selectIsEditing);

  public vm: any = {};
  public vm$ = combineLatest({
    isSideMenuOpen: this.isSideMenuOpen$,
    isEditingTask: this.isEditingTask$
  }).pipe(
    tap(vm => this.vm = vm)
  )

  constructor(
    private store: Store<IAppState>
  ) { }

  public ngOnInit() {
    this.store.dispatch(UserActions.GetUser({ id: 12 }));
  }
}
