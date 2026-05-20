import { TaskDashboard } from '@/components/features/task/TaskDashboard';
import { Button } from '@/components/ui/Button';
import type { LayoutProps } from '@/types/layout';

export function MobileLayout({ user, onSignOut }: LayoutProps) {
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

      <TaskDashboard userId={user.id} variant="mobile" />
    </div>
  );
}
