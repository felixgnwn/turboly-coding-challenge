import { useState, type ReactNode } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useFilteredTasks } from '@/hooks/useFilteredTasks';
import { TaskForm } from '@/components/features/task/TaskForm';
import { TaskList } from '@/components/features/task/TaskList';
import { TaskFilters } from '@/components/features/task/TaskFilters';
import { DueTodayAlert } from '@/components/features/task/DueTodayAlert';
import { Modal } from '@/components/ui/Modal';

interface TaskDashboardProps {
  userId: string;
  variant: 'mobile' | 'tablet' | 'desktop';
}

function TaskError({ error }: { error: string | null }) {
  if (!error) return null;

  return (
    <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      {error}
    </p>
  );
}

function TaskLoading() {
  return <p className="py-8 text-center text-gray-600">Loading tasks...</p>;
}

function TaskCreateCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-md">
      <h2 className="mb-3 text-base font-semibold text-gray-900">New Task</h2>
      {children}
    </div>
  );
}

export function TaskDashboard({ userId, variant }: TaskDashboardProps) {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks(userId);
  const { filtered: filteredTasks, filters, setFilters } = useFilteredTasks(tasks);
  const [createOpen, setCreateOpen] = useState(false);

  const taskList = loading ? (
    <TaskLoading />
  ) : (
    <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} />
  );

  if (variant === 'mobile') {
    return (
      <>
        <main className="flex-1 space-y-3 overflow-y-auto p-4 pb-20">
          <TaskFilters filters={filters} onChange={setFilters} />
          <DueTodayAlert tasks={tasks} />
          <TaskError error={error} />
          {taskList}
        </main>

        <button
          onClick={() => setCreateOpen(true)}
          className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:bg-blue-800"
          aria-label="Add task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New Task">
          <TaskForm
            onSubmit={async (input) => {
              const result = await createTask(input);
              if (!result.error) setCreateOpen(false);
              return result;
            }}
          />
        </Modal>
      </>
    );
  }

  if (variant === 'tablet') {
    return (
      <>
        <TaskCreateCard>
          <TaskForm onSubmit={createTask} />
        </TaskCreateCard>

        <DueTodayAlert tasks={tasks} />
        <TaskFilters filters={filters} onChange={setFilters} />
        <TaskError error={error} />

        <div className="flex-1 overflow-y-auto">
          {taskList}
        </div>
      </>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden lg:flex-row">
      <aside className="w-full shrink-0 overflow-y-auto lg:w-80">
        <TaskForm onSubmit={createTask} />
      </aside>

      <section className="flex min-h-0 flex-1 flex-col gap-4">
        <TaskFilters filters={filters} onChange={setFilters} />
        <DueTodayAlert tasks={tasks} />
        <TaskError error={error} />
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {taskList}
        </div>
      </section>
    </div>
  );
}
