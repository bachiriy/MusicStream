import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-alert',
  templateUrl: './confirmation-alert.component.html'
})
export class ConfirmationAlertComponent {
    @Input() title: string = 'Delete Item'; 
    @Input() message: string = 'Are you sure you want to delete this item?';

    @Output() touched = new EventEmitter<boolean>();
    @Output() confirmed = new EventEmitter<boolean>();

    close() {
        this.touched.emit(true); 

    }


    cancel() {
        this.touched.emit(true); 

    }

    confirm() {
        this.touched.emit(true); 
        this.confirmed.emit(true); 

    }
}
