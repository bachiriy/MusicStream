import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    template: `
    <header class="bg-indigo-600">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
            <div class="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                <div class="flex items-center">
                    <a routerLink="/" class="text-white text-xl font-bold">Music App</a>
                    <div class="ml-10 space-x-8">
                        <a routerLink="/library" class="text-base font-medium text-white hover:text-indigo-50">Library</a>
                        <a *ngIf="isAdmin" routerLink="/admin/users" class="text-base font-medium text-white hover:text-indigo-50">Users</a>
                    </div>
                </div>
                <button (click)="logout()" class="text-base font-medium text-white hover:text-indigo-50">
                    Logout
                </button>
            </div>
        </nav>
    </header>
    `
})
export class HeaderComponent {
    isAdmin = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.authService.currentUser$.subscribe(user => {
            this.isAdmin = user?.roles.includes('ADMIN') || false;
        });
    }

    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/auth/login']);
        });
    }
} 