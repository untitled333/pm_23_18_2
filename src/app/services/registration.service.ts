import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country?: string;
}

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/register';

  register(data: UserData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers }).pipe(
      map((res: any) => {
        if (!res.success) throw new Error(res.message || 'Помилка реєстрації');
        return res;
      }),
      catchError((err) => {
        const msg = err.error?.message || err.message || `Помилка: ${err.status}`;
        return throwError(() => new Error(msg));
      }),
    );
  }
}
