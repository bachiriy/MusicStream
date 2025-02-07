import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {
    private lastCheck: Observable<boolean> | null = null;
    private lastCheckTime = 0;
    private readonly CACHE_TIME = 2000; // 2 seconds

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    resolve(): Observable<boolean> {
        const now = Date.now();
        if (this.lastCheck && (now - this.lastCheckTime < this.CACHE_TIME)) {
            return this.lastCheck;
        }

        this.lastCheckTime = now;
        this.lastCheck = this.authService.checkAuthStatus().pipe(
            map(response => {
                if (response.authenticated) {
                    // If authenticated, redirect to library
                    this.router.navigate(['/library']);
                    return false;
                }
                return true;
            }),
            catchError(() => of(true)),
            shareReplay(1)
        );

        return this.lastCheck;
    }
} 