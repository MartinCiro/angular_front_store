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
import { MockDataService, BlogPost } from '@services/mock-data.service';
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
  article = signal<BlogPost | null>(null);
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
  sidebarData = computed(() => ({
    isOpen: this.sidebarOpen(),
    relatedPosts: this.mockDataService.relatedPosts(),
    popularTopics: this.mockDataService.popularTopics(),
    showRelated: true,
    showPopular: true,
    showCategories: true,
    categoriesTitle: 'Categorías Relacionadas'
  }));

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
  private trackArticleView(articleId: string | number): void {
    setTimeout(() => {
      this.mockDataService.incrementViews(articleId);
    }, 2000);
  }

  /**
   * Carga un artículo por su ID
   */
  private loadArticle(id: string | number): void {
    this.isLoading.set(true);
    this.error.set(null);

    setTimeout(() => {
      try {
        const post = this.mockDataService.getPostById(id);

        if (post) {
          this.article.set(post);
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
   * Maneja el caso cuando no se encuentra un artículo
   */
  private handleArticleNotFound(id: string | number): void {
    this.error.set(`Content with ID "${id}" not found`);
    this.loadDefaultArticle();
  }

  /**
   * Maneja errores de carga
   */
  private handleLoadError(): void {
    this.error.set('Error loading content');
    this.loadDefaultArticle();
  }

  /**
   * Carga un artículo por defecto como fallback
   */
  public loadDefaultArticle(): void {
    const allPosts = this.mockDataService.allPosts();

    if (allPosts.length > 0) {
      const defaultPost = allPosts[0];
      this.article.set(defaultPost);
    } else {
      this.error.set('No hay posts disponibles');
    }
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
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
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