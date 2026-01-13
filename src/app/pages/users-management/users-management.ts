// src/app/pages/users-management/users-management.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { DashboardLayoutComponent } from '@app/layout/dashboard-layout';

// ✅ Íconos reutilizables desde tu librería compartida
import { UserPlus, Edit, Trash2, Eye } from '@app/shared/icons/lucide-icons';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
}

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    DashboardLayoutComponent
  ],
  templateUrl: './users-management.html',
  styleUrls: ['./users-management.css']
})
export class UsersManagementComponent {
  // ✅ Expón los íconos como propiedades públicas
  readonly UserPlus = UserPlus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Eye = Eye;

  users: User[] = [
    { id: 1, name: 'Maria Gonzalez', email: 'maria.g@example.com', role: 'Editor', joinDate: '2024-01-10', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
    { id: 2, name: 'Carlos Ruiz', email: 'carlos.r@example.com', role: 'Autor', joinDate: '2024-01-12', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos' },
    { id: 3, name: 'Ana Lopez', email: 'ana.lopez@example.com', role: 'Lector', joinDate: '2024-01-14', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana' },
    { id: 4, name: 'Juan Perez', email: 'juan.p@example.com', role: 'Admin', joinDate: '2024-01-05', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan' },
    { id: 5, name: 'Laura Martinez', email: 'laura.m@example.com', role: 'Editor', joinDate: '2024-01-08', status: 'inactive', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura' }
  ];

  getStatusColor(status: User['status']): string {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-500';
      case 'inactive': return 'bg-red-500/10 text-red-500';
      case 'pending': return 'bg-yellow-500/10 text-yellow-500';
      default: return 'bg-slate-500/10 text-slate-500';
    }
  }

  getStatusText(status: User['status']): string {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'pending': return 'Pendiente';
      default: return status;
    }
  }
}