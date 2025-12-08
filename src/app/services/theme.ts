import { Injectable, signal, computed, inject, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSignal = signal<Theme>('light');
  private platformId = inject(PLATFORM_ID);
  
  // Signal para seguir cambios en la preferencia del sistema
  private systemPreference = signal<'light' | 'dark'>('light');
  
  // Computed signals
  currentTheme = this.themeSignal.asReadonly();
  isDarkMode = computed(() => this.themeSignal() === 'dark');

  constructor() {
    // Inicializar solo en browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
      this.listenToSystemPreference();
      
      // Effect para aplicar el tema cuando cambie la signal
      effect(() => {
        const theme = this.themeSignal();
        this.applyTheme(theme);
        
        // Guardar en localStorage solo si no es la preferencia del sistema
        if (theme !== this.systemPreference()) {
          localStorage.setItem('theme', theme);
        } else {
          localStorage.removeItem('theme'); // Usar preferencia del sistema
        }
      });
    }
  }

  private initializeTheme() {
    // 1. Verificar localStorage primero
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.themeSignal.set(savedTheme);
      return;
    }

    // 2. Si no hay tema guardado, usar preferencia del sistema
    this.detectSystemPreference();
  }

  private detectSystemPreference() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme: Theme = prefersDark ? 'dark' : 'light';
    
    this.systemPreference.set(systemTheme);
    this.themeSignal.set(systemTheme);
  }

  private listenToSystemPreference() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Escuchar cambios en la preferencia del sistema
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme: Theme = e.matches ? 'dark' : 'light';
      this.systemPreference.set(newSystemTheme);
      
      // Solo cambiar si el usuario no ha guardado una preferencia manual
      if (!localStorage.getItem('theme')) {
        this.themeSignal.set(newSystemTheme);
      }
    };

    // Agregar listener (modern API)
    if (darkModeMediaQuery.addEventListener) {
      darkModeMediaQuery.addEventListener('change', handleChange);
    } 
    // Fallback para navegadores antiguos
    else if (darkModeMediaQuery.addListener) {
      darkModeMediaQuery.addListener(handleChange);
    }
  }

  toggleTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const newTheme: Theme = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.themeSignal.set(newTheme);
  }

  setTheme(theme: Theme) {
    if (!isPlatformBrowser(this.platformId)) return;
    this.themeSignal.set(theme);
  }

  resetToSystemPreference() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Eliminar preferencia guardada y usar la del sistema
    localStorage.removeItem('theme');
    this.themeSignal.set(this.systemPreference());
  }

  private applyTheme(theme: Theme) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const htmlElement = document.documentElement;
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
      htmlElement.setAttribute('data-theme', 'light');
    }
  }
}