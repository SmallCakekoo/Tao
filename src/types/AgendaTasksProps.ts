import type { TaskInterface } from './TaskTypes';

export type AgendaTasksProps = {
  tasks: TaskInterface[];
  completeTask: (task: TaskInterface) => void;
  removeTask: (task: TaskInterface) => void;
};
