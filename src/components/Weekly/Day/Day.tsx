import good from '../../../assets/stickers/good.svg';
import './Day.css';

export const Day = () => {
  return (
    <div className="day">
      <p className="date-num">20</p>
      <p className="date-day">Mon</p>
      <img src={good} alt="" className="mood" />
    </div>
  );
};
