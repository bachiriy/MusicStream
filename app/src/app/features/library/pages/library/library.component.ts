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
  templateUrl: './library.component.html'
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