import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useFilteredTasks } from '@/hooks/useFilteredTasks';
import { TaskForm } from '@/components/features/task/TaskForm';
import { TaskList } from '@/components/features/task/TaskList';
import { TaskFilters } from '@/components/features/task/TaskFilters';
import { DueTodayAlert } from '@/components/features/task/DueTodayAlert';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import type { LayoutProps } from '@/types/layout';

export function MobileLayout({ user, onSignOut }: LayoutProps) {
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks(user.id);
  const { filtered: filteredTasks, filters, setFilters } = useFilteredTasks(tasks);
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-gray-900">My Tasks</h1>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        <Button variant="danger" size="sm" onClick={() => onSignOut()}>
          Log out
        </Button>
      </header>

      <main className="flex-1 space-y-3 overflow-y-auto p-4 pb-20">
        <TaskFilters filters={filters} onChange={setFilters} />
        <DueTodayAlert tasks={tasks} />

        {loading ? (
          <p className="py-8 text-center text-gray-600">Loading tasks...</p>
        ) : (
          <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} />
        )}
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
    </div>
  );
}
