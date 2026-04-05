import './EditProfileForm.css';
import { useState } from 'react';
import type { EditProfileFormProps } from '../../types/ProfileProps';
import { ChangePassword } from '../ChangePasswordOverlay/ChangePassword';

export const EditProfileForm = ({
  setUserName,
  onSave,
}: EditProfileFormProps & {
  onSave: (message: string, type: 'success' | 'error') => void;
}) => {
  const [nameInput, setNameInput] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleSave = () => {
    if (nameInput.trim() === '') {
      onSave('Name cannot be empty.', 'error');
      return;
    }
    setUserName(nameInput);
    onSave('Profile updated!', 'success');
  };

  return (
    <>
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} onSave={onSave} />
      )}

      <div className="editProfile-form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <p>Edit Name</p>
          <input
            type="text"
            placeholder="Edit Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />

          <p>Edit Email</p>
          <input type="email" placeholder="Edit Email" />

          <button
            type="button"
            className="change-password-button"
            onClick={() => setShowChangePassword(true)}
          >
            Change Password
          </button>
        </form>

        <div className="editProfile-buttons-container">
          <button className="cancel-button">Cancel</button>
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};
