import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';
import { AuthResponse } from '../models/auth-response';
import { CurrentUser } from '../models/current-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly authApiUrl = 'http://localhost:8080/api/auth';
  private readonly usersApiUrl = 'http://localhost:8080/api/users';

  private readonly _token = signal<string | null>(localStorage.getItem('token'));
  private readonly _currentUser = signal<CurrentUser | null>(null);

  readonly token = this._token.asReadonly();
  readonly currentUser = this._currentUser.asReadonly();

  readonly isLoggedIn = computed(() => this._token() !== null);

  readonly isAdmin = computed(() => {
    return this._currentUser()?.role === 'ADMIN';
  });

  constructor() {
    if (this._token()) {
      this.loadCurrentUser().subscribe({
        error: () => this.logout(),
      });
    }
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/login`, request).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this._token.set(response.token);
      })
    );
  }

  register(request: RegisterRequest): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(`${this.authApiUrl}/register`, request);
  }

  loadCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${this.usersApiUrl}/me`).pipe(
      tap((user) => {
        this._currentUser.set(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._token.set(null);
    this._currentUser.set(null);
  }

  getToken(): string | null {
    return this._token();
  }
}