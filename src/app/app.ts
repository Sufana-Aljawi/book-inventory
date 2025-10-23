import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class App {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']); // redirect after logout
  }
}
