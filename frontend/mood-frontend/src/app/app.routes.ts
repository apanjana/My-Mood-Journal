// src/app/routes.ts
import { Routes } from '@angular/router';
import { AddEntryComponent } from '../app/components/add-entry/add-entry.component';
import { AllEntriesComponent } from '../app/components/all-entries/all-entries.component';

const routes: Routes = [
  { path: '', component: AddEntryComponent },
  { path: 'all-entries', component: AllEntriesComponent },
];

export default routes;
