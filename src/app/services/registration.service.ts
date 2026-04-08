import { Injectable } from '@angular/core';
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
  private apiUrl = 'http://localhost:3000/api/register';

  constructor(private http: HttpClient) {}

  register(data: UserData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers }).pipe(
      map((res: any) => ({ success: true, message: 'Реєстрацію завершено!', data: res })),
      catchError((err) =>
        throwError(() => ({
          success: false,
          message: `Помилка: ${err.status} ${err.statusText}`,
        })),
      ),
    );
  }
}
