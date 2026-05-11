import './ErrorToast.css';
import { IconAlertCircle } from '@tabler/icons-react';

export const ErrorToast = ({ message }: { message: string }) => {
  return (
    <div className="error-toast">
      <IconAlertCircle className="error-toast-icon" size={18} />
      <span>{message}</span>
    </div>
  );
};