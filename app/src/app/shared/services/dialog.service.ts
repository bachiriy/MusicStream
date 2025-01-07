import { Injectable, ComponentRef, ApplicationRef, createComponent } from '@angular/core';
import { AddTrackDialogComponent } from '../components/add-track-dialog/add-track-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogComponentRef: ComponentRef<AddTrackDialogComponent> | null = null;

  constructor(private appRef: ApplicationRef) {}

  openAddTrackDialog() {
    if (this.dialogComponentRef) {
      return;
    }

    // Create dialog component
    this.dialogComponentRef = createComponent(AddTrackDialogComponent, {
      environmentInjector: this.appRef.injector
    });

    // Attach to DOM
    document.body.appendChild(this.dialogComponentRef.location.nativeElement);
    
    // Attach to change detection
    this.appRef.attachView(this.dialogComponentRef.hostView);

    // Open dialog
    this.dialogComponentRef.instance.open();

    // Clean up when closed
    this.dialogComponentRef.instance.closed.subscribe(() => {
      if (this.dialogComponentRef) {
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.dialogComponentRef.destroy();
        this.dialogComponentRef = null;
      }
    });
  }
} 