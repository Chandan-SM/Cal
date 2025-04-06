// components/Calendar.tsx
import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
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
  
  const handleDateClick = (date: Date): void => {
    setSelectedDate(date);
    setShowModal(true);
    setSelectedEvent(null); // Reset selected event when selecting a new date
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
        id: Date.now(), // Simple ID generation
        ...eventData,
        date: selectedDate as Date // We know selectedDate is not null here because the modal is open
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
    <div className="calendar-container">
      <CalendarHeader 
        currentDate={currentDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />
      <CalendarGrid 
        currentDate={currentDate}
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />
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