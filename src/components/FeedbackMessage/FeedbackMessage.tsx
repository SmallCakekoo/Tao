import './FeedbackMessage.css';
import type { FeedbackProps } from '../../types/FeedbackProps';

export const FeedbackMessage = ({ message, type = 'success' }: FeedbackProps) => {
  return (
    <div className={`feedback-toast feedback-toast--${type}`}>
      {type === 'success' ? '✓' : '✕'} {message}
    </div>
  );
};
