import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../models/user.module';

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  error: any;
}

export const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loadAuths, state => ({
    ...state,
    loading: true
  })),
  on(AuthActions.loadAuthsSuccess, (state, { auths }) => ({
    ...state,
    auths,
    loading: false,
    error: null
  })),
  on(AuthActions.loadAuthsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  on(AuthActions.addAuthSuccess, (state, { auth }) => ({
    ...state,
    auths: [...state.auths, auth]
  })),
  on(AuthActions.playAuth, (state, { auth }) => ({
    ...state,
    currentAuth: auth,
    isPlaying: true
  })),
  on(AuthActions.pauseAuth, state => ({
    ...state,
    isPlaying: false
  })),
  on(AuthActions.stopAuth, state => ({
    ...state,
    isPlaying: false,
    // currentTime: 0
  })),
  on(AuthActions.updateProgress, (state, { currentTime, duration }) => ({
    ...state,
    currentTime,
    duration
  })),
  on(AuthActions.setVolume, (state, { volume }) => ({
    ...state,
    volume: volume
  })),
  on(AuthActions.setAuth, (state, { auth }) => ({
    ...state,
    currentAuth: auth
  })),
  
  on(AuthActions.resumeAuth, state => ({
    ...state,
    isPlaying: true
  })),
); 
