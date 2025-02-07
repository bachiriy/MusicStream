import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> {
        return this.authService.currentUser$.pipe(
            map(user => {
                if (user) {
                    
                    this.router.navigate(['/library']);
                    return false;
                }
                console.log('user: ', user);
                
                return true;
            })
        );
    }
} 