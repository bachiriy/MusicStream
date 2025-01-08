import { Component, Input } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-add-track-button',
  standalone: false,
  template: `
    <button 
      (click)="openAddTrackDialog()"
      [class.fixed]="content === null"
      [class.btn-primary]="content !== null"
      class="fixed bottom-24 mb-10 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-opacity">
      <div *ngIf="content === null">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <p *ngIf="content !== null" class=""> {{ content }}</p>
    </button>
  `
})
export class AddTrackButtonComponent {
  /** 
  * If no content, reuse sets all in the same position (don't do it).
  **/
  @Input() content: string | null = null
  constructor(private dialogService: DialogService) {}

  openAddTrackDialog() {
    this.dialogService.openAddTrackDialog();
  }
} 