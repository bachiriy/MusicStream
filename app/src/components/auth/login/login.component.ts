import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { login } from '../../../state/auth/auth.actions';
import { AppState } from '../../../state/app.state';

@Component({
  selector: 'app-login',
  template: `
    <div class="flex min-h-screen">
      <!-- Left side - Image -->
      <div class="hidden lg:flex lg:w-1/2 bg-indigo-600">
        <div class="flex items-center justify-center w-full h-full">
          <img 
            src="assets/images/music-banner.jpg" 
            alt="Music streaming banner" 
            class="object-cover w-full h-full"
          >
        </div>
      </div>

      <!-- Right side - Login Form -->
      <div class="flex flex-col justify-center w-full lg:w-1/2 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full mx-auto">
          <div class="text-center mb-10">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
            <p class="text-gray-600">Please sign in to your account</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- username field -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div class="mt-1 relative">
                <input 
                  id="username" 
                  type="username" 
                  formControlName="username"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  [class.border-red-500]="loginForm.get('username')?.touched && loginForm.get('username')?.invalid"
                >
                <div *ngIf="loginForm.get('username')?.touched && loginForm.get('username')?.errors" 
                     class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <p *ngIf="loginForm.get('username')?.touched && loginForm.get('username')?.errors?.['required']" 
                 class="mt-2 text-sm text-red-600">
                username is required
              </p>
              <p *ngIf="loginForm.get('username')?.touched && loginForm.get('username')?.errors?.['username']" 
                 class="mt-2 text-sm text-red-600">
                Please enter a valid username address
              </p>
            </div>

            <!-- Password field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="mt-1 relative">
                <input 
                  id="password" 
                  type="password" 
                  formControlName="password"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  [class.border-red-500]="loginForm.get('password')?.touched && loginForm.get('password')?.invalid"
                >
                <div *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.errors" 
                     class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <p *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['required']" 
                 class="mt-2 text-sm text-red-600">
                Password is required
              </p>
              <p *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['minlength']" 
                 class="mt-2 text-sm text-red-600">
                Password must be at least 6 characters
              </p>
            </div>

            <!-- Remember me & Forgot password -->
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input 
                  id="remember-me" 
                  type="checkbox" 
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                >
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <!-- Error message -->
            <div *ngIf="error$ | async as error" 
                 class="bg-red-50 border-l-4 border-red-400 p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-red-700">{{ error }}</p>
                </div>
              </div>
            </div>

            <!-- Submit button -->
            <div>
              <button 
                type="submit" 
                [disabled]="loginForm.invalid || (loading$ | async)"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span *ngIf="loading$ | async" class="mr-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                Sign in
              </button>
            </div>

            <!-- Sign up link -->
            <div class="text-sm text-center">
              <span class="text-gray-600">Don't have an account?</span>
              <a routerLink="/register" class="ml-1 font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loading$ = this.store.select(state => state.auth.loading);
    this.error$ = this.store.select(state => state.auth.error);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(login({ username, password }));
    }
  }
} 