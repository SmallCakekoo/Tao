// ¿Por qué usar Context aquí?
// Las tareas (ToDo) se muestran en múltiples lugares al mismo tiempo, por ejemplo en el ToDoWidget de la pantalla de Home 
// y en la vista completa de la Agenda. Si no usamos Context, cada componente haría su propia petición a Supabase de manera independiente, 
// lo que causa lentitud, desincronización (completas una tarea en el widget y la agenda no se entera) y exceso de lecturas a la base de datos.
// Con Context, mantenemos un único estado global de tareas y cualquier componente puede leerlo o modificarlo.

import { createContext, useContext, useState, useEffect, type PropsWithChildren } from "react";
import { getUserTasks, toggleTaskInDB, deleteTaskInDB } from "../services/taskService";
import { useAuth } from "./AuthContext";
import type { TaskInterface } from "../types/AgendaTypes";

type TasksContextType = {
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  loading: boolean;
  toggleTask: (task: TaskInterface) => Promise<void>;
  removeTask: (task: TaskInterface) => Promise<void>;
};

export const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Obtenemos el usuario del AuthContext

  useEffect(() => {
    // Si no hay usuario, limpiamos las tareas
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
        console.error("Error al obtener las tareas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const toggleTask = async (task: TaskInterface) => {
    try {
      // Optimización optimista: actualizar UI inmediatamente
      setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, complete: !t.complete } : t)));
      
      const updatedTask = await toggleTaskInDB(task);
      if (updatedTask) {
        // Confirmar con lo de la base de datos
        setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      }
    } catch (error) {
      // Revertir si hay error
      setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, complete: task.complete } : t)));
      console.error(error);
    }
  };

  const removeTask = async (task: TaskInterface) => {
    if (!task.id) return; // TypeScript ahora sabe que task.id existe

    try {
      // Optimización optimista
      setTasks(prev => prev.filter(t => t.id !== task.id));
      await deleteTaskInDB(task.id);
    } catch (error) {
      // Revertir (en un caso real podríamos guardar la tarea para volverla a agregar)
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
    throw new Error("useTasks debe usarse dentro de un TasksProvider");
  }
  return context;
};
