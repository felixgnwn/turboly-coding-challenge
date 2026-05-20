import { TaskDashboard } from '@/components/features/task/TaskDashboard';
import { Button } from '@/components/ui/Button';
import type { LayoutProps } from '@/types/layout';

export function TabletLayout({ user, onSignOut }: LayoutProps) {
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

      <TaskDashboard userId={user.id} variant="tablet" />
    </div>
  );
}
