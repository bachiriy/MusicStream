import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, from } from 'rxjs';
import { map, mergeMap, catchError, tap, withLatestFrom } from 'rxjs/operators';
import * as TrackActions from './track.actions';
import * as fromTrack from './track.selectors';
import { TrackService } from '../../services/track.service';
import { PlayerService } from '../../services/player.service';

@Injectable()
export class TrackEffects {
  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      mergeMap(() => this.trackService.loadTracks()
        .pipe(
          map(tracks => TrackActions.loadTracksSuccess({ tracks })),
          catchError(error => of(TrackActions.loadTracksFailure({ error })))
        ))
    )
  );

  playTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.playTrack),
      tap(({ track }) => this.playerService.playTrack(track))
    ),
    { dispatch: false }
  );

  pauseTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.pauseTrack),
      tap(() => this.playerService.pauseTrack())
    ),
    { dispatch: false }
  );

  resumeTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.resumeTrack),
      withLatestFrom(this.store.select(fromTrack.selectCurrentTrack)),
      tap(([_, track]) => {
        if (track) {
          this.playerService.resumeTrack();
        }
      })
    ),
    { dispatch: false }
  );

  seek$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.seek),
      tap(({ time }) => this.playerService.seek(time))
    ),
    { dispatch: false }
  );

  setVolume$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.setVolume),
      tap(({ volume }) => this.playerService.setVolume(volume))
    ),
    { dispatch: false }
  );

  previousTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.previousTrack),
      withLatestFrom(
        this.store.select(fromTrack.selectAllTracks),
        this.store.select(fromTrack.selectCurrentTrackIndex)
      ),
      map(([_, tracks, currentIndex]) => {
        if (currentIndex > 0) {
          return TrackActions.playTrack({ track: tracks[currentIndex - 1] });
        }
        return TrackActions.stopTrack();
      })
    )
  );

  nextTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.nextTrack),
      withLatestFrom(
        this.store.select(fromTrack.selectAllTracks),
        this.store.select(fromTrack.selectCurrentTrackIndex)
      ),
      map(([_, tracks, currentIndex]) => {
        if (currentIndex < tracks.length - 1) {
          return TrackActions.playTrack({ track: tracks[currentIndex + 1] });
        }
        return TrackActions.stopTrack();
      })
    )
  );

  loadTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.loadTrack),
      withLatestFrom(this.store.select(fromTrack.selectAllTracks)),
      map(([{ id }, tracks]) => {
        const track = tracks.find(t => t.id === id);
        if (track) {
          return TrackActions.playTrack({ track });
        }
        return TrackActions.loadTracksFailure({ error: 'Track not found' });
      })
    )
  );

  addTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.addTrack),
      mergeMap(({ track, audioFile }) =>
        from(this.trackService.addTrack(track, audioFile)).pipe(
          map(newTrack => TrackActions.addTrackSuccess({ track: newTrack })),
          catchError(error => {
            console.error('Error adding track:', error);
            return of(TrackActions.addTrackFailure({ error }));
          })
        )
      )
    )
  );

  addTrackSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.addTrackSuccess),
      map(() => TrackActions.loadTracks())
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private trackService: TrackService,
    private playerService: PlayerService
  ) {}
} 