// components/Calendar.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventSidebar from "./EventSideBar";
import EventModal from "./EventModal";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/services/CalendarService";

// Define types for our events and props
export interface Event {
  id: number;
  title: string;
  description?: string;
  date: Date;
  time?: string;
  category?: string;
  isLocal?: boolean; // Flag to identify local events
}

// Interface for backend event data
interface BackendEvent {
  id: number;
  title: string;
  description?: string;
  eventDate: string;
  time?: string;
  category?: string;
  userId?: string;
}

const Calendar: React.FC = () => {
  const { userId, isSignedIn } = useAuth();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [localEvents, setLocalEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Helper functions remain the same
  const formatDateForBackend = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const convertBackendEvent = (backendEvent: BackendEvent): Event => {
    return {
      id: backendEvent.id,
      title: backendEvent.title,
      description: backendEvent.description,
      date: new Date(backendEvent.eventDate),
      time: backendEvent.time,
      category: backendEvent.category,
      isLocal: false,
    };
  };

  // Load remote events only for authenticated users
  const loadRemoteEvents = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const data = await fetchEvents(userId);
      const convertedEvents = data.map(convertBackendEvent);
      setEvents(convertedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load local events from localStorage
  const loadLocalEvents = () => {
    try {
      const storedEvents = localStorage.getItem('calendarEvents');
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents);
        // Convert string dates back to Date objects
        const hydratedEvents = parsedEvents.map((event: Event) => ({
          ...event,
          date: new Date(event.date),
          isLocal: true
        }));
        setLocalEvents(hydratedEvents);
      }
    } catch (error) {
      console.error("Failed to load local events:", error);
    }
  };

  // Save local events to localStorage
  const saveLocalEvents = (updatedEvents: Event[]) => {
    try {
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    } catch (error) {
      console.error("Failed to save local events:", error);
    }
  };

  // Combined events from both sources
  const allEvents = [...events, ...localEvents];

  useEffect(() => {
    // Load local events for all users
    loadLocalEvents();
    
    // Load remote events only for authenticated users
    if (isSignedIn) {
      loadRemoteEvents();
    }
  }, [isSignedIn, userId]);

  // Save localEvents to localStorage whenever they change
  useEffect(() => {
    if (localEvents.length > 0) {
      saveLocalEvents(localEvents);
    }
  }, [localEvents]);

  // Navigation functions remain the same
  const prevMonth = (): void => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = (): void => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleTodayClick = (): void => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date): void => {
    const cleanDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    setSelectedDate(cleanDate);
    setShowModal(true);
    setSelectedEvent(null);
  };

  const handleEventClick = (event: Event): void => {
    setSelectedEvent(event);
    setSelectedDate(new Date(event.date));
    setShowModal(true);
  };

  // Updated to handle both local and remote events
  const handleSaveEvent = async (
    eventData: Omit<Event, "id" | "date">
  ): Promise<void> => {
    if (!selectedDate) return;

    setIsLoading(true);
    try {
      // If user is signed in, save to the server
      if (isSignedIn && userId) {
        const backendEventData = {
          title: eventData.title,
          description: eventData.description,
          eventDate: formatDateForBackend(selectedDate),
          time: eventData.time,
          category: eventData.category,
          userID: userId,
        };

        if (selectedEvent && !selectedEvent.isLocal) {
          // Update existing remote event
          const updatedBackendEvent = await updateEvent(selectedEvent.id, {
            id: selectedEvent.id,
            ...backendEventData,
          });

          const updatedEvent = convertBackendEvent(updatedBackendEvent);
          setEvents(
            events.map((event) =>
              event.id === selectedEvent.id ? updatedEvent : event
            )
          );
        } else {
          // Create new remote event
          const newBackendEvent = await createEvent(backendEventData);
          const newEvent = convertBackendEvent(newBackendEvent);
          setEvents([...events, newEvent]);
          
          // If we're updating a local event, remove it from local storage
          if (selectedEvent && selectedEvent.isLocal) {
            const filteredLocalEvents = localEvents.filter(
              event => event.id !== selectedEvent.id
            );
            setLocalEvents(filteredLocalEvents);
            saveLocalEvents(filteredLocalEvents);
          }
        }
      } else {
        // For non-authenticated users or local edits, save to localStorage
        const newLocalEvent: Event = {
          id: selectedEvent?.id || Date.now(), // Use timestamp as ID for new local events
          title: eventData.title,
          description: eventData.description,
          date: selectedDate,
          time: eventData.time,
          category: eventData.category,
          isLocal: true,
        };

        if (selectedEvent && selectedEvent.isLocal) {
          // Update existing local event
          const updatedLocalEvents = localEvents.map(event => 
            event.id === selectedEvent.id ? newLocalEvent : event
          );
          setLocalEvents(updatedLocalEvents);
          saveLocalEvents(updatedLocalEvents);
        } else {
          // Create new local event
          setLocalEvents([...localEvents, newLocalEvent]);
          saveLocalEvents([...localEvents, newLocalEvent]);
        }
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Updated to handle both local and remote events
  const handleDeleteEvent = async (eventId: number): Promise<void> => {
    setIsLoading(true);
    try {
      // Check if it's a local event
      const eventToDelete = allEvents.find(event => event.id === eventId);
      
      if (eventToDelete?.isLocal) {
        // Delete from local storage
        const updatedLocalEvents = localEvents.filter(event => event.id !== eventId);
        setLocalEvents(updatedLocalEvents);
        saveLocalEvents(updatedLocalEvents);
      } else {
        // Delete from server
        await deleteEvent(eventId);
        setEvents(events.filter(event => event.id !== eventId));
      }
      
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="hidden lg:block h-[100vh] lg:w-[250px] xl:w-[300px] scrollbar-none">
        <EventSidebar
          events={allEvents}
          currentDate={currentDate}
          onEventClick={handleEventClick}
        />
      </div>

      <div className="flex-2 p-8 overflow-auto">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          onTodayClick={handleTodayClick}
        />
        <CalendarGrid
          currentDate={currentDate}
          events={allEvents}
          onDateClick={handleDateClick}
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
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Calendar;