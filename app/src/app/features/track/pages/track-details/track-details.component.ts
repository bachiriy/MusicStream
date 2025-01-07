import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Track } from '../../../../core/models/track.model';
import * as TrackActions from '../../../../core/store/track/track.actions';
import * as fromTrack from '../../../../core/store/track/track.selectors';

@Component({
  selector: 'app-track-details',
  template: `
    <div class="container mx-auto p-4" *ngIf="track$ | async as track">
      <div class="max-w-4xl mx-auto">
        <!-- Back Button -->
        <button 
          class="mb-6 flex items-center text-gray-400 hover:text-white"
          (click)="goBack()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Library
        </button>

        <!-- Track Info -->
        <div class="bg-surface rounded-lg p-6">
          <div class="flex flex-col md:flex-row gap-8">
            <!-- Cover Image -->
            <div class="w-full md:w-64 h-64 bg-gray-700 rounded-lg flex-shrink-0">
              <img 
                [src]="track.coverImage || 'assets/images/placeholder.png'" 
                [alt]="track.title"
                class="w-full h-full object-cover rounded-lg"
              >
            </div>

            <!-- Track Details -->
            <div class="flex-1">
              <div class="flex justify-between items-start">
                <div>
                  <h1 class="text-3xl font-bold mb-2">{{ track.title }}</h1>
                  <p class="text-xl text-gray-400 mb-4">{{ track.artist }}</p>
                </div>
                <button 
                  class="bg-primary text-white p-3 rounded-full hover:opacity-90"
                  (click)="playTrack(track)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </button>
              </div>

              <div class="mt-6 space-y-4">
                <div>
                  <h3 class="text-gray-400 text-sm">Category</h3>
                  <p class="text-lg">{{ track.category }}</p>
                </div>
                <div>
                  <h3 class="text-gray-400 text-sm">Added</h3>
                  <p class="text-lg">{{ track.addedDate | date:'medium' }}</p>
                </div>
                <div>
                  <h3 class="text-gray-400 text-sm">Description</h3>
                  <p class="text-lg">{{ track.description || 'No description available.' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TrackDetailsComponent implements OnInit {
  track$: Observable<Track | null>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.track$ = this.store.select(fromTrack.selectCurrentTrack);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const trackId = Number(params['id']);
      this.store.dispatch(TrackActions.loadTrack({ id: trackId }));
    });
  }

  playTrack(track: Track) {
    this.store.dispatch(TrackActions.playTrack({ track }));
  }

  goBack() {
    this.router.navigate(['/library']);
  }
} 