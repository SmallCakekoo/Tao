import './Home.css';
import { AnimatedLine } from '../../components/Home/AnimatedLine/AnimatedLine';
import { Feeling } from '../../components/Home/Feeling/Feeling';
import { Recs } from '../../components/Home/Recs/Recs';
import { Weekly } from '../../components/Weekly/Weekly';
import { Navbar } from '../../components/NavBar/LandingNavBar/Navbar';
import { DiaryWidget } from '../../components/DiaryWidget/DiaryWidget';
import { ToDoWidget } from '../../components/ToDoWidget/ToDoWidget';

export const Home = () => {
  return (
    <div className="home">
      <Navbar></Navbar>

      <AnimatedLine />
      <div className="home-content">
        <div className="greetings">
          <h2>
            Hello, <span>Migue!</span>
          </h2>
          <p>Welcome back, ready to take care of your mind?</p>
        </div>
        <div className='home-division'>
            <div className="left">
            <Feeling></Feeling>
            <Recs></Recs>
            </div>

            <div className="right">
                <Weekly></Weekly>
                <div className='widgets'>
                <DiaryWidget/>
                <ToDoWidget/>
                </div>
                
            </div>
        </div>
      </div>
    </div>
  );
};