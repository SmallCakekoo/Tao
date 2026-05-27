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
import { useProfile } from '../../contexts/ProfileContext';
import { MemoryGameOverlay } from '../../components/MemoryGame/MemoryGameOverlay';

export const Profile = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [showMemoryGame, setShowMemoryGame] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

          {/* ── Botones alineados con los widgets ── */}
          <div className="widget-buttons">
            <button
              className="memory-game-trigger"
              onClick={() => setShowMemoryGame(true)}
            >
              <div className="memory-game-trigger__text">
                <span className="memory-game-trigger__title">Memory Game</span>
                <span className="memory-game-trigger__sub">Train your memory</span>
              </div>
            </button>

            <div className="tic-tac-toe-trigger">
              <span className="tic-tac-toe-trigger__title">tic-tac-toe</span>
              <span className="tic-tac-toe-trigger__sub">Play against Taobot</span>
            </div>
          </div>
        </div>
      </div>

      {showMemoryGame && (
        <MemoryGameOverlay onClose={() => setShowMemoryGame(false)} />
      )}

      <MobileNavBar />
    </div>
  );
};