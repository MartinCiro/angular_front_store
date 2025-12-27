import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: string;
  description?: string;
  color?: string;
}

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './quick-actions.html',
  styleUrls: ['./quick-actions.css']
})
export class QuickActionsComponent {
  // Output events
  actionClick = output<string>();

  // Quick actions data
  actions = [
    {
      id: 'create-user',
      label: 'Crear Usuario',
      icon: 'person_add',
      action: 'create-user',
      description: 'Agregar nuevo usuario al sistema',
      color: 'text-primary'
    },
    {
      id: 'new-post',
      label: 'Nueva Entrada',
      icon: 'post_add',
      action: 'new-post',
      description: 'Crear nueva entrada de blog',
      color: 'text-primary'
    },
    {
      id: 'permissions',
      label: 'Permisos',
      icon: 'verified_user',
      action: 'permissions',
      description: 'Gestionar permisos del sistema',
      color: 'text-primary'
    },
    {
      id: 'settings',
      label: 'Ajustes',
      icon: 'settings',
      action: 'settings',
      description: 'Configuración del sistema',
      color: 'text-primary'
    },
    {
      id: 'analytics',
      label: 'Reportes',
      icon: 'analytics',
      action: 'analytics',
      description: 'Generar reportes de actividad',
      color: 'text-primary'
    },
    {
      id: 'backup',
      label: 'Backup',
      icon: 'backup',
      action: 'backup',
      description: 'Crear copia de seguridad',
      color: 'text-primary'
    }
  ];

  // Method to handle action click
  onActionClick(actionId: string): void {
    this.actionClick.emit(actionId);
  }

  // Get color class for action
  getActionColor(action: QuickAction): string {
    return action.color || 'text-primary';
  }
}