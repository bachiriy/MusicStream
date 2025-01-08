import { createReducer, on } from '@ngrx/store';
import { Track, PlaybackState } from '../../models/track.model';
import * as TrackActions from './track.actions';

export interface TrackState {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  loading: boolean;
  error: any;
}

export const initialState: TrackState = {
  tracks: [],
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  loading: false,
  error: null
};

export const trackReducer = createReducer(
  initialState,
  on(TrackActions.loadTracks, state => ({
    ...state,
    loading: true
  })),
  on(TrackActions.loadTracksSuccess, (state, { tracks }) => ({
    ...state,
    tracks,
    loading: false,
    error: null
  })),
  on(TrackActions.loadTracksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  on(TrackActions.addTrackSuccess, (state, { track }) => ({
    ...state,
    tracks: [...state.tracks, track]
  })),
  on(TrackActions.playTrack, (state, { track }) => ({
    ...state,
    currentTrack: track,
    isPlaying: true
  })),
  on(TrackActions.pauseTrack, state => ({
    ...state,
    isPlaying: false
  })),
  on(TrackActions.stopTrack, state => ({
    ...state,
    isPlaying: false,
    currentTime: 0
  })),
  on(TrackActions.updateProgress, (state, { currentTime, duration }) => ({
    ...state,
    currentTime,
    duration
  })),
  on(TrackActions.setVolume, (state, { volume }) => ({
    ...state,
    volume: volume
  })),
  on(TrackActions.setTrack, (state, { track }) => ({
    ...state,
    currentTrack: track
  }))
); 