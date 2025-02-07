import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlbumState } from './album.model';

export const selectAlbumState = createFeatureSelector<AlbumState>('album');

export const selectAllAlbums = createSelector(
    selectAlbumState,
    (state: AlbumState) => state.albums
);

export const selectAlbumsLoading = createSelector(
    selectAlbumState,
    (state: AlbumState) => state.loading
);

export const selectAlbumsError = createSelector(
    selectAlbumState,
    (state: AlbumState) => state.error
);

export const selectAlbumById = (albumId: string) => createSelector(
    selectAllAlbums,
    (albums) => albums.find(album => album.id === albumId)
); 