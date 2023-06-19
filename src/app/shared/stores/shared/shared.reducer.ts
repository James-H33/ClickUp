import { createReducer, on } from '@ngrx/store';
import { SharedActions } from './shared.actions';

export interface ISharedState {
  isMenuOpen: boolean;
  isSimpleMenuOpen: boolean;
}

export const initialState: ISharedState = {
  isMenuOpen: true,
  isSimpleMenuOpen: false
}

export const sharedReducer = createReducer(

  initialState,

  on(SharedActions.SetMenu, (s, { isOpen }) => {
    return {
      ...s,
      isMenuOpen: isOpen
    };
  }),

  on(SharedActions.SetSimpleMenu, (s, { isOpen }) => {
    return {
      ...s,
      isSimpleMenuOpen: isOpen
    };
  }),
)
