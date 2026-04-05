import './Profile.css'
import { HomeNavbar } from '../../components/NavBar/CommonNavBar/HomeNavbar';
import { AnimatedLine } from '../../components/Home/AnimatedLine/AnimatedLine';
import { useNavigate } from 'react-router-dom';
import { DiaryWidget } from '../../components/DiaryWidget/DiaryWidget';
import { Weekly } from '../../components/Weekly/Weekly';
import { ToDoWidget } from '../../components/ToDoWidget/ToDoWidget';
import { WeeklyWidgetChart } from '../../components/WeeklyCharts/WeeklyWidgetCharts';

export const Profile = ({ userName }: { userName: string }) => {
    const navigate = useNavigate();
    return(
        <div className="profile">
            <HomeNavbar />
            <AnimatedLine />

            <div className="profile-header">
                <div className="profile-header-title">
                    <h1 className='profile-display'>Profile</h1>
                    <h1 className='profile-name'>Hello, {userName}!</h1>
                    <button className='editProfile-button editProfile-button--mobile' onClick={() => navigate("/editprofile")}>Edit Profile</button>
                </div>

                <div className="editProfile-container">
                    <button className='editProfile-button' onClick={() => navigate("/editprofile")}>Edit Profile</button>
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
    )
}