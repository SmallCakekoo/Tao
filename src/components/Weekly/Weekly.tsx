import { Day } from './Day/Day';
import { weeklyData } from '../WeeklyCharts/WeeklyData';
import './Weekly.css';

const buildWeekDateMap = () => {
  // aligns labels Mon-Sun with the real date numbers of the current week
  const dayIndex: Record<string, number> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 0,
  };

  // current date in local timezone
  const today = new Date();
  // JS: Sunday=0, Monday=1, ... Saturday=6
  const currentDay = today.getDay();
  // clone today so we can move this date back to Monday
  const monday = new Date(today);
  // if today is Sunday, go back 6 days; otherwise go back until Monday
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  monday.setDate(today.getDate() + diffToMonday);

  // final mapping: Mon -> dateNum, Tue -> dateNum, ...
  const map: Record<string, number> = {};

  Object.entries(dayIndex).forEach(([day, index]) => {
    // start from Monday and advance day by day
    const date = new Date(monday);
    const offset = index === 0 ? 6 : index - 1;
    date.setDate(monday.getDate() + offset);
    // keep only the day number for UI display (e.g., 21)
    map[day] = date.getDate();
  });

  return map;
};

export const Weekly = () => {
  const weekDateMap = buildWeekDateMap();

  return (
    <>
      <p className="overview">This week's overview</p>

      <div className="week">
        <div className="days">
          {weeklyData.map((item) => (
            <Day
              key={item.day}
              dateNum={weekDateMap[item.day] ?? 0}
              dayLabel={item.day}
              value={item.value}
            />
          ))}
        </div>
      </div>
    </>
  );
};
