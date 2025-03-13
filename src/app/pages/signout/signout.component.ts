import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../components/auth/auth.service';
import { UserService } from '../../components/user/user.service';

@Component({
  selector: 'app-logout',
  template: '' 
})
export class SignoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.authService.logout(); // Clear token/session
    this.userService.clearUsername();
    this.router.navigate(['/login']); // Redirect to login page
  }
}