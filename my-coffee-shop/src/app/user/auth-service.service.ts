import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/auth/register', user);
  }

  login(credentials: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  logout(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/logout`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error.error || 'Server Error';
    }
    return throwError(() => new Error(errorMessage));
  }
}
