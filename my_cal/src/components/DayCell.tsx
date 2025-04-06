// components/DayCell.tsx
import React from 'react';
import EventItem from './EventItem';
import { Event } from './CalendarGrid';

interface DayData {
  day: number | null;
  date: Date | null;
  events?: Event[];
}

interface DayCellProps {
  dayData: DayData;
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
  isCurrentMonth: boolean;
}

const DayCell: React.FC<DayCellProps> = ({ 
  dayData, 
  onDateClick, 
  onEventClick, 
  isCurrentMonth 
}) => {
  if (!dayData.day || !dayData.date) {
    return <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"></div>;
  }
  
  const isToday = new Date().toDateString() === dayData.date.toDateString();
  
  return (
    <div 
      className={`h-24 p-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm 
        ${isToday ? 'bg-blue-50 dark:bg-blue-900/40' : 'bg-white dark:bg-gray-800'} 
        ${!isCurrentMonth ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-gray-100'}
        hover:bg-blue-100 dark:hover:bg-blue-800 cursor-pointer transition-all duration-200`}
      onClick={() => onDateClick(dayData.date as Date)}
    >
      <div className="flex justify-between items-center">
        <span className={`inline-block rounded-full w-8 h-8 text-center leading-8 font-semibold 
          ${isToday ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}`}>
          {dayData.day}
        </span>
      </div>
      <div className="mt-2 overflow-y-auto max-h-16 space-y-1">
        {dayData.events && dayData.events.map(event => (
          <EventItem 
            key={event.id} 
            event={event} 
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onEventClick(event);
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default DayCell;