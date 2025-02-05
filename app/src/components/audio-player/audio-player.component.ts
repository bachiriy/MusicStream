import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs/operators';
import { AudioPlayerService } from '../../services/audio-player.service';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-0 w-full bg-gray-900 text-white p-4">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button (click)="togglePlay()">
            <i class="fas" [class.fa-pause]="isPlaying$ | async" [class.fa-play]="!(isPlaying$ | async)"></i>
          </button>
          <div class="flex flex-col">
            <span class="font-bold">{{ (currentSong$ | async)?.title }}</span>
            <span class="text-sm text-gray-400">{{ (currentSong$ | async)?.artist }}</span>
          </div>
        </div>
        
        <div class="flex-1 mx-4">
          <input 
            type="range" 
            [value]="(progress$ | async) || 0"
            (input)="onSeek($event)"
            class="w-full"
            min="0"
            max="100"
          >
        </div>
        
        <div class="flex items-center space-x-4">
          <i class="fas fa-volume-up"></i>
          <input 
            type="range"
            [value]="(volume$ | async) || 1"
            (input)="onVolumeChange($event)"
            class="w-24"
            min="0"
            max="1"
            step="0.1"
          >
        </div>
      </div>
    </div>
  `
})
export class AudioPlayerComponent implements OnInit {
  currentSong$ = this.playerService.currentSong$;
  isPlaying$ = this.playerService.isPlaying$;
  volume$ = this.playerService.volume$;
  progress$ = this.playerService.progress$;

  constructor(private playerService: AudioPlayerService) {}

  ngOnInit(): void {}

  togglePlay(): void {
    this.isPlaying$.pipe(take(1)).subscribe(isPlaying => {
      if (isPlaying) {
        this.playerService.pause();
      } else {
        // Need to handle the case where no song is selected
        const currentSong = this.currentSong$.pipe(take(1)).subscribe(song => {
          if (song) {
            this.playerService.play(song);
          }
        });
      }
    });
  }

  onVolumeChange(event: Event): void {
    const volume = +(event.target as HTMLInputElement).value;
    this.playerService.setVolume(volume);
  }

  onSeek(event: Event): void {
    const progress = +(event.target as HTMLInputElement).value;
    this.playerService.seek(progress);
  }
} 