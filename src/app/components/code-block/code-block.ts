// src/app/components/code-block/code-block.component.ts
import { 
  Component, 
  Input, 
  effect, 
  inject, 
  signal, 
  computed,
  ChangeDetectionStrategy,
  DestroyRef,
  HostBinding,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@services/theme';
import { LucideAngularModule, Copy, Check, ChevronDown, ChevronUp, Code } from 'lucide-angular';

// 🚀 Tipo para variantes de código
export type CodeVariant = 'default' | 'minimal' | 'elegant' | 'inline';

// 🚀 Mapa de colores para lenguajes
const LANGUAGE_COLORS: Record<string, { light: string, dark: string }> = {
  typescript: { light: 'bg-blue-100 text-blue-800', dark: 'bg-blue-900/30 text-blue-300' },
  javascript: { light: 'bg-yellow-100 text-yellow-800', dark: 'bg-yellow-900/30 text-yellow-300' },
  python: { light: 'bg-green-100 text-green-800', dark: 'bg-green-900/30 text-green-300' },
  html: { light: 'bg-red-100 text-red-800', dark: 'bg-red-900/30 text-red-300' },
  css: { light: 'bg-indigo-100 text-indigo-800', dark: 'bg-indigo-900/30 text-indigo-300' },
  shell: { light: 'bg-gray-200 text-gray-800', dark: 'bg-gray-800 text-gray-300' },
  bash: { light: 'bg-gray-200 text-gray-800', dark: 'bg-gray-800 text-gray-300' },
  json: { light: 'bg-purple-100 text-purple-800', dark: 'bg-purple-900/30 text-purple-300' },
  sql: { light: 'bg-cyan-100 text-cyan-800', dark: 'bg-cyan-900/30 text-cyan-300' },
  java: { light: 'bg-orange-100 text-orange-800', dark: 'bg-orange-900/30 text-orange-300' },
  'c++': { light: 'bg-pink-100 text-pink-800', dark: 'bg-pink-900/30 text-pink-300' },
  go: { light: 'bg-teal-100 text-teal-800', dark: 'bg-teal-900/30 text-teal-300' },
  rust: { light: 'bg-amber-100 text-amber-800', dark: 'bg-amber-900/30 text-amber-300' },
  php: { light: 'bg-violet-100 text-violet-800', dark: 'bg-violet-900/30 text-violet-300' },
  ruby: { light: 'bg-rose-100 text-rose-800', dark: 'bg-rose-900/30 text-rose-300' },
  swift: { light: 'bg-orange-100 text-orange-800', dark: 'bg-orange-900/30 text-orange-300' },
  kotlin: { light: 'bg-indigo-100 text-indigo-800', dark: 'bg-indigo-900/30 text-indigo-300' },
  dart: { light: 'bg-blue-100 text-blue-800', dark: 'bg-blue-900/30 text-blue-300' },
  markdown: { light: 'bg-gray-100 text-gray-800', dark: 'bg-gray-700 text-gray-300' }
};

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './code-block.html',
  styleUrls: ['./code-block.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // 🚀 Host binding para clases dinámicas
  host: {
    '[class]': `getHostClasses()`,
    '[attr.data-variant]': 'variant()',
    '[attr.data-language]': 'language()'
  }
})
export class CodeBlockComponent {
  private themeService = inject(ThemeService);
  private destroyRef = inject(DestroyRef);
  
  // 🚀 INPUTS OPTIMIZADOS con valores por defecto claros
  @Input({ required: true, transform: (v: string) => v?.trim() || '' }) 
  code = signal('');
  
  @Input({ transform: (v: string) => v?.toLowerCase() || 'typescript' }) 
  language = signal('typescript');
  
  @Input({ transform: (v: string) => v || '' }) 
  filename = signal('');
  
  @Input({ transform: (v: string) => v || '' }) 
  description = signal('');
  
  @Input({ transform: (v: boolean) => !!v }) 
  collapsible = signal(false);
  
  @Input({ transform: (v: boolean) => v !== false }) 
  showBorder = signal(true);
  
  @Input({ transform: (v: CodeVariant) => v || 'default' }) 
  variant = signal<CodeVariant>('default');
  
  @Input({ transform: (v: boolean) => !!v }) 
  showLineNumbers = signal(false);
  
  @Input({ transform: (v: boolean) => v !== false }) 
  showCopyButton = signal(true);
  
  @Input({ transform: (v: boolean) => !!v }) 
  showHeader = signal(true);
  
  @Input({ transform: (v: string) => v || 'block' }) 
  display = signal<'block' | 'inline'>('block');
  
  // 🚀 Signals de estado interno
  isCollapsed = signal(false);
  copied = signal(false);
  lineCount = computed(() => this.code().split('\n').length);
  
  // 🚀 Signal del tema
  isDarkMode = computed(() => this.themeService.isDarkMode());
  
  // 🚀 Iconos de Lucide
  readonly Copy = Copy;
  readonly Check = Check;
  readonly ChevronDown = ChevronDown;
  readonly ChevronUp = ChevronUp;
  readonly CodeIcon = Code;
  ngOnInit() {
    effect(() => {
      console.log(
        '%c[CodeBlock] Código recibido:',
        'color: #4ade80; font-weight: bold',
        this.code()
      );
    });
  }

  consoleLogCode() {
    console.log(
      '%c[CodeBlock] Click → valor actual del code():',
      'color: #60a5fa; font-weight: bold',
      this.code()
    );
  }
  
  // 🚀 COMPUTED OPTIMIZADOS: Memoizado completo
  private computedStyles = computed(() => {
    const isDark = this.isDarkMode();
    const variant = this.variant();
    const language = this.language();
    
    return {
      // Classes para el wrapper
      wrapperClasses: this.getWrapperClasses(isDark, variant),
      
      // Header
      headerClasses: this.getHeaderClasses(isDark, variant),
      
      // Code container
      codeClasses: this.getCodeClasses(isDark, variant),
      
      // Footer
      footerClasses: isDark 
        ? 'border-gray-800 bg-gray-900/50' 
        : 'border-gray-200 bg-gray-50',
      
      // Description
      descriptionClasses: isDark 
        ? 'text-gray-400' 
        : 'text-gray-600',
      
      // Language badge
      languageBadgeClasses: this.getLanguageBadgeClasses(isDark, language),
      
      // Dots (solo para variant default)
      dotClasses: isDark 
        ? ['bg-red-500', 'bg-yellow-500', 'bg-green-500'] 
        : ['bg-red-400', 'bg-yellow-400', 'bg-green-400'],
      
      // Copy button
      copyButtonClasses: this.getCopyButtonClasses(isDark, this.copied()),
      
      // Collapse button
      collapseButtonClasses: isDark 
        ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' 
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200',
      
      // Overlay
      overlayClasses: isDark 
        ? 'from-gray-900/90 to-transparent' 
        : 'from-white/90 to-transparent',
      
      // Expand button
      expandButtonClasses: this.getExpandButtonClasses(isDark)
    };
  });
  
  // 🚀 Exponer computed agrupado
  styles = this.computedStyles;
  
  // 🚀 Computed para mostrar/ocultar elementos
  shouldShowHeader = computed(() => {
    const variant = this.variant();
    const hasFilename = !!this.filename();
    const showHeader = this.showHeader();
    
    return showHeader && (hasFilename || variant !== 'minimal');
  });
  
  shouldShowLineNumbers = computed(() => {
    return this.showLineNumbers() && this.lineCount() > 1;
  });
  
  isInlineVariant = computed(() => this.variant() === 'inline');
  
  constructor() {
    // 🚀 Effect optimizado para resetear estado de copiado
    effect(() => {
      if (this.copied()) {
        const timeout = setTimeout(() => {
          this.copied.set(false);
        }, 2000);
        
        // Limpieza automática
        this.destroyRef.onDestroy(() => clearTimeout(timeout));
      }
    });
  }
  
  // 🚀 Métodos públicos
  async copyToClipboard(): Promise<void> {
    if (!this.showCopyButton()) return;
    
    const code = this.code();
    
    try {
      await navigator.clipboard.writeText(code);
      this.copied.set(true);
    } catch (err) {
      console.error('Error al copiar el código:', err);
      this.fallbackCopy(code);
    }
  }
  
  private fallbackCopy(code: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = code;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.copied.set(true);
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    
    document.body.removeChild(textArea);
  }
  
  toggleCollapsed(): void {
    if (this.collapsible()) {
      this.isCollapsed.update(value => !value);
    }
  }
  
  // 🚀 Métodos privados para cálculo de clases
  getHostClasses(): string {
    const classes = ['code-block', 'transition-all', 'duration-300'];
    
    if (this.display() === 'inline') {
      classes.push('inline-code');
    }
    
    if (this.variant() === 'inline') {
      classes.push('variant-inline');
    }
    
    return classes.join(' ');
  }
  
  private getWrapperClasses(isDark: boolean, variant: CodeVariant): string {
    const classes = ['my-6', 'rounded-lg', 'overflow-hidden', 'shadow-lg'];
    
    if (this.showBorder()) {
      classes.push('border');
      classes.push(isDark ? 'border-gray-700' : 'border-gray-200');
    }
    
    if (variant === 'inline') {
      classes.push('!my-2', '!shadow-sm', 'text-sm');
    }
    
    return classes.join(' ');
  }
  
  private getHeaderClasses(isDark: boolean, variant: CodeVariant): string {
    if (variant === 'inline') return '';
    
    switch (variant) {
      case 'minimal':
        return isDark 
          ? 'bg-gray-800 text-gray-300 border-b border-gray-700' 
          : 'bg-gray-100 text-gray-800 border-b border-gray-200';
      
      case 'elegant':
        return isDark 
          ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300' 
          : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800';
      
      default:
        return isDark 
          ? 'bg-gray-900 text-gray-300' 
          : 'bg-gray-200 text-gray-800';
    }
  }
  
  private getCodeClasses(isDark: boolean, variant: CodeVariant): string {
    if (variant === 'inline') {
      return isDark 
        ? 'bg-gray-800 text-gray-100' 
        : 'bg-gray-100 text-gray-800';
    }
    
    switch (variant) {
      case 'minimal':
        return isDark 
          ? 'bg-gray-900 text-gray-100' 
          : 'bg-gray-50 text-gray-800';
      
      case 'elegant':
        return isDark 
          ? 'bg-gray-950 text-gray-100' 
          : 'bg-white text-gray-800';
      
      default:
        return isDark 
          ? 'bg-gray-950 text-gray-100' 
          : 'bg-white text-gray-800';
    }
  }
  
  private getLanguageBadgeClasses(isDark: boolean, language: string): string {
    const languageConfig = LANGUAGE_COLORS[language] || 
      (isDark 
        ? { dark: 'bg-gray-700 text-gray-300', light: 'bg-gray-200 text-gray-700' }
        : { dark: 'bg-gray-700 text-gray-300', light: 'bg-gray-200 text-gray-700' }
      );
    
    return isDark ? languageConfig.dark : languageConfig.light;
  }
  
  private getCopyButtonClasses(isDark: boolean, isCopied: boolean): string {
    if (isCopied) return 'bg-green-600 text-white shadow-sm';
    
    return isDark 
      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
      : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900';
  }
  
  private getExpandButtonClasses(isDark: boolean): string {
    return isDark 
      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700' 
      : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300';
  }
  
  // 🚀 Helper para obtener líneas del código
  getLines(): string[] {
    return this.code().split('\n');
  }
  
  // 🚀 Helper para detectar si el código es largo
  isCodeLong(): boolean {
    return this.lineCount() > 20;
  }
  
  // 🚀 Auto-colapsar código largo si es colapsable
  autoCollapseIfLong(): void {
    if (this.collapsible() && this.isCodeLong() && !this.isCollapsed()) {
      this.isCollapsed.set(true);
    }
  }
}