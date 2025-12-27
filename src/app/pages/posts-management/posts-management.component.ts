import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from '@app/layout/dashboard-layout';

@Component({
  selector: 'app-posts-management',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, DashboardLayoutComponent],
  templateUrl: './posts-management.component.html'
})
export class PostsManagementComponent {
  // Datos mock para posts
  posts = [
    { id: 1, title: 'Introducción a Angular', status: 'published', author: 'Admin', date: '2024-01-15' },
    { id: 2, title: 'Guía de TypeScript', status: 'draft', author: 'Editor', date: '2024-01-14' },
    { id: 3, title: 'Patrones de Diseño', status: 'published', author: 'Autor', date: '2024-01-13' }
  ];
}