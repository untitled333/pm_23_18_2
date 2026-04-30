import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
  country?: string;
}

const STORAGE_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api';

  private _user = signal<AuthUser | null>(this.loadFromStorage());
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  constructor(private http: HttpClient) {}

  private loadFromStorage(): AuthUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  login(data: LoginData): Observable<AuthUser> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<{
        success: boolean;
        data: AuthUser;
        message?: string;
      }>(`${this.apiUrl}/login`, data, { headers })
      .pipe(
        map((res) => {
          if (!res.success || !res.data)
            throw new Error(res.message || 'Невірний email або пароль');
          return res.data;
        }),
        tap((user) => {
          this._user.set(user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        }),
        catchError((err) => {
          const msg = err.error?.message || err.message || 'Помилка входу';
          return throwError(() => new Error(msg));
        }),
      );
  }

  logout(): void {
    this._user.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }
}
