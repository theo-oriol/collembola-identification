import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';

import { AuthService } from '../../components/auth/auth.service';
import { UserService } from '../../components/user/user.service';
import { HeaderService } from './header.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [MatToolbarModule, MatButton, RouterLink, MatInputModule, MatFormFieldModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [HeaderService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  name: string | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Subscribe to auth status
    this.subscriptions.add(
      this.authService.authStatus$.subscribe(status => {
        this.isLoggedIn = status;
        if (status) {
          // Subscribe to username updates
          this.subscriptions.add(
            this.userService.username$.subscribe((name) => {
              this.name = name;
            })
          );
          // Fetch username if not already set
          if (!this.name) {
            this.userService.fetchUsername();
          }
        } else {
          this.name = null; // Clear username on logout
        }
      })
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.unsubscribe();
  }
}
