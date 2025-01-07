import Dexie, { Table } from 'dexie';
import { Track } from '../models/track.model';

export interface AudioFile {
  trackId: number;
  blob: Blob;
}

export class AppDatabase extends Dexie {
  tracks!: Table<Track, number>;
  audioFiles!: Table<AudioFile, number>;

  constructor() {
    super('MusicStreamDB');
    this.version(1).stores({
      tracks: '++id, title, artist, category, addedDate',
      audioFiles: '++id, trackId'
    });
  }
}

export const db = new AppDatabase(); 