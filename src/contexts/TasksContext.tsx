// Why use Context here?
// Tasks (ToDo) are shown in multiple places simultaneously, for example in the ToDoWidget on the Home screen
// and in the full view of the Agenda. If we don't use Context, each component would make its own independent request to Supabase,
// which causes slowness, desynchronization (completing a task in the widget isn't reflected in the agenda), and excessive database reads.
// With Context, we maintain a single global state of tasks and any component can read or modify it.

import { createContext, useContext, useState, useEffect, type PropsWithChildren } from "react";
import { getUserTasks, toggleTaskInDB, deleteTaskInDB } from "../services/taskService";
import { useAuth } from "./AuthContext";
import type { TaskInterface, TasksContextType } from "../types/TaskTypes";

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get user from AuthContext

  useEffect(() => {
    // If no user, clear tasks
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await getUserTasks(user.id);
        setTasks(data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const toggleTask = async (task: TaskInterface) => {
    try {
      // Optimistic UI update: update UI immediately
      setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, complete: !t.complete } : t)));
      
      const updatedTask = await toggleTaskInDB(task);
      if (updatedTask) {
        // Confirm with database result
        setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      }
    } catch (error) {
      // Revert if error
      setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, complete: task.complete } : t)));
      console.error(error);
    }
  };

  const removeTask = async (task: TaskInterface) => {
    if (!task.id) return; // TypeScript now knows task.id exists

    try {
      // Optimistic update
      setTasks(prev => prev.filter(t => t.id !== task.id));
      await deleteTaskInDB(task.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, setTasks, loading, toggleTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
