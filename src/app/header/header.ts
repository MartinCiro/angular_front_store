// header.ts (componente corregido)
import { CommonModule } from '@angular/common';
import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  LucideAngularModule, 
  Search, 
  ShoppingBag, 
  Menu,
  Sun,
  Moon
} from 'lucide-angular';

import { ThemeService } from '@services/theme';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  
  // Signals
  isDarkMode = this.themeService.isDarkMode;
  
  // Iconos
  readonly Search = Search;
  readonly ShoppingBag = ShoppingBag;
  readonly Menu = Menu;
  readonly Sun = Sun;
  readonly Moon = Moon;
  
  // Icono dinámico para tema
  themeIcon = computed(() => this.isDarkMode() ? this.Sun : this.Moon);
  
  toggleDarkMode() {
    this.themeService.toggleTheme();
  }
}