export type TaskPriority = 'low' | 'medium' | 'high';

export type SortKey = 'asc' | 'desc' | null;

export interface Task {
  id: string;
  user_id: string;
  description: string;
  due_date: string;
  priority: TaskPriority;
  completed: boolean;
  created_at: string;
}

export interface TaskInput {
  description: string;
  due_date: string;
  priority: TaskPriority;
  completed?: boolean;
}

export interface FilterState {
  search: string;
  date: string;
  priority: '' | TaskPriority;
  sortDueDate: SortKey;
  sortPriority: SortKey;
}
