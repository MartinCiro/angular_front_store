import { Injectable, signal } from '@angular/core';

// 🚀 SOLO UNA interfaz para todos los posts
export interface BlogPost {
  id: string | number;
  title: string;
  description: string;
  excerpt?: string;
  imageUrl: string;
  category: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: string;
  views: number;
  tags: string[];
  content?: string;
  codeExamples?: CodeExample[];  // Ejemplos específicos para este post
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
  // 🚀 UN SOLO signal para todos los posts CON EJEMPLOS INCORPORADOS
  // En MockDataService, actualiza _allPosts para tener 7 posts:

  private _allPosts = signal<BlogPost[]>([
    {
      id: '1',
      title: "DIY & Crafts",
      description: "Unleash your creativity with our fun and easy DIY squishy projects!",
      excerpt: "Unleash your creativity with our fun and easy DIY squishy projects!",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKwObVXS73q1Qioa15V2Rjy996BkQd14yy6MHL11-7g3soL58C0WmjKwIjeuFA_bv112G9GrmhhAljEfxgWT7kaRos19mL2hVpfd2243sg1daS09Wpzf8Gha2Ff8l49d--lCcE2tzX_jdbtQHnpKX_S22WBYYlC_JuEe29RqXnebAgyHlztVjq0YUfcgfmHrgQFbCr_byyxMz60pkvraAcNmZs-hy3dn_ZV1T2AC9B8QhVAqNYRS8FdLB52K3arnE4kxPWhgajgOE",
      category: "DIY",
      author: "Artista Creativo",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DIY",
      publishDate: "21 de Mayo, 2024",
      readTime: "5 min lectura",
      views: 320,
      tags: ['DIY', 'Crafts', 'Creativity'],
      content: `
      <h1>DIY & Crafts - Guía Completa</h1>
      <p>Bienvenido a nuestro rincón de manualidades y proyectos DIY...</p>
    `,
      codeExamples: [
      {
        id: 'diy-1',
        title: 'HTML Template para Proyectos DIY',
        language: 'html',
        filename: 'diy_project.html',
        code: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Proyecto DIY - Squishy Personalizado</title>
    <style>
        .diy-container { max-width: 800px; margin: 0 auto; }
        .materials-list { background: #f9f9f9; padding: 15px; }
    </style>
</head>
<body>
    <div class="diy-container">
        <h1>🎨 Proyecto DIY</h1>
        <div class="materials-list">
            <h3>📦 Materiales:</h3>
            <ul>
                <li>Espuma memory foam</li>
                <li>Tela de felpa</li>
                <li>Hilo y aguja</li>
            </ul>
        </div>
    </div>
</body>
</html>`,
        description: 'Template HTML para documentar proyectos DIY'
      },
      {
        id: 'diy-2',
        title: 'Lista de Materiales en JSON',
        language: 'json',
        filename: 'materials.json',
        code: `{
  "project": "Squishy Personalizado",
  "difficulty": "Principiante",
  "estimatedTime": "2 horas",
  "materials": [
    {
      "name": "Espuma memory foam",
      "quantity": "1 bloque",
      "purpose": "Cuerpo principal"
    },
    {
      "name": "Tela de felpa",
      "quantity": "0.5m²",
      "purpose": "Cubierta exterior"
    },
    {
      "name": "Hilo de poliéster",
      "quantity": "1 carrete",
      "purpose": "Costura"
    }
  ],
  "tools": ["Tijeras", "Agujas", "Marcadores textiles"],
  "costEstimate": "$15-20"
}`,
        description: 'Estructura JSON para lista de materiales'
      }
      ]
    },
    {
      id: '2',
      title: "Collector's Corner",
      description: "Dive into the world of rare finds and limited edition squishies.",
      excerpt: "Dive into the world of rare finds and limited edition squishies.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs6A0ydCkwWj1WQ8QnavTtjnJ0hN08pHEOABDiYlwfC5rFMC4VCu1G-yBNN-GGLKXv51lvv35kqaxeXrcs0sEYYAWlzaXu_aTNRiZTufV6j-LE_8dFGTT2in-BTAXMhk8_fs4gHX4t74cfPxtf_hUzumua2KCcTDSsfGaJXUKSx1D8nxE14LacGSWnpRQPk1lYjIB07ZknHN8TGkoWNxZFUFb9q1GWmxdslVGsKAx58WLNWfroey-BU5EoesJyYCEAH8nbcWFRBJU",
      category: "Collecting",
      author: "Coleccionista Expert",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Collector",
      publishDate: "19 de Mayo, 2024",
      readTime: "7 min lectura",
      views: 450,
      tags: ['Collecting', 'Rare', 'Limited Edition'],
      content: `<h1>Collector's Corner - Guía del Coleccionista</h1>`,
      codeExamples: [
        {
          id: 'collect-1',
          title: 'CSS para Galería de Coleccionables',
          language: 'css',
          filename: 'collection_gallery.css',
          code: `.collection-gallery { display: grid; }`,
          description: 'CSS para mostrar coleccionables'
        }
      ]
    },
    {
      id: '3',
      title: "Community Events",
      description: "Join our meetups, trade events, and connect with fellow enthusiasts.",
      excerpt: "Join our meetups, trade events, and connect with fellow enthusiasts.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_XoXhlLQxWhseYp4EIk0vjIuY-onPwkF9aPBMvjlEt9wQZuqICIg9ytIFsv14KZtsTxYvSz2dxdcq3WCe0KmIpEjh7qB6z19KbmSpxQg0n0HR8ombbK1ZcDMpz7QkbR-oleKVzbkhXzQOmRMR0g91IfIeWxE3RHPVWdUz-qYl90uRPfK_lbO3c__-uBa5SSPGJxOctCEJ9vR-FdMfRbXVpcrMF2JieOfQqkx-aYO_3bOp56auEJHe7HCYL4Dm0r23xz2xf0CSP-M",
      category: "Events",
      author: "Organizador Comunitario",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Community",
      publishDate: "18 de Mayo, 2024",
      readTime: "4 min lectura",
      views: 280,
      tags: ['Events', 'Community', 'Meetups'],
      content: `<h1>Community Events - Conecta con la Comunidad</h1>`,
      codeExamples: []
    },
    {
      id: '4',
      title: "Behind the Scenes",
      description: "See how your favorite squishies are designed and brought to life.",
      excerpt: "See how your favorite squishies are designed and brought to life.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbw13wqJVD9ZjxpQ1FNFHWnt8SWn2B7zUeprCwR6W844AMrtn5k7Upzgo97e8U6bu15gqoh_9SGyx36dWxTsv2yRB88zDkjPvW_Ya7i2SrHmtq32nxODJjazwCfqjN91XWuYDvkxJXNycpsl_T3PiVy_iyIDE1vrTTZscslIZTSKX9tlfn7jrHnHbQwzFilLtWWpOk-irtB8O49czyi6a2PO5h9ufNAqlMOXI0CLv1nIiO4ZPrjnUzgKoK9kuHNiz_zBCc4wcLuKc",
      category: "Production",
      author: "Diseñador Industrial",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Designer",
      publishDate: "17 de Mayo, 2024",
      readTime: "6 min lectura",
      views: 390,
      tags: ['Production', 'Design', 'Manufacturing'],
      content: `<h1>Behind the Scenes - El Proceso Creativo</h1>`,
      codeExamples: []
    },
    // AGREGAR 3 POSTS ADICIONALES PARA LLEGAR A 7
    {
      id: '5',
      title: "Squishy Care & Maintenance",
      description: "Learn how to properly care for and maintain your squishy collection.",
      excerpt: "Learn how to properly care for and maintain your squishy collection.",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Care",
      category: "Maintenance",
      author: "Expert Caretaker",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Caretaker",
      publishDate: "16 de Mayo, 2024",
      readTime: "8 min lectura",
      views: 210,
      tags: ['Care', 'Maintenance', 'Cleaning', 'Preservation'],
      content: `<h1>Squishy Care & Maintenance Guide</h1>`,
      codeExamples: []
    },
    {
      id: '6',
      title: "Custom Squishy Designs",
      description: "Create your own custom squishy designs with our step-by-step tutorial.",
      excerpt: "Create your own custom squishy designs with our step-by-step tutorial.",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design",
      category: "Customization",
      author: "Design Pro",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DesignPro",
      publishDate: "15 de Mayo, 2024",
      readTime: "10 min lectura",
      views: 175,
      tags: ['Custom', 'Design', 'Tutorial', 'Personalization'],
      content: `<h1>Custom Squishy Designs Tutorial</h1>`,
      codeExamples: []
    },
    {
      id: '7',
      title: "Squishy Trading Tips",
      description: "Master the art of squishy trading with our expert tips and strategies.",
      excerpt: "Master the art of squishy trading with our expert tips and strategies.",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Trading",
      category: "Trading",
      author: "Trading Expert",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TradingExpert",
      publishDate: "14 de Mayo, 2024",
      readTime: "6 min lectura",
      views: 290,
      tags: ['Trading', 'Tips', 'Strategies', 'Community'],
      content: `<h1>Squishy Trading Tips & Strategies</h1>`,
      codeExamples: []
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
    },
    {
      id: '4',
      title: 'Angular vs React: Comparativa 2024',
      date: '10 de Mayo, 2024',
      slug: 'angular-vs-react-2024',
      category: 'Frameworks',
      readTime: '8 min'
    }
  ]);

  private _popularTopics = signal<string[]>([
    'Desplegando una App con Docker',
    'Primeros Pasos con React Hooks',
    'Guía de Estilos en Tailwind CSS',
    'GraphQL vs REST: Cuándo Usar Cada Uno',
    'Testing en Angular con Jest',
    'Microservicios con Node.js',
    'Machine Learning Básico',
    'Clean Code Principles',
    'Serverless Architecture'
  ]);

  // 🚀 Exponer signals como readonly
  allPosts = this._allPosts.asReadonly();
  // codeExamples = this._codeExamples.asReadonly(); // ELIMINA esta línea
  relatedPosts = this._relatedPosts.asReadonly();
  popularTopics = this._popularTopics.asReadonly();

  // 🚀 MÉTODOS PRINCIPALES

  // GET /posts/:id (para detalle)
  getPostById(id: string | number): BlogPost | undefined {
    const post = this._allPosts().find(p => p.id.toString() === id.toString());
    return post ? { ...post } : undefined;
  }

  // GET /posts (para home)
  getPosts(): BlogPost[] {
    return this._allPosts().map(post => ({
      ...post,
      content: undefined,
      codeExamples: undefined  // No enviamos ejemplos en la lista
    }));
  }

  // PUT /posts/:id/views (para incrementar vistas)
  incrementViews(postId: string | number): void {
    this._allPosts.update(posts =>
      posts.map(post =>
        post.id.toString() === postId.toString()
          ? { ...post, views: post.views + 1 }
          : post
      )
    );
  }

  // 🚀 Métodos auxiliares
  getTotalPosts(): number {
    return this._allPosts().length;
  }

  getTotalViews(): number {
    return this._allPosts().reduce((sum, post) => sum + post.views, 0);
  }

  getCategories(): string[] {
    const categories = new Set(this._allPosts().map(post => post.category));
    return Array.from(categories);
  }
}