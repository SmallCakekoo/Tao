import './EditProfile.css';
import { useState, useEffect } from 'react';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../components/NavBar/MobileNavBar/MobileNavBar';
import { EditProfileForm } from '../../components/EditProfileForm/EditProfileForm';
import { BackButton } from '../../components/BackButton/BackButton';
import { EditQuote } from '../../components/EditQuote/EditQuote';
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage';
import { EditProfileProvider, useEditProfile } from '../../contexts/EditProfileContext';

// Separamos el contenido para poder usar el hook dentro del Provider
const EditProfileContent = () => {
  const { signOut } = useEditProfile();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="edit-profile">
      {!isMobile && <HomeNavbar />}
      <BackButton />

      {showToast && <FeedbackMessage message={toastMessage} type={toastType} />}

      <div className="editProfile-header">
        <div className="editProfile-header-title">
          <h1 className="editProfile-display">Edit Profile</h1>
          <button className="logout-button logout-button--mobile" onClick={signOut}>
            Log Out
          </button>
        </div>
        <div className="logout-container">
          <button className="logout-button" onClick={signOut}>
            Log Out
          </button>
        </div>
      </div>

      <div className="editProfile-content">
        <div className="left-column">
          <EditProfileForm onSave={triggerToast} />
        </div>
        <div className="right-column">
          <EditQuote onSave={triggerToast} />
        </div>
      </div>
      <MobileNavBar />
    </div>
  );
};

export const EditProfile = () => (
  <EditProfileProvider>
    <EditProfileContent />
  </EditProfileProvider>
);