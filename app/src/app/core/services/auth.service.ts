import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../env/env';

interface AuthCheck {
    authenticated: boolean;
    username: string;
}

interface AuthResponse {
    username: string;
}

interface CurrentUser {
    id: string;
    name: string;
    username: string;
    roles: {id: string, name: string}[];
    enable: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = `${environment.apiUrl}`;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    checkAuthStatus(): Observable<AuthCheck> {
        return this.http.get<AuthCheck>(`${this.API_URL}/check-auth`, {
            withCredentials: true
        }).pipe(
            catchError(this.handleError)
        );
    }

    login(credentials: any): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials, {
            withCredentials: true
        }).pipe(
            tap(() => this.router.navigate(['/library'])),
            catchError(this.handleError)
        );
    }

    register(userData: any): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/auth/register`, userData, {
            withCredentials: true
        }).pipe(
            tap(() => this.router.navigate(['/library'])),
            catchError(this.handleError)
        );
    }

    logout(): Observable<void> {
        return this.http.post<void>(`${this.API_URL}/auth/logout`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => this.router.navigate(['/auth/login'])),
            catchError(this.handleError)
        );  
    }

    currentUser(): Observable<CurrentUser> {
        return this.http.post<CurrentUser>(`${this.API_URL}/me`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => this.router.navigate(['/auth/login'])),
            catchError(this.handleError)
        );  
    }

    private handleError(error: HttpErrorResponse) {
        console.error('An error occurred:', error);
        return throwError(() => error);
    }
} 
