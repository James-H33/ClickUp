import { createSelector } from '@ngrx/store';
import { IAppState } from '../app-state';
import { ISharedState } from './shared.reducer';

export const selectShared = (state: IAppState) => state.shared;

export const selectMenu = createSelector(
  selectShared,
  (state: ISharedState) => state.isMenuOpen
);

export const selectSimpleMenu = createSelector(
  selectShared,
  (state: ISharedState) => state.isSimpleMenuOpen
);
