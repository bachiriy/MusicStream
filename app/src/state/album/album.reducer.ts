import { createReducer, on } from '@ngrx/store';
import { Album } from '../../models/album.model';
import * as AlbumActions from './album.actions';

export interface AlbumState {
  albums: Album[];
  loading: boolean;
  error: any;
}

const initialState: AlbumState = {
  albums: [],
  loading: false,
  error: null
};

export const albumReducer = createReducer(
  initialState,
  on(AlbumActions.loadAlbums, state => ({
    ...state,
    loading: true
  })),
  on(AlbumActions.loadAlbumsSuccess, (state, { albums }) => ({
    ...state,
    albums,
    loading: false
  })),
  on(AlbumActions.loadAlbumsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
); 