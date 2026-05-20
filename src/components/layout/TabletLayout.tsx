import { useTasks } from '@/hooks/useTasks';
import { useFilteredTasks } from '@/hooks/useFilteredTasks';
import { TaskForm } from '@/components/features/task/TaskForm';
import { TaskList } from '@/components/features/task/TaskList';
import { TaskFilters } from '@/components/features/task/TaskFilters';
import { DueTodayAlert } from '@/components/features/task/DueTodayAlert';
import { Button } from '@/components/ui/Button';
import type { LayoutProps } from '@/types/layout';

export function TabletLayout({ user, onSignOut }: LayoutProps) {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks(user.id);
  const { filtered: filteredTasks, filters, setFilters } = useFilteredTasks(tasks);

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gray-50 p-4">
      <header className="flex items-center justify-between rounded-xl bg-white p-4 shadow-md">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <Button variant="danger" onClick={() => onSignOut()}>
          Log out
        </Button>
      </header>

      <div className="rounded-xl bg-white p-4 shadow-md">
        <h2 className="mb-3 text-base font-semibold text-gray-900">New Task</h2>
        <TaskForm onSubmit={createTask} />
      </div>

      <DueTodayAlert tasks={tasks} />
      <TaskFilters filters={filters} onChange={setFilters} />
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="py-8 text-center text-gray-600">Loading tasks...</p>
        ) : (
          <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} />
        )}
      </div>
    </div>
  );
}
