import { useTasks } from '@/hooks/useTasks';
import { useFilteredTasks } from '@/hooks/useFilteredTasks';
import { TaskForm } from '@/components/features/task/TaskForm';
import { TaskList } from '@/components/features/task/TaskList';
import { TaskFilters } from '@/components/features/task/TaskFilters';
import { DueTodayAlert } from '@/components/features/task/DueTodayAlert';
import { Button } from '@/components/ui/Button';
import type { LayoutProps } from '@/types/layout';

export function DesktopLayout({ user, onSignOut }: LayoutProps) {
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks(user.id);
  const { filtered: filteredTasks, filters, setFilters } = useFilteredTasks(tasks);

  return (
    <main className="mx-auto flex h-screen max-w-6xl flex-col gap-6 overflow-hidden bg-gray-50 p-6">
      <header className="shrink-0 flex items-center justify-between rounded-xl bg-white p-4 shadow-md">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
        <Button variant="danger" onClick={() => onSignOut()}>
          Log out
        </Button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden lg:flex-row">
        <aside className="w-full shrink-0 overflow-y-auto lg:w-80">
          <TaskForm onSubmit={createTask} />
        </aside>

        <section className="flex min-h-0 flex-1 flex-col gap-4">
          <TaskFilters filters={filters} onChange={setFilters} />
          <DueTodayAlert tasks={tasks} />
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            {loading ? (
              <p className="py-8 text-center text-gray-600">Loading tasks...</p>
            ) : (
              <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
