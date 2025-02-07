import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> {
        return this.authService.currentUser().pipe(
            map(user => {
                if (!user) {
                    this.router.navigate(['/auth/login']);
                    return false;
                }
                return true;
            })
        );
    }
} 