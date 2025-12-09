import {
  Component,
  computed,
  inject,
  signal,
  OnInit,
  ChangeDetectionStrategy,
  runInInjectionContext,
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
  // 🚀 Inyección de servicios
  private themeService = inject(ThemeService);
  private mockDataService = inject(MockDataService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // 🚀 SIGNALS PARA ESTADO
  isDarkMode = computed(() => this.themeService.isDarkMode());
  sidebarOpen = signal(true);
  isLoading = signal(true);
  error = signal<string | null>(null);

  // 🚀 SIGNALS PARA DATOS DINÁMICOS
  article = signal<ArticleData | null>(null);
  filteredCodeExamples = signal<CodeExample[]>([]);
  articleId = signal<string>('');

  // 🚀 COMPUTED SIGNALS
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

  // 🚀 Stats dinámicos (podrían venir de analytics real)
  currentTime = signal(new Date());

  constructor() {
    // 🚀 Actualizar hora cada minuto (simulación de datos en tiempo real)
    const intervalId = setInterval(() => {
      this.currentTime.set(new Date());
    }, 60000);

    this.destroyRef.onDestroy(() => clearInterval(intervalId));

    // 🚀 Effect para incrementar vistas cuando el artículo se carga
    effect(() => {
      const article = this.article();
      if (article) {
        // Simular incremento de vistas (en producción sería una llamada a API)
        setTimeout(() => {
          this.mockDataService.incrementViews(article.id);
        }, 2000);
      }
    });
  }

  ngOnInit(): void {
    // 🚀 Obtener ID del artículo de la ruta
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const id = params.get('id') || '1';
        this.articleId.set(id);
        this.loadArticle(id);
      });

    // 🚀 Effect para incrementar vistas cuando el artículo se carga
    runInInjectionContext(this, () => {
      effect(() => {
        const article = this.article();
        if (article) {
          // Simular incremento de vistas (en producción sería una llamada a API)
          setTimeout(() => {
            this.mockDataService.incrementViews(article.id);
          }, 2000);
        }
      });
    });
  }

  private loadArticle(id: string): void {
    this.isLoading.set(true);
    this.error.set(null);

    // 🚀 Simular carga asíncrona (en producción sería HTTP request)
    setTimeout(() => {
      try {
        const article = this.mockDataService.getArticleById(id);

        if (article) {
          console.log(article)
          this.article.set(article);

          // 🚀 Filtrar ejemplos de código por categoría del artículo
          const relatedExamples = this.mockDataService
            .getCodeByLanguage(this.getLanguageFromCategory(article.category));

          this.filteredCodeExamples.set(relatedExamples);
        } else {
          this.error.set(`Artículo con ID "${id}" no encontrado`);
          // 🚀 Cargar artículo por defecto
          this.loadDefaultArticle();
        }
      } catch (err) {
        this.error.set('Error al cargar el artículo');
        this.loadDefaultArticle();
      } finally {
        this.isLoading.set(false);
      }
    }, 800); // Simular delay de red
  }

  private loadDefaultArticle(): void {
    const defaultArticle = this.mockDataService.articles()[0];
    this.article.set(defaultArticle);

    const defaultExamples = this.mockDataService
      .getCodeByLanguage(this.getLanguageFromCategory(defaultArticle.category));

    this.filteredCodeExamples.set(defaultExamples);
  }

  private getLanguageFromCategory(category: string): string {
    const categoryLanguageMap: Record<string, string> = {
      'Algoritmos': 'python',
      'Angular': 'typescript',
      'JavaScript': 'javascript',
      'Python': 'python',
      'TypeScript': 'typescript',
      'React': 'javascript'
    };

    return categoryLanguageMap[category] || 'typescript';
  }

  // 🚀 MÉTODOS PÚBLICOS
  toggleSidebar(): void {
    this.sidebarOpen.update(value => !value);
  }

  // 🚀 Método para formatear fecha
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // 🚀 Método para tiempo de lectura estimado
  estimateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min`;
  }

  // 🚀 Método para obtener datos del sidebar
  getSidebarData() {
    return {
      relatedPosts: this.mockDataService.relatedPosts(),
      popularTopics: this.mockDataService.popularTopics()
    };
  }
}