import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlbumService } from '../services/album.service';

@Injectable({
    providedIn: 'root'
})
export class LibraryResolver implements Resolve<boolean> {
    private lastCheck: Observable<boolean> | null = null;
    private lastCheckTime = 0;
    private readonly CACHE_TIME = 2000; // 2 seconds

    constructor(
        private albumService: AlbumService,
        private router: Router
    ) {}

    resolve(): Observable<boolean> {

        this.lastCheck = this.albumService.getAlbums().pipe(
            map(response => {
                console.log(response);
                
                // if (!response.authenticated) {
                //     console.log('Not authenticated resp: ', response);
                //     // this.router.navigate(['/auth/login']);
                //     return false;
                // }
                return true;
            }),
            catchError((err) => {
                // this.router.navigate(['/auth/login']);
                console.log('Not authenticated err: ', err);
                return of(false);
            }),
            shareReplay(1)
        );

        return this.lastCheck;
    }
} 