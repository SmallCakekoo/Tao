import './EditProfile.css'
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { EditProfileForm } from '../../components/EditProfileForm/EditProfileForm';
import { BackButton } from '../../components/BackButton/BackButton';
import { EditQuote } from '../../components/EditQuote/EditQuote';

type Props = {
  setUserName: (name: string) => void;
  setUserQuote: (quote: string) => void;
  setUserQuoteAuthor: (author: string) => void;
};

export const EditProfile = ({ setUserName, setUserQuote, setUserQuoteAuthor }: Props) => {
  return (
    <div className="edit-profile">
      <HomeNavbar />
      <BackButton />

      <div className="editProfile-header">
        <div className="editProfile-header-title">
          <h1 className='editProfile-display'>Edit Profile</h1>
        </div>
        <div className="logout-container">
          <button className='logout-button'>Log Out</button>
        </div>
      </div>

      <div className="editProfile-content">
        <div className="left-column">
          <EditProfileForm setUserName={setUserName} />
        </div>
        <div className="right-column">
          <EditQuote setQuote={setUserQuote} setAuthor={setUserQuoteAuthor} />
        </div>
      </div>
    </div>
  );
};