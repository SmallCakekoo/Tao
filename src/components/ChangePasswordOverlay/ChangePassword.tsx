import { createPortal } from 'react-dom';
import { useState } from 'react';
import './ChangePassword.css';

type Props = {
  onClose: () => void;
  onSave: (message: string, type: 'success' | 'error') => void;
};

export const ChangePassword = ({ onClose, onSave }: Props) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = () => {
    if (currentPassword.trim() === '' || newPassword.trim() === '') {
      onSave('Please fill in all fields.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      onSave('Password must have at least 6 characters.', 'error');
      return;
    }
    onSave('Password updated!', 'success');
    onClose();
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
          <button className="password-update-button" onClick={handleUpdate}>
            Update
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
