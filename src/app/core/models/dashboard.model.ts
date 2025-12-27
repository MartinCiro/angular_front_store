// Dashboard Statistics Model
export interface DashboardStats {
  id: string;
  title: string;
  value: number;
  change: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  trend: 'positive' | 'neutral' | 'negative';
}

// Recent Post Model
export interface RecentPost {
  id: string;
  title: string;
  author: string;
  status: 'published' | 'draft' | 'pending' | 'archived';
  date: string;
  actions: ('edit' | 'delete' | 'view' | 'publish')[];
}

// Recent User Model
export interface RecentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinDate: string;
}

// System Status Model
export interface SystemStatus {
  storage: number; // percentage
  bandwidth: number; // percentage
  isAllServicesOperational: boolean;
}

// Role Model for Active Roles
export interface Role {
  id: string;
  name: string;
  color: string;
  userCount: number;
  permissions: string[];
}

// Quick Action Model
export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: string;
  description?: string;
}

// Notification Model
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
}

// Search Result Model
export interface SearchResult {
  id: string;
  type: 'user' | 'post' | 'page' | 'comment';
  title: string;
  description: string;
  url: string;
  relevance: number;
}

// Dashboard Summary Model
export interface DashboardSummary {
  totalPosts: number;
  totalUsers: number;
  totalComments: number;
  totalPageViews: number;
  activeSessions: number;
  serverUptime: number; // percentage
}

// Chart Data Model
export interface ChartDataPoint {
  label: string;
  value: number;
  date: Date;
}

export interface ChartDataset {
  label: string;
  data: ChartDataPoint[];
  color: string;
}

// API Response Models
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Models
export interface DateRangeFilter {
  startDate: Date;
  endDate: Date;
}

export interface DashboardFilter {
  dateRange?: DateRangeFilter;
  categories?: string[];
  status?: ('published' | 'draft' | 'archived')[];
  authors?: string[];
}