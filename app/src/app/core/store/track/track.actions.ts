import { createAction, props } from '@ngrx/store';
import { Track } from '../../models/track.model';

export const loadTracks = createAction('[Track] Load Tracks');
export const loadTracksSuccess = createAction(
  '[Track] Load Tracks Success',
  props<{ tracks: Track[] }>()
);
export const loadTracksFailure = createAction(
  '[Track] Load Tracks Failure',
  props<{ error: any }>()
);

export const addTrack = createAction(
  '[Track] Add Track',
  props<{ track: Partial<Track>, audioFile: File }>()
);
export const addTrackSuccess = createAction(
  '[Track] Add Track Success',
  props<{ track: Track }>()
);
export const addTrackFailure = createAction(
  '[Track] Add Track Failure',
  props<{ error: any }>()
);

export const playTrack = createAction(
  '[Track] Play Track',
  props<{ track: Track }>()
);
export const pauseTrack = createAction('[Track] Pause Track');
export const resumeTrack = createAction('[Track] Resume Track');
export const stopTrack = createAction('[Track] Stop Track');
export const previousTrack = createAction('[Track] Previous Track');
export const nextTrack = createAction('[Track] Next Track');
export const seek = createAction(
  '[Track] Seek',
  props<{ time: number }>()
);
export const updateProgress = createAction(
  '[Track] Update Progress',
  props<{ currentTime: number, duration: number }>()
);
export const setVolume = createAction(
  '[Track] Set Volume',
  props<{ volume: number }>()
);

export const loadTrack = createAction(
  '[Track] Load Track',
  props<{ id: number }>()
); 