import { Component, OnInit } from '@angular/core';
import { Album } from 'src/state/album/album.model';
import { AlbumService } from '../../core/services/album.service';

@Component({
    selector: 'app-library',
    template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            <div *ngFor="let album of albums" 
                 (click)="navigateToAlbum(album.id)"
                 class="group relative cursor-pointer">
                <div class="w-full bg-gray-200 rounded-lg overflow-hidden aspect-w-1 aspect-h-1">
                    <img [src]="album.coverUrl || 'assets/default-album.jpg'" 
                         class="w-full h-full object-center object-cover group-hover:opacity-75">
                </div>
                <div class="mt-4 flex justify-between">
                    <div>
                        <h3 class="text-sm text-gray-700">{{ album.title }}</h3>
                        <p class="mt-1 text-sm text-gray-500">{{ album.artist }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
export class LibraryComponent implements OnInit {
    albums: Album[] = [];

    constructor(private albumService: AlbumService) {}

    ngOnInit() {
        this.albumService.getAlbums().subscribe({
            next: (albums) => {
                console.log(albums);
                
                this.albums = albums;
            }
        });
    }

    navigateToAlbum(id: string) {
        // TODO: Implement album navigation
    }
} 