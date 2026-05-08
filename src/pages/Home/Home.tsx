import './Home.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedLine } from '../../components/Home/AnimatedLine/AnimatedLine';
import { Feeling } from '../../components/Home/Feeling/Feeling';
import { Recs } from '../../components/Home/Recs/Recs';
import { Weekly } from '../../components/Weekly/Weekly';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../components/NavBar/MobileNavBar/MobileNavBar';
import { DiaryWidget } from '../../components/DiaryWidget/DiaryWidget';
import { ToDoWidget } from '../../components/ToDoWidget/ToDoWidget';
import { useAuth } from '../../contexts/AuthContext';
import { useCheckin } from '../../contexts/CheckinContext';
import { useProfile } from '../../contexts/ProfileContext';

export const Home = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile } = useProfile();
  const { todaysCheckin } = useCheckin();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [authLoading, user, navigate]);

  if (authLoading) return null;

  const name = profile?.name ?? '';

  return (
    <div className="home">
      {!isMobile && <HomeNavbar />}

      <AnimatedLine />
      <div className="home-content">
        <div className="greetings">
          <h2>
            Hello, <span>{name ? `${name}!` : ''}</span>
          </h2>
          <p>Welcome back, ready to take care of your mind?</p>
        </div>

        <div className="home-division">
          <div className="left">
            <Feeling checkin={todaysCheckin} />
            <Recs />
          </div>

          <div className="right">
            <Weekly />
            <div className="widgets">
              <DiaryWidget />
              <ToDoWidget />
            </div>
          </div>
        </div>
      </div>

      <MobileNavBar />
    </div>
  );
};

