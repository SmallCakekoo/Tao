import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IconPlusFilled } from '@tabler/icons-react';
import { supabase } from '../../lib/supabaseClient';
import { toggleTaskInDB } from '../../lib/tasks';
import './ToDoWidget.css';
import type { TaskInterface } from '../../types/AgendaTypes';

export const ToDoWidget = () => {

  const [tasks, setTasks] = useState<TaskInterface[]>([])

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

const taskEl = tasks.slice(0, 3).map((t) => {
  return (
    <div className="task-el" key={t.id}>
      <p className="task-name">{t.name}</p>
      <input
        type="checkbox"
        checked={t.complete}
        onChange={() => completeTask(t)}
      />
    </div>
  );
});

  return (
    <>
    {tasks ? (<div className='todo-widget2'>
      {taskEl}
      <Link className="add-btn" to="/agenda" aria-label="Go to agenda">
        <IconPlusFilled />
      </Link>
    </div>) : (
      <div className="todo-widget">
      <h5 className="create-new">You have no tasks yet</h5>
      <Link className="add-btn" to="/agenda" aria-label="Go to agenda">
        <IconPlusFilled />
      </Link>
    </div>
    )}

    </>
  );
};
