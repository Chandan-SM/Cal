// components/DayCell.tsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    return <div className="h-24 bg-slate-900/30 rounded-md"></div>;
  }
  
  const today = isToday(dayData.date);
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`md:h-32 lg:h-26 p-2 border rounded-md flex md:flex-col lg:flex-row gap-2 overflow-hidden
        ${dayData.isCurrentMonth ? 'bg-slate-800/80 border-slate-700/30' : 'bg-slate-900/50 border-slate-800/20'}
        ${today ? 'border-violet-500 ring-2 ring-violet-500/30 shadow-lg shadow-violet-500/20' : ''}
        hover:bg-slate-700/80 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer transition-all duration-200`}
      onClick={() => onDateClick(dayData.date as Date)}
    >
      <div className="flex justify-between h-fit">
        <motion.span 
          className={`text-sm font-medium 
            ${today ? 'text-violet-400 bg-violet-950/30 px-2 py-1 rounded-full' : 
                    dayData.isCurrentMonth ? 'text-slate-300' : 'text-slate-500'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {dayData.day}
        </motion.span>
      </div>
      
      <div className="md:w-[100%] lg:w-[80%] space-y-1 overflow-hidden">
        <AnimatePresence>
          {dayData.events && dayData.events.slice(0, 2).map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: idx * 0.1 }}
            >
              <EventItem 
                event={event} 
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onEventClick(event);
                }} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {dayData.events && dayData.events.length > 2 && (
          <motion.div 
            className="text-xs text-indigo-300 font-medium bg-indigo-950/30 rounded-full px-2 py-1 mt-1 w-fit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            +{dayData.events.length - 2} more
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DayCell;