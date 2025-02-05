import { Injectable } from '@angular/core';
import { 
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        const requiredRole = route.data['role'];

        return this.authService.currentUser$.pipe(
            take(1),
            map(user => {
                if (user && user.roles.includes(requiredRole)) {
                    return true;
                }
                
                // Redirect to home if user doesn't have required role
                this.router.navigate(['/']);
                return false;
            })
        );
    }
} 