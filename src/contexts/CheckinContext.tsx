// ¿Por qué usar Context aquí?
// El estado de ánimo o "Check-in" del día se utiliza en varias pantallas: en el Home (para mostrar tu sentimiento actual o el widget), 
// en FormResults (para guardar el resultado) y en EditFeelings (para modificarlo). 
// También los datos semanales se usan en el Weekly overview y en el WeeklyChart (Mood Analysis).
// Usar un Context evita tener que hacer la consulta del check-in diario (getTodaysCheckin) a la base de datos cada vez que cambiamos de pantalla.
// Además, permite que toda la interfaz se actualice y reaccione al instante cuando el usuario cambie cómo se siente.

import { createContext, useContext, useState, useEffect, useCallback, type PropsWithChildren } from "react";
import { getTodaysCheckin, getWeeklyCheckins } from "../services/checkinService";
import { useAuth } from "./AuthContext";
import type { FullDailyCheckin } from "../types/CheckinEngineTypes";

// Tipo que usan los widgets Weekly y WeeklyChart
export type WeeklyDataPoint = {
  day: string;
  value: number;
  checkin_date: string;
};

type CheckinContextType = {
  todaysCheckin: FullDailyCheckin | null;
  weeklyData: WeeklyDataPoint[];
  loading: boolean;
  refreshCheckin: () => Promise<void>;
};

export const CheckinContext = createContext<CheckinContextType | undefined>(undefined);

// Mapea la lista de check-ins de la semana al formato { day, value } que necesitan los widgets
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const buildWeeklyData = (checkins: FullDailyCheckin[]): WeeklyDataPoint[] => {
  // Construir un mapa fecha -> checkin
  const checkinMap = new Map<string, FullDailyCheckin>();
  checkins.forEach(c => checkinMap.set(c.checkin_date, c));

  // Calcular lunes de esta semana
  const today = new Date();
  const currentDay = today.getDay();
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  // Generar 7 días (Mon-Sun)
  const weekOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return weekOrder.map((label, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const checkin = checkinMap.get(dateStr);

    // El value para el gráfico es el mood_score + 1 (para que vaya de 1-5 en vez de 0-4)
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
      console.error("Error al obtener el check-in:", error);
      setTodaysCheckin(null);
      setWeeklyData([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Cargar automáticamente cuando cambie el usuario
  useEffect(() => {
    refreshCheckin();
  }, [refreshCheckin]);

  return (
    <CheckinContext.Provider value={{ todaysCheckin, weeklyData, loading, refreshCheckin }}>
      {children}
    </CheckinContext.Provider>
  );
};

// Hook personalizado
export const useCheckin = () => {
  const context = useContext(CheckinContext);
  if (context === undefined) {
    throw new Error;
  }
  return context;
};
