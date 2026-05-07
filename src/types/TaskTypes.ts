export interface TaskInterface {
  id?: string;
  name: string;
  description: string;
  priority: string;
  complete: boolean;
  user_id: string;
}

export type TasksContextType = {
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  loading: boolean;
  toggleTask: (task: TaskInterface) => Promise<void>;
  removeTask: (task: TaskInterface) => Promise<void>;
};
