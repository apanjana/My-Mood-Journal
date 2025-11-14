import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // Added RouterLink

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Added RouterLink
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  registerUser() {
    if (this.registerForm.invalid) {
      this.message = 'Please fill in all fields.';
      return;
    }

    const { name, dob, username, password } = this.registerForm.value;

    this.http
      .post('http://localhost:5000/api/auth/register', { name, dob, username, password })
      .subscribe({
        next: (res: any) => {
          this.message = 'Registration successful!';
          console.log(res);
          setTimeout(() => this.router.navigate(['/login']), 1200);
        },
        error: (err) => {
          console.error(err);
          if (err.status === 400 && err.error?.message?.includes('Username already exists')) {
            this.message = 'Username already exists. Please choose another one.';
          } else {
            this.message = err.error?.message || 'Error registering user.';
          }
        },
      });
  }
}
