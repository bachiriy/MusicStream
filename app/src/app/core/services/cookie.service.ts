import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CookieService {
    getAuthCookie(): string | null {
        console.log('cookie : ', this.getCookie('Authorization'));
        
        return this.getCookie('Authorization');
    }

    private getCookie(name: string): string | null {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift() || null;
        }
        return null;
    }
} 
