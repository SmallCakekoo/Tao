import './Profile.css';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { AnimatedLine } from '../../components/Home/AnimatedLine/AnimatedLine';
import { useNavigate } from 'react-router-dom';
import { DiaryWidget } from '../../components/DiaryWidget/DiaryWidget';
import { Weekly } from '../../components/Weekly/Weekly';
import { ToDoWidget } from '../../components/ToDoWidget/ToDoWidget';
import { WeeklyWidgetChart } from '../../components/WeeklyCharts/WeeklyWidgetCharts';

export const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

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
    <div className="profile">
      <HomeNavbar />
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
    </div>
  );
};
