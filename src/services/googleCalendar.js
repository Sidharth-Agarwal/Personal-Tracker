// Google Calendar Integration
// Note: You'll need to set up Google OAuth credentials in Firebase Console

const CALENDAR_API_BASE = 'https://www.googleapis.com/calendar/v3';

export class GoogleCalendarService {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  async getCalendars() {
    const response = await fetch(`${CALENDAR_API_BASE}/users/me/calendarList`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch calendars');
    }

    return response.json();
  }

  async createEvent(calendarId, event) {
    const response = await fetch(`${CALENDAR_API_BASE}/calendars/${calendarId}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error('Failed to create event');
    }

    return response.json();
  }

  async updateEvent(calendarId, eventId, event) {
    const response = await fetch(`${CALENDAR_API_BASE}/calendars/${calendarId}/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error('Failed to update event');
    }

    return response.json();
  }

  async deleteEvent(calendarId, eventId) {
    const response = await fetch(`${CALENDAR_API_BASE}/calendars/${calendarId}/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete event');
    }

    return true;
  }

  async getEvents(calendarId, timeMin, timeMax) {
    const params = new URLSearchParams({
      timeMin: timeMin || new Date().toISOString(),
      timeMax: timeMax || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime',
    });

    const response = await fetch(`${CALENDAR_API_BASE}/calendars/${calendarId}/events?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    return response.json();
  }

  // Helper function to convert task to Google Calendar event
  taskToCalendarEvent(task) {
    const event = {
      summary: task.title,
      description: task.description || '',
      start: {},
      end: {},
    };

    if (task.dueDate) {
      // All-day event
      event.start.date = task.dueDate;
      event.end.date = task.dueDate;
    } else {
      // Default to today
      const today = new Date().toISOString().split('T')[0];
      event.start.date = today;
      event.end.date = today;
    }

    // Add task metadata as extended properties
    event.extendedProperties = {
      private: {
        taskId: task.id,
        priority: task.priority || '',
        tags: task.tags ? task.tags.join(',') : '',
      },
    };

    return event;
  }

  // Helper function to convert Google Calendar event to task
  calendarEventToTask(event) {
    return {
      title: event.summary || 'Untitled',
      description: event.description || '',
      dueDate: event.start?.date || event.start?.dateTime?.split('T')[0] || '',
      calendarEventId: event.id,
      priority: event.extendedProperties?.private?.priority || 'medium',
      tags: event.extendedProperties?.private?.tags ? event.extendedProperties.private.tags.split(',') : [],
    };
  }
}

// Initialize Google Calendar API
export async function initGoogleCalendar() {
  return new Promise((resolve, reject) => {
    if (typeof gapi === 'undefined') {
      reject(new Error('Google API not loaded'));
      return;
    }

    gapi.load('client:auth2', async () => {
      try {
        await gapi.client.init({
          apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
          clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: 'https://www.googleapis.com/auth/calendar',
        });
        resolve(gapi);
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Sign in to Google
export async function signInToGoogle() {
  if (typeof gapi === 'undefined' || !gapi.auth2) {
    throw new Error('Google API not initialized');
  }

  const auth2 = gapi.auth2.getAuthInstance();
  return auth2.signIn();
}

// Sign out from Google
export async function signOutFromGoogle() {
  if (typeof gapi === 'undefined' || !gapi.auth2) {
    throw new Error('Google API not initialized');
  }

  const auth2 = gapi.auth2.getAuthInstance();
  return auth2.signOut();
}

// Get current Google user
export function getCurrentGoogleUser() {
  if (typeof gapi === 'undefined' || !gapi.auth2) {
    return null;
  }

  const auth2 = gapi.auth2.getAuthInstance();
  return auth2.currentUser.get();
}

// Check if user is signed in to Google
export function isSignedInToGoogle() {
  if (typeof gapi === 'undefined' || !gapi.auth2) {
    return false;
  }

  const auth2 = gapi.auth2.getAuthInstance();
  return auth2.isSignedIn.get();
}
