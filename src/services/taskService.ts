import { supabase } from '../lib/supabaseClient';
import type { TaskInterface } from '../types/TaskTypes';

export const getUserTasks = async (userId: string) => {
  const { data, error } = await supabase.from('tasks').select('*').eq('user_id', userId);
  if (error) throw error;
  return data as TaskInterface[];
};

export const toggleTaskInDB = async (task: TaskInterface) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ complete: !task.complete })
    .eq('id', task.id)
    .select();

  if (error) throw error;

  return data?.[0];
};

export const deleteTaskInDB = async (taskId: number | string) => {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);
  if (error) throw error;
};
