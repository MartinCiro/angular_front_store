import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Role {
  id: string;
  name: string;
  color: string;
  userCount: number;
  permissions: string[];
  description?: string;
}

@Component({
  selector: 'app-active-roles',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './active-roles.html',
  styleUrls: ['./active-roles.css']
})
export class ActiveRolesComponent {
  // Roles data
  roles = signal<Role[]>([
    {
      id: '1',
      name: 'Administrador',
      color: 'bg-red-500',
      userCount: 3,
      permissions: ['all'],
      description: 'Acceso completo al sistema'
    },
    {
      id: '2',
      name: 'Editor',
      color: 'bg-blue-500',
      userCount: 12,
      permissions: ['create_posts', 'edit_posts', 'publish_posts'],
      description: 'Puede crear, editar y publicar contenido'
    },
    {
      id: '3',
      name: 'Autor',
      color: 'bg-green-500',
      userCount: 45,
      permissions: ['create_posts', 'edit_own_posts'],
      description: 'Puede crear y editar sus propias entradas'
    },
    {
      id: '4',
      name: 'Lector',
      color: 'bg-purple-500',
      userCount: 1144,
      permissions: ['view_content'],
      description: 'Solo puede ver contenido'
    }
  ]);

  // Computed properties
  get totalUsers(): number {
    return this.roles().reduce((sum, role) => sum + role.userCount, 0);
  }

  // Helper methods
  getRoleIcon(roleName: string): string {
    switch (roleName.toLowerCase()) {
      case 'administrador': return 'security';
      case 'editor': return 'edit';
      case 'autor': return 'create';
      case 'lector': return 'visibility';
      default: return 'person';
    }
  }

  getRolePermissionsText(permissions: string[]): string {
    if (permissions.includes('all')) {
      return 'Todos los permisos';
    }
    return `${permissions.length} permisos`;
  }
}