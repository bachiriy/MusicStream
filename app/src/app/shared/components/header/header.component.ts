import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  template: `
    <header class="bg-surface border-b border-gray-700">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-primary">MusicStream</h1>
          </div>

          <!-- Navigation -->
          <nav class="flex items-center space-x-4">
            <a 
              routerLink="/library" 
              routerLinkActive="text-primary"
              class="text-gray-300 hover:text-white transition-colors">
              Library
            </a>
          </nav>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  constructor(private router: Router) {}
} 