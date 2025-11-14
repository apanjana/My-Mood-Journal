// src/app/all-entries/all-entries.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JournalService } from '../../services/journal.service';
import { NavbarComponent } from '../navbar/navbar';

@Component({
  selector: 'app-all-entries',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe,NavbarComponent],
  templateUrl: './all-entries.component.html',
  styleUrls: ['./all-entries.component.css']
})
export class AllEntriesComponent implements OnInit {
  entries: any[] = [];
  isLoading = true;
  selectedEntry: any = null;

  constructor(private http: HttpClient, private router: Router, private journalService: JournalService) {}

  ngOnInit(): void {
    this.fetchEntries();
  }

  fetchEntries() {
    this.isLoading = true;
    this.journalService.getAllEntries().subscribe({
      next: (res) => { this.entries = res; this.isLoading = false; },
      error: (err) => { console.error(err); this.isLoading = false; }
    });
  }

  expandCard(entry: any) {
    this.selectedEntry = entry;
  }

  closeExpandedCard() {
    this.selectedEntry = null;
  }

  deleteEntry(id: number) {

    this.journalService.deleteEntry(id).subscribe({
      next: () => {
        this.entries = this.entries.filter(e => e.id !== id);
        this.selectedEntry = null;
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert('Failed to delete entry.');
      }
    });
  }

//   goBack() {
//     this.router.navigate(['/']);
//   }
  
}
