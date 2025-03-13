import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Adjust your backend URL

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated()); // Track auth state
  authStatus$ = this.authStatus.asObservable(); // Observable for real-time updates
  
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {this.checkAuthentication();}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.accessToken); // Store token
        this.authStatus.next(true); // Update auth status
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token on logout
    this.authStatus.next(false);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
    }
    return typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  }
   

  isAuthenticated(): boolean {
    return !!this.getToken() && this.isTokenExpired(); // Check if user is logged in
  }

  checkAuthentication(): void {
    const isAuth = this.isAuthenticated();
    this.authStatus.next(isAuth); // Set initial status
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
  
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    console.log("dec",decodedToken.exp,currentTime)
    return !(decodedToken.exp <= currentTime);
  }

}
