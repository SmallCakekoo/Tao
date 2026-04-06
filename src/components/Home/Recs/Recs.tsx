import './Recs.css';
import { useNavigate } from 'react-router-dom';

export const Recs = () => {
  const navigate = useNavigate();

  return (
    <div className="recs">
      <div className="recs-content">
        <div className="message-recs">
          <h5 className="message-r">Recommendations</h5>
          <p className="message-p">
            Take care of yourself through our recommendations, based on today’s feelings.
          </p>
        </div>
      </div>
      <button onClick={() => navigate('/recommendations', { state: { source: 'home' } })}>
        Start
      </button>
    </div>
  );
};
