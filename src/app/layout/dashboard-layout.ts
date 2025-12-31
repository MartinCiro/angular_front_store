// src/app/layout/dashboard-layout.ts
import { Component, input, output, inject, signal, computed, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

// ✅ Importa los íconos (usa los nombres correctos según tu versión)
import {
  LayoutDashboard,
  FileText,
  Users,
  Shield,
  Key,
  Settings,
  BarChart,
  Download,
  Facebook,
  Twitter,
  Instagram,
  Menu,
  X,
  Search,
  Bell,
  LogOut
} from 'lucide-angular';

// Services
import { ThemeService } from '@services/theme';

// Interfaces
export interface NavItem {
  label: string;
  icon: any;
  route?: string;
  isActive?: boolean;
  type?: 'section' | 'item';
  sectionTitle?: string;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.css']
})
export class DashboardLayoutComponent {
  // 🔧 Inyección y señales (sin cambios)
  private themeService = inject(ThemeService);
  isSidebarOpen = input<boolean>(true);
  currentView = input<'overview' | 'posts' | 'users' | 'analytics'>('overview');
  sidebarToggle = output<void>();
  viewChange = output<'overview' | 'posts' | 'users' | 'analytics'>();

  isDarkMode = this.themeService.isDarkMode;
  hasNotifications = signal(true);
  notificationCount = signal(3);
  searchQuery = signal('');
  isMobileMenuOpen = signal(false);

  // ✅ ÍCONOS: expón como propiedades públicas
  readonly Shield = Shield;
  readonly Menu = Menu;
  readonly X = X;
  readonly Search = Search;
  readonly Bell = Bell;
  readonly LogOut = LogOut;
  readonly LayoutDashboard = LayoutDashboard;
  readonly FileText = FileText;
  readonly Users = Users;
  readonly Key = Key;
  readonly Settings = Settings;
  readonly BarChart = BarChart;
  readonly Download = Download;
  readonly Facebook = Facebook;
  readonly Twitter = Twitter;
  readonly Instagram = Instagram;

  // ✅ NavItems: usa los íconos como objetos
  mainNavItems = signal<NavItem[]>([
    { label: 'Panel Principal', icon: this.LayoutDashboard, route: '/dashboard', isActive: true, type: 'item' },
    { label: 'Entradas', icon: this.FileText, route: '/dashboard/posts', type: 'item' },
    { label: 'Usuarios', icon: this.Users, route: '/dashboard/users', type: 'item' },
    { label: 'Roles', icon: this.Shield, route: '/dashboard/roles', type: 'item' },
    { label: 'Permisos', icon: this.Key, route: '/dashboard/permissions', type: 'item' }
  ]);

  systemNavItems = signal<NavItem[]>([
    { label: 'Configuración', icon: this.Settings, route: '/dashboard/settings', type: 'item' },
    { label: 'Reportes', icon: this.BarChart, route: '/dashboard/reports', type: 'item' }
  ]);

  userInfo = signal({
    name: 'Admin Alex',
    role: 'Super Admin',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7-Gcku5umX_NpI4SQZyDd-BFFFdVQ8eCf0UHzcc5rxjSPNAyd9DGmsA8s3DqShTSI9rWfE2OnyaxbYXTod-1yLdmmY2Y7tux8acMv_VtDRiAT6om2ZW0EmgeDCmiHIs_6EBVq7E4uGF6oBg4LNtWUDCQu7AQj-ELGxYl2x3wul1DrVV1is5y0J03txZusGULQPozRTdU0bDwEh-6PUxI7t_Eaptg6vFHt8jz7h3nrkgLlsNTcVxOpNEYTInAg1il2kM1MfVYzr70'
  });

  sidebarClasses = computed(() =>
    this.isSidebarOpen()
      ? 'translate-x-0 lg:translate-x-0'
      : '-translate-x-full lg:translate-x-0 lg:w-20'
  );

  mainContentClasses = computed(() =>
    this.isSidebarOpen() ? 'lg:ml-72' : 'lg:ml-20'
  );

  @HostBinding('class.dark') get darkMode() {
    return this.isDarkMode();
  }

  @HostBinding('class') get hostClasses() {
    return 'flex flex-col min-h-screen';
  }

  onToggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  onChangeView(view: 'overview' | 'posts' | 'users' | 'analytics'): void {
    this.viewChange.emit(view);
    this.updateActiveNavItem(view);
  }

  viewOptions = signal<('overview' | 'posts' | 'users' | 'analytics')[]>([
    'overview', 'posts', 'users', 'analytics'
  ]);

  private updateActiveNavItem(view: string): void {
    this.mainNavItems.update(items =>
      items.map(item => ({
        ...item,
        isActive: item.route?.includes(view) || false
      }))
    );
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(state => !state);
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    console.log('Searching for:', query);
  }

  clearNotifications(): void {
    this.hasNotifications.set(false);
    this.notificationCount.set(0);
  }

  onLogout(): void {
    console.log('User logging out...');
  }

  onNavItemClick(item: NavItem): void {
    if (item.route) {
      console.log('Navigating to:', item.route);
    }
  }
}