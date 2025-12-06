import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@services/theme';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.css'
})
export class BlogCardComponent {
  @Input() post: any;
  private themeService = inject(ThemeService);
  
  // Hacer que el componente reaccione al tema
  isDarkMode = this.themeService.isDarkMode;
  
  // Clases dinámicas basadas en el tema
  getCardClasses() {
    return this.isDarkMode() 
      ? 'bg-gray-800 border-gray-700 text-gray-200' 
      : 'bg-white border-gray-300 text-gray-800';
  }
  
  getTitleClasses() {
    return this.isDarkMode() ? 'text-white' : 'text-gray-900';
  }
  
  getTextClasses() {
    return this.isDarkMode() ? 'text-gray-300' : 'text-gray-600';
  }
}