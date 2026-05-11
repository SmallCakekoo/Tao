import './ErrorToast.css';
import { IconAlertCircle } from '@tabler/icons-react';
import type { FeedbackProps } from '../../types/FeedbackProps';

export const ErrorToast = ({ message }: FeedbackProps) => {
  return (
    <div className="error-toast">
      <IconAlertCircle className="error-toast-icon" size={18} />
      <span>{message}</span>
    </div>
  );
};
 