// src/app/pages/dashboard/dashboard.ts
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

// Core services
import { ThemeService } from '@app/core/services/theme';
import { DashboardService } from '@app/core/services/dashboard.service';

// Layout components
import { DashboardLayoutComponent } from '@app/layout/dashboard-layout';
import { DashboardFooterComponent } from '@app/layout/dashboard-footer/dashboard-footer';

// Shared components
import { StatCardComponent } from '@app/shared/components/stat-card/stat-card';
import { RecentPostsTableComponent } from '@app/shared/components/recent-posts-table/recent-posts-table';
import { ActiveRolesComponent } from '@app/shared/components/active-roles/active-roles';
import { SystemStatusComponent } from '@app/shared/components/system-status/system-status';
import { QuickActionsComponent } from '@app/shared/components/quick-actions/quick-actions';
import { RecentUsersComponent } from '@app/shared/components/recent-users/recent-users';

// Models
import { DashboardStats, RecentPost, RecentUser, SystemStatus } from '@app/core/models/dashboard.model';

// ✅ Íconos reutilizables desde librería compartida
import {
  Download,
  RefreshCw,
  FileText,
  FileEdit,
  Users,
  UserPlus,
  BarChart,
  Edit,
  Trash2,
  Eye
} from '@app/shared/icons/lucide-icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule,
    DashboardLayoutComponent,
    DashboardFooterComponent,
    StatCardComponent,
    RecentPostsTableComponent,
    ActiveRolesComponent,
    SystemStatusComponent,
    QuickActionsComponent,
    RecentUsersComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  // 🔧 Injected services
  private themeService = inject(ThemeService);
  private dashboardService = inject(DashboardService);

  // 📊 Signals for reactive state
  isLoading = signal(true);
  isDarkMode = this.themeService.isDarkMode;
  
  // 📈 Dashboard data signals
  dashboardStats = signal<DashboardStats[]>([]);
  recentPosts = signal<RecentPost[]>([]);
  recentUsers = signal<RecentUser[]>([]);
  systemStatus = signal<SystemStatus>({
    storage: 0,
    bandwidth: 0,
    isAllServicesOperational: false
  });

  // 📱 UI state signals
  sidebarOpen = signal(true);
  currentView = signal<'overview' | 'posts' | 'users' | 'analytics'>('overview');

  // ✅ ÍCONOS COMO PROPIEDADES PÚBLICAS (desde librería compartida)
  readonly Download = Download;
  readonly RefreshCw = RefreshCw;
  readonly FileText = FileText;
  readonly FileEdit = FileEdit;
  readonly Users = Users;
  readonly UserPlus = UserPlus;
  readonly BarChart = BarChart;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Eye = Eye;

  // 🎨 Computed properties for dynamic classes
  mainContentClasses = computed(() => 
    this.sidebarOpen() 
      ? 'lg:ml-72 transition-all duration-300 ease-in-out' 
      : 'lg:ml-0 transition-all duration-300 ease-in-out'
  );

  containerClasses = computed(() => 
    this.isDarkMode() 
      ? 'bg-background-dark text-white' 
      : 'bg-background-light text-slate-900'
  );

  // 📊 Computed statistics
  totalPosts = computed(() => 
    this.dashboardStats().find(stat => stat.id === 'published-posts')?.value || 0
  );

  totalUsers = computed(() => 
    this.dashboardStats().find(stat => stat.id === 'registered-users')?.value || 0
  );

  ngOnInit(): void {
    this.loadDashboardData();
  }

  /**
   * Load all dashboard data from service
   */
  private loadDashboardData(): void {
    this.isLoading.set(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Load stats
        const stats = this.dashboardService.getDashboardStats();
        this.dashboardStats.set(stats);
        
        // Load recent posts
        const posts = this.dashboardService.getRecentPosts();
        this.recentPosts.set(posts);
        
        // Load recent users
        const users = this.dashboardService.getRecentUsers();
        this.recentUsers.set(users);
        
        // Load system status
        const status = this.dashboardService.getSystemStatus();
        this.systemStatus.set(status);
        
        console.log('📊 Dashboard data loaded successfully:', {
          stats: stats.length,
          posts: posts.length,
          users: users.length,
          status
        });
      } catch (error) {
        console.error('❌ Error loading dashboard data:', error);
        this.loadFallbackData();
      } finally {
        this.isLoading.set(false);
      }
    }, 800);
  }

  /**
   * Fallback data in case of service failure
   */
  private loadFallbackData(): void {
    console.log('⚠️ Loading fallback dashboard data');
    
    this.dashboardStats.set([
      {
        id: 'published-posts',
        title: 'Entradas Publicadas',
        value: 142,
        change: '+8 esta semana',
        icon: 'file-text',
        iconColor: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        trend: 'positive'
      },
      {
        id: 'drafts-pending',
        title: 'Borradores Pendientes',
        value: 15,
        change: 'Por revisar',
        icon: 'file-edit',
        iconColor: 'text-orange-500',
        bgColor: 'bg-orange-500/10',
        trend: 'neutral'
      },
      {
        id: 'registered-users',
        title: 'Usuarios Registrados',
        value: 1204,
        change: '+45 nuevos',
        icon: 'user-plus',
        iconColor: 'text-primary',
        bgColor: 'bg-primary/10',
        trend: 'positive'
      }
    ]);
    
    this.recentPosts.set([
      {
        id: '1',
        title: 'The Future of UI Design',
        author: 'Alex Student',
        status: 'published',
        date: 'Hace 2 horas',
        actions: ['edit', 'delete']
      },
      {
        id: '2',
        title: 'Understanding Crypto Markets',
        author: 'Sarah J.',
        status: 'draft',
        date: 'Ayer',
        actions: ['edit', 'delete']
      },
      {
        id: '3',
        title: 'Python for Data Science',
        author: 'Mike T.',
        status: 'published',
        date: '25 Oct, 2024',
        actions: ['edit', 'delete']
      }
    ]);
    
    this.recentUsers.set([
      {
        id: '1',
        name: 'Maria Gonzalez',
        email: 'maria.g@example.com',
        role: 'Editor',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRcFTP7mvY_nypAzkjevNdkMQK_BrgvEzqnE9csL-9o5qCl0ANlrEi9sPzTxy0-R346oSZdKMRGV4i_947N66Q9v3YdHkr42C7uSaYF6OVphQTTF7lRNkTPZYp5PJ-B6yvWDxtfXpKI_CjEUxGjlat_OTeBR3YlACuY5HKN0fzNJc7K8TqQEa0tn9Y6551harYufWpH5ne0wg7YFnqXlEPQKWhqxZLSOZq1-O3NStbJAJ8qNvxAmEC1UN0IOStlJeutd7VnR6lvDY',
        joinDate: 'Hace 2 días'
      },
      {
        id: '2',
        name: 'Carlos Ruiz',
        email: 'carlos.r@example.com',
        role: 'Autor',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEPPuCEyOMPazYpCxAa-A_EvdTAJ8ekR0gG2vnFyfZoU8ppBWTa8jCbBq6CPDq7Lm0cMgYTYQXKKxQuOPxUIPu2lM36smat4GVZ4uaBE_LN0DJsxbt5FcWcfVrYeWmukVC9ifbfvff4cplkykdgT7eifoMEeq1UJdRgQCuYT9ulM3loiTzVa4SaARUAo9cCrfwg34SsTgCvVebfAiFi_HD3KVDcAPRLq2vUx-6rbpFLHhkJP4R7S8xrVWPsgdeKKZMthyTNOCWyCw',
        joinDate: 'Hace 1 semana'
      }
    ]);
    
    this.systemStatus.set({
      storage: 45,
      bandwidth: 72,
      isAllServicesOperational: true
    });
  }

  /**
   * Toggle sidebar visibility
   */
  toggleSidebar(): void {
    this.sidebarOpen.update(value => !value);
    console.log('🔧 Sidebar toggled:', this.sidebarOpen());
  }

  /**
   * Change current dashboard view
   */
  changeView(view: 'overview' | 'posts' | 'users' | 'analytics'): void {
    this.currentView.set(view);
    console.log('🔄 View changed to:', view);
  }

  /**
   * Handle quick action clicks
   */
  handleQuickAction(action: string): void {
    console.log('⚡ Quick action triggered:', action);
    
    switch (action) {
      case 'create-user':
        console.log('👤 Opening create user modal...');
        break;
      case 'new-post':
        console.log('📝 Opening new post editor...');
        break;
      case 'permissions':
        console.log('🔐 Opening permissions manager...');
        break;
      case 'settings':
        console.log('⚙️ Opening settings panel...');
        break;
    }
  }

  /**
   * Handle post action (edit/delete)
   */
  handlePostAction(postId: string, action: 'edit' | 'delete' | 'view' | 'publish'): void {
    console.log(`📄 Post action: ${action} for post ${postId}`);
    
    if (action === 'delete') {
      if (confirm('¿Estás seguro de que quieres eliminar esta entrada?')) {
        // Remove post from local state
        this.recentPosts.update(posts => 
          posts.filter(post => post.id !== postId)
        );
        console.log(`✅ Post ${postId} deleted`);
      }
    }
  }

  /**
   * Refresh dashboard data
   */
  refreshDashboard(): void {
    console.log('🔄 Refreshing dashboard data...');
    this.isLoading.set(true);
    this.loadDashboardData();
  }

  /**
   * Export dashboard data
   */
  exportData(format: 'csv' | 'json' = 'json'): void {
    console.log(`📥 Exporting dashboard data as ${format.toUpperCase()}...`);
    
    const exportData = {
      stats: this.dashboardStats(),
      posts: this.recentPosts(),
      users: this.recentUsers(),
      systemStatus: this.systemStatus(),
      exportedAt: new Date().toISOString()
    };
    
    if (format === 'json') {
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      this.triggerDownload(dataUri, 'dashboard-export.json');
    }
  }

  /**
   * Trigger browser download
   */
  private triggerDownload(dataUri: string, fileName: string): void {
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.click();
  }
}