import { Link } from 'react-router-dom';
import { IconPlusFilled } from '@tabler/icons-react';
import { useTasks } from '../../contexts/TasksContext';
import './ToDoWidget.css';

export const ToDoWidget = () => {
  const { tasks, toggleTask } = useTasks();



  const taskEl = tasks.slice(0, 3).map((t) => {
    return (
      <div className="task-el" key={t.id}>
        <p className="task-name">{t.name}</p>
        <input type="checkbox" checked={t.complete} onChange={() => toggleTask(t)} />
      </div>
    );
  });

  // `tasks` siempre es un array; usamos su longitud para saber si hay elementos.
  const hasTasks = tasks.length > 0;

  return (
    <>
      {/* Si hay tareas, mostramos la lista; si no, mostramos el estado vacío con imagen de fondo. */}
      {hasTasks ? (
        <div className="todo-widget2">
          {taskEl}
          <Link className="add-btn" to="/agenda" aria-label="Go to agenda">
            <IconPlusFilled />
          </Link>
        </div>
      ) : (
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
