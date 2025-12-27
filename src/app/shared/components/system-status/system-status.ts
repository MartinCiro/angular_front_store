import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SystemStatus as SystemStatusModel } from '@app/core/models/dashboard.model';

@Component({
  selector: 'app-system-status',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './system-status.html',
  styleUrls: ['./system-status.css']
})
export class SystemStatusComponent {
  // Inputs
  status = input.required<SystemStatusModel>();
  showHeader = input(true);

  // Helper methods
  getStorageColor(percentage: number): string {
    if (percentage < 50) return 'bg-emerald-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  getBandwidthColor(percentage: number): string {
    if (percentage < 60) return 'bg-primary';
    if (percentage < 85) return 'bg-orange-500';
    return 'bg-red-500';
  }

  getStatusIcon(): string {
    return this.status().isAllServicesOperational ? 'check_circle' : 'error';
  }

  getStatusColor(): string {
    return this.status().isAllServicesOperational ? 'text-emerald-500' : 'text-red-500';
  }

  getStatusText(): string {
    return this.status().isAllServicesOperational 
      ? 'Todos los servicios operativos' 
      : 'Algunos servicios presentan problemas';
  }
}