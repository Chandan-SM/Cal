// components/EventItem.tsx
import React from 'react';
import { Event } from './CalendarGrid';

interface EventItemProps {
  event: Event;
  onClick: (e: React.MouseEvent) => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, onClick }) => {
  const getEventColor = (category?: string): string => {
    const colors: Record<string, string> = {
      work: 'bg-blue-500',
      personal: 'bg-green-500',
      important: 'bg-red-500',
      other: 'bg-purple-500'
    };
    
    return colors[category || 'other'] || colors.other;
  };
  
  return (
    <div 
      className={`p-1 mb-1 rounded text-xs text-white truncate cursor-pointer ${getEventColor(event.category)}`}
      onClick={onClick}
    >
      {event.title}
    </div>
  );
};

export default EventItem;