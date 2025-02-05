import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audio: HTMLAudioElement;
  private currentSongSubject = new BehaviorSubject<Song | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private volumeSubject = new BehaviorSubject<number>(1);
  private progressSubject = new BehaviorSubject<number>(0);

  currentSong$ = this.currentSongSubject.asObservable();
  isPlaying$ = this.isPlayingSubject.asObservable();
  volume$ = this.volumeSubject.asObservable();
  progress$ = this.progressSubject.asObservable();

  constructor() {
    this.audio = new Audio();
    this.setupAudioListeners();
  }

  private setupAudioListeners(): void {
    this.audio.addEventListener('timeupdate', () => {
      const progress = (this.audio.currentTime / this.audio.duration) * 100;
      this.progressSubject.next(progress);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlayingSubject.next(false);
    });

    this.audio.addEventListener('error', (e) => {
      console.error('Audio playback error:', e);
      this.isPlayingSubject.next(false);
    });
  }

  play(song?: Song): void {
    if (!song && !this.currentSongSubject.value) {
      console.warn('No song selected to play');
      return;
    }

    if (song) {
      const audioUrl = `/api/user/songs/${song.audioFileId}/stream`;
      
      if (this.currentSongSubject.value?.id !== song.id) {
        this.audio.src = audioUrl;
        this.currentSongSubject.next(song);
      }
    }
    
    this.audio.play()
      .then(() => {
        this.isPlayingSubject.next(true);
      })
      .catch(error => {
        console.error('Error playing audio:', error);
        this.isPlayingSubject.next(false);
      });
  }

  pause(): void {
    this.audio.pause();
    this.isPlayingSubject.next(false);
  }

  setVolume(volume: number): void {
    this.audio.volume = volume;
    this.volumeSubject.next(volume);
  }

  seek(progress: number): void {
    if (!this.audio.duration) {
      return;
    }
    const time = (progress / 100) * this.audio.duration;
    this.audio.currentTime = time;
  }

  cleanup(): void {
    this.audio.pause();
    this.audio.src = '';
    this.currentSongSubject.next(null);
    this.isPlayingSubject.next(false);
  }
} 