import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Login } from '../../../../models/Login';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule ],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css'],
  standalone : true
})
export class LoginComponent {
  loginData: Login = {
    username: '',
    password: ''
  };

  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = null;
    this.isLoading = true;

    this.authService.login(this.loginData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']); // redirect to dashboard/home after login
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.message || 'Invalid username or password';
      }
    });
  }
}
