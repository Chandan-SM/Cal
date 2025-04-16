// components/EventItem.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Event } from './CalendarGrid';
import { Clock } from 'lucide-react';

interface EventItemProps {
  event: Event;
  onClick: (e: React.MouseEvent) => void;
  isDetail?: boolean;
}

const EventItem: React.FC<EventItemProps> = ({ event, onClick, isDetail = false }) => {
  const getEventColor = (category?: string): string => {
    const colors: Record<string, string> = {
      work: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-600/20',
      personal: 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 shadow-md shadow-teal-500/20',
      important: 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 shadow-md shadow-rose-500/20',
      other: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-md shadow-amber-500/20'
    };
    
    return colors[category || 'other'] || colors.other;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getCategoryIcon = (category?: string) => {
    // You could import specific icons for each category
    if (isDetail && event.time) {
      return <Clock className="h-4 w-4" />;
    }
    return null;
  };
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-lg cursor-pointer transition-all ${getEventColor(event.category)} ${isDetail ? 'p-3 mb-2 flex items-center justify-between shadow-lg' : 'p-1.5 text-xs font-medium truncate backdrop-blur-sm'}`}
      onClick={onClick}
      layout
    >
      <span className="px-2 flex items-center gap-1">
        {event.title}
      </span>
      {isDetail && event.time && (
        <span className="text-xs opacity-80 flex items-center gap-1">
          {getCategoryIcon(event.category)}
          {event.time}
        </span>
      )}
    </motion.div>
  );
};

export default EventItem;