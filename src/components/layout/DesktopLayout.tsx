import { TaskDashboard } from '@/components/features/task/TaskDashboard';
import { Button } from '@/components/ui/Button';
import type { LayoutProps } from '@/types/layout';

export function DesktopLayout({ user, onSignOut }: LayoutProps) {
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

      <TaskDashboard userId={user.id} variant="desktop" />
    </main>
  );
}
