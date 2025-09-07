import { Component, OnInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,            // Use standalone if using `imports`
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']    // corrected property name
})
export class HomeComponent implements OnInit {

  @HostBinding('class') themeClass: string = '';

  constructor() { }

  ngOnInit(): void {
    this.setThemeByTime();
  }

  // Example: change theme based on time
  setThemeByTime() {
    const hour = new Date().getHours();
    this.themeClass = (hour >= 6 && hour < 18) ? 'day-theme' : 'night-theme';
  }
}
