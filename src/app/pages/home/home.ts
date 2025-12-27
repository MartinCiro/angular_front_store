// home.component.ts - Versión simplificada usando el componente
import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { BlogCardComponent } from '@app/shared/components/blog-card/blog-card';
import { ThemeService } from '@app/core/services/theme';
=======
import { BlogCardComponent } from '@components/blog-card/blog-card';
import { PaginationComponent } from '@components/pagination/pagination';
import { ThemeService } from '@services/theme';
import { MockDataService } from '@services/mock-data.service';
>>>>>>> main

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BlogCardComponent, PaginationComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  private themeService = inject(ThemeService);
  private mockDataService = inject(MockDataService);
  
  isDarkMode = this.themeService.isDarkMode;
  blogPosts = this.mockDataService.allPosts;
  
  // 🚀 Variables para paginación
  currentPage = 1;
  itemsPerPage = 8;
  
  // 🚀 Posts paginados
  get paginatedPosts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.blogPosts().slice(startIndex, endIndex);
  }
  
  // 🚀 Métodos para paginación
  onPageChange(page: number): void {
    this.currentPage = page;
  }
  
  onItemsPerPageChange(count: number): void {
    this.itemsPerPage = count;
    this.currentPage = 1; // Resetear a primera página
  }

  heroContentClasses = computed(() =>
    this.isDarkMode()
      ? 'bg-gray-800/80 text-gray-300'
      : 'bg-white/80 text-gray-700'
  );

  heroClasses = computed(() =>
    this.isDarkMode()
      ? 'bg-green-600'
      : 'bg-[#4ADE80]'
  );

  getSectionClasses() {
    return this.isDarkMode() 
      ? 'bg-gray-800 text-gray-200' 
      : 'bg-white text-gray-800';
  }
}