import { createAction, props } from '@ngrx/store';

export const SetMenu = createAction(
  '[Shared] Set Menu',
    props<{ isOpen: boolean }>()
)

export const SetSimpleMenu = createAction(
  '[Shared] Set Simple Menu',
    props<{ isOpen: boolean }>()
)
