import './DiaryDate.css';
type DiaryDateProps = {
  date: Date;
  isSelected: boolean;
  onClick: () => void;
};

export const DiaryDate = ({ date, isSelected, onClick }: DiaryDateProps) => {
  return (
    <div className="date" onClick={onClick}>
      <p className="day">
        {' '}
        {date.toLocaleDateString('en-US', {
          weekday: 'short',
        })}
      </p>
      <h5 className="day-num">{date.getDate()}</h5>
    </div>
  );
};
