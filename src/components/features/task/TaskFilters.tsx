import type { FilterState } from '@/types/task';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface TaskFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

function toggleDir(current: FilterState['sortDueDate']): FilterState['sortDueDate'] {
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
          <Input
            id="search"
            label="Search"
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
          />
        </div>

        <div className="flex min-w-40 flex-1 flex-col gap-1">
          <Input
            id="filterDate"
            label="Due Date"
            type="date"
            value={filters.date}
            onChange={(e) => update({ date: e.target.value })}
          />
        </div>

        <div className="flex min-w-32 flex-1 flex-col gap-1">
          <Select
            id="filterPriority"
            label="Priority"
            value={filters.priority}
            onChange={(e) => update({ priority: e.target.value as FilterState['priority'] })}
            options={[
              { value: '', label: 'All' },
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            onChange({
              search: '',
              date: '',
              priority: '',
              sortDueDate: null,
              sortPriority: null,
            })
          }
        >
          Reset
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant={dueDateActive ? 'primary' : 'secondary'}
          onClick={() => update({ sortDueDate: toggleDir(filters.sortDueDate) })}
        >
          {dueDateLabel}
        </Button>
        <Button
          type="button"
          variant={priorityActive ? 'primary' : 'secondary'}
          onClick={() => update({ sortPriority: toggleDir(filters.sortPriority) })}
        >
          {priorityLabel}
        </Button>
      </div>
    </div>
  );
}
