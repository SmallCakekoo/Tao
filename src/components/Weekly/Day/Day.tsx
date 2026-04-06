import awful from '../../../assets/stickers/awful.svg';
import bad from '../../../assets/stickers/bad.svg';
import neutral from '../../../assets/stickers/neutral.svg';
import good from '../../../assets/stickers/good.svg';
import great from '../../../assets/stickers/great.svg';
import type { DayProps } from '../../../types/WeeklyProps';
import './Day.css';

const getMoodIcon = (value: number) => {
  // map mood score (1-5) to the sticker used in the weekly card
  if (value <= 1) return awful;
  if (value <= 2) return bad;
  if (value <= 3) return neutral;
  if (value <= 4) return good;
  return great;
};

export const Day = ({ dateNum, dayLabel, value }: DayProps) => {
  return (
    <div className="day">
      <p className="date-num">{dateNum}</p>
      <p className="date-day">{dayLabel}</p>
      <img
        src={getMoodIcon(value)}
        alt={`${dayLabel} mood level ${value}`}
        className="mood"
      />
    </div>
  );
};
