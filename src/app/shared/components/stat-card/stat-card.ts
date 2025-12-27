import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardStats } from '@app/core/models/dashboard.model';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './stat-card.html',
  styleUrls: ['./stat-card.css']
})
export class StatCardComponent {
  // Input principal
  stat = input.required<DashboardStats>();

  // Computed classes
  get trendIcon(): string {
    switch (this.stat().trend) {
      case 'positive': return 'trending_up';
      case 'negative': return 'trending_down';
      default: return 'trending_flat';
    }
  }

  get trendColor(): string {
    switch (this.stat().trend) {
      case 'positive': return 'text-emerald-500';
      case 'negative': return 'text-red-500';
      default: return 'text-slate-500';
    }
  }
}