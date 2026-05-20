import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
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

      <Input
        id="description"
        label="Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <Input
        id="dueDate"
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />

      <Select
        id="priority"
        label="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
        options={[
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
        ]}
      />

      {initialTask && (
        <Checkbox
          id="completed"
          label="Completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={pending} className="flex-1">
          {pending ? 'Saving...' : initialTask ? 'Update' : 'Add Task'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
