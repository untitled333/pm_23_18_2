import { Routes } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: ReactiveFormComponent },
  { path: 'cv', loadComponent: () => import('./cv/cv').then((m) => m.CvComponent) },
];
