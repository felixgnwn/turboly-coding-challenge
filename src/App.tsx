import { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import { useFilteredTasks } from '@/hooks/useFilteredTasks';
import { TaskForm } from '@/components/features/task/TaskForm';
import { TaskList } from '@/components/features/task/TaskList';
import { LoginForm } from '@/components/features/auth/LoginForm';
import { TaskFilters } from '@/components/features/task/TaskFilters';
import { Button } from '@/components/ui/Button';

export default function App() {
  const { user, isLoading, signIn, signOut } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (email: string, password: string) => {
    setError(null);
    setPending(true);
    const { error: authError } = await signIn(email, password);
    setPending(false);
    if (authError) {
      setError(authError.message);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  if (user) {
    return <TaskDashboard user={user} onSignOut={signOut} />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Turboly Coding Challenge
        </h1>
        <LoginForm
          onSubmit={handleSubmit}
          submitLabel="Log in"
          error={error}
          isLoading={pending}
        />
      </div>
    </main>
  );
}

function TaskDashboard({ user, onSignOut }: { user: User; onSignOut: () => Promise<{ error: Error | null }> }) {
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