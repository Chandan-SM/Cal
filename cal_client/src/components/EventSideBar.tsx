// components/EventSidebar.tsx
import React from "react";
import { Event } from "./CalendarGrid";
import { formatDate } from "../lib/calendarUtils";
import { NavUser } from "./nav-user";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

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

  const getEventColor = (category?: string): string => {
    const colors: Record<string, string> = {
      work: "bg-gradient-to-r from-violet-600 to-indigo-600 border-l-4 border-violet-400",
      personal: "bg-gradient-to-r from-teal-600 to-emerald-600 border-l-4 border-teal-400",
      important: "bg-gradient-to-r from-rose-600 to-pink-600 border-l-4 border-rose-400",
      other: "bg-gradient-to-r from-amber-600 to-orange-600 border-l-4 border-amber-400",
    };

    return colors[category || "other"] || colors.other;
  };

  const { user } = useUser();
  const data = {
    user: {
      name: user?.fullName ?? "Guest User",
      email: user?.primaryEmailAddress?.emailAddress ?? "",
      avatar: user?.imageUrl ?? "",
      guest: user ? false : true,
    },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 1, x: 0 },
    show: { opacity: 1, x: 0, 
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      } 
    }
  };

  return (
    <div className="w-full h-full bg-slate-900/80 border-l border-indigo-900/30 relative backdrop-blur-sm shadow-lg">
      <div className="flex items-center px-6 py-4 border-b border-indigo-900/30 bg-slate-900/90">
        <Calendar className="h-5 w-5 text-violet-400 mr-2" />
        <h2 className="text-xl font-medium text-violet-100">Events</h2>
      </div>
      
      <div
        className="overflow-y-auto h-[calc(100%-120px)] p-4 scrollbar-thin scrollbar-thumb-indigo-900 scrollbar-track-slate-900"
      >
        {currentMonthEvents.some((event) => {
          const eventDate = new Date(event.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate < today;
        }) && (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
          >
            <h3 className="text-md uppercase tracking-wider font-medium mb-4 text-indigo-300 border-b border-indigo-900/30 pb-2">
              Previous Events
            </h3>
            <motion.div variants={container} className="space-y-3">
              {currentMonthEvents
                .filter((event) => {
                  const eventDate = new Date(event.date);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  eventDate.setHours(0, 0, 0, 0);
                  return eventDate < today;
                })
                .map((event) => {
                  const eventDate = new Date(event.date);
                  return (
                    <motion.div
                      variants={item}
                      key={event.id}
                      className={`${getEventColor(
                        event.category
                      )} rounded-lg p-3 cursor-pointer hover:translate-x-1 hover:shadow-lg hover:shadow-indigo-900/20 transition-all`}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="flex items-center text-white mb-1 gap-2">
                        <div className="text-3xl font-bold text-white/90">
                          {eventDate.getDate()}
                        </div>
                        <div className="text-md font-medium">{event.title}</div>
                      </div>
                      <div className="text-sm text-white/80 ml-1">
                        {formatDate(eventDate, "short")}
                        {event.time && ` • ${event.time}`}
                      </div>
                    </motion.div>
                  );
                })}
            </motion.div>
          </motion.div>
        )}

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-6"
        >
          <h3 className="text-md uppercase tracking-wider font-medium mb-4 text-indigo-300 border-b border-indigo-900/30 pb-2">
            Upcoming Events
          </h3>

          {currentMonthEvents.filter((event) => {
            const eventDate = new Date(event.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
          }).length > 0 ? (
            <motion.div variants={container} className="space-y-3">
              {currentMonthEvents
                .filter((event) => {
                  const eventDate = new Date(event.date);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  eventDate.setHours(0, 0, 0, 0);
                  return eventDate >= today;
                })
                .map((event) => {
                  const eventDate = new Date(event.date);
                  return (
                    <motion.div
                      variants={item}
                      key={event.id}
                      className={`${getEventColor(
                        event.category
                      )} rounded-lg p-3 cursor-pointer hover:translate-x-1 hover:shadow-lg hover:shadow-indigo-900/20 transition-all`}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="flex items-center text-white mb-1 gap-2">
                        <div className="text-3xl font-bold text-white/90">
                          {eventDate.getDate()}
                        </div>
                        <div className="text-md font-medium">{event.title}</div>
                      </div>
                      <div className="text-sm text-white/80 ml-1">
                        {formatDate(eventDate, "short")}
                        {event.time && ` • ${event.time}`}
                      </div>
                    </motion.div>
                  );
                })}
            </motion.div>
          ) : (
            <motion.div 
              variants={item}
              className="bg-slate-800/50 rounded-lg border border-indigo-900/20 p-6 text-center"
            >
              <p className="text-indigo-300 opacity-70">No upcoming events this month</p>
              <p className="text-xs text-indigo-300/60 mt-1">Click on a date to add a new event</p>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-indigo-900/30 bg-slate-900/90 backdrop-blur-sm">
        <NavUser user={data.user} />
      </div>
    </div>
  );
};

export default EventSidebar;