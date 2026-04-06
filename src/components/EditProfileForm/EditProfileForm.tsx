import './EditProfileForm.css';
import { useState } from 'react';
import type { EditProfileFormProps } from '../../types/ProfileProps';
import { ChangePassword } from '../ChangePasswordOverlay/ChangePassword';
import { supabase } from '../../lib/supabaseClient';

export const EditProfileForm = ({
  name,
  userId,
  onSave,
}: EditProfileFormProps & {
  onSave: (message: string, type: 'success' | 'error') => void;
}) => {
  const [nameInput, setNameInput] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleSave = async () => {
    if (nameInput.trim() === '') {
      onSave('Name cannot be empty.', 'error');
      return;
    }
    const { data, error } = await supabase
      .from('profiles')
      .update({ name: nameInput })
      .eq('id', userId)
      .select();
    if (error) {
      return;
    }
    if (data) {
      onSave('Profile updated!', 'success');
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
