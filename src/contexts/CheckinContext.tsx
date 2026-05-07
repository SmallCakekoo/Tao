// Why use Context here?
// The mood or "Daily Check-in" is used in multiple screens: Home (to show current feeling or widget),
// FormResults (to save results), and EditFeelings (to modify them).
// Using a Context avoids repeating database queries (getTodaysCheckin) every time we switch screens.
// Additionally, it allows the entire UI to update instantly when the user changes how they feel.

import { createContext, useContext, useState, useEffect, useCallback, type PropsWithChildren } from "react";
import { getTodaysCheckin, getWeeklyCheckins } from "../services/checkinService";
import { useAuth } from "./AuthContext";
import type { FullDailyCheckin, WeeklyDataPoint, CheckinContextType } from "../types/CheckinTypes";

export const CheckinContext = createContext<CheckinContextType | undefined>(undefined);

const buildWeeklyData = (checkins: FullDailyCheckin[]): WeeklyDataPoint[] => {
  // Build a date -> checkin map
  const checkinMap = new Map<string, FullDailyCheckin>();
  checkins.forEach(c => checkinMap.set(c.checkin_date, c));

  // Calculate Monday of this week
  const today = new Date();
  const currentDay = today.getDay();
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  // Generate 7 days (Mon-Sun)
  const weekOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return weekOrder.map((label, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const checkin = checkinMap.get(dateStr);

    // Graph value is mood_score + 1 (to go from 1-5 instead of 0-4)
    const value = checkin ? (checkin.mood_score + 1) : 0;
    return { day: label, value, checkin_date: dateStr };
  });
};

export const CheckinProvider = ({ children }: PropsWithChildren) => {
  const [todaysCheckin, setTodaysCheckin] = useState<FullDailyCheckin | null>(null);
  const [weeklyData, setWeeklyData] = useState<WeeklyDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const refreshCheckin = useCallback(async () => {
    if (!user) {
      setTodaysCheckin(null);
      setWeeklyData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [checkin, weeklyCheckins] = await Promise.all([
        getTodaysCheckin(),
        getWeeklyCheckins(),
      ]);
      setTodaysCheckin(checkin);
      setWeeklyData(buildWeeklyData(weeklyCheckins));
    } catch (error) {
      console.error("Error fetching check-in:", error);
      setTodaysCheckin(null);
      setWeeklyData([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Automatically load when the user changes
  useEffect(() => {
    refreshCheckin();
  }, [refreshCheckin]);

  return (
    <CheckinContext.Provider value={{ todaysCheckin, weeklyData, loading, refreshCheckin }}>
      {children}
    </CheckinContext.Provider>
  );
};

// Custom hook
export const useCheckin = () => {
  const context = useContext(CheckinContext);
  if (context === undefined) {
    throw new Error;
  }
  return context;
};
