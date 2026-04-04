import './Home.css';
import { AnimatedLine } from '../../components/Home/AnimatedLine/AnimatedLine';
import { Feeling } from '../../components/Home/Feeling/Feeling';
import { Recs } from '../../components/Home/Recs/Recs';
import { Weekly } from '../../components/Weekly/Weekly';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../components/NavBar/MobileNavBar/MobileNavBar';
import { DiaryWidget } from '../../components/DiaryWidget/DiaryWidget';
import { ToDoWidget } from '../../components/ToDoWidget/ToDoWidget';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="home">
      {!isMobile && <HomeNavbar />}

      <AnimatedLine />
      <div className="home-content">
        <div className="greetings">
          <h2>
            Hello, <span>Migue!</span>
          </h2>
          <p>Welcome back, ready to take care of your mind?</p>
        </div>
        <div className="home-division">
          <div className="left">
            <Feeling></Feeling>
            <Recs></Recs>
          </div>

          <div className="right">
            <Weekly></Weekly>
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
