export interface Track {
  id: number;
  title: string;
  artist: string;
  description?: string;
  duration: number;
  category: string;
  coverImage?: string;
  audioUrl: string;
  addedDate: Date;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

export enum LoadingState {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success'
} 
