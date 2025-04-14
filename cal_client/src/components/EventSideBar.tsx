// components/EventSidebar.tsx
import React from "react";
import { Event } from "./CalendarGrid";
import { formatDate } from "../lib/calendarUtils";

interface EventSidebarProps {
  events: Event[];
  currentDate: Date;
  onEventClick: (event: Event) => void;
}

const EventSidebar: React.FC<EventSidebarProps> = ({
  events,
  currentDate,
  onEventClick,
}) => {
  // Get events for the current month, sorted by date
  const currentMonthEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    })
    .sort((a, b) => {
      const dateComparison = a.date.getTime() - b.date.getTime();
      if (dateComparison !== 0) {
        return dateComparison;
      }
      // If dates are the same, compare by time
      const timeA = a.time ? new Date(`1970-01-01T${a.time}`).getTime() : 0;
      const timeB = b.time ? new Date(`1970-01-01T${b.time}`).getTime() : 0;
      return timeA - timeB;
    });
    // .slice(0, 9); // Limit to 5 events

  const getEventColor = (category?: string): string => {
    const colors: Record<string, string> = {
      work: "bg-indigo-600",
      personal: "bg-teal-500",
      important: "bg-pink-500",
      other: "bg-orange-500",
    };

    return colors[category || "other"] || colors.other;
  };

  return (
    <div className="w-[100%] bg-gray-800 p-4 border-l border-gray-700 overflow-y-auto h-[100vh] scrollbar-none">
      {currentMonthEvents.some((event) => {
        const eventDate = new Date(event.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight
        eventDate.setHours(0, 0, 0, 0); // Reset time to midnight
        return eventDate < today;
      }) && (
        <>
          <h2 className="text-xl font-bold mb-4 text-gray-100">
            Previous Events
          </h2>
          <div className="space-y-4">
            {currentMonthEvents
              .filter((event) => {
                const eventDate = new Date(event.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Reset time to midnight
                eventDate.setHours(0, 0, 0, 0); // Reset time to midnight
                return eventDate < today;
              })
              .map((event) => {
                const eventDate = new Date(event.date);
                return (
                  <div
                    key={event.id}
                    className={`${getEventColor(
                      event.category
                    )} rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity`}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="flex items-center text-white mb-1 gap-3">
                      <div className="text-4xl font-bold">
                        {eventDate.getDate()}
                      </div>
                      <div className="text-lg font-medium">{event.title}</div>
                    </div>
                    <div className="text-sm text-white/80">
                      {formatDate(eventDate, "short")}
                      {event.time && ` • ${event.time}`}
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}

      <h2 className="text-xl font-bold mt-6 mb-4 text-gray-100">
        Upcoming Events
      </h2>

      <div className="space-y-4">
        {currentMonthEvents.length > 0 ? (
          currentMonthEvents
            .filter((event) => {
              const eventDate = new Date(event.date);
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Reset time to midnight
              eventDate.setHours(0, 0, 0, 0); // Reset time to midnight
              return eventDate >= today;
            })
            .map((event) => {
              const eventDate = new Date(event.date);
              return (
                <div
                  key={event.id}
                  className={`${getEventColor(
                    event.category
                  )} rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity`}
                  onClick={() => onEventClick(event)}
                >
                  <div className="flex items-center text-white mb-1 gap-3">
                    <div className="text-4xl font-bold">
                      {eventDate.getDate()}
                    </div>
                    <div className="text-lg font-medium">{event.title}</div>
                  </div>
                  <div className="text-sm text-white/80">
                    {formatDate(eventDate, "short")}
                    {event.time && ` • ${event.time}`}
                  </div>
                </div>
              );
            })
        ) : (
          <div className="text-gray-400 text-center py-8">
            No upcoming events this month
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSidebar;
