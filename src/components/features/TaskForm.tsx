import { useState } from 'react';
import type { Task, TaskInput, TaskPriority } from '@/types/task';

interface TaskFormProps {
  initialTask?: Task | null;
  onSubmit: (input: TaskInput) => Promise<{ error: string | null }>;
  onCancel?: () => void;
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const [description, setDescription] = useState(initialTask?.description ?? '');
  const [dueDate, setDueDate] = useState(initialTask?.due_date ?? todayISO());
  const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority ?? 'medium');
  const [completed, setCompleted] = useState(initialTask?.completed ?? false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    const result = await onSubmit({ description, due_date: dueDate, priority, completed });
    setPending(false);
    if (result.error) {
      setError(result.error);
    } else if (!initialTask) {
      setDescription('');
      setDueDate(todayISO());
      setPriority('medium');
      setCompleted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">
        {initialTask ? 'Edit Task' : 'New Task'}
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="priority" className="text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        Completed
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? 'Saving...' : initialTask ? 'Update' : 'Add Task'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
