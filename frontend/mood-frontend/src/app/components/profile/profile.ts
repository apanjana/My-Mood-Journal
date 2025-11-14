import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent implements OnInit {
  username = '';
  name = '';
  dob = '';
  password = '';

  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (res: any) => {
        this.username = res.username;
        this.name = res.name;
        this.dob = res.dob;
      },
      error: () => {
        this.message = 'Failed to load profile';
        this.messageType = 'error';
      },
    });
  }

  updateProfile() {
    const body: any = {
      username: this.username,
      name: this.name,
    };

    if (this.password.trim()) body.password = this.password;

    this.profileService.updateProfile(body).subscribe({
      next: () => {
        this.message = 'Profile updated!';
        this.messageType = 'success';
        // this.router.navigate(['/add-entry']);
      },
      error: (err) => {
        this.message = err.error?.message || 'Update failed';
        this.messageType = 'error';
      },
    });
  }

  deleteAccount() {
    if (!confirm('Are you sure? This cannot be undone.')) return;

    this.profileService.deleteAccount().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.message = 'Failed to delete account';
        this.messageType = 'error';
      },
    });
  }
}
