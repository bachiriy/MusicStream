import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Track } from '../models/track.model';
import { db } from './db.service';
import * as TrackActions from '../store/track/track.actions';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private audio: HTMLAudioElement;

  constructor(private store: Store) {
    this.audio = new Audio();
    this.setupAudioListeners();
  }

  private setupAudioListeners() {
    this.audio.addEventListener('timeupdate', () => {
      this.store.dispatch(TrackActions.updateProgress({
        currentTime: this.audio.currentTime,
        duration: this.audio.duration
      }));
    });

    this.audio.addEventListener('ended', () => {
      this.store.dispatch(TrackActions.nextTrack());
    });

    this.audio.addEventListener('play', () => {
      this.store.dispatch(TrackActions.resumeTrack());
    });

    this.audio.addEventListener('pause', () => {
      this.store.dispatch(TrackActions.pauseTrack());
    });
  }

  async playTrack(track: Track) {
    try {
      const audioFile = await db.audioFiles.where('trackId').equals(track.id).first();
      if (!audioFile) throw new Error('Audio file not found');

      const audioUrl = URL.createObjectURL(audioFile.blob);
      this.audio.src = audioUrl;
      await this.audio.play();
    } catch (error) {
      console.error('Error playing track:', error);
      throw error;
    }
  }

  pauseTrack() {
    this.audio.pause();
  }

  resumeTrack() {
    this.audio.play();
  }

  seek(time: number) { // in s
    this.audio.currentTime = time;
  }

  setVolume(volume: number) {
    this.audio.volume = volume;
  }
} 
