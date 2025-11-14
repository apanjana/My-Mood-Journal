// src/app/routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { AddEntryComponent } from './components/add-entry/add-entry.component';
import { AllEntriesComponent } from './components/all-entries/all-entries.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-entry', component: AddEntryComponent, canActivate: [AuthGuard] },
  { path: 'all-entries', component: AllEntriesComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

export default routes;
