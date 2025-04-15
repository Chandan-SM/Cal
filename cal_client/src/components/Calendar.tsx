// components/Calendar.tsx
import React, { useEffect, useState } from "react";
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
import { useAuth } from "@clerk/nextjs";

// Define types for our events and props
export interface Event {
  id: number;
  title: string;
  description?: string;
  date: Date;
  time?: string;
  category?: string;
}

// Interface for backend event data
interface BackendEvent {
  id: number;
  title: string;
  description?: string;
  eventDate: string;
  time?: string;
  category?: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId } = useAuth();

  // Format a date to 'YYYY-MM-DD' for the backend
  const formatDateForBackend = (date: Date): string => {
    // Format as YYYY-MM-DD with padding for single-digit months/days
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 because months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Convert backend event format to frontend event format
  const convertBackendEvent = (backendEvent: BackendEvent): Event => {
    return {
      id: backendEvent.id,
      title: backendEvent.title,
      description: backendEvent.description,
      date: new Date(backendEvent.eventDate),
      time: backendEvent.time,
      category: backendEvent.category,
    };
  };

  // Load events from the API
  const loadEvents = async () => {
    setIsLoading(true);
    try {
      // Only fetch events if we have a userId
      if (userId) {
        const data = await fetchEvents(userId);
        const convertedEvents = data.map(convertBackendEvent);
        setEvents(convertedEvents);
      } else {
        // Handle case where user is not authenticated
        setEvents([]);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
      // You might want to show an error toast or notification here
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadEvents();
    }
  }, [userId]);

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

  const handleSaveEvent = async (
    eventData: Omit<Event, "id" | "date">
  ): Promise<void> => {
    if (!selectedDate || !userId) return console.log("User ID is missing"); // Check if selectedDate exists
    ; // Check if userId exists

    setIsLoading(true);
    try {
      // Prepare data for backend with userID
      const backendEventData = {
        title: eventData.title,
        description: eventData.description,
        eventDate: formatDateForBackend(selectedDate),
        time: eventData.time,
        category: eventData.category,
        userId: userId, // Include the userId with lowercase id to match backend
      };

      if (selectedEvent) {
        // Update existing event
        const updatedBackendEvent = await updateEvent(selectedEvent.id, {
          id: selectedEvent.id,
          ...backendEventData,
        });

        // Convert to frontend format and update state
        const updatedEvent = convertBackendEvent(updatedBackendEvent);
        setEvents(
          events.map((event) =>
            event.id === selectedEvent.id ? updatedEvent : event
          )
        );
      } else {
        // Create new event
        const newBackendEvent = await createEvent(backendEventData);

        // Convert to frontend format and update state
        const newEvent = convertBackendEvent(newBackendEvent);
        setEvents([...events, newEvent]);
      }

      // Close modal after successful operation
      setShowModal(false);
    } catch (error) {
      console.error("Error saving event:", error);
      // Show error notification
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: number): Promise<void> => {
    setIsLoading(true);
    try {
      await deleteEvent(eventId);
      // Remove from local state after successful deletion
      setEvents(events.filter((event) => event.id !== eventId));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting event:", error);
      // Show error notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="hidden lg:block h-[100vh] lg:w-[250px] xl:w-[300px] scrollbar-none">
        <EventSidebar
          events={events}
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
          events={events}
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
