import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Added RouterLink here!
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';
  messageType: 'error' | 'success' = 'error';
  isLoading = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.message = 'Please fill in all fields.';
      this.messageType = 'error';
      return;
    }

    this.isLoading = true;
    this.message = '';

    const { username, password } = this.loginForm.value;

    this.http.post('http://localhost:5000/api/auth/login', { username, password }).subscribe({
      next: (res: any) => {
        this.message = 'Login successful!';
        this.messageType = 'success';
        this.isLoading = false;
        console.log(res);

        // Optional: Store token if backend sends one
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('name', res.name);
        }

        // Redirect to Add Entry page
        setTimeout(() => {
          this.router.navigate(['/add-entry']);
        }, 500);
      },
      error: (err) => {
        console.error(err);
        this.message = err.error?.message || 'Invalid username or password.';
        this.messageType = 'error';
        this.isLoading = false;
      },
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
