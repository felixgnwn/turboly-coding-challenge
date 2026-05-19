import { useState } from 'react';
import type { Task } from '@/types/task';
import { TaskForm } from './TaskForm';
import type { TaskInput } from '@/types/task';

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
    await onDelete(id);
    setDeletingId(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-md">
        <p className="text-gray-500">No tasks yet. Create one above.</p>
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
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : task.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }`}
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
                <button
                  onClick={() => setEditingId(task.id)}
                  className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  disabled={deletingId === task.id}
                  className="rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200 disabled:opacity-50"
                >
                  {deletingId === task.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
