import { Injectable } from '@angular/core';
import { 
    CanActivate, 
    Router, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot 
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.currentUser$.pipe(
            take(1),
            map(user => {
                if (user) {
                    // If user is logged in, redirect to library
                    this.router.navigate(['/library']);
                    return false;
                }
                return true;
            })
        );
    }
} 