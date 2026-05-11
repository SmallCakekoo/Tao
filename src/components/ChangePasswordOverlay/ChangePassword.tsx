import { createPortal } from 'react-dom';
import { useState } from 'react';
import './ChangePassword.css';
import { useAuth } from '../../contexts/AuthContext';
import { changeUserPassword } from '../../services/editProfileServices';

type Props = {
  onClose: () => void;
  onSave: (message: string, type: 'success' | 'error') => void;
};

export const ChangePassword = ({ onClose, onSave }: Props) => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (currentPassword.trim() === '' || newPassword.trim() === '') {
      onSave('Please fill in all fields.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      onSave('Password must have at least 6 characters.', 'error');
      return;
    }
    if (currentPassword === newPassword) {
      onSave('New password must be different from current.', 'error');
      return;
    }

    setLoading(true);
    try {
      await changeUserPassword(user?.email ?? '', currentPassword, newPassword);
      onSave('Password updated!', 'success');
      onClose();
    } catch (error: unknown) {
      onSave(
        error instanceof Error ? error.message : 'Error updating password.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="change-password-overlay" onClick={onClose}>
      <div className="change-password-modal" onClick={(e) => e.stopPropagation()}>
        <p>Current Password</p>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <p>New Password</p>
        <p className="password-requeriments">Must have at least 6 characters</p>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <div className="change-password-buttons">
          <button
            className="password-update-button"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
          <button className="password-cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
