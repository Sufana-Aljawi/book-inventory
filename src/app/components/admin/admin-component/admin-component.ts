import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Users, AuthPaginatedResponse } from '../../../../models/Users';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssignRole, AssignRoleResponse } from '../../../../models/AssignRole';

@Component({
  selector: 'app-admin-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-component.html',
  styleUrls: ['./admin-component.css'],
  standalone : true
})
export class AdminComponent implements OnInit{
  users : Users[] = [];
  page = 1;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;
   // Role assignment inputs
  selectedUserEmail: string = '';
  selectedRole: 'Admin' | 'Editor' | 'Viewer' | '' = '';
  roles: string[] = ['Admin', 'Editor', 'Viewer'];
  successMessage: string = '';
  errorMessage: string = '';

constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

 loadUsers() {
    this.authService.getUsers(this.page, this.pageSize).subscribe({
      next: res => {
        this.users = res.data;
        this.totalCount = res.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
      },
      error: err => console.error('Error loading users:', err)
    });
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadUsers();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }

  
  assignRoleToUser() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.selectedUserEmail || !this.selectedRole) return;

    const dto: AssignRole = {
      email: this.selectedUserEmail,
      role: this.selectedRole
    };

    this.authService.assignRole(dto).subscribe({
      next: res => {
        this.successMessage = res.message;
        this.selectedUserEmail = '';
        this.selectedRole = '';
        this.loadUsers(); // refresh user list with updated role
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Failed to assign role';
      }
    });
  }
}