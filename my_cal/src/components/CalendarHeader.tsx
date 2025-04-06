// components/CalendarHeader.tsx
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth 
}) => {

  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentTheme = isMounted ? resolvedTheme : "system";

  const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleTodayClick = () => {
    // You would want to add setCurrentDate(new Date()) here
    // This is a placeholder as it wasn't implemented in your original code
  };
  
  return (
    <div className="flex justify-between items-center mb-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
      <div className="flex gap-3">
        <button 
          onClick={onPrevMonth}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm"
          aria-label="Previous month"
        >
          &lt;
        </button>
        <button 
          onClick={handleTodayClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors shadow-sm"
        >
          Today
        </button>
        <button 
          onClick={onNextMonth}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm"
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;