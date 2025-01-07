import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TrackDetailsComponent } from './pages/track-details/track-details.component';

const routes: Routes = [
  {
    path: ':id',
    component: TrackDetailsComponent
  }
];

@NgModule({
  declarations: [TrackDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TrackModule { } 