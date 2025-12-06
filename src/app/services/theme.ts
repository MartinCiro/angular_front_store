import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal para el tema actual
  private themeSignal = signal<Theme>('light');
  private platformId = inject(PLATFORM_ID);
  
  // Computed signals para estados derivados
  currentTheme = this.themeSignal.asReadonly();
  isDarkMode = computed(() => this.themeSignal() === 'dark');

  constructor() {
    // Inicializar tema solo en el cliente (browser)
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }

  private initializeTheme() {
    // 1. Verificar localStorage solo en browser
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.setTheme(savedTheme);
      return;
    }

    // 2. Verificar preferencia del sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(prefersDark ? 'dark' : 'light');
  }

  toggleTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.themeSignal.update(current => current === 'light' ? 'dark' : 'light');
    this.applyTheme(this.themeSignal());
    localStorage.setItem('theme', this.themeSignal());
  }

  setTheme(theme: Theme) {
    this.themeSignal.set(theme);
    
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme(theme);
      localStorage.setItem('theme', theme);
    }
  }

  private applyTheme(theme: Theme) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }
}