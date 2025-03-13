import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


import { AuthService } from '../../components/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users/id';

  private usernameSubject = new BehaviorSubject<string | null>(this.getUsernameFromStorage());
  username$: Observable<string | null> = this.usernameSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  fetchUsername(): any {
    const token = this.authService.getToken(); // ✅ Get token
    if (!token) {
      console.log('No token found');
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // ✅ Attach token in Authorization header
    });

    this.http.get<{ username: string }>(`${this.apiUrl}`, { headers })
    .pipe(
      tap(response => {
        localStorage.setItem('username', response.username);
        this.usernameSubject.next(response.username);
      })
    )
    .subscribe({
      error: err => console.error('Error fetching username:', err)
    });
  }

  getUsername(): string | null {
      return this.usernameSubject.value;
    }

    private getUsernameFromStorage(): string | null {
      return typeof localStorage !== 'undefined' ? localStorage.getItem('username') : null;
    }
  

    clearUsername(): void {
      localStorage.removeItem('username');
      this.usernameSubject.next(null);
    }

}
