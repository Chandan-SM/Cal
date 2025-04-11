// components/DayCell.tsx
import React from 'react';
import EventItem from './EventItem';
import { Event } from './CalendarGrid';
import { isToday } from '../lib/calendarUtils';

interface DayData {
  day: number | null;
  date: Date | null;
  events?: Event[];
  isCurrentMonth: boolean;
}

interface DayCellProps {
  dayData: DayData;
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

const DayCell: React.FC<DayCellProps> = ({ 
  dayData, 
  onDateClick, 
  onEventClick
}) => {
  if (!dayData.day || !dayData.date) {
    return <div className="h-24 bg-gray-800 rounded-md"></div>;
  }
  
  const today = isToday(dayData.date);
  
  return (
    <div 
      className={`md:h-32 lg:h-26 p-2 border border-gray-800 rounded-md flex md:flex-col lg:flex-row gap-2 overflow-hidden
        ${dayData.isCurrentMonth ? 'bg-gray-800' : 'bg-gray-800/20'}
        ${today && 'border-red-500'}
        hover:bg-gray-700 cursor-pointer transition-colors`}
      onClick={() => onDateClick(dayData.date as Date)}
    >
      <div className="flex justify-between h-fit">
        <span className={`text-sm font-medium ${dayData.isCurrentMonth ? 'text-gray-300' : 'text-gray-500'}`}>
          {dayData.day}
        </span>
      </div>
      
      <div className="md:w-[100%] lg:w-[80%] space-y-1">
        {dayData.events && dayData.events.slice(0, 2).map(event => (
          <EventItem 
            key={event.id} 
            event={event} 
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onEventClick(event);
            }} 
          />
        ))}
        {dayData.events && dayData.events.length > 2 && (
          <div className="text-xs text-gray-400 mt-1">
            +{dayData.events.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
};

export default DayCell;