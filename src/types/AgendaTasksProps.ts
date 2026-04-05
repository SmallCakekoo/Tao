import type { TaskInterface } from "./AgendaTypes"

export type AgendaTasksProps = {
    tasks: TaskInterface[];
    completeTask: (task: TaskInterface) => void;
    removeTask: (task: TaskInterface) => void;
}

