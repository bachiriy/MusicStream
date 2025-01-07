import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrackState } from './track.reducer';
import { PlaybackState } from '../../models/track.model';

export const selectTrackState = createFeatureSelector<TrackState>('track');

export const selectAllTracks = createSelector(
  selectTrackState,
  state => state.tracks
);

export const selectCurrentTrack = createSelector(
  selectTrackState,
  state => state.currentTrack
);

export const selectCurrentTrackIndex = createSelector(
  selectTrackState,
  state => state.tracks.findIndex(track => track.id === state.currentTrack?.id)
);

export const selectHasPreviousTrack = createSelector(
  selectCurrentTrackIndex,
  index => index > 0
);

export const selectHasNextTrack = createSelector(
  selectCurrentTrackIndex,
  selectAllTracks,
  (index, tracks) => index < tracks.length - 1 && index !== -1
);

export const selectPlaybackState = createSelector(
  selectTrackState,
  (state): PlaybackState => ({
    isPlaying: state.isPlaying,
    currentTime: state.currentTime,
    duration: state.duration,
    volume: state.volume
  })
);

export const selectLoading = createSelector(
  selectTrackState,
  state => state.loading
);

export const selectError = createSelector(
  selectTrackState,
  state => state.error
); 