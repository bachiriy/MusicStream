import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataResolver implements Resolve<any> {
    constructor(private authService: AuthService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        // Pre-load user data and other necessary data
        return this.authService.checkAuthStatus().pipe(
            take(1),
            catchError(() => of(null))
        );
    }
} 