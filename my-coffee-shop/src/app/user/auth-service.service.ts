import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  USER_KEY = '[user]';
  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }
  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem(this.USER_KEY);
    if (savedUser) {
      this.user$$.next(JSON.parse(savedUser));
    }

    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
      if (user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.USER_KEY);
      }
    });
  }

  register(
    username: string,
    email: string,
    phoneNumber: string,
    address: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserForAuth>(`/api/register`, {
        username,
        email,
        phoneNumber,
        address,
        password,
        rePassword,
      })
      .pipe(
        tap((user) => {
          this.user$$.next(user);
          this.getProfile().subscribe();
        })
      );
  }

  login(email: string, password: string) {
    return this.http.post<UserForAuth>(`/api/login`, { email, password }).pipe(
      tap((user) => {
        this.user$$.next(user);
        this.getProfile().subscribe();
      })
    );
  }

  logout() {
    return this.http
      .post('/api/logout', {})
      .pipe(tap((user) => this.user$$.next(null)));
  }

  getProfile() {
    return this.http
      .get<UserForAuth>(`/api/users/profile`)
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(username: string, email: string, tel?: string) {
    return this.http
      .put<UserForAuth>(``, {
        username,
        email,
        tel,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
