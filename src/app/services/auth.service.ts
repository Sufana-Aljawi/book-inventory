import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode} from 'jwt-decode';
import { Users, AuthPaginatedResponse } from '../../models/Users';
import { AssignRole, AssignRoleResponse } from '../../models/AssignRole';
import { Login, LoginResponse } from '../../models/Login';
import { userRegistration, userRegistrationResponse } from 'src/models/userRegistration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/authentication`;

  // Optional: BehaviorSubject to track logged-in state
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Get users with pagination
  getUsers(page: number = 1, pageSize: number = 10): Observable<AuthPaginatedResponse<Users>> {
    return this.http.get<AuthPaginatedResponse<Users>>(`${this.apiUrl}/users?page=${page}&pageSize=${pageSize}`);
  }

  // Assign role to user
  assignRole(assignRole: AssignRole): Observable<AssignRoleResponse> {
    return this.http.post<AssignRoleResponse>(`${this.apiUrl}/assign-role`, assignRole);
  }

  // Login
  login(login: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, login).pipe(
      tap(res => {
        localStorage.setItem('token', res.token); // Save JWT
        this.loggedInSubject.next(true);
      })
    );
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }

  // Get JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Check login status
  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  // Decode JWT payload (optional helper)
  getDecodedToken(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (e) {
      return null;
    }
  }

  currentRoles(): string[] {
  const dec = this.getDecodedToken();
  if (!dec) return [];
  const raw = (dec.role ?? dec.roles) as string | string[] | undefined;
  return Array.isArray(raw) ? raw : raw ? [raw] : [];
}

  hasRole(role: string): boolean {
  return this.currentRoles().includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
  const mine = this.currentRoles();
  return roles.some(r => mine.includes(r));
  }

  // Private helper to initialize BehaviorSubject
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  register(payload: userRegistration): Observable<userRegistrationResponse> {
  return this.http.post<userRegistrationResponse>(`${this.apiUrl}/register`, payload);
  }


}
