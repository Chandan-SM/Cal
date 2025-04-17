// components/EventModal.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event } from './CalendarGrid';
import { formatDate } from '../lib/calendarUtils';
import { X } from 'lucide-react';

interface EventModalProps {
  date: Date;
  event: Event | null;
  onSave: (eventData: Omit<Event, 'id' | 'date'>) => void;
  onDelete: (eventId: number) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modal = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", damping: 25, stiffness: 500 }
  },
  exit: { y: 50, opacity: 0 }
};

const EventModal: React.FC<EventModalProps> = ({ 
  date, 
  event, 
  onSave, 
  onDelete, 
  onClose,
  isLoading = false
}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('other');
  const [time, setTime] = useState<string>('12:00');
  
  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || '');
      setCategory(event.category || 'other');
      setTime(event.time || '12:00');
    } else {
      // Reset form for new events
      setTitle('');
      setDescription('');
      setCategory('other');
      setTime('12:00');
    }
  }, [event]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      category,
      time
    });
  };

  const getCategoryGradient = (category: string): string => {
    const gradients: Record<string, string> = {
      work: 'from-indigo-600 to-violet-800',
      personal: 'from-teal-500 to-emerald-700',
      important: 'from-rose-500 to-pink-700',
      other: 'from-amber-500 to-orange-700'
    };
    
    return gradients[category] || gradients.other;
  };

  const getCategoryAccent = (category: string): string => {
    const colors: Record<string, string> = {
      work: 'ring-indigo-500',
      personal: 'ring-teal-500',
      important: 'ring-rose-500',
      other: 'ring-amber-500'
    };
    
    return colors[category] || colors.other;
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="fixed inset-0 bg-slate-950/80 flex items-center justify-center z-50 backdrop-blur-lg"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div 
          className="bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-800 shadow-violet-500/10"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={`bg-gradient-to-r ${getCategoryGradient(category)} p-6 relative`}>
            <h2 className="text-2xl font-bold mb-2 text-white">
              {event ? 'Edit Event' : 'New Event'}
            </h2>
            <p className="text-white/80">{formatDate(date, 'full')}</p>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 p-1 rounded-full bg-white/10 text-white/90"
              onClick={onClose}
            >
              <X size={18} />
            </motion.button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <motion.div 
              className="mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block mb-2 text-sm font-medium text-violet-300">Event Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 ${getCategoryAccent(category)} transition-all`}
                required
                placeholder="Add a title"
                disabled={isLoading}
              />
            </motion.div>
            
            <motion.div 
              className="mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block mb-2 text-sm font-medium text-violet-300">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 ${getCategoryAccent(category)} transition-all`}
                disabled={isLoading}
              />
            </motion.div>
            
            <motion.div 
              className="mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block mb-2 text-sm font-medium text-violet-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 ${getCategoryAccent(category)} transition-all`}
                disabled={isLoading}
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="important">Important</option>
                <option value="other">Other</option>
              </select>
            </motion.div>
            
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block mb-2 text-sm font-medium text-violet-300">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 ${getCategoryAccent(category)} transition-all`}
                rows={4}
                placeholder="Add details about this event"
                disabled={isLoading}
              />
            </motion.div>
            
            <motion.div 
              className="flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div>
                {event && (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(244, 63, 94, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => onDelete(event.id)}
                    className="bg-gradient-to-r from-rose-600 to-pink-700 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-rose-700/20"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Deleting...' : 'Delete Event'}
                  </motion.button>
                )}
              </div>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed border border-slate-700"
                  disabled={isLoading}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-violet-700/20"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Event'}
                </motion.button>
              </div>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventModal;