import "./WeeklyWidgetCharts.css";
import { WeeklyChart } from "./WeeklyCharts";

export const WeeklyWidgetChart = () => {
  return (
    <div className="weekly-widget">
      <h4>Mood Analysis</h4>

      <div className="chart-container">
        <WeeklyChart />
      </div>
    </div>
  );
};