import { createAction, props } from '@ngrx/store';
import { Album } from '../../models/album.model';

export const loadAlbums = createAction('[Album] Load Albums');
export const loadAlbumsSuccess = createAction(
  '[Album] Load Albums Success',
  props<{ albums: Album[] }>()
);
export const loadAlbumsFailure = createAction(
  '[Album] Load Albums Failure',
  props<{ error: any }>()
);

export const searchAlbums = createAction(
  '[Album] Search Albums',
  props<{ query: string }>()
);

export const filterAlbumsByYear = createAction(
  '[Album] Filter By Year',
  props<{ year: number }>()
); 