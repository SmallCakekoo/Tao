import { Link } from 'react-router-dom';
import { IconPlusFilled } from '@tabler/icons-react';
import './DiaryWidget.css';

export const DiaryWidget = () => {
  return (
    <div className="diary-widget">
      <h5 className="create-new">Create new diary entry</h5>
      <Link className="add-btn" to="/diary" aria-label="Create new diary entry">
        <IconPlusFilled />
      </Link>
    </div>
  );
};
