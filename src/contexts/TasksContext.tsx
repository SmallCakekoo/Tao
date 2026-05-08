
import { createContext, useContext, useState, useEffect, type PropsWithChildren } from "react";
import { getUserTasks, toggleTaskInDB, deleteTaskInDB } from "../services/taskService";
import { useAuth } from "./AuthContext";
import type { TaskInterface, TasksContextType } from "../types/TaskTypes";

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
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
      setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, complete: !t.complete } : t)));
      
      const updatedTask = await toggleTaskInDB(task);
      if (updatedTask) {
        setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      }
    } catch (error) {
      setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, complete: task.complete } : t)));
      console.error(error);
    }
  };

  const removeTask = async (task: TaskInterface) => {
    if (!task.id) return;
    try {
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
