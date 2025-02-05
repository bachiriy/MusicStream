import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { albumReducer } from './state/album/album.reducer';
import { authReducer } from './state/auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { LoginComponent } from './components/auth/login/login.component';

@NgModule({
  declarations: [
    // AudioPlayerComponent,
    LoginComponent
  ],
  imports: [
    AudioPlayerComponent,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      albums: albumReducer,
      auth: authReducer
    }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { } 