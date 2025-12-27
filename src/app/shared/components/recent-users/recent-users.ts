import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RecentUser } from '@app/core/models/dashboard.model';

@Component({
  selector: 'app-recent-users',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './recent-users.html',
  styleUrls: ['./recent-users.css']
})
export class RecentUsersComponent {
  // Inputs
  users = input.required<RecentUser[]>();
  maxDisplay = input(5);
  showHeader = input(true);
  showManageButton = input(true);

  // Computed properties
  get displayedUsers(): RecentUser[] {
    return this.users().slice(0, this.maxDisplay());
  }

  get hasMoreUsers(): boolean {
    return this.users().length > this.maxDisplay();
  }

  // Helper methods
  getRoleColor(role: string): string {
    switch (role.toLowerCase()) {
      case 'administrador':
      case 'admin':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'editor':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'autor':
      case 'author':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'lector':
      case 'reader':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  }

  getRoleIcon(role: string): string {
    switch (role.toLowerCase()) {
      case 'administrador':
      case 'admin':
        return 'security';
      case 'editor':
        return 'edit';
      case 'autor':
      case 'author':
        return 'create';
      case 'lector':
      case 'reader':
        return 'visibility';
      default:
        return 'person';
    }
  }

  // Format date for display
  formatJoinDate(dateString: string): string {
    if (dateString.toLowerCase().includes('hace')) {
      return dateString;
    }
    
    // Try to parse date
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
      }
    } catch (e) {
      // If parsing fails, return original string
    }
    
    return dateString;
  }
}