// src/app/routes.ts
import { Routes } from '@angular/router';
import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { AllEntriesComponent } from './components/all-entries/all-entries.component';

const routes: Routes = [
  { path: '', component: AddEntryComponent },
  { path: 'all-entries', component: AllEntriesComponent },
];

export default routes;
