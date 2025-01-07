import { Component } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-add-track-button',
  standalone: false,
  template: `
    <button 
      (click)="openAddTrackDialog()"
      class="fixed bottom-24 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-opacity">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  `
})
export class AddTrackButtonComponent {
  constructor(private dialogService: DialogService) {}

  openAddTrackDialog() {
    this.dialogService.openAddTrackDialog();
  }
} 