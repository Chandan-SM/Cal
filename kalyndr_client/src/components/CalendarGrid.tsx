// components/CalendarGrid.tsx
import React from 'react';
import DayCell from './DayCell';

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
    isCurrentMonth: boolean;
  }

  const generateCalendarDays = (): DayData[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    // Get days from previous month
    const prevMonthDays: DayData[] = [];
    if (firstDayOfMonth > 0) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevMonthYear = month === 0 ? year - 1 : year;
      const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
      
      for (let i = 0; i < firstDayOfMonth; i++) {
        const day = daysInPrevMonth - firstDayOfMonth + i + 1;
        const date = new Date(prevMonthYear, prevMonth, day);
        const dayEvents = events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.getDate() === day && 
                 eventDate.getMonth() === prevMonth && 
                 eventDate.getFullYear() === prevMonthYear;
        });
        
        prevMonthDays.push({ 
          day, 
          date, 
          events: dayEvents,
          isCurrentMonth: false 
        });
      }
    }
    
    // Current month days
    const currentMonthDays: DayData[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day && 
               eventDate.getMonth() === month && 
               eventDate.getFullYear() === year;
      });
      
      currentMonthDays.push({ 
        day, 
        date, 
        events: dayEvents,
        isCurrentMonth: true
      });
    }
    
    // Next month days to fill calendar grid
    const totalDaysDisplayed = prevMonthDays.length + currentMonthDays.length;
    const daysNeeded = 42 - totalDaysDisplayed; // 6 rows of 7 days
    
    const nextMonthDays: DayData[] = [];
    if (daysNeeded > 0) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextMonthYear = month === 11 ? year + 1 : year;
      
      for (let day = 1; day <= daysNeeded; day++) {
        const date = new Date(nextMonthYear, nextMonth, day);
        const dayEvents = events.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.getDate() === day && 
                 eventDate.getMonth() === nextMonth && 
                 eventDate.getFullYear() === nextMonthYear;
        });
        
        nextMonthDays.push({ 
          day, 
          date, 
          events: dayEvents,
          isCurrentMonth: false 
        });
      }
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const calendarDays = generateCalendarDays();
  const weekdays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  return (
    <div className="calendar-grid border border-indigo-900/30 p-5 rounded-2xl bg-slate-900/50 backdrop-blur-sm shadow-lg shadow-indigo-500/10">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-4 gap-2">
        {weekdays.map(day => (
          <div key={day} className="text-center font-medium text-indigo-300 text-xs tracking-wider py-2 bg-slate-800/50 backdrop-blur-sm border border-indigo-900/20 rounded-md">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((dayData, index) => (
          <DayCell
            key={index}
            dayData={dayData}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;