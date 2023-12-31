import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState } from "../../stores/app-state";
import * as SharedActions from "../../stores/shared/shared.actions";

@Injectable({
  providedIn: 'root'
})
export class MenuControlService {
  public isSideMenuOpen = false;
  public timer?: any;

  constructor(
    private store: Store<IAppState>
  ) { }

  public toggleSideMenu(open: boolean): void {
    this.isSideMenuOpen = open;

    if (this.isSideMenuOpen) {
      this.store.dispatch(SharedActions.SetSimpleMenu({ isOpen: true }));
      clearTimeout(this.timer);
      return;
    }

    this.timer = setTimeout(() => {
      this.store.dispatch(SharedActions.SetSimpleMenu({ isOpen: false }));
    });
  }
}
