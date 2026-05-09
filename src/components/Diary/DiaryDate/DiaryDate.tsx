import './DiaryDate.css';
type DiaryDateProps = {
  date: Date;
  isSelected: boolean;
  onClick: () => void;
};

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
