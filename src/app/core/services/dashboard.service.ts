import { Injectable, signal } from '@angular/core';
import { DashboardStats, RecentPost, RecentUser, SystemStatus } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // Señales con datos mock para el dashboard
  private _dashboardStats = signal<DashboardStats[]>([
    {
      id: 'published-posts',
      title: 'Entradas Publicadas',
      value: 142,
      change: '+8 esta semana',
      icon: 'article',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      trend: 'positive'
    },
    {
      id: 'drafts-pending',
      title: 'Borradores Pendientes',
      value: 15,
      change: 'Por revisar',
      icon: 'edit_note',
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      trend: 'neutral'
    },
    {
      id: 'registered-users',
      title: 'Usuarios Registrados',
      value: 1204,
      change: '+45 nuevos',
      icon: 'group_add',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10',
      trend: 'positive'
    }
  ]);

  private _recentPosts = signal<RecentPost[]>([
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

  private _recentUsers = signal<RecentUser[]>([
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

  private _systemStatus = signal<SystemStatus>({
    storage: 45,
    bandwidth: 72,
    isAllServicesOperational: true
  });

  // Métodos públicos para obtener datos
  getDashboardStats(): DashboardStats[] {
    return this._dashboardStats();
  }

  getRecentPosts(): RecentPost[] {
    return this._recentPosts();
  }

  getRecentUsers(): RecentUser[] {
    return this._recentUsers();
  }

  getSystemStatus(): SystemStatus {
    return this._systemStatus();
  }

  // Métodos para simular actualizaciones
  updatePostStatus(postId: string, status: 'published' | 'draft'): void {
    this._recentPosts.update(posts => 
      posts.map(post => 
        post.id === postId ? { ...post, status } : post
      )
    );
  }

  deletePost(postId: string): void {
    this._recentPosts.update(posts => 
      posts.filter(post => post.id !== postId)
    );
  }

  addNewUser(user: Omit<RecentUser, 'id'>): void {
    const newUser: RecentUser = {
      ...user,
      id: Date.now().toString()
    };
    this._recentUsers.update(users => [newUser, ...users]);
  }

  // Método para simular actualización de estadísticas
  refreshStats(): void {
    // Simular cambio en los datos
    this._dashboardStats.update(stats => 
      stats.map(stat => {
        if (stat.id === 'published-posts') {
          return { ...stat, value: stat.value + 1 };
        }
        if (stat.id === 'registered-users') {
          return { ...stat, value: stat.value + Math.floor(Math.random() * 10) };
        }
        return stat;
      })
    );
  }
}