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
    <div 
      className={`flex justify-between items-center mb-6 p-4 shadow-md rounded-lg ${
        currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <h2 
        className={`text-2xl font-semibold ${
          currentTheme === 'dark' ? 'text-gray-200' : 'text-gray-800'
        }`}
      >
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
      <div className="flex gap-3">
        <button 
          onClick={onPrevMonth}
          className={`px-4 py-2 rounded-lg transition-colors shadow-sm ${
            currentTheme === 'dark' 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          aria-label="Previous month"
        >
          &lt;
        </button>
        <button 
          onClick={handleTodayClick}
          className={`px-4 py-2 rounded-lg transition-colors shadow-sm ${
            currentTheme === 'dark' 
              ? 'hover:bg-blue-700' 
              : 'hover:bg-blue-600'
          } bg-blue-500 text-white`}
        >
          Today
        </button>
        <button 
          onClick={onNextMonth}
          className={`px-4 py-2 rounded-lg transition-colors shadow-sm ${
            currentTheme === 'dark' 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;