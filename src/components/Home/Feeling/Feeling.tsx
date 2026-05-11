import { Link } from 'react-router-dom';
import type { FeelingProps } from '../../../types/CheckinTypes';
import './Feeling.css';

export const Feeling = ({ checkin }: FeelingProps) => {
  const hasCheckin = !!checkin;

  return (
    <div className="feeling">
      <div className="message-feel">
        <h5 className="message-h">
          How are you feeling <span>today?</span>
        </h5>
        <p className="message-p">
          {hasCheckin
            ? "You've already registered your feelings today. You can update them if you need."
            : 'By registering your daily feelings, you can get personalized recommendations.'}
        </p>
      </div>
      <Link to={hasCheckin ? '/edit-feelings' : '/form'}>
        <button>{hasCheckin ? 'Edit feelings' : 'Register feelings'}</button>
      </Link>
    </div>
  );
};
