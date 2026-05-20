import { useState, useMemo } from 'react';
import type { Task, FilterState } from '@/types/task';

const PRIORITY_MAP: Record<string, number> = { low: 1, medium: 2, high: 3 };

export function useFilteredTasks(tasks: Task[]) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    date: '',
    priority: '',
    sortDueDate: null,
    sortPriority: null,
  });

  const filtered = useMemo(() => {
    let result = [...tasks];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter((t) => t.description.toLowerCase().includes(q));
    }
    if (filters.date) {
      result = result.filter((t) => t.due_date === filters.date);
    }
    if (filters.priority) {
      result = result.filter((t) => t.priority === filters.priority);
    }

    result.sort((a, b) => {
      if (filters.sortDueDate) {
        const cmp = a.due_date.localeCompare(b.due_date);
        if (cmp !== 0) return filters.sortDueDate === 'asc' ? cmp : -cmp;
      }
      if (filters.sortPriority) {
        const cmp = PRIORITY_MAP[a.priority] - PRIORITY_MAP[b.priority];
        if (cmp !== 0) return filters.sortPriority === 'asc' ? cmp : -cmp;
      }
      return 0;
    });

    return result;
  }, [tasks, filters]);

  return { filtered, filters, setFilters };
}
