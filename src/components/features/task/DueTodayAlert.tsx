import { todayISO } from '@/utils/date';
import type { Task } from '@/types/task';

export function DueTodayAlert({ tasks }: { tasks: Task[] }) {
  const dueToday = tasks.filter((t) => t.due_date === todayISO() && !t.completed);
  if (dueToday.length === 0) return null;

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
      <p className="text-sm font-semibold text-amber-800">
        {dueToday.length} task{dueToday.length > 1 ? 's' : ''} due today!
      </p>
      <ul className="mt-1 list-inside list-disc text-xs text-amber-700">
        {dueToday.map((t) => (
          <li key={t.id}>{t.description}</li>
        ))}
      </ul>
    </div>
  );
}
