import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/detail/detail').then(m => m.BlogDetailComponent)
  },
];