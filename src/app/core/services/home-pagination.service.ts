// src/app/services/home-pagination.service.ts
import { Injectable, signal, computed } from '@angular/core';

export interface PaginationConfig {
  itemsPerPage?: number;
  maxVisiblePages?: number;
  showFirstLastButtons?: boolean;
  showPrevNextButtons?: boolean;
  scrollToTop?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HomePaginationService {
  // 🚀 Signals para estado de paginación
  private _currentPage = signal(1);
  private _itemsPerPage = signal(8);
  private _maxVisiblePages = signal(5);
  private _totalItems = signal(0);
  
  // 🚀 Exponer signals como readonly
  currentPage = this._currentPage.asReadonly();
  itemsPerPage = this._itemsPerPage.asReadonly();
  totalItems = this._totalItems.asReadonly();
  
  // 🚀 Computed signals
  totalPages = computed(() => {
    const total = this._totalItems();
    const perPage = this._itemsPerPage();
    return Math.ceil(total / perPage);
  });
  
  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this._currentPage();
    const maxVisible = this._maxVisiblePages();
    
    if (total <= 1) return [];
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    const pages: number[] = [];
    const half = Math.floor(maxVisible / 2);
    
    if (current <= half + 1) {
      // Al inicio
      for (let i = 1; i <= maxVisible; i++) pages.push(i);
    } else if (current >= total - half) {
      // Al final
      for (let i = total - maxVisible + 1; i <= total; i++) pages.push(i);
    } else {
      // En medio
      for (let i = current - half; i <= current + half; i++) pages.push(i);
    }
    
    return pages;
  });
  
  // 🚀 Inicializar
  initialize(config: PaginationConfig = {}): void {
    if (config.itemsPerPage) this._itemsPerPage.set(config.itemsPerPage);
    if (config.maxVisiblePages) this._maxVisiblePages.set(config.maxVisiblePages);
  }
  
  // 🚀 Configurar total de items
  setTotalItems(total: number): void {
    this._totalItems.set(total);
    if (this._currentPage() > this.totalPages() && this.totalPages() > 0) {
      this._currentPage.set(this.totalPages());
    }
  }
  
  // 🚀 Métodos de navegación
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this._currentPage.set(page);
      this.scrollToTop();
    }
  }
  
  nextPage(): void {
    if (this._currentPage() < this.totalPages()) {
      this._currentPage.update(page => page + 1);
      this.scrollToTop();
    }
  }
  
  previousPage(): void {
    if (this._currentPage() > 1) {
      this._currentPage.update(page => page - 1);
      this.scrollToTop();
    }
  }
  
  firstPage(): void {
    if (this._currentPage() !== 1) {
      this._currentPage.set(1);
      this.scrollToTop();
    }
  }
  
  lastPage(): void {
    if (this._currentPage() !== this.totalPages()) {
      this._currentPage.set(this.totalPages());
      this.scrollToTop();
    }
  }
  
  // 🚀 Cambiar items por página
  changeItemsPerPage(count: number): void {
    if (count > 0) {
      const currentStartIndex = (this._currentPage() - 1) * this._itemsPerPage();
      this._itemsPerPage.set(count);
      
      // Calcular nueva página manteniendo el item visible
      const newPage = Math.floor(currentStartIndex / count) + 1;
      this._currentPage.set(newPage);
    }
  }
  
  // 🚀 Obtener items para la página actual
  getPaginatedItems<T>(items: T[]): T[] {
    const startIndex = (this._currentPage() - 1) * this._itemsPerPage();
    const endIndex = startIndex + this._itemsPerPage();
    return items.slice(startIndex, endIndex);
  }
  
  // 🚀 Información de rango actual
  getCurrentRange(): { start: number; end: number; total: number } {
    const total = this._totalItems();
    const start = (this._currentPage() - 1) * this._itemsPerPage() + 1;
    const end = Math.min(this._currentPage() * this._itemsPerPage(), total);
    
    return { start, end, total };
  }
  
  // 🚀 Resetear paginación
  reset(): void {
    this._currentPage.set(1);
  }
  
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}