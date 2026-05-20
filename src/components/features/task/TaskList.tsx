import { useState } from 'react';
import { TaskForm } from './TaskForm';
import { Button } from '@/components/ui/Button';
import type { Task, TaskInput } from '@/types/task';

function priorityClass(priority: Task['priority']) {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-green-100 text-green-700';
  }
}

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, input: Partial<TaskInput>) => Promise<{ error: string | null }>;
  onDelete: (id: string) => Promise<{ error: string | null }>;
}

export function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const result = await onDelete(id);
    if (!result.error) {
      setDeletingId(null);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-md">
        <p className="text-gray-500">No tasks yet. Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="rounded-xl bg-white p-5 shadow-md transition-shadow hover:shadow-lg"
        >
          {editingId === task.id ? (
            <TaskForm
              initialTask={task}
              onSubmit={async (input) => {
                const result = await onUpdate(task.id, input);
                if (!result.error) setEditingId(null);
                return result;
              }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className={`text-base font-medium text-gray-900 ${task.completed ? 'line-through opacity-50' : ''}`}>
                  {task.description}
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>Due: {task.due_date}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${priorityClass(task.priority)}`}
                  >
                    {task.priority}
                  </span>
                  {task.completed && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                      Done
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setEditingId(task.id)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(task.id)}
                  disabled={deletingId === task.id}
                >
                  {deletingId === task.id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
