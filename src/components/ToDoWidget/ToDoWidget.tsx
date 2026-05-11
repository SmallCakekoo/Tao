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

  // `tasks` is always an array; we use its length to know if there are elements.
  const hasTasks = tasks.length > 0;

  return (
    <>
      {/* If there are tasks, show the list; otherwise, show empty state with background image. */}
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
