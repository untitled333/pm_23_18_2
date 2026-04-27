import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.LoginComponent),
    title: 'Вхід',
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./reactive-form/reactive-form').then((m) => m.ReactiveFormComponent),
    title: 'Реєстрація',
  },

  {
    path: 'cv',
    loadComponent: () => import('./cv/cv').then((m) => m.CvComponent),
    canActivate: [authGuard],
    title: 'CV',
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
