// services/CalendarService.ts
const API = process.env.NEXT_PUBLIC_CALENDAR_API;

export interface EventData {
  id?: number;
  title: string;
  description?: string;
  eventDate: string; // Format: 'YYYY-MM-DD'
  time?: string;
  category?: string;
}

export async function fetchEvents() {
  try {
    if (!API) {
      throw new Error('API endpoint is not defined');
    }
    const res = await fetch(API);
    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function createEvent(eventData: Omit<EventData, 'id'>) {
  try {
    const res = await fetch(API as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!res.ok) {
      throw new Error(`Failed to create event: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

export async function updateEvent(id: number, eventData: EventData) {
  try {
    const res = await fetch(`${API}/id/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!res.ok) {
      throw new Error(`Failed to update event: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}

export async function deleteEvent(id: number) {
  try {
    const res = await fetch(`${API}/id/${id}`, {
      method: 'DELETE',
    });
    
    if (!res.ok) {
      throw new Error(`Failed to delete event: ${res.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}

export async function getEventById(id: number) {
  try {
    const res = await fetch(`${API}/id/${id}`);
    
    if (!res.ok) {
      throw new Error(`Failed to get event: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error getting event:', error);
    throw error;
  }
}