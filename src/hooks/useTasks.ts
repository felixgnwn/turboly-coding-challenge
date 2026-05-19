import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabase';
import type { Task, TaskInput } from '@/types/task';

export function useTasks(userId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    const { data, error: supaError } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    setLoading(false);
    if (supaError) {
      setError(supaError.message);
    } else {
      setTasks(data ?? []);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    const timer = setTimeout(() => refresh(), 0);
    return () => clearTimeout(timer);
  }, [userId, refresh]);

  const createTask = async (input: TaskInput) => {
    if (!userId) return { error: 'Not authenticated' };
    const { data, error: supaError } = await supabase
      .from('tasks')
      .insert({ ...input, user_id: userId })
      .select()
      .single();
    if (supaError) return { error: supaError.message };
    if (data) setTasks((prev) => [data, ...prev]);
    return { error: null };
  };

  const updateTask = async (id: string, input: Partial<TaskInput>) => {
    if (!userId) return { error: 'Not authenticated' };
    const { data, error: supaError } = await supabase
      .from('tasks')
      .update(input)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();
    if (supaError) return { error: supaError.message };
    if (data) {
      setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    }
    return { error: null };
  };

  const deleteTask = async (id: string) => {
    if (!userId) return { error: 'Not authenticated' };
    const { error: supaError } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    if (supaError) return { error: supaError.message };
    setTasks((prev) => prev.filter((t) => t.id !== id));
    return { error: null };
  };

  return { tasks, loading, error, createTask, updateTask, deleteTask, refresh };
}
