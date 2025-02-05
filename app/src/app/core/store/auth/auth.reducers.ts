import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../models/user.module';

export interface AuthState {
  currentUser: User | null | Partial<User>;
  isAuthenticated: boolean;
  error: any | null;
}

export const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.register, (state, { user } )=> ({
    ...state,
    currentUser: user 
  })),
  on(AuthActions.login, (state, { user }) => ({
    ...state,
    currentUser: user, 
    error: null
  })),
); 
