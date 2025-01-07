import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Track } from '../../../../core/models/track.model';
import * as TrackActions from '../../../../core/store/track/track.actions';
import * as fromTrack from '../../../../core/store/track/track.selectors';
import { PlaybackState } from '../../../../core/models/track.model';

@Component({
  selector: 'app-library',
  standalone: false,
  template: `
    <div class="container mx-auto p-4">
      <!-- Search Bar -->
      <div class="mb-6 flex items-center space-x-4">
        <input 
          type="text" 
          placeholder="Search tracks..."
          [ngModel]="searchTerm"
          (ngModelChange)="onSearch($event)"
          class="flex-1 p-3 rounded-lg bg-surface text-text border border-gray-700 focus:outline-none focus:border-primary"
        >
        <select 
          [ngModel]="selectedCategory"
          (ngModelChange)="onCategoryChange($event)"
          class="p-3 rounded-lg bg-surface text-text border border-gray-700 focus:outline-none focus:border-primary"
        >
          <option value="">All Categories</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="rap">Rap</option>
          <option value="other">Other</option>
        </select>
      </div>

      <!-- Tracks List -->
      <div class="space-y-4">
        <!-- Empty State -->
        <div *ngIf="(filteredTracks$ | async)?.length === 0" class="text-center py-10">
          <p class="text-gray-400 mb-4">No tracks found</p>
          <button class="btn-primary" (click)="openAddTrackDialog()">
            Add Track
          </button>
        </div>

        <!-- Track Items -->
        <div *ngFor="let track of filteredTracks$ | async" 
          class="bg-surface p-4 rounded-lg hover:bg-opacity-80 transition-colors flex items-center space-x-4"
          [class.border-primary]="(currentTrack$ | async)?.id === track.id"
        >
          <!-- Track Thumbnail -->
          <div class="w-16 h-16 bg-gray-700 rounded flex-shrink-0 relative">
            <img 
              [src]="track.coverImage || 'assets/images/placeholder.png'" 
              [alt]="track.title"
              class="w-full h-full object-cover rounded"
            >
            <div *ngIf="(currentTrack$ | async)?.id === track.id" 
                 class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div *ngIf="(playbackState$ | async)?.isPlaying" 
                   class="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>

          <!-- Track Info -->
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold truncate">{{ track.title }}</h3>
            <p class="text-sm text-gray-400 truncate">{{ track.artist }}</p>
            <p class="text-xs text-gray-500">{{ track.category }}</p>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-3">
            <button 
              class="p-2 rounded-full hover:bg-gray-700 transition-colors"
              (click)="playTrack(track)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </button>
            <button 
              class="p-2 rounded-full hover:bg-gray-700 transition-colors"
              (click)="viewTrackDetails(track)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Add Track Button -->
      <app-add-track-button></app-add-track-button>
    </div>
  `
})
export class LibraryComponent implements OnInit {
  tracks$: Observable<Track[]>;
  filteredTracks$!: Observable<Track[]>;
  loading$: Observable<boolean>;
  searchTerm = '';
  selectedCategory = '';
  currentTrack$: Observable<Track | null>;
  playbackState$: Observable<PlaybackState>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.tracks$ = this.store.select(fromTrack.selectAllTracks);
    this.loading$ = this.store.select(fromTrack.selectLoading);
    this.setupFilteredTracks();
    this.currentTrack$ = this.store.select(fromTrack.selectCurrentTrack);
    this.playbackState$ = this.store.select(fromTrack.selectPlaybackState);
  }

  private setupFilteredTracks() {
    this.filteredTracks$ = this.tracks$.pipe(
      map(tracks => {
        return tracks.filter(track => {
          const matchesSearch = this.searchTerm.toLowerCase() === '' ||
            track.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            track.artist.toLowerCase().includes(this.searchTerm.toLowerCase());

          const matchesCategory = this.selectedCategory === '' ||
            track.category === this.selectedCategory;

          return matchesSearch && matchesCategory;
        });
      })
    );
  }

  ngOnInit() {
    this.store.dispatch(TrackActions.loadTracks());
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.setupFilteredTracks();
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.setupFilteredTracks();
  }

  playTrack(track: Track) {
    this.store.dispatch(TrackActions.playTrack({ track }));
  }

  viewTrackDetails(track: Track) {
    this.router.navigate(['/track', track.id]);
  }

  openAddTrackDialog() {
    // This is handled by the AddTrackButton component
  }
} 