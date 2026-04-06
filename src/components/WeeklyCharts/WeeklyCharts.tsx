import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { weeklyData } from './WeeklyData';
import { CustomDot } from './CustomDot';

export const WeeklyChart = () => {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={weeklyData} margin={{ top: 15, right: 28, left: 28, bottom: 4 }}>
        <XAxis
          dataKey="day"
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={false}
          tick={{ fontSize: 13, fill: '#9CA3AF' }}
          dy={10}
        />

        <YAxis domain={[0, 5]} hide />

        <ReferenceLine y={5} stroke="#E5E7EB" strokeWidth={1} />
        <ReferenceLine y={4} stroke="#E5E7EB" strokeWidth={1} />
        <ReferenceLine y={3} stroke="#E5E7EB" strokeWidth={1} />
        <ReferenceLine y={2} stroke="#E5E7EB" strokeWidth={1} />
        <ReferenceLine y={1} stroke="#E5E7EB" strokeWidth={1} />
        <ReferenceLine y={0} stroke="#E5E7EB" strokeWidth={1} />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#93A8F4"
          strokeWidth={1.5}
          dot={<CustomDot />}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
