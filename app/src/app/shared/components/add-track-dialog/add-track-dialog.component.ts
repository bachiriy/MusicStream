import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackService } from '../../../core/services/track.service';
import { Store } from '@ngrx/store';
import * as TrackActions from '../../../core/store/track/track.actions';

@Component({
  selector: 'app-add-track-dialog',
  standalone: false,
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" *ngIf="isOpen">
      <div class="bg-surface p-6 rounded-lg w-full max-w-md mx-4">
        <h2 class="text-xl font-bold mb-4">Add Track</h2>
        
        <form [formGroup]="trackForm" (ngSubmit)="onSubmit()">
          <!-- Cover Image Upload -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Cover Image</label>
            <div 
              class="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
              (click)="imageInput.click()"
              [class.border-primary]="selectedImage"
            >
              <input
                #imageInput
                type="file"
                class="hidden"
                accept="image/*"
                (change)="onImageSelected($event)"
              >
              <div *ngIf="!selectedImage" class="text-gray-400">
                Click to select cover image
              </div>
              <img 
                *ngIf="imagePreview" 
                [src]="imagePreview" 
                class="w-32 h-32 mx-auto object-cover rounded"
                alt="Cover preview"
              >
            </div>
          </div>

          <!-- Audio File Upload -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Audio File</label>
            <div 
              class="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              (click)="fileInput.click()"
              [class.border-primary]="selectedFile">
              <input
                #fileInput
                type="file"
                class="hidden"
                accept=".mp3,.wav,.ogg"
                (change)="onFileSelected($event)"
              >
              <div class="text-gray-400">
                {{ selectedFile ? selectedFile.name : 'Click to select an audio file' }}
              </div>
            </div>
          </div>

          <!-- Title -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Track Title</label>
            <input
              type="text"
              formControlName="title"
              class="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-primary focus:outline-none"
              placeholder="Track Title"
            >
          </div>

          <!-- Artist -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Artist Name</label>
            <input
              type="text"
              formControlName="artist"
              class="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-primary focus:outline-none"
              placeholder="Artist Name"
            >
          </div>

          <!-- Category -->
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Category</label>
            <select
              formControlName="category"
              class="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-primary focus:outline-none"
            >
              <option value="">Select a category</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="rap">Rap</option>
              <option value="cha3bi">Cha3bi</option>
              <option value="other">Autre</option>
            </select>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <label class="block text-sm font-medium mb-2">Description (optional)</label>
            <textarea
              formControlName="description"
              class="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-primary focus:outline-none"
              rows="3"
              placeholder="Description of the track"
            ></textarea>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              class="px-4 py-2 rounded text-gray-400 hover:text-white"
              (click)="close()"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn-primary"
              [disabled]="!trackForm.valid || !selectedFile"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AddTrackDialogComponent {
  @Output() closed = new EventEmitter<void>();
  isOpen = false;
  trackForm: FormGroup;
  selectedFile: File | null = null;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.trackForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      artist: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.selectedImage = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file.type.startsWith('audio/')) {
        this.selectedFile = file;
        this.error = null;
      } else {
        this.error = 'Please select a valid audio file';
        console.error('Invalid file type:', file.type);
      }
    }
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.trackForm.reset();
    this.selectedFile = null;
    this.closed.emit();
  }

  async onSubmit() {
    if (this.trackForm.valid && this.selectedFile) {
      try {
        const trackData = {
          ...this.trackForm.value,
          coverImage: this.imagePreview
        };

        this.store.dispatch(TrackActions.addTrack({ 
          track: trackData, 
          audioFile: this.selectedFile 
        }));
        
        this.close();
      } catch (error) {
        console.error('Error submitting track:', error);
        this.error = error instanceof Error ? error.message : 'An unknown error occurred';
      }
    } else {
      this.error = 'Please fill in all required fields and select an audio file';
      console.error('Form validation failed:', {
        formErrors: this.trackForm.errors,
        formValue: this.trackForm.value,
        hasFile: !!this.selectedFile
      });
    }
  }
} 