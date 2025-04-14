// components/EventModal.tsx
import React, { useState, useEffect } from 'react';
import { Event } from './CalendarGrid';
import { formatDate } from '../lib/calendarUtils';

interface EventModalProps {
  date: Date;
  event: Event | null;
  onSave: (eventData: Omit<Event, 'id' | 'date'>) => void;
  onDelete: (eventId: number) => void;
  onClose: () => void;
  isLoading?: boolean;
}

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
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-2 text-white">
          {event ? 'Edit Event' : 'New Event'}
        </h2>
        <p className="mb-6 text-gray-400">{formatDate(date, 'full')}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              placeholder="Event title"
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-300">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="important">Important</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              placeholder="Event description"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              {event && (
                <button
                  type="button"
                  onClick={() => onDelete(event.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-red-800 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? 'Deleting...' : 'Delete'}
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-lg transition-colors disabled:bg-gray-800 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-indigo-800 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;