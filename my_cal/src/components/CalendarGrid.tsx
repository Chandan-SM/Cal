import React, { useEffect, useState } from 'react';
import DayCell from './DayCell';
import { useTheme } from 'next-themes';

export interface Event {
  id: number;
  title: string;
  description?: string;
  date: Date;
  time?: string;
  category?: string;
}

export interface CalendarGridProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  currentDate, 
  events, 
  onDateClick, 
  onEventClick 
}) => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentTheme = isMounted ? resolvedTheme : "system";

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  interface DayData {
    day: number | null;
    date: Date | null;
    events?: Event[];
  }

  const generateCalendarDays = (): DayData[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days: DayData[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, date: null });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day &&
               eventDate.getMonth() === month &&
               eventDate.getFullYear() === year;
      });

      days.push({ day, date, events: dayEvents });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`calendar-grid p-4 rounded-lg shadow-md ${currentTheme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {weekdays.map(day => (
          <div key={day} className="text-center font-semibold uppercase text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayData, index) => (
          <DayCell
            key={index}
            dayData={dayData}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
            isCurrentMonth={true}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
