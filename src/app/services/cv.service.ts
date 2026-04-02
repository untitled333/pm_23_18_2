import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NameData, ExpertiseItem, ProfileData, ApiResponse } from '../models/cv.model';

@Injectable({ providedIn: 'root' })
export class CvService {
  private readonly base = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getName(): Observable<NameData> {
    return this.http.get<ApiResponse<NameData>>(`${this.base}/name`).pipe(
      map((r) => {
        if (!r.success || !r.data) throw new Error(r.message || "Не вдалося отримати ім'я");
        return r.data;
      }),
      catchError(this.handleError),
    );
  }

  getExpertise(): Observable<ExpertiseItem[]> {
    return this.http.get<ApiResponse<ExpertiseItem[]>>(`${this.base}/expertise`).pipe(
      map((r) => {
        if (!r.success || !r.data) throw new Error(r.message || 'Не вдалося отримати навички');
        return r.data;
      }),
      catchError(this.handleError),
    );
  }

  updateName(data: NameData): Observable<NameData> {
    return this.http.post<ApiResponse<NameData>>(`${this.base}/name`, data).pipe(
      map((r) => {
        if (!r.success || !r.data) throw new Error(r.message || "Не вдалося оновити ім'я");
        return r.data;
      }),
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Невідома помилка';

    if (error.status === 0) {
      message = 'Сервер недоступний. Запустіть: cd server && node server.js';
    } else if (error.status === 400) {
      message = error.error?.message || 'Некоректні дані';
    } else if (error.status === 404) {
      message = 'Ресурс не знайдено';
    } else if (error.status === 500) {
      message = 'Внутрішня помилка сервера';
    } else if (error.error?.message) {
      message = error.error.message;
    }

    console.error('HTTP Error:', error);
    return throwError(() => new Error(message));
  }
}
