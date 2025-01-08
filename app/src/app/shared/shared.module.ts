import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { PlayerComponent } from './components/player/player.component';
import { AddTrackButtonComponent } from './components/add-track-button/add-track-button.component';
import { AddTrackDialogComponent } from './components/add-track-dialog/add-track-dialog.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ConfirmationAlertComponent } from './components/confirmation-alert/confirmation-alert.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PlayerComponent,
    AddTrackButtonComponent,
    AddTrackDialogComponent,
    SpinnerComponent,
    ConfirmationAlertComponent
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
    AddTrackButtonComponent,
    SpinnerComponent,
    ConfirmationAlertComponent
  ]
})
export class SharedModule { } 