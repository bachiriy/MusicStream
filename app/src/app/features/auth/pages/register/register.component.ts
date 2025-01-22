import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/models/user.module';
import * as AuthActions from 'src/app/core/store/auth/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  async onSubmit() {
    if (this.userForm.valid) {
      try {
        // const userData: Partial<User> = {
        //   ...this.userForm.value,
        // };

        this.store.dispatch(AuthActions.register({ 
          user: this.userForm.value, 
        }));
        
      } catch (error) {
        console.error('Error registering user:', error);
        this.error = error instanceof Error ? error.message : 'An unknown error occurred';
      }
    } else {
      this.error = 'Please fill in all required fields';
      console.error('Form validation failed:', {
        formErrors: this.userForm.errors,
        formValue: this.userForm.value,
      });
    }
  }
}
