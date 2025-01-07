import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Track } from '../../../core/models/track.model';
import * as TrackActions from '../../../core/store/track/track.actions';
import * as fromTrack from '../../../core/store/track/track.selectors';
import { formatTime } from '../../utils/format-time';

@Component({
  selector: 'app-player',
  standalone: false,
  template: `
    <div class="fixed bottom-0 w-full bg-surface border-t border-gray-700 p-4">
      <div class="container mx-auto flex items-center justify-between">
        <!-- Track Info -->
        <div class="flex items-center space-x-4 w-1/4">
          <div class="w-14 h-14 bg-gray-700 rounded">
            <img 
              *ngIf="(currentTrack$ | async)?.coverImage"
              [src]="(currentTrack$ | async)?.coverImage"
              class="w-full h-full object-cover rounded"
              alt="Cover"
            >
          </div>
          <div class="truncate">
            <h4 class="font-medium truncate">
              {{ (currentTrack$ | async)?.title || 'No track selected' }}
            </h4>
            <p class="text-sm text-gray-400 truncate">
              {{ (currentTrack$ | async)?.artist || '' }}
            </p>
          </div>
        </div>

        <!-- Player Controls -->
        <div class="flex flex-col items-center w-2/4">
          <div class="flex items-center space-x-6">
            <button 
              class="text-gray-400 hover:text-white"
              (click)="previousTrack()"
              [class.opacity-50]="!(hasPreviousTrack$ | async)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              class="bg-white rounded-full p-2 hover:scale-105 transition-transform"
              (click)="togglePlayPause()"
              [class.opacity-50]="!(currentTrack$ | async)"
            >
              <svg *ngIf="!(playbackState$ | async)?.isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
              <svg *ngIf="(playbackState$ | async)?.isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />
              </svg>
            </button>
            <button 
              class="text-gray-400 hover:text-white"
              (click)="nextTrack()"
              [class.opacity-50]="!(hasNextTrack$ | async)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <!-- Progress Bar -->
          <div class="w-full mt-2 flex items-center space-x-3">
            <span class="text-xs text-gray-400">
              {{ formatTime((playbackState$ | async)?.currentTime || 0) }}
            </span>
            <div 
              class="flex-1 h-2 bg-gray-700 rounded-full cursor-pointer relative group"
              (click)="onProgressClick($event)"
            >
              <div 
                class="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
                [style.width.%]="getProgress((playbackState$ | async)?.currentTime || 0, (playbackState$ | async)?.duration || 0)"
              ></div>
              <div class="absolute inset-y-0 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                   [style.left.%]="getProgress((playbackState$ | async)?.currentTime || 0, (playbackState$ | async)?.duration || 0)">
              </div>
            </div>
            <span class="text-xs text-gray-400">
              {{ formatTime((playbackState$ | async)?.duration || 0) }}
            </span>
          </div>
        </div>

        <!-- Volume Control -->
        <div class="flex items-center space-x-3 w-1/4 justify-end">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l3.75-3.75M12 18l-3.75-3.75M12 6L8.25 9.75M12 6l3.75 3.75" />
          </svg>
          <div 
            class="w-24 h-1 bg-gray-700 rounded-full cursor-pointer"
            (click)="onVolumeClick($event)"
          >
            <div 
              class="h-full bg-primary rounded-full"
              [style.width.%]="((playbackState$ | async)?.volume || 0) * 100"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `
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

  togglePlayPause() {
    this.store.select(fromTrack.selectCurrentTrack).subscribe(track => {
      if (track) {
        if (this.playbackState$) {
          this.store.dispatch(TrackActions.pauseTrack());
        } else {
          this.store.dispatch(TrackActions.playTrack({ track }));
        }
      }
    }).unsubscribe();
  }

  onProgressClick(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    
    this.playbackState$.subscribe(state => {
      if (state.duration) {
        this.store.dispatch(TrackActions.updateProgress({
          currentTime: ratio * state.duration,
          duration: state.duration
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