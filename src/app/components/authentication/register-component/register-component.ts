import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { userRegistration, userRegistrationResponse } from 'src/models/userRegistration';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './register-component.html',
  styleUrls: ['./register-component.css'],
})
export class RegisterComponent {
  registerData: userRegistration = {
    username: '',
    fullName: '',
    password: ''
  };

  isLoading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any): void {
    if (form.invalid) return;

    this.errorMessage = null;
    this.successMessage = null;
    this.isLoading = true;

    this.authService.register(this.registerData).subscribe({
      next: (res: userRegistrationResponse) => {
        this.isLoading = false;
        this.successMessage = res.message ?? 'Registered successfully.';

        // Redirect to login page after short delay
        setTimeout(() => this.router.navigate(['/login']), 800);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }
}
