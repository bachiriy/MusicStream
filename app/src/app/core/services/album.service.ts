import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../env/env';
import { Album } from 'src/state/album/album.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    // private readonly API_URL = `${environment.apiUrl}/user`;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    getAlbums(): Observable<Album[]> {
        return this.http.get<Album[]>(`${environment.apiUrl}/user/albums`, {
            withCredentials: true,

        }).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    console.log('ERROR: ', error);
                    // this.router.navigate(['/auth/login']);
                }
                return throwError(() => error);
            })
        );
    }
} 