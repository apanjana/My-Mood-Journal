// src/app/services/journal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JournalService {
  private baseUrl = 'http://localhost:5000/api/journal';

  constructor(private http: HttpClient) {}

  addEntry(entry: { text: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, entry);
  }

  getAllEntries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  deleteEntry(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
