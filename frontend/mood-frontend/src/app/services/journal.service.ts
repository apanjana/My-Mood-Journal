// src/app/services/journal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private apiUrl = 'http://localhost:5000/api/journal';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  addEntry(entryData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, entryData, {
      headers: this.getHeaders(),
    });
  }

  getAllEntries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, {
      headers: this.getHeaders(),
    });
  }

  deleteEntry(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
