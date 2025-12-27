import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-footer.html',
  styleUrls: ['./dashboard-footer.css']
})
export class DashboardFooterComponent {
  // Inputs opcionales para personalización
  appName = input('Skuish Study Admin');
  showLastUpdate = input(true);
  additionalText = input<string | undefined>(undefined);

  // Propiedades computadas
  get currentYear(): number {
    return new Date().getFullYear();
  }

  get lastUpdateTime(): string {
    return new Date().toLocaleString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}