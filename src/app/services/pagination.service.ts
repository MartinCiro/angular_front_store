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
export class PaginationService<T> {
  // 🚀 Signals para estado de paginación
  private _currentPage = signal(1);
  private _itemsPerPage = signal(10);
  private _maxVisiblePages = signal(5);
  private _showFirstLastButtons = signal(true);
  private _showPrevNextButtons = signal(true);
  private _scrollToTop = signal(true);
  
  // 🚀 Exponer signals como readonly
  currentPage = this._currentPage.asReadonly();
  itemsPerPage = this._itemsPerPage.asReadonly();
  
  // 🚀 Computed signals
  totalPages = computed(() => {
    const totalItems = this._totalItems();
    return Math.ceil(totalItems / this._itemsPerPage());
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
  
  // 🚀 Signal para total de items (se establece desde el componente)
  private _totalItems = signal(0);
  totalItems = this._totalItems.asReadonly();
  
  // 🚀 Inicializar con configuración
  initialize(config: PaginationConfig = {}): void {
    if (config.itemsPerPage) this._itemsPerPage.set(config.itemsPerPage);
    if (config.maxVisiblePages) this._maxVisiblePages.set(config.maxVisiblePages);
    if (config.showFirstLastButtons !== undefined) 
      this._showFirstLastButtons.set(config.showFirstLastButtons);
    if (config.showPrevNextButtons !== undefined) 
      this._showPrevNextButtons.set(config.showPrevNextButtons);
    if (config.scrollToTop !== undefined) 
      this._scrollToTop.set(config.scrollToTop);
  }
  
  // 🚀 Configurar total de items
  setTotalItems(total: number): void {
    this._totalItems.set(total);
    // Si la página actual es mayor que el total de páginas, ir a la última página
    if (this._currentPage() > this.totalPages() && this.totalPages() > 0) {
      this._currentPage.set(this.totalPages());
    }
  }
  
  // 🚀 Métodos de navegación
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this._currentPage.set(page);
      this.scrollIfEnabled();
    }
  }
  
  nextPage(): void {
    if (this._currentPage() < this.totalPages()) {
      this._currentPage.update(page => page + 1);
      this.scrollIfEnabled();
    }
  }
  
  previousPage(): void {
    if (this._currentPage() > 1) {
      this._currentPage.update(page => page - 1);
      this.scrollIfEnabled();
    }
  }
  
  firstPage(): void {
    if (this._currentPage() !== 1) {
      this._currentPage.set(1);
      this.scrollIfEnabled();
    }
  }
  
  lastPage(): void {
    if (this._currentPage() !== this.totalPages()) {
      this._currentPage.set(this.totalPages());
      this.scrollIfEnabled();
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
  
  // 🚀 Scroll automático si está habilitado
  private scrollIfEnabled(): void {
    if (this._scrollToTop()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  // 🚀 Getters para configuración
  getConfig() {
    return {
      itemsPerPage: this._itemsPerPage(),
      maxVisiblePages: this._maxVisiblePages(),
      showFirstLastButtons: this._showFirstLastButtons(),
      showPrevNextButtons: this._showPrevNextButtons(),
      scrollToTop: this._scrollToTop()
    };
  }
}