import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './shared/stores/app-state';
import { selectMenu } from './shared/stores/shared/shared.selector';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'click-up';

  public isSideMenuOpen = true;
  public isSideMenuOpen$ = this.store.select(selectMenu)
    .pipe(
      tap(isOpen => this.isSideMenuOpen = isOpen)
    );

  constructor(
    private store: Store<IAppState>
  ) { }
}
