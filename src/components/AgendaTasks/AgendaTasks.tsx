import './AgendaTasks.css';
import { IconX } from '@tabler/icons-react';
import type { AgendaTasksProps } from '../../types/AgendaTasksProps';

export const AgendaTasks = ({ tasks, completeTask, removeTask }: AgendaTasksProps) => {
  
  return (
    <div className="tasks-container">
      {tasks.map((task, index) => (
        <div key={index} className="task-card">
          <div className="task-content">
            <IconX className='icon' onClick={() => removeTask(task)}></IconX>
            <div className="task-header">
              <h5>{task.name}</h5>
              <p className={`task-priority ${task.priority}`}>{task.priority}</p>
            </div>
            <p className="task-description">{task.description}</p>
          </div>

          <div className="task-check">
            <input type="checkbox" checked={task.complete} onChange={() => completeTask(task)} />
          </div>
        </div>
      ))}
    </div>
  );
};
