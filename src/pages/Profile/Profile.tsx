import './Profile.css';
import { useEffect, useState } from 'react';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../components/NavBar/MobileNavBar/MobileNavBar';
import { AnimatedLine } from '../../components/Home/AnimatedLine/AnimatedLine';
import { useNavigate } from 'react-router-dom';
import { DiaryWidget } from '../../components/DiaryWidget/DiaryWidget';
import { Weekly } from '../../components/Weekly/Weekly';
import { ToDoWidget } from '../../components/ToDoWidget/ToDoWidget';
import { WeeklyWidgetChart } from '../../components/WeeklyCharts/WeeklyWidgetCharts';
import { useAuth } from '../../contexts/AuthContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redirect if no session
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading) return null;

  const name = profile?.name ?? '';

  return (
    <div className="profile">
      {!isMobile && <HomeNavbar />}
      <AnimatedLine />

      <div className="profile-header">
        <div className="profile-header-title">
          <h1 className="profile-display">Profile</h1>
          <h1 className="profile-name">Hello, {name ? `${name}!` : ''}</h1>
          <button
            className="editProfile-button editProfile-button--mobile"
            onClick={() => navigate('/editprofile')}
          >
            Edit Profile
          </button>
        </div>

        <div className="editProfile-container">
          <button className="editProfile-button" onClick={() => navigate('/editprofile')}>
            Edit Profile
          </button>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-left">
          <Weekly />
          <WeeklyWidgetChart />
        </div>
        <div className="profile-right">
          <div className="widgets">
            <DiaryWidget />
            <ToDoWidget />
          </div>
        </div>
      </div>
      <MobileNavBar />
    </div>
  );
};

