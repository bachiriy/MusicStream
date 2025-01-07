import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { PlayerComponent } from './components/player/player.component';
import { AddTrackButtonComponent } from './components/add-track-button/add-track-button.component';
import { AddTrackDialogComponent } from './components/add-track-dialog/add-track-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PlayerComponent,
    AddTrackButtonComponent,
    AddTrackDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    PlayerComponent,
    AddTrackButtonComponent
  ]
})
export class SharedModule { } 