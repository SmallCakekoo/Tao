import './DiaryDate.css';
import type { DiaryDateProps } from '../../../types/DiaryProps';

export const DiaryDate = ({ date, isSelected, onClick }: DiaryDateProps) => {
  return (
    <div className={`date ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <p className={`day ${isSelected ? 'selected' : ''}`}>
        {' '}
        {date.toLocaleDateString('en-US', {
          weekday: 'short',
        })}
      </p>
      <h5 className={`day-num ${isSelected ? 'selected' : ''}`}>{date.getDate()}</h5>
    </div>
  );
};
