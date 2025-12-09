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
  
  // Signals existentes
  isDarkMode = this.themeService.isDarkMode;
  
  // Iconos
  readonly Search = Search;
  readonly ShoppingBag = ShoppingBag;
  readonly Menu = Menu;
  readonly Sun = Sun;
  readonly Moon = Moon;
  
  // Icono dinámico para tema
  themeIcon = computed(() => this.isDarkMode() ? this.Sun : this.Moon);
  
  // ✅ NUEVO: Signals computados para clases
  // Logo
  logoClasses = computed(() => ({
    'text-primary': this.isDarkMode(),
    'text-gray-900': !this.isDarkMode()
  }));
  
  // Navegación
  navClasses = computed(() => 
    this.isDarkMode() ? 'text-light' : 'text-gray-900'
  );
  
  // Iconos
  iconColor = computed(() => 
    this.isDarkMode() ? 'text-white-400' : 'text-gray-800'
  );
  
  // Icono de tema (color especial)
  themeIconColor = computed(() => 
    this.isDarkMode() ? 'text-yellow-400' : 'text-gray-800'
  );
  
  toggleDarkMode() {
    this.themeService.toggleTheme();
  }
}