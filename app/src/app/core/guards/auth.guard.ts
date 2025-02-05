import { Injectable } from '@angular/core';
import { 
    CanActivate, 
    CanActivateChild,
    Router, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot 
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
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
                    return true;
                }
                
                // Store attempted URL for redirecting after login
                this.router.navigate(['/auth/login'], {
                    queryParams: { returnUrl: state.url }
                });
                return false;
            })
        );
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.canActivate(route, state);
    }
} 