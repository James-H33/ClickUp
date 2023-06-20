import { createAction } from '@ngrx/store';

export const SetMenu = createAction(
  '[Shared] Set Menu',
    (isOpen: boolean) => ({ isOpen })
)

export const SetSimpleMenu = createAction(
  '[Shared] Set Simple Menu',
    (isOpen: boolean) => ({ isOpen })
)

export const SharedActions = {
  SetMenu,
  SetSimpleMenu
}
