import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackService } from '../../../core/services/track.service';
import { Store } from '@ngrx/store';
import * as TrackActions from '../../../core/store/track/track.actions';

@Component({
  selector: 'app-add-track-dialog',
  standalone: false,
  templateUrl: 'add-track-dialog.component.html'
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