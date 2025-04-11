// components/Calendar.tsx
import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventSidebar from './EventSideBar';
import EventModal from './EventModal';

// Define types for our events and props
interface Event {
  id: number;
  title: string;
  description?: string;
  date: Date;
  time?: string;
  category?: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  const prevMonth = (): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = (): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const handleTodayClick = (): void => {
    setCurrentDate(new Date());
  };
  
  const handleDateClick = (date: Date): void => {
    setSelectedDate(date);
    setShowModal(true);
    setSelectedEvent(null);
  };
  
  const handleEventClick = (event: Event): void => {
    setSelectedEvent(event);
    setSelectedDate(new Date(event.date));
    setShowModal(true);
  };
  
  type EventDataType = Omit<Event, 'id' | 'date'>;
  
  const handleSaveEvent = (eventData: EventDataType): void => {
    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...eventData } : event
      ));
    } else {
      // Add new event
      const newEvent: Event = {
        id: Date.now(),
        ...eventData,
        date: selectedDate as Date
      };
      setEvents([...events, newEvent]);
    }
    setShowModal(false);
  };
  
  const handleDeleteEvent = (eventId: number): void => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowModal(false);
  };
  
  return (
    <div className="flex w-full h-full">
      <div className="flex-2 p-8 overflow-auto">
      <CalendarHeader 
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onTodayClick={handleTodayClick}
      />
      <CalendarGrid 
        currentDate={currentDate}
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />
      </div>
      
      <div className="hidden lg:block h-[100vh] lg:w-[250px] xl:w-[300px]">
        <EventSidebar
          events={events}
          currentDate={currentDate}
          onEventClick={handleEventClick}
        />
      </div>
      
      {showModal && selectedDate && (
      <EventModal
        date={selectedDate}
        event={selectedEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        onClose={() => setShowModal(false)}
      />
      )}
    </div>
  );
};

export default Calendar;