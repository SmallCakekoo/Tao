import { supabase } from "../lib/supabaseClient";
import type { TaskInterface } from "../types/TaskTypes";

export const getUserQuote = async (userId: string) => {
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
};

export const getUserTasks = async (userId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data ?? [];
};

export const insertTask = async (task: TaskInterface) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert([task])
    .select();

  if (error) throw error;
  return data;
};

export const updateTask = async (task: TaskInterface) => {
  const { error } = await supabase
    .from("tasks")
    .update({ complete: task.complete })
    .eq("id", task.id);

  if (error) throw error;
};

export const deleteTask = async (task: TaskInterface) => {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", task.id);

  if (error) throw error;
};