import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { useAuth } from "./AuthContext";
import {
  getUserTasks,
  getUserQuote,
  insertTask,
  updateTask,
  deleteTask,
} from "../services/agendaServices";
import type { TaskInterface } from "../types/TaskTypes";

// — Types —
interface Quote {
  quote: string;
  author: string;
}

interface TasksContextType {
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  quote: Quote;
  loadingTasks: boolean;
  addTask: (task: TaskInterface) => Promise<void>;
  toggleTask: (task: TaskInterface) => Promise<void>;
  removeTask: (task: TaskInterface) => Promise<void>;
}

// — Context —
const TasksContext = createContext<TasksContextType | undefined>(undefined);

// — Provider —
export const TasksProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [quote, setQuote] = useState<Quote>({ quote: "", author: "" });
  const [loadingTasks, setLoadingTasks] = useState(true);

  const fetchData = async () => {
    if (!user) {
      setTasks([]);
      setQuote({ quote: "", author: "" });
      setLoadingTasks(false);
      return;
    }

    try {
      const [tasksData, quoteData] = await Promise.all([
        getUserTasks(user.id),
        getUserQuote(user.id),
      ]);

      setTasks(tasksData);
      setQuote({ quote: quoteData.quote, author: quoteData.author });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const addTask = async (task: TaskInterface) => {
    const data = await insertTask(task);
    if (data) setTasks((prev) => [...prev, ...data]);
  };

  const toggleTask = async (task: TaskInterface) => {
    const updated = { ...task, complete: !task.complete };
    await updateTask(updated);
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updated : t))
    );
  };

  const removeTask = async (task: TaskInterface) => {
    await deleteTask(task);
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        quote,
        loadingTasks,
        addTask,
        toggleTask,
        removeTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

// — Hook —
export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within TasksProvider");
  }

  return context;
};