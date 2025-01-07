import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { db } from './db.service';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  constructor() {}

  async addTrack(track: Partial<Track>, audioFile: File): Promise<Track> {
    try {
      // Validate track data
      if (!track.title) {
        throw new Error('Track title is required');
      }
      if (!track.artist) {
        throw new Error('Artist name is required');
      }
      if (!track.category) {
        throw new Error('Category is required');
      }
      if (!audioFile) {
        throw new Error('Audio file is required');
      }

      // Validate file type
      if (!audioFile.type.startsWith('audio/')) {
        throw new Error('Invalid file type. Please upload an audio file.');
      }

      // Add track to database
      const newTrack: Track = {
        id: Date.now(),
        title: track.title,
        artist: track.artist,
        category: track.category,
        description: track.description || '',
        coverImage: track.coverImage,
        duration: audioFile.size,
        addedDate: new Date(),
        audioUrl: ''
      };

      const trackId = await db.tracks.add(newTrack);
      await db.audioFiles.add({
        trackId: trackId,
        blob: audioFile
      });

      return { ...newTrack, id: trackId };
    } catch (error) {
      console.error('Error in TrackService.addTrack:', error);
      throw error;
    }
  }

  loadTracks(): Observable<Track[]> {
    return from(db.tracks.toArray()).pipe(
      map(tracks => tracks),
      catchError(error => {
        console.error('Error loading tracks:', error);
        throw error;
      })
    );
  }

  deleteTrack(trackId: number): Observable<void> {
    return from(this.deleteTrackFromDb(trackId));
  }

  private async deleteTrackFromDb(trackId: number): Promise<void> {
    await db.tracks.delete(trackId);
    await db.audioFiles.where('trackId').equals(trackId).delete();
  }
} 