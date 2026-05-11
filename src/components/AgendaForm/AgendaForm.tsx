import { useState } from 'react';
import './AgendaForm.css';
import type { TaskInterface } from '../../types/TaskTypes';
import { useTasks } from '../../contexts/TasksContext';
import { useAuth } from '../../contexts/AuthContext';

export const AgendaForm = () => {
  const { addTask } = useTasks();     
  const { user } = useAuth();        
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) return;

    const newTask: TaskInterface = {
      name: taskName,
      description: taskDescription,
      priority,
      complete: false,
      user_id: user.id,
    };

    await addTask(newTask);

    setTaskName('');
    setTaskDescription('');
    setPriority('');
  };

  return (
    <div className="form-container">
      <h5>Adding a new task</h5>

      <form>
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />

        <div className="priority-container">
          <select
            className="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select priority</option>
            <option value="low">When there’s time (Low)</option>
            <option value="medium">Work calmly (Medium)</option>
            <option value="high">Objective (High)</option>
          </select>
        </div>

        <button onClick={handleSubmit}>Add Task</button>
      </form>
    </div>
  );
};
