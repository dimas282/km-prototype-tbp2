export type UserRole = 'admin' | 'sme' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: 'pending' | 'urgent' | 'info';
  count?: number;
  href?: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  type: 'document' | 'sop' | 'video' | 'article';
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

export interface CoPEvent {
  id: string;
  title: string;
  date: string;
  type: 'event' | 'publication' | 'discussion';
  community: string;
}
