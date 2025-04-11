// components/CalendarHeader.tsx
import React from 'react';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayClick: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth,
  onTodayClick
}) => {
  const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-5xl font-light text-gray-100">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h1>
      
      <div className="flex items-center space-x-4">
        <div className="bg-indigo-600 rounded-full flex overflow-hidden">
          <button 
            onClick={onTodayClick}
            className="px-5 py-2 bg-indigo-600 text-white font-medium"
          >
            MONTH
          </button>
          <button 
            className="px-5 py-2 bg-transparent text-white font-medium opacity-50"
          >
            YEAR
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={onPrevMonth}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700"
            aria-label="Previous month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={onNextMonth}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700"
            aria-label="Next month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;