export interface TaskInterface {
  id?: string;
  name: string;
  description: string;
  priority: string;
  complete: boolean;
  user_id: string;
}

export type Quote = {
  quote: string;
  author: string;
};

export type TasksContextType = {
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  quote: Quote;
  loadingTasks: boolean;
  addTask: (task: TaskInterface) => Promise<void>;
  toggleTask: (task: TaskInterface) => Promise<void>;
  removeTask: (task: TaskInterface) => Promise<void>;
};
