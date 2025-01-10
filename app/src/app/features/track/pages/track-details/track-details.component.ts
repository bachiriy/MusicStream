import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Track } from '../../../../core/models/track.model';
import * as TrackActions from '../../../../core/store/track/track.actions';
import * as fromTrack from '../../../../core/store/track/track.selectors';

@Component({
  selector: 'app-track-details',
  standalone: false,
  templateUrl: './track-details.component.html',
})
export class TrackDetailsComponent implements OnInit {
  track$: Observable<Track | null>;
  deleting: boolean = false;
  editMode: boolean = false;

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

  deleteTrack() {
    this.deleting = true;
  }
  closeAlert(touched: boolean){
    if (touched) {
      this.deleting = false;
    }
  }
  
  confirmDeletion(confirmed: boolean, trackId: number) {
    if (confirmed) {
      this.store.dispatch(TrackActions.deleteTrack({ trackId }))
      this.router.navigate(['/library'])
    }
  }
  
  editTrack(trackId: number) {
      console.log(trackId);
  }
} 
