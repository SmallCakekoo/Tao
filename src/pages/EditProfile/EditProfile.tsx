import './EditProfile.css'
import { useState } from 'react';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { EditProfileForm } from '../../components/EditProfileForm/EditProfileForm';
import { BackButton } from '../../components/BackButton/BackButton';
import { EditQuote } from '../../components/EditQuote/EditQuote';
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage';

type Props = {
  setUserName: (name: string) => void;
  setUserQuote: (quote: string) => void;
  setUserQuoteAuthor: (author: string) => void;
};

export const EditProfile = ({ setUserName, setUserQuote, setUserQuoteAuthor }: Props) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

const triggerToast = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
};
  return (
    <div className="edit-profile">
      <HomeNavbar />
      <BackButton />

      {showToast && <FeedbackMessage message={toastMessage} type={toastType} />}

      <div className="editProfile-header">
        <div className="editProfile-header-title">
          <h1 className='editProfile-display'>Edit Profile</h1>
          
          <button className='logout-button logout-button--mobile'>Log Out</button>
        </div>
        <div className="logout-container">
        
          <button className='logout-button'>Log Out</button>
        </div>
      </div>

      <div className="editProfile-content">
        <div className="left-column">
          <EditProfileForm setUserName={setUserName} onSave={triggerToast} />
        </div>
        <div className="right-column">
          <EditQuote setQuote={setUserQuote} setAuthor={setUserQuoteAuthor} onSave={triggerToast} />
        </div>
      </div>
    </div>
  );
};