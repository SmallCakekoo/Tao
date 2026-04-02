import { Link } from 'react-router-dom';
import { IconPlusFilled } from '@tabler/icons-react';
import './ToDoWidget.css';

export const ToDoWidget = () => {
  return (
    <div className="todo-widget">
      <h5 className="create-new">You have no tasks yet</h5>
      <Link className="add-btn" to="/agenda" aria-label="Go to agenda">
        <IconPlusFilled />
      </Link>
    </div>
  );
};
