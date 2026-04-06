import { supabase } from './supabaseClient';
import type { TaskInterface } from '../types/AgendaTypes';

export const toggleTaskInDB = async (task: TaskInterface) => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ complete: !task.complete })
    .eq('id', task.id)
    .select();

  if (error) throw error;

  return data?.[0];
};
