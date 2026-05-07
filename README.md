# 📝 Blog

```markdown
# 🎨 Skuish Study Admin - Panel de Administración

> Panel de administración moderno para gestión de blogs, construido con **Angular 21+**, **TypeScript**, **Tailwind CSS** y arquitectura **Standalone Components**.

[![Angular](https://img.shields.io/badge/Angular-21+-DD0031?style=flat&logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)

---

## 📋 Tabla de Contenidos

- [✨ Características](#-características)
- [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [📁 Estructura de Carpetas](#-estructura-de-carpetas)
- [🧩 Componentes Principales](#-componentes-principales)
- [🎨 Estilos y Temas](#-estilos-y-temas)
- [🔄 Gestión de Estado con Signals](#-gestión-de-estado-con-signals)
- [🧪 Testing](#-testing)
- [🌐 API Integration](#-api-integration)
- [🚀 Deployment](#-deployment)
- [🤝 Contribuir](#-contribuir)

---

## ✨ Características

### 🎯 Funcionalidades del Dashboard
- ✅ **Vista de Resumen (Overview)**: Estadísticas en tiempo real, posts recientes, roles activos y estado del sistema
- ✅ **Gestión de Entradas**: CRUD completo para artículos del blog con editor enriquecido
- ✅ **Administración de Usuarios**: Gestión de roles, permisos y estados de cuenta
- ✅ **Analytics**: Métricas de tráfico, comportamiento de usuarios y rendimiento del sitio
- ✅ **Exportación de Datos**: Descarga de reportes en JSON/CSV
- ✅ **Modo Oscuro/Claro**: Soporte completo con persistencia en `localStorage`
- ✅ **Responsive Design**: Optimizado para móvil, tablet y escritorio

### ⚡ Tecnologías Modernas
- 🔄 **Angular Signals**: Gestión de estado reactivo sin Zone.js
- 🧭 **Nuevo Control Flow**: Sintaxis `@if`, `@switch`, `@for` para mejor rendimiento
- 🧱 **Standalone Components**: Arquitectura modular sin NgModules
- 🎨 **Tailwind CSS**: Utilidades CSS con configuración personalizada
- 🔷 **Lucide Icons**: Biblioteca de íconos ligera y consistente
- 🧪 **Vitest**: Testing unitario rápido y moderno

---

## 🏗️ Arquitectura del Proyecto

### Patrón de Diseño
```
┌─────────────────────────────────┐
│        DashboardComponent        │
│  (Contenedor principal - Smart)  │
└─────────┬───────────────────────┘
          │
   ┌──────┴──────┐
   ▼             ▼
┌────────┐  ┌─────────────┐
│ Layout │  │ Vista Actual │
│Component│  │(Dumb/Presentational)│
└────────┘  └─────────────┘
               │
     ┌─────────┼─────────┐
     ▼         ▼         ▼
┌────────┐ ┌────────┐ ┌────────┐
│ Posts  │ │ Users  │ │Analytics│
│ View   │ │ View   │ │ View   │
└────────┘ └────────┘ └────────┘
```

### Flujo de Datos con Signals
```typescript
// dashboard.component.ts - Ejemplo de gestión de estado
export class DashboardComponent {
  // Signals de entrada (inputs)
  currentView = signal<ViewType>('overview');
  isLoading = signal<boolean>(false);
  
  // Signals computados (derived state)
  containerClasses = computed(() => ({
    'dark': this.theme() === 'dark',
    'sidebar-open': this.sidebarOpen()
  }));
  
  // Methods para acciones
  async refreshDashboard(): Promise<void> {
    this.isLoading.set(true);
    try {
      await Promise.all([
        this.loadStats(),
        this.loadRecentPosts(),
        this.loadSystemStatus()
      ]);
    } finally {
      this.isLoading.set(false);
    }
  }
}
```

---

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 20.x o superior
- npm 10.x o pnpm 8.x
- Angular CLI 21.x

### Instalación
```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/skuish-study-admin.git
cd skuish-study-admin

# 2. Instalar dependencias
npm install
# o con pnpm
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus configuraciones de API

# 4. Iniciar servidor de desarrollo
ng serve
# o con hot-reload optimizado
ng serve --hmr
```

### Acceso
🌐 **URL**: `http://localhost:4200`

---

## 📁 Estructura de Carpetas

```
src/
├── app/
│   ├── core/                    # Servicios singleton, guards, interceptors
│   │   ├── auth/
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   └── auth.interceptor.ts
│   │   ├── api/
│   │   │   ├── api.service.ts
│   │   │   └── api.config.ts
│   │   └── config/
│   │       └── app.config.ts   # ApplicationConfig para standalone
│   │
│   ├── shared/                  # Componentes reutilizables, pipes, directives
│   │   ├── components/
│   │   │   ├── stat-card/
│   │   │   ├── recent-posts-table/
│   │   │   ├── quick-actions/
│   │   │   └── ...
│   │   ├── directives/
│   │   │   └── tooltip.directive.ts
│   │   ├── pipes/
│   │   │   └── format-date.pipe.ts
│   │   └── utils/
│   │       └── helpers.ts
│   │
│   ├── layouts/                 # Layouts de página
│   │   └── dashboard-layout/
│   │       ├── dashboard-layout.component.ts
│   │       └── dashboard-layout.html
│   │
│   ├── pages/                   # Vistas principales de la aplicación
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.html
│   │   │   ├── dashboard.css
│   │   │   ├── posts-view/
│   │   │   ├── users-view/
│   │   │   └── analytics-view/
│   │   └── auth/
│   │       └── login/
│   │
│   ├── models/                  # Interfaces y tipos TypeScript
│   │   ├── user.model.ts
│   │   ├── post.model.ts
│   │   └── dashboard-stats.model.ts
│   │
│   └── app.config.ts            # Configuración principal de la app
│
├── assets/
│   ├── icons/                   # Íconos SVG personalizados
│   └── images/                  # Imágenes estáticas
│
├── environments/                # Variables por entorno
│   ├── environment.ts
│   └── environment.prod.ts
│
├── styles/                      # Estilos globales y configuración Tailwind
│   ├── tailwind.config.js
│   └── styles.css
│
└── index.html                   # Punto de entrada
```

---

## 🧩 Componentes Principales

### DashboardComponent (`src/app/pages/dashboard/`)
**Selector**: `<app-dashboard>`

| Input | Tipo | Descripción |
|-------|------|-------------|
| `initialView` | `ViewType` | Vista inicial al cargar ('overview', 'posts', 'users', 'analytics') |

| Output | Evento | Payload |
|--------|--------|---------|
| `viewChanged` | `ViewType` | Emitido cuando cambia la vista activa |
| `dataExported` | `ExportFormat` | Confirmación de exportación completada |

**Métodos Públicos**:
```typescript
// Refrescar todos los datos del dashboard
refreshDashboard(): Promise<void>

// Exportar datos en formato específico
exportData(format: 'json' | 'csv'): void

// Cambiar vista programáticamente
changeView(view: ViewType): void
```

### StatCardComponent (`src/app/shared/components/stat-card/`)
**Selector**: `<app-stat-card>`

```typescript
// Interface del input
export interface StatData {
  id: string;
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: string; // Nombre del ícono Lucide
  color: 'blue' | 'green' | 'yellow' | 'red';
}

// Uso en template
<app-stat-card [stat]="{
  id: 'total-posts',
  title: 'Entradas Totales',
  value: 142,
  change: { value: 12, trend: 'up' },
  icon: 'FileText',
  color: 'blue'
}"></app-stat-card>
```

### RecentPostsTableComponent
**Selector**: `<app-recent-posts-table>`

| Input | Tipo | Descripción |
|-------|------|-------------|
| `posts` | `Post[]` | Array de posts para mostrar |
| `pageSize` | `number` | Elementos por página (default: 5) |

| Output | Evento | Payload |
|--------|--------|---------|
| `postAction` | `{ postId: string, action: 'edit' \| 'delete' \| 'publish' }` | Acción solicitada por el usuario |

---

## 🎨 Estilos y Temas

### Configuración de Tailwind
El proyecto utiliza una configuración personalizada en `tailwind.config.js`:

```js
// tailwind.config.js - Extracto de colores personalizados
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          hover: '#2563EB',   // blue-600
        },
        'card-dark': '#1E293B', // slate-800
        'card-hover': '#334155', // slate-700
        'subtle-text': '#94A3B8', // slate-400
      },
    }
  }
}
```

### Modo Oscuro
El sistema de temas se gestiona mediante la clase `dark` en el elemento `<html>`:

```typescript
// services/theme.service.ts
export class ThemeService {
  private theme = signal<'light' | 'dark'>('light');
  
  toggle(): void {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  }
  
  init(): void {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.theme.set(saved ?? (prefersDark ? 'dark' : 'light'));
  }
}
```

**Uso en componentes**:
```html
<!-- Clases condicionales para dark mode -->
<div class="bg-white dark:bg-card-dark text-slate-900 dark:text-slate-100">
  <!-- Contenido -->
</div>
```

---

## 🔄 Gestión de Estado con Signals

### Patrones Recomendados

#### ✅ Signal para estado local simple
```typescript
export class MyComponent {
  count = signal(0);
  
  increment(): void {
    this.count.update(c => c + 1);
  }
}
```

#### ✅ Computed para estado derivado
```typescript
export class DashboardComponent {
  posts = signal<Post[]>([]);
  searchTerm = signal('');
  
  // Filtrado reactivo sin suscripciones manuales
  filteredPosts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.posts().filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.content.toLowerCase().includes(term)
    );
  });
}
```

#### ✅ Effect para side effects
```typescript
export class AnalyticsComponent {
  dateRange = signal<{ start: Date, end: Date }>({ 
    start: new Date(), end: new Date() 
  });
  
  // Ejecuta automáticamente cuando cambia dateRange
  loadAnalytics = effect(() => {
    const { start, end } = this.dateRange();
    this.analyticsService.fetch({ start, end })
      .subscribe(data => this.chartData.set(data));
  });
}
```

### ⚠️ Evitar Anti-patrones
```typescript
// ❌ NO: Llamar funciones en el template sin memoizar
// dashboard.html
<div [class]="getDynamicClasses()"> <!-- Se ejecuta en cada CD -->

// ✅ SÍ: Usar computed signals
// dashboard.component.ts
dynamicClasses = computed(() => this.calculateClasses());
// dashboard.html
<div [class]="dynamicClasses()">
```

---

## 🧪 Testing

### Unit Tests con Vitest
```bash
# Ejecutar todos los tests
ng test

# Ejecutar tests en modo watch (desarrollo)
ng test --watch

# Ejecutar tests con cobertura
ng test --coverage

# Ejecutar tests de un componente específico
ng test --include='**/dashboard.component.spec.ts'
```

### Ejemplo de Test para Componente con Signals
```typescript
// dashboard.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent], // Standalone component
      providers: [
        { provide: DashboardService, useValue: { 
          getStats: () => of([]),
          getRecentPosts: () => of([])
        }}
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    expect(component.sidebarOpen()).toBe(false);
    component.toggleSidebar();
    expect(component.sidebarOpen()).toBe(true);
  });

  it('should filter posts when search term changes', async () => {
    // Configurar datos de prueba
    component.posts.set([
      { id: '1', title: 'Angular Signals', content: '...' },
      { id: '2', title: 'Tailwind CSS', content: '...' }
    ]);
    
    // Cambiar término de búsqueda
    component.searchTerm.set('angular');
    fixture.detectChanges();
    await fixture.whenStable();
    
    // Verificar filtrado
    expect(component.filteredPosts().length).toBe(1);
    expect(component.filteredPosts()[0].title).toContain('Angular');
  });
});
```

### E2E Testing (Opcional)
```bash
# Instalar Playwright (recomendado para Angular 21+)
npm install -D @playwright/test
npx playwright install

# Ejecutar tests E2E
npx playwright test

# Ver reporte en navegador
npx playwright show-report
```

---

## 🌐 API Integration

### Configuración de HttpClient
```typescript
// core/api/api.config.ts
export const API_CONFIG: ApiConfig = {
  baseUrl: environment.apiUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// core/api/api.service.ts
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private config = inject(API_CONFIG);
  
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.config.baseUrl}/${endpoint}`, {
      params,
      headers: this.config.headers
    });
  }
  
  // ... métodos post, put, delete
}
```

### Interceptores Esenciales
```typescript
// core/auth/auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  
  return next(req);
};

// core/api/error.interceptor.ts
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const toast = inject(ToastService);
      
      if (error.status === 401) {
        inject(Router).navigate(['/login']);
        toast.error('Sesión expirada');
      } else if (error.status >= 500) {
        toast.error('Error del servidor. Intente más tarde.');
      }
      
      return throwError(() => error);
    })
  );
};
```

### Registro en app.config.ts
```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([
      authInterceptor,
      errorInterceptor,
      loggingInterceptor
    ])),
    // ... otros providers
  ]
};
```

---

## 🚀 Deployment

### Build para Producción
```bash
# Build optimizado
ng build --configuration production

# Analizar bundle size
ng build --configuration production --stats-json
npx webpack-bundle-analyzer dist/blog/stats.json

# Preview local del build de producción
npx http-server dist/blog -p 8080
```

### Docker (Opcional)
```dockerfile
# Dockerfile.multistage
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN ng build --configuration production

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist/blog /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Construir y ejecutar contenedor
docker build -t skuish-admin .
docker run -p 8080:80 skuish-admin
```

### Deploy en Vercel/Netlify
```json
// vercel.json
{
  "version": 2,
  "buildCommand": "ng build --configuration production",
  "outputDirectory": "dist/blog",
  "framework": "angular",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🤝 Contribuir

### Flujo de Trabajo Git
```bash
# 1. Crear rama para nueva feature
git checkout -b feature/nueva-funcionalidad

# 2. Desarrollar con commits atómicos
git add src/app/pages/dashboard/new-feature/
git commit -m "feat(dashboard): add new analytics widget

- Implement chart component with reactivity
- Add export to PNG functionality
- Include unit tests"

# 3. Actualizar con main y resolver conflictos
git fetch origin
git rebase origin/main

# 4. Push y crear Pull Request
git push origin feature/nueva-funcionalidad
# Luego crear PR en GitHub/GitLab
```

### Convenciones de Código
- ✅ **TypeScript**: Activar `strict: true` en `tsconfig.json`
- ✅ **ESLint**: Usar reglas personalizadas en `.eslintrc.json`
- ✅ **Prettier**: Formatear antes de commit (`npx prettier --write .`)
- ✅ **Commit Messages**: Seguir [Conventional Commits](https://www.conventionalcommits.org/)

### Checklist para PRs
- [ ] Tests unitarios para nueva lógica
- [ ] Documentación actualizada (JSDoc + README)
- [ ] Sin `console.log` ni código comentado
- [ ] Linting y formateo pasados
- [ ] Funcionalidad probada en modo oscuro/claro
- [ ] Responsive verificado en móvil/tablet/desktop

---

## 🆘 Soporte y Recursos

### Enlaces Útiles
- 📘 [Documentación Oficial Angular](https://angular.dev)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com/docs)
- 🔷 [Lucide Icons](https://lucide.dev/icons)
- 🧪 [Vitest Guide](https://vitest.dev/guide/)

### Solución de Problemas Comunes

#### ❌ Error: `NG8001: 'app-x' is not a known element`
```bash
# Causa: Componente standalone no importado en el padre
# Solución: Añadir al array `imports` del @Component
@Component({
  imports: [CommonModule, AppXComponent] // 👈 Añadir aquí
})
```

#### ❌ Error: `Cannot read properties of undefined (reading 'subscribe')`
```typescript
// Causa: Usar RxJS donde se espera Signal
// Solución: Convertir Observable a Signal con toSignal()
import { toSignal } from '@angular/core/rxjs-interop';

export class MyComponent {
  data = toSignal(this.http.get<Data>('/api/data'), { 
    initialValue: null 
  });
}
```

#### ❌ Tailwind classes no aplican
```bash
# Verificar que el archivo está siendo escaneado por Tailwind
// tailwind.config.js
content: [
  "./src/**/*.{html,ts}", // 👈 Asegurar esta línea
],
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

> 💡 **Tip Pro**: Usa `ng generate` para mantener consistencia en la creación de componentes:
> ```bash
> ng g c pages/dashboard/new-feature --standalone --skip-tests --inline-style
> ```

**Hecho con ❤️ para la comunidad Angular**
```

---

## 🎯 Próximos Pasos Sugeridos

1. **Copiar este contenido** en `README.md` en la raíz de tu proyecto
2. **Personalizar** las secciones de API, deployment y licencias según tu infraestructura real
3. **Añadir badges** de CI/CD si usas GitHub Actions, GitLab CI, etc.
4. **Generar documentación automática** con Compodoc:
   ```bash
   npm install -D @compodoc/compodoc
   npx compodoc -p tsconfig.json -d docs --watch
   ```