import './EditProfileForm.css';
import { useState } from 'react';
import { ChangePassword } from '../ChangePasswordOverlay/ChangePassword';
import { useEditProfile } from '../../contexts/EditProfileContext';

export const EditProfileForm = ({
  onSave,
}: {
  onSave: (message: string, type: 'success' | 'error') => void;
}) => {
  const { name, updateName } = useEditProfile();
  const [nameInput, setNameInput] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleSave = async () => {
    if (nameInput.trim() === '') {
      onSave('Name cannot be empty.', 'error');
      return;
    }

    try {
      await updateName(nameInput);
      onSave('Profile updated!', 'success');
    } catch {
      onSave('Error updating profile.', 'error');
    }
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
            placeholder={name}
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