import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log("Authentification TRUE")
      return true; // Allow navigation if authenticated
    } else {
      console.log("Authentification FALSE")
      this.router.navigate(['/login']); // Redirect to login page if not authenticated
      return false;
    }
  }
}
