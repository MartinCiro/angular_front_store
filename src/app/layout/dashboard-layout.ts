import { Component, input, output, inject, signal, computed, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

// Services
import { ThemeService } from '../core/services/theme';

// Interfaces
export interface NavItem {
  label: string;
  icon: string;
  route?: string;
  isActive?: boolean;
  type?: 'section' | 'item';
  sectionTitle?: string;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.css']
})
export class DashboardLayoutComponent {
  // 🔧 Injected services
  private themeService = inject(ThemeService);

  // 🎯 Input properties
  isSidebarOpen = input<boolean>(true);
  currentView = input<'overview' | 'posts' | 'users' | 'analytics'>('overview');

  // 📤 Output events
  sidebarToggle = output<void>();
  viewChange = output<'overview' | 'posts' | 'users' | 'analytics'>();

  // 🎨 Theme
  isDarkMode = this.themeService.isDarkMode;

  // 📋 Navigation items
  mainNavItems = signal<NavItem[]>([
    { label: 'Panel Principal', icon: 'dashboard', route: '/dashboard', isActive: true, type: 'item' },
    { label: 'Entradas', icon: 'edit_document', route: '/dashboard/posts', type: 'item' },
    { label: 'Usuarios', icon: 'group', route: '/dashboard/users', type: 'item' },
    { label: 'Roles', icon: 'badge', route: '/dashboard/roles', type: 'item' },
    { label: 'Permisos', icon: 'vpn_key', route: '/dashboard/permissions', type: 'item' }
  ]);

  systemNavItems = signal<NavItem[]>([
    { label: 'Configuración', icon: 'settings_applications', route: '/dashboard/settings', type: 'item' },
    { label: 'Reportes', icon: 'analytics', route: '/dashboard/reports', type: 'item' }
  ]);

  // 👤 User info
  userInfo = signal({
    name: 'Admin Alex',
    role: 'Super Admin',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7-Gcku5umX_NpI4SQZyDd-BFFFdVQ8eCf0UHzcc5rxjSPNAyd9DGmsA8s3DqShTSI9rWfE2OnyaxbYXTod-1yLdmmY2Y7tux8acMv_VtDRiAT6om2ZW0EmgeDCmiHIs_6EBVq7E4uGF6oBg4LNtWUDCQu7AQj-ELGxYl2x3wul1DrVV1is5y0J03txZusGULQPozRTdU0bDwEh-6PUxI7t_Eaptg6vFHt8jz7h3nrkgLlsNTcVxOpNEYTInAg1il2kM1MfVYzr70'
  });

  // 🔔 Notifications
  hasNotifications = signal(true);
  notificationCount = signal(3);

  // 🔍 Search
  searchQuery = signal('');

  // 📱 Mobile state
  isMobileMenuOpen = signal(false);

  // 🎨 Computed properties
  sidebarClasses = computed(() => 
    this.isSidebarOpen() 
      ? 'translate-x-0 lg:translate-x-0' 
      : '-translate-x-full lg:translate-x-0 lg:w-20'
  );

  mainContentClasses = computed(() => 
    this.isSidebarOpen() 
      ? 'lg:ml-72' 
      : 'lg:ml-20'
  );

  // Host bindings for theme
  @HostBinding('class.dark') get darkMode() {
    return this.isDarkMode();
  }

  @HostBinding('class') get hostClasses() {
    return 'flex flex-col min-h-screen';
  }

  /**
   * Toggle sidebar visibility
   */
  onToggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  /**
   * Handle view change
   */
  onChangeView(view: 'overview' | 'posts' | 'users' | 'analytics'): void {
    this.viewChange.emit(view);
    // Update active states
    this.updateActiveNavItem(view);
  }

  viewOptions = signal<('overview' | 'posts' | 'users' | 'analytics')[]>([
    'overview', 'posts', 'users', 'analytics'
  ]);

  /**
   * Update active navigation item
   */
  private updateActiveNavItem(view: string): void {
    this.mainNavItems.update(items => 
      items.map(item => ({
        ...item,
        isActive: item.route?.includes(view) || false
      }))
    );
  }

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(state => !state);
  }

  /**
   * Handle search
   */
  onSearch(query: string): void {
    this.searchQuery.set(query);
    console.log('Searching for:', query);
  }

  /**
   * Clear notifications
   */
  clearNotifications(): void {
    this.hasNotifications.set(false);
    this.notificationCount.set(0);
  }

  /**
   * Handle user logout
   */
  onLogout(): void {
    console.log('User logging out...');
    // Implement logout logic
  }

  /**
   * Handle navigation item click
   */
  onNavItemClick(item: NavItem): void {
    if (item.route) {
      console.log('Navigating to:', item.route);
      // Navigation would be handled by router link in template
    }
  }
}