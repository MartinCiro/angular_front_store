import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RecentPost } from '@app/core/models/dashboard.model';

export interface PostActionEvent {
  postId: string;
  action: 'edit' | 'delete' | 'view' | 'publish';
}

@Component({
  selector: 'app-recent-posts-table',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './recent-posts-table.html',
  styleUrls: ['./recent-posts-table.css']
})
export class RecentPostsTableComponent {
  // Inputs
  posts = input.required<RecentPost[]>();
  showHeader = input(true);
  maxItems = input<number | undefined>(undefined);

  // Outputs
  postAction = output<PostActionEvent>();

  // Computed properties
  get displayedPosts(): RecentPost[] {
    const items = this.posts();
    return this.maxItems() ? items.slice(0, this.maxItems()) : items;
  }

  // Helper methods
  getStatusClass(status: RecentPost['status']): string {
    switch (status) {
      case 'published':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'pending':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'archived':
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  }

  getStatusText(status: RecentPost['status']): string {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Borrador';
      case 'pending': return 'Pendiente';
      case 'archived': return 'Archivado';
      default: return status;
    }
  }

  onActionClick(postId: string, action: PostActionEvent['action']): void {
    this.postAction.emit({ postId, action });
  }
}