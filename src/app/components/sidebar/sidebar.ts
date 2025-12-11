import {
  Component,
  Input,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  booleanAttribute,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '@services/theme';
import { LucideAngularModule, TrendingUp, Clock, Star, ArrowUp } from 'lucide-angular';

export type RelatedPost = {
  id: string;
  title: string;
  date: string;
  slug: string;
  category?: string;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnChanges {
  private themeService = inject(ThemeService);

  // 🚀 Signals internos
  private _isOpen = signal(true);
  private _relatedPosts = signal<RelatedPost[]>([]);
  private _popularTopics = signal<string[]>([]);
  private _categoriesTitle = signal('Categorías');
  private _showRelated = signal(true);
  private _showPopular = signal(true);
  private _showCategories = signal(true);

  // 🚀 Inputs tradicionales con setters
  @Input({ transform: booleanAttribute }) 
  set isOpen(value: boolean) {
    this._isOpen.set(value);
  }
  get isOpen(): boolean {
    return this._isOpen();
  }
  
  @Input() 
  set relatedPosts(value: RelatedPost[] | null | undefined) {
    this._relatedPosts.set(value || []);
  }
  get relatedPosts(): RelatedPost[] {
    return this._relatedPosts();
  }
  
  @Input() 
  set popularTopics(value: string[] | null | undefined) {
    this._popularTopics.set(value || []);
  }
  get popularTopics(): string[] {
    return this._popularTopics();
  }
  
  @Input() 
  set categoriesTitle(value: string) {
    this._categoriesTitle.set(value || 'Categorías');
  }
  get categoriesTitle(): string {
    return this._categoriesTitle();
  }
  
  @Input({ transform: booleanAttribute }) 
  set showRelated(value: boolean) {
    this._showRelated.set(value);
  }
  get showRelated(): boolean {
    return this._showRelated();
  }
  
  @Input({ transform: booleanAttribute }) 
  set showPopular(value: boolean) {
    this._showPopular.set(value);
  }
  get showPopular(): boolean {
    return this._showPopular();
  }
  
  @Input({ transform: booleanAttribute }) 
  set showCategories(value: boolean) {
    this._showCategories.set(value);
  }
  get showCategories(): boolean {
    return this._showCategories();
  }

  // 🚀 Signals computados
  private _isDarkMode = computed(() => this.themeService.isDarkMode());

  private computedStyles = computed(() => {
    const isDark = this._isDarkMode();
    return {
      cardClasses: isDark
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200',
      titleClasses: isDark
        ? 'text-gray-200'
        : 'text-gray-800',
      textClasses: isDark
        ? 'text-gray-400 hover:text-gray-200'
        : 'text-gray-600 hover:text-gray-900',
      dateClasses: isDark
        ? 'text-gray-500'
        : 'text-gray-500',
      badgeClasses: isDark
        ? 'bg-gray-700 text-gray-300'
        : 'bg-gray-100 text-gray-700',
      iconClasses: isDark
        ? 'text-blue-400'
        : 'text-blue-600'
    };
  });

  // 🚀 Exponer públicamente
  readonly styles = this.computedStyles;
  readonly isDarkMode = this._isDarkMode;

  // Iconos
  readonly TrendingUp = TrendingUp;
  readonly Clock = Clock;
  readonly Star = Star;
  readonly ArrowUp = ArrowUp;

  // 🚀 Signals computados para datos procesados
  limitedRelatedPosts = computed(() => {
    const posts = this._relatedPosts();
    return posts.length > 3 ? posts.slice(0, 3) : posts;
  });

  limitedPopularTopics = computed(() => {
    const topics = this._popularTopics();
    return topics.length > 5 ? topics.slice(0, 5) : topics;
  });

  // 🚀 Computed para mostrar/ocultar
  shouldShowRelated = computed(() =>
    this._showRelated() && this._relatedPosts().length > 0
  );

  shouldShowPopular = computed(() =>
    this._showPopular() && this._popularTopics().length > 0
  );

  // Signals para newsletter
  newsletterClasses = computed(() => {
    const isDark = this.isDarkMode();
    return isDark
      ? 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-800/30'
      : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200';
  });

  newsletterTitleClasses = computed(() => {
    const isDark = this.isDarkMode();
    return {
      'text-white': isDark,
      'text-gray-800': !isDark
    };
  });

  newsletterTextClasses = computed(() => {
    const isDark = this.isDarkMode();
    return {
      'text-blue-200': isDark,
      'text-gray-600': !isDark
    };
  });

  newsletterInputClasses = computed(() => {
    const isDark = this.isDarkMode();
    return {
      'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/30': isDark,
      'bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20': !isDark
    };
  });

  newsletterFooterClasses = computed(() => {
    const isDark = this.isDarkMode();
    return {
      'text-gray-500': isDark,
      'text-gray-400': !isDark
    };
  });

  ngOnChanges(changes: SimpleChanges) {
    // No es necesario con setters
  }

  onSubscribe(): void {
    console.log('Suscripción enviada');
  }
}