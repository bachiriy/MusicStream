import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.module';



export const register = createAction(
  '[Auth] Register',
  props<{ user: Partial<User> }>()
);
export const registerSuccess = createAction(
  '[Auth] Register User Success',
  props<{ user: User }>()
);
export const registerFailure = createAction(
  '[Auth] Register User Failure',
  props<{ error: any }>()
);

export const login = createAction(
  '[Auth] Register',
  props<{ user: Partial<User> }>()
);
export const loginSuccess = createAction(
  '[Auth] Login User Success',
  props<{ user: User }>()
);
export const loginFailure = createAction(
  '[Auth] Login User Failure',
  props<{ error: any }>()
);

