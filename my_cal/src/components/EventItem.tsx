// components/EventItem.tsx
import React from 'react';
import { Event } from './CalendarGrid';

interface EventItemProps {
  event: Event;
  onClick: (e: React.MouseEvent) => void;
  isDetail?: boolean;
}

const EventItem: React.FC<EventItemProps> = ({ event, onClick, isDetail = false }) => {
  const getEventColor = (category?: string): string => {
    const colors: Record<string, string> = {
      work: 'bg-indigo-600 hover:bg-indigo-700',
      personal: 'bg-teal-500 hover:bg-teal-600',
      important: 'bg-pink-500 hover:bg-pink-600',
      other: 'bg-orange-500 hover:bg-orange-600'
    };
    
    return colors[category || 'other'] || colors.other;
  };
  
  return (
    <div 
      className={`rounded-full cursor-pointer transition-colors ${getEventColor(event.category)} ${isDetail ? 'p-3 mb-2 flex items-center justify-between' : 'p-1 text-xs font-medium truncate'}`}
      onClick={onClick}
    >
      <span className="px-2">{event.title}</span>
      {isDetail && event.time && (
        <span className="text-xs opacity-80">{event.time}</span>
      )}
    </div>
  );
};

export default EventItem;