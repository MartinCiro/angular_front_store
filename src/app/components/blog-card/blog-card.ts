import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from '@services/theme';
import { BlogPost } from '@services/mock-data.service';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.css'
})
export class BlogCardComponent {
  @Input() post!: BlogPost;
  private themeService = inject(ThemeService);
  private router = inject(Router);
  
  isDarkMode = this.themeService.isDarkMode;
  
  // Método para navegar al detalle
  navigateToDetail(): void {
    this.router.navigate(['/', this.post.id.toString()]);
  }
  
  // Clases dinámicas basadas en el tema
  getCardClasses() {
    return this.isDarkMode() 
      ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-750' 
      : 'bg-white border-gray-300 text-gray-800 hover:bg-gray-50';
  }
  
  getTitleClasses() {
    return this.isDarkMode() ? 'text-white' : 'text-gray-900';
  }
  
  getTextClasses() {
    return this.isDarkMode() ? 'text-gray-300' : 'text-gray-600';
  }
  
  getCategoryClasses() {
    return this.isDarkMode()
      ? 'bg-green-600 text-white'
      : 'bg-green-100 text-green-800';
  }
  
  getBorderClasses() {
    return this.isDarkMode()
      ? 'border-gray-700'
      : 'border-gray-200';
  }
}