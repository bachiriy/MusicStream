export interface Album {
    id: string;
    title: string;
    artist: string;
    coverUrl?: string;
}

export interface AlbumState {
    albums: Album[];
    loading: boolean;
    error: string | null;
} 