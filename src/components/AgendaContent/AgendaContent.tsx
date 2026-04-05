import { useEffect, useState } from 'react';
import './AgendaContent.css';
import { AgendaForm } from '../AgendaForm/AgendaForm';
import { AgendaTasks } from '../AgendaTasks/AgendaTasks';
import agendaEmpty from '../../assets/tasks-empty.png';
import type { TaskInterface } from '../../types/AgendaTypes';
import { supabase } from '../../lib/supabaseClient';
import { toggleTaskInDB } from '../../lib/tasks';

export const AgendaContent = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id);
      if (error) {
        return;
      }
      if (data) {
        setTasks(data);
      }
    };
    fetchTasks();
  }, []);

  const completeTask = async (task: TaskInterface) => {
  try {
    const updatedTask = await toggleTaskInDB(task);

    if (!updatedTask) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      )
    );
  } catch (err) {
    console.error(err);
  }
};

  const removeTask = async (task: TaskInterface) => {
    const { error } = await supabase.from('tasks').delete().eq('id', task.id);

    if (error) {
      return;
    }
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <div>
      {tasks.length === 0 && !showForm && (
        <div className="agenda-empty">
          <div className="add-task-container">
            <h5>You have no tasks yet!</h5>
            <button className="add-button" onClick={() => setShowForm(true)}>
              +
            </button>
          </div>

          <img className="emptyImage" src={agendaEmpty} alt="Empty Agenda" />
        </div>
      )}

      {tasks.length === 0 && showForm && (
        <div className="form-wrapper">
          <AgendaForm setTasks={setTasks} />
        </div>
      )}

      {tasks.length > 0 && (
        <div className="agenda-layout">
          <div className="tasks-column">
            <AgendaTasks
              tasks={tasks}
              completeTask={completeTask}
              removeTask={removeTask}
            />
          </div>

          <div className="form-column">
            <AgendaForm setTasks={setTasks} />
          </div>
        </div>
      )}
    </div>
  );
};
