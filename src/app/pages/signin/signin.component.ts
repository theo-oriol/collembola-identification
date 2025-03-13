import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


import { AuthService } from '../../components/auth/auth.service';
import { UserService } from '../../components/user/user.service';

@Component({
  standalone: true,
  selector: 'app-signin',
  imports: [ReactiveFormsModule,MatInputModule,MatButtonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent implements OnInit {
  loginForm !: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Injecting the auth service
    private userService : UserService,
    private router: Router,
  ) {}
    
  ngOnInit(): void {
    // Initialize the form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      password: ['', Validators.required], // Password field with validation
    });
  }

  // Submit the form
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (res) => {
          console.log('Login success:', res);
          // Handle the successful login response (e.g., store the token)
          this.router.navigate(['/dashboard']);
          const auth = this.authService.isAuthenticated();
          this.userService.fetchUsername();

        },
        error: (err) => {
          console.error('Login failed:', err);
          // Handle login failure (e.g., show an error message)
        },
      });
    }
  }

    
    
}
