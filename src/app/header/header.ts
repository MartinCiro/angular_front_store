import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '@services/theme';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  // Usar inject() para obtener el servicio
  private themeService = inject(ThemeService);
  
  // Usar la computed signal del servicio
  isDarkMode = this.themeService.isDarkMode;
  currentTheme = this.themeService.currentTheme;

  toggleDarkMode() {
    this.themeService.toggleTheme();
  }

  getDarkModeIcon(): string {
    return this.isDarkMode() ? 'light_mode' : 'dark_mode';
  }
}