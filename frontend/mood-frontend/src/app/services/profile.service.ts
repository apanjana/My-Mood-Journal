import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private api = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getProfile() {
    return this.http.get(`${this.api}/profile`, {
        headers: this.getHeaders(),
      });
  }

  updateProfile(data: any) {
    return this.http.put(`${this.api}/profile/update`, data, {
        headers: this.getHeaders(),
      });
  }

  deleteAccount() {
    return this.http.delete(`${this.api}/delete-account`, {
        headers: this.getHeaders(),
      });
  }
}
