import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model';
import { environment } from '../../../env/env';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = `${environment.apiUrl}/api/auth`;
    private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        this.checkAuthStatus().subscribe();
    }

    checkAuthStatus(): Observable<AuthResponse | null> {
        return this.http.get<AuthResponse>(`${this.API_URL}/me`, {
            withCredentials: true
        }).pipe(
            tap(user => this.currentUserSubject.next(user)),
            catchError(() => {
                this.currentUserSubject.next(null);
                return of(null);
            })
        );
    }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials, {
            withCredentials: true // Important for cookies
        }).pipe(
            tap(response => {
                this.currentUserSubject.next(response);
            })
        );
    }

    register(userData: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData, {
            withCredentials: true
        }).pipe(
            tap(response => {
                this.currentUserSubject.next(response);
            })
        );
    }

    logout(): Observable<void> {
        return this.http.post<void>(`${this.API_URL}/logout`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => {
                this.currentUserSubject.next(null);
            })
        );
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }

    getCurrentUser(): AuthResponse | null {
        return this.currentUserSubject.value;
    }
} 
