import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout';

// app.routes.ts
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent) },
  
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { 
        path: '', 
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent) 
      },
      { 
        path: 'posts', 
        loadComponent: () => import('./pages/posts-management/posts-management.component').then(m => m.PostsManagementComponent) 
      },
      { 
        path: 'users', 
        loadComponent: () => import('./pages/users-management/users-management').then(m => m.UsersManagementComponent) 
      },
    ]
  },
  
  { path: ':id', loadComponent: () => import('./pages/detail/detail').then(m => m.BlogDetailComponent) },
  /* {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent),
    canActivate: [AuthGuard] // Si tienes un guard de autenticación
  }, */
];