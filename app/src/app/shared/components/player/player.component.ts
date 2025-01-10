import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { Track } from '../../../core/models/track.model';
import * as TrackActions from '../../../core/store/track/track.actions';
import * as fromTrack from '../../../core/store/track/track.selectors';
import { formatTime } from '../../utils/format-time';

@Component({
  selector: 'app-player',
  standalone: false,
  templateUrl: './player.component.html'  
})
export class PlayerComponent {
  currentTrack$: Observable<Track | null>;
  playbackState$: Observable<{
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
  }>;
  hasPreviousTrack$: Observable<boolean>;
  hasNextTrack$: Observable<boolean>;
  

  formatTime = formatTime;

  constructor(private store: Store) {
    this.currentTrack$ = this.store.select(fromTrack.selectCurrentTrack);
    this.playbackState$ = this.store.select(fromTrack.selectPlaybackState);
    this.hasPreviousTrack$ = this.store.select(fromTrack.selectHasPreviousTrack);
    this.hasNextTrack$ = this.store.select(fromTrack.selectHasNextTrack);
  }

  togglePause() {
    if (this.currentTrack$) {
      this.store.dispatch(TrackActions.pauseTrack());
    }
  }
  togglePlay(){
    if (this.currentTrack$) {
      this.store.dispatch(TrackActions.resumeTrack());
    }
  }

  onProgressClick(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    
    this.playbackState$.subscribe(state => {
      if (state.duration) {
        this.store.dispatch(TrackActions.seek({
          time: ratio * state.duration,
        }));
      }
    }).unsubscribe();
  }

  onVolumeClick(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    this.store.dispatch(TrackActions.setVolume({ volume: Math.max(0, Math.min(1, ratio)) }));
  }

  getProgress(current: number, total: number): number {
    return total ? (current / total) * 100 : 0;
  }

  previousTrack() {
    this.store.dispatch(TrackActions.previousTrack());
  }

  nextTrack() {
    this.store.dispatch(TrackActions.nextTrack());
  }
} 
