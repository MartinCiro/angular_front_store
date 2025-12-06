import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '@services/theme';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './detail.html',
  styleUrl: './detail.css'
})
export class BlogDetailComponent {
  private themeService = inject(ThemeService);
  
  // Signals para estado
  isDarkMode = this.themeService.isDarkMode;
  sidebarOpen = signal(true);
  
  // Computed signals para clases dinámicas
  mainContentClasses = computed(() => 
    this.sidebarOpen() 
      ? 'lg:max-w-4xl' 
      : 'lg:max-w-full'
  );
  
  sidebarClasses = computed(() =>
    this.sidebarOpen()
      ? 'opacity-100 lg:translate-x-0'
      : 'opacity-0 lg:translate-x-4'
  );
  
  buttonClasses = computed(() =>
    this.sidebarOpen()
      ? ''
      : 'rotate-180'
  );
  
  buttonIcon = computed(() =>
    this.sidebarOpen()
      ? 'chevron_right'
      : 'chevron_left'
  );
  
  toggleSidebar() {
    this.sidebarOpen.update(value => !value);
  }
}