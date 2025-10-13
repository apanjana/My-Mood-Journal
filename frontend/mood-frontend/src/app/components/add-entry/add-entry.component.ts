// src/app/components/add-entry/add-entry.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JournalService } from '../../services/journal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent {
  text = '';
  mood = '';
  suggestion = '';
  isLoading = false;

  constructor(private journalService: JournalService, private router: Router) {}

  submitEntry() {
    if (!this.text.trim()) return;
    this.isLoading = true;

    this.journalService.addEntry({ text: this.text }).subscribe({
      next: (res: any) => {
        this.mood = res.mood;
        this.suggestion = res.suggestion;
        this.text = '';
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Failed to submit entry.');
      }
    });
  }

  goToAll() {
    this.router.navigate(['/all-entries']);
  }
}
