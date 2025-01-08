import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header></app-header>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
      <app-player></app-player>
    </div>
  `
})
export class AppComponent {

  constructor(private router: Router, private title: Title){
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url.split('/')[1];
      this.title.setTitle(`MusicStream - ${currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1)}`)
    })
  }

} 