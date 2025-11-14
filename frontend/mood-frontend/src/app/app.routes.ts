// src/app/routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { AddEntryComponent } from '../app/components/add-entry/add-entry.component';
import { AllEntriesComponent } from '../app/components/all-entries/all-entries.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-entry', component: AddEntryComponent, canActivate: [AuthGuard] },
  { path: 'all-entries', component: AllEntriesComponent, canActivate: [AuthGuard] },
];

export default routes;
