import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  // 🚀 Inputs
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 4; // Cambiado a 4 para ver paginación con 7 posts
  @Input() maxVisiblePages: number = 5;
  @Input() showFirstLastButtons: boolean = true;
  @Input() showPrevNextButtons: boolean = true;
  @Input() showItemsPerPageSelector: boolean = true;
  @Input() itemsPerPageOptions: number[] = [4, 8, 12, 16];
  @Input() customClasses?: {
    container?: string;
    button?: string;
    activeButton?: string;
    disabledButton?: string;
    pageNumber?: string;
    activePageNumber?: string;
    selector?: string;
    rangeInfo?: string;
  };
  
  // 🚀 Outputs
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();
  
  // 🚀 Signals internos
  currentPage = signal(1);
  internalItemsPerPage = signal(this.itemsPerPage);
  
  // 🚀 Computed properties
  totalPages = computed(() => {
    const total = this.totalItems;
    const perPage = this.internalItemsPerPage();
    return Math.ceil(total / perPage);
  });
  
  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const maxVisible = this.maxVisiblePages;
    
    if (total <= 1) return [];
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    const pages: number[] = [];
    const half = Math.floor(maxVisible / 2);
    
    if (current <= half + 1) {
      for (let i = 1; i <= maxVisible; i++) pages.push(i);
    } else if (current >= total - half) {
      for (let i = total - maxVisible + 1; i <= total; i++) pages.push(i);
    } else {
      for (let i = current - half; i <= current + half; i++) pages.push(i);
    }
    
    return pages;
  });
  
  currentRange = computed(() => {
    const total = this.totalItems;
    const start = (this.currentPage() - 1) * this.internalItemsPerPage() + 1;
    const end = Math.min(this.currentPage() * this.internalItemsPerPage(), total);
    
    return { start, end, total };
  });
  
  get showPagination(): boolean {
    return this.totalPages() > 1;
  }
  
  get showFirstLast(): boolean {
    return this.showFirstLastButtons && this.totalPages() > this.maxVisiblePages;
  }
  
  ngOnInit(): void {
    this.internalItemsPerPage.set(this.itemsPerPage);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemsPerPage']) {
      this.internalItemsPerPage.set(this.itemsPerPage);
      this.currentPage.set(1);
    }
    
    if (changes['totalItems'] && this.currentPage() > this.totalPages()) {
      this.currentPage.set(this.totalPages());
    }
  }
  
  // 🚀 Métodos de navegación
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.pageChange.emit(page);
      this.scrollToTop();
    }
  }
  
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
      this.pageChange.emit(this.currentPage());
      this.scrollToTop();
    }
  }
  
  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.pageChange.emit(this.currentPage());
      this.scrollToTop();
    }
  }
  
  firstPage(): void {
    if (this.currentPage() !== 1) {
      this.currentPage.set(1);
      this.pageChange.emit(1);
      this.scrollToTop();
    }
  }
  
  lastPage(): void {
    if (this.currentPage() !== this.totalPages()) {
      this.currentPage.set(this.totalPages());
      this.pageChange.emit(this.totalPages());
      this.scrollToTop();
    }
  }
  
  changeItemsPerPage(count: number): void {
    if (count > 0) {
      const currentStartIndex = (this.currentPage() - 1) * this.internalItemsPerPage();
      this.internalItemsPerPage.set(count);
      
      // Calcular nueva página manteniendo el item visible
      const newPage = Math.floor(currentStartIndex / count) + 1;
      this.currentPage.set(newPage);
      
      this.itemsPerPageChange.emit(count);
      this.scrollToTop();
    }
  }
  
  // 🚀 Métodos para clases CSS
  getContainerClasses(): string {
    const base = 'flex flex-col sm:flex-row items-center justify-between gap-4 py-4';
    return this.customClasses?.container 
      ? `${base} ${this.customClasses.container}`
      : base;
  }
  
  getButtonClasses(disabled: boolean = false): string {
    const base = 'px-3 py-2 rounded-lg transition-colors duration-200 font-medium flex items-center gap-2';
    
    if (disabled) {
      const disabledClass = this.customClasses?.disabledButton || 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed';
      return `${base} ${disabledClass}`;
    }
    
    const buttonClass = this.customClasses?.button || 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700';
    return `${base} ${buttonClass}`;
  }
  
  getPageNumberClasses(isActive: boolean = false): string {
    const base = 'min-w-[40px] h-10 flex items-center justify-center rounded-lg transition-colors duration-200 font-medium';
    
    if (isActive) {
      const activeClass = this.customClasses?.activePageNumber || 'bg-primary text-white';
      return `${base} ${activeClass}`;
    }
    
    const pageClass = this.customClasses?.pageNumber || 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700';
    return `${base} ${pageClass}`;
  }
  
  getSelectorClasses(): string {
    const base = 'px-3 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    return this.customClasses?.selector 
      ? `${base} ${this.customClasses.selector}`
      : base;
  }
  
  getRangeInfoClasses(): string {
    const base = 'text-sm text-gray-600 dark:text-gray-400';
    return this.customClasses?.rangeInfo 
      ? `${base} ${this.customClasses.rangeInfo}`
      : base;
  }
  
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}