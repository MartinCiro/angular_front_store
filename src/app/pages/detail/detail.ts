import {
  Component,
  computed,
  inject,
  signal,
  OnInit,
  ChangeDetectionStrategy,
  DestroyRef,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '@services/theme';
import { MockDataService, ArticleData, CodeExample } from '@services/mock-data.service';
import { SidebarComponent } from '@components/sidebar/sidebar';
import { CodeBlockComponent } from '@components/code-block/code-block';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    SidebarComponent,
    CodeBlockComponent
  ],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogDetailComponent implements OnInit {
  // 🚀 SERVICIOS INYECTADOS
  private themeService = inject(ThemeService);
  private mockDataService = inject(MockDataService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // 🚀 SIGNALS PARA ESTADO DE LA UI
  isDarkMode = computed(() => this.themeService.isDarkMode());
  sidebarOpen = signal(true);
  isLoading = signal(true);
  error = signal<string | null>(null);

  // 🚀 SIGNALS PARA DATOS DEL ARTÍCULO
  article = signal<ArticleData | null>(null);
  filteredCodeExamples = signal<CodeExample[]>([]);
  articleId = signal<string>('');
  currentTime = signal(new Date());

  // 🚀 SIGNALS COMPUTADAS PARA LA UI
  mainContentClasses = computed(() =>
    this.sidebarOpen()
      ? 'lg:max-w-4xl'
      : 'lg:max-w-full'
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

  sidebarButtonLabel = computed(() =>
    this.sidebarOpen()
      ? 'Ocultar sidebar'
      : 'Mostrar sidebar'
  );

  // 🚀 Signal computado para datos del sidebar
  sidebarData = computed(() => {
    const data = {
      isOpen: this.sidebarOpen(),
      relatedPosts: this.mockDataService.relatedPosts(),
      popularTopics: this.mockDataService.popularTopics(),
      showRelated: true,
      showPopular: true,
      showCategories: true,
      categoriesTitle: 'Categorías Relacionadas'
    };
    
    return data;
  });

  constructor() {
    this.initializeTimeUpdater();
    this.initializeViewTracker();
  }

  ngOnInit(): void {
    this.initializeArticleSubscription();
  }

  /**
   * Inicializa el actualizador del tiempo cada minuto
   */
  private initializeTimeUpdater(): void {
    const intervalId = setInterval(() => {
      this.currentTime.set(new Date());
    }, 60000);

    this.destroyRef.onDestroy(() => clearInterval(intervalId));
  }

  /**
   * Inicializa el tracker de vistas para artículos
   */
  private initializeViewTracker(): void {
    effect(() => {
      const article = this.article();
      if (article) {
        this.trackArticleView(article.id);
      }
    });
  }

  /**
   * Inicializa la suscripción a cambios en los parámetros de ruta
   */
  private initializeArticleSubscription(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const id = params.get('id') || '1';
        this.articleId.set(id);
        this.loadArticle(id);
      });
  }

  /**
   * Simula el tracking de vistas para un artículo
   */
  private trackArticleView(articleId: string): void {
    setTimeout(() => {
      this.mockDataService.incrementViews(articleId);
    }, 2000);
  }

  /**
   * Carga un artículo por su ID
   */
  private loadArticle(id: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    setTimeout(() => {
      try {
        const article = this.mockDataService.getArticleById(id);

        if (article) {
          this.article.set(article);
          this.filterRelatedCodeExamples(article.category);
        } else {
          this.handleArticleNotFound(id);
        }
      } catch (err) {
        this.handleLoadError();
      } finally {
        this.isLoading.set(false);
      }
    }, 800);
  }

  /**
   * Filtra ejemplos de código relacionados con la categoría del artículo
   */
  private filterRelatedCodeExamples(category: string): void {
    const language = this.getLanguageFromCategory(category);
    const relatedExamples = this.mockDataService.getCodeByLanguage(language);

    this.filteredCodeExamples.set(relatedExamples);
  }

  /**
   * Maneja el caso cuando no se encuentra un artículo
   */
  private handleArticleNotFound(id: string): void {
    this.error.set(`Artículo con ID "${id}" no encontrado`);
    this.loadDefaultArticle();
  }

  /**
   * Maneja errores de carga
   */
  private handleLoadError(): void {
    this.error.set('Error al cargar el artículo');
    this.loadDefaultArticle();
  }

  /**
   * Carga un artículo por defecto como fallback
   */
  public loadDefaultArticle(): void {
    const defaultArticle = this.mockDataService.articles()[0];
    this.article.set(defaultArticle);
    
    const defaultExamples = this.mockDataService
      .getCodeByLanguage(this.getLanguageFromCategory(defaultArticle.category));
    
    this.filteredCodeExamples.set(defaultExamples);
  }

  /**
   * Obtiene el lenguaje de programación asociado a una categoría
   */
  private getLanguageFromCategory(category: string): string {
    const categoryLanguageMap: Record<string, string> = {
      'algoritmos': 'python',
      'angular': 'typescript',
      'javascript': 'javascript',
      'python': 'python',
      'typescript': 'typescript',
      'react': 'javascript',
      'fundamentos': 'typescript',
      'teoría': 'python'
    };

    return categoryLanguageMap[category.toLowerCase()] || 'typescript';
  }

  // 🚀 MÉTODOS PÚBLICOS

  /**
   * Alterna la visibilidad del sidebar
   */
  toggleSidebar(): void {
    this.sidebarOpen.update(value => !value);
  }

  /**
   * Formatea una fecha en español
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Calcula el tiempo estimado de lectura
   */
  estimateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min`;
  }
}