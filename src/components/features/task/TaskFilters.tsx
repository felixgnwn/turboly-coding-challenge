import type { TaskPriority } from '@/types/task';

export interface FilterState {
  search: string;
  date: string;
  priority: '' | TaskPriority;
  sortDueDate: 'asc' | 'desc' | null;
  sortPriority: 'asc' | 'desc' | null;
}

interface TaskFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

function toggleDir(current: 'asc' | 'desc' | null): 'asc' | 'desc' | null {
  if (current === null) return 'asc';
  if (current === 'asc') return 'desc';
  return null;
}

export function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  const update = (patch: Partial<FilterState>) => {
    onChange({ ...filters, ...patch });
  };

  const dueDateLabel =
    filters.sortDueDate === 'asc'
      ? 'Due Date ↑'
      : filters.sortDueDate === 'desc'
        ? 'Due Date ↓'
        : 'Due Date';

  const priorityLabel =
    filters.sortPriority === 'asc'
      ? 'Priority ↑'
      : filters.sortPriority === 'desc'
        ? 'Priority ↓'
        : 'Priority';

  const dueDateActive = filters.sortDueDate !== null;
  const priorityActive = filters.sortPriority !== null;

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-md">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex min-w-48 flex-1 flex-col gap-1">
          <label htmlFor="search" className="text-xs font-medium text-gray-600">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex min-w-40 flex-1 flex-col gap-1">
          <label htmlFor="filterDate" className="text-xs font-medium text-gray-600">
            Due Date
          </label>
          <input
            id="filterDate"
            type="date"
            value={filters.date}
            onChange={(e) => update({ date: e.target.value })}
            className="cursor-text rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex min-w-32 flex-1 flex-col gap-1">
          <label htmlFor="filterPriority" className="text-xs font-medium text-gray-600">
            Priority
          </label>
          <select
            id="filterPriority"
            value={filters.priority}
            onChange={(e) => update({ priority: e.target.value as FilterState['priority'] })}
            className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange({
              search: '',
              date: '',
              priority: '',
              sortDueDate: null,
              sortPriority: null,
            })
          }
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => update({ sortDueDate: toggleDir(filters.sortDueDate) })}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            dueDateActive
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {dueDateLabel}
        </button>
        <button
          type="button"
          onClick={() => update({ sortPriority: toggleDir(filters.sortPriority) })}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            priorityActive
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {priorityLabel}
        </button>
      </div>
    </div>
  );
}
