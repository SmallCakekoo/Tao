import './Home.css';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { AnimatedLine } from '../../components/Home/AnimatedLine/AnimatedLine';
import { Feeling } from '../../components/Home/Feeling/Feeling';
import { Recs } from '../../components/Home/Recs/Recs';
import { Weekly } from '../../components/Weekly/Weekly';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { MobileNavBar } from '../../components/NavBar/MobileNavBar/MobileNavBar';
import { DiaryWidget } from '../../components/DiaryWidget/DiaryWidget';
import { ToDoWidget } from '../../components/ToDoWidget/ToDoWidget';

export const Home = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        navigate('/login');
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  useEffect(() => {
    const getProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) return;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', userData.user.id)
        .single();

      if (error) {
        console.error(error.message);
        return;
      }

      setName(profile.name);
    };

    getProfile();
  }, []);

  if (loading) return null;

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
            <Feeling />
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
