import { Injectable, signal } from '@angular/core';

export interface ArticleData {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  category: string;
  readTime: string;
  views: number;
  excerpt: string;
  tags: string[];
  content: string;
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  language: string;
  description?: string;
  filename?: string;
}

export interface RelatedPost {
  id: string;
  title: string;
  date: string;
  slug: string;
  category?: string;
  readTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  // 🚀 Signals con mock data dinámico
  private _articles = signal<ArticleData[]>([
    {
      id: '1',
      title: 'Algoritmos de Clasificación: Una Comparativa',
      author: 'Jane Doe',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0XTDwdpTb3OfmOI6kMkyIubO-RL_ytzJMO05QgfUOQpF3eMOohSdklY_kZZ_NgFpsg0q8yjOU5f0sOrDTimy5tk-DLSX3_52l03e2dBi48QqA2G8KKI-gYhdJy5oWrj0ZbQ_5YNJr8URSGuOnc06lJl32SbPvLugi4Ib8mj2LAG9JHDEgcG4bTr_S8DoBTBJe1HedME-w5SyCNm0PZqgqZl-xRHbnT76U6HsYYMdOFpEKamSFforc7Rl2vwXC35CgnYu2dH-lqfw',
      publishDate: '21 de Mayo, 2024',
      category: 'Algoritmos',
      readTime: '8 min lectura',
      views: 1247,
      excerpt: 'Un análisis comparativo de los algoritmos de ordenamiento más populares',
      tags: ['Algoritmos', 'Python', 'Performance', 'Estructuras de Datos'],
      content: `
        <h2>Fundamentos Teóricos</h2>
        <p>Los algoritmos de clasificación son un componente fundamental en la informática...</p>
        
        <h2>Complejidad Computacional</h2>
        <p>La eficiencia se mide comúnmente por su complejidad temporal y espacial...</p>
      `
    },
    {
      id: '2',
      title: 'Introducción a Angular Signals',
      author: 'Carlos Ruiz',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Angular',
      publishDate: '22 de Mayo, 2024',
      category: 'Angular',
      readTime: '10 min lectura',
      views: 892,
      excerpt: 'Guía completa para entender y usar Signals en Angular',
      tags: ['Angular', 'Signals', 'TypeScript', 'Frontend'],
      content: `
        <h2>¿Qué son los Signals?</h2>
        <p>Los Signals son la nueva API reactiva en Angular que simplifica...</p>
        
        <h2>Ventajas sobre RxJS</h2>
        <p>Para estados simples, Signals ofrece una sintaxis más limpia...</p>
      `
    }
  ]);

  private _codeExamples = signal<CodeExample[]>([
    {
      id: '1',
      title: 'Bubble Sort',
      language: 'python',
      filename: 'bubble_sort.py',
      code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
      description: 'Implementación clásica con optimización de bandera'
    },
    {
      id: '2',
      title: 'Quick Sort',
      language: 'python',
      filename: 'quick_sort.py',
      code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    else:
        pivot = arr[len(arr) // 2]
        left = [x for x in arr if x < pivot]
        middle = [x for x in arr if x == pivot]
        right = [x for x in arr if x > pivot]
        return quick_sort(left) + middle + quick_sort(right)`,
      description: 'Implementación recursiva con pivot central'
    },
    {
      id: '3',
      title: 'Angular Signal Basic',
      language: 'typescript',
      filename: 'counter.service.ts',
      code: `import { signal, computed, effect } from '@angular/core';

export class CounterService {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);
  
  constructor() {
    effect(() => {
      console.log('Count changed:', this.count());
    });
  }
  
  increment() {
    this.count.update(value => value + 1);
  }
}`,
      description: 'Ejemplo básico de signal en Angular'
    }
  ]);

  private _relatedPosts = signal<RelatedPost[]>([
    {
      id: '1',
      title: 'Una Introducción a las Estructuras de Datos',
      date: '18 de Mayo, 2024',
      slug: 'introduccion-estructuras-datos',
      category: 'Fundamentos',
      readTime: '5 min'
    },
    {
      id: '2',
      title: 'Optimización de Algoritmos: Big O Notation',
      date: '15 de Mayo, 2024',
      slug: 'optimizacion-algoritmos-big-o',
      category: 'Teoría',
      readTime: '10 min'
    },
    {
      id: '3',
      title: 'Merge Sort vs. Heap Sort: Análisis Comparativo',
      date: '12 de Mayo, 2024',
      slug: 'merge-sort-vs-heap-sort',
      category: 'Algoritmos',
      readTime: '7 min'
    }
  ]);

  private _popularTopics = signal<string[]>([
    'Desplegando una App con Docker',
    'Primeros Pasos con React Hooks',
    'Guía de Estilos en Tailwind CSS',
    'GraphQL vs REST: Cuándo Usar Cada Uno',
    'Testing en Angular con Jest',
    'Microservicios con Node.js',
    'Machine Learning Básico'
  ]);

  // 🚀 Exponer signals como readonly
  articles = this._articles.asReadonly();
  codeExamples = this._codeExamples.asReadonly();
  relatedPosts = this._relatedPosts.asReadonly();
  popularTopics = this._popularTopics.asReadonly();

  // 🚀 Métodos para simular cambios dinámicos
  incrementViews(articleId: string): void {
    this._articles.update(articles => 
      articles.map(article => 
        article.id === articleId 
          ? { ...article, views: article.views + 1 }
          : article
      )
    );
  }

  addCodeExample(example: CodeExample): void {
    this._codeExamples.update(examples => [...examples, example]);
  }

  // 🚀 Método para obtener artículo por ID (simula API)
  getArticleById(id: string): ArticleData | undefined {
    return this._articles().find(article => article.id === id);
  }

  // 🚀 Método para obtener artículos por categoría
  getArticlesByCategory(category: string): ArticleData[] {
    return this._articles().filter(article => 
      article.category.toLowerCase() === category.toLowerCase()
    );
  }

  // 🚀 Método para obtener código por lenguaje
  getCodeByLanguage(language: string): CodeExample[] {
    return this._codeExamples().filter(example => 
      example.language.toLowerCase() === language.toLowerCase()
    );
  }
}