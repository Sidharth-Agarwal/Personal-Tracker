import { useState, useEffect } from 'react';
import { Calendar, RefreshCw, Check, X, AlertCircle } from 'lucide-react';
import Button from '../common/Button';
import {
  initGoogleCalendar,
  signInToGoogle,
  signOutFromGoogle,
  isSignedInToGoogle,
  GoogleCalendarService,
} from '../../services/googleCalendar';
import { useTask } from '../../context/TaskContext';

const GoogleCalendarSync = () => {
  const { allTasks, createTask, editTask } = useTask();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [syncStatus, setSyncStatus] = useState(null);

  useEffect(() => {
    checkSignInStatus();
  }, []);

  const checkSignInStatus = () => {
    const signedIn = isSignedInToGoogle();
    setIsSignedIn(signedIn);
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if Google API keys are configured
      if (!import.meta.env.VITE_GOOGLE_API_KEY || !import.meta.env.VITE_GOOGLE_CLIENT_ID) {
        throw new Error('Google Calendar API not configured. Please set up your Google API credentials in .env file.');
      }

      await initGoogleCalendar();
      await signInToGoogle();
      setIsSignedIn(true);

      // Load calendars
      await loadCalendars();
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err.message || 'Failed to sign in to Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutFromGoogle();
      setIsSignedIn(false);
      setCalendars([]);
      setSelectedCalendar(null);
    } catch (err) {
      setError('Failed to sign out');
    }
  };

  const loadCalendars = async () => {
    try {
      const user = gapi.auth2.getAuthInstance().currentUser.get();
      const authResponse = user.getAuthResponse(true);
      const service = new GoogleCalendarService(authResponse.access_token);

      const response = await service.getCalendars();
      setCalendars(response.items || []);

      // Auto-select primary calendar
      const primary = response.items?.find((cal) => cal.primary);
      if (primary) {
        setSelectedCalendar(primary.id);
      }
    } catch (err) {
      console.error('Failed to load calendars:', err);
      setError('Failed to load calendars');
    }
  };

  const syncTasksToCalendar = async () => {
    if (!selectedCalendar) {
      setError('Please select a calendar');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSyncStatus({ synced: 0, failed: 0 });

    try {
      const user = gapi.auth2.getAuthInstance().currentUser.get();
      const authResponse = user.getAuthResponse(true);
      const service = new GoogleCalendarService(authResponse.access_token);

      let synced = 0;
      let failed = 0;

      for (const task of allTasks) {
        if (task.completed || !task.dueDate) continue; // Skip completed and undated tasks

        try {
          const event = service.taskToCalendarEvent(task);

          if (task.calendarEventId) {
            // Update existing event
            await service.updateEvent(selectedCalendar, task.calendarEventId, event);
          } else {
            // Create new event
            const createdEvent = await service.createEvent(selectedCalendar, event);
            await editTask(task.id, { calendarEventId: createdEvent.id });
          }

          synced++;
        } catch (err) {
          console.error('Failed to sync task:', task.id, err);
          failed++;
        }
      }

      setSyncStatus({ synced, failed });
    } catch (err) {
      console.error('Sync error:', err);
      setError('Failed to sync tasks');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="bg-card-bg border border-border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <Calendar size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-text-primary">Google Calendar Sync</h3>
        </div>

        <p className="text-text-secondary text-sm mb-4">
          Connect your Google Calendar to sync tasks as calendar events automatically.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} className="text-red-500" />
            <span className="text-sm text-red-500">{error}</span>
          </div>
        )}

        <Button
          variant="primary"
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full"
        >
          <Calendar size={16} />
          {isLoading ? 'Connecting...' : 'Connect Google Calendar'}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Calendar size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-text-primary">Google Calendar Sync</h3>
          <Check size={16} className="text-green-500" />
        </div>
        <Button variant="secondary" onClick={handleSignOut} className="text-sm">
          Disconnect
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg flex items-center gap-2">
          <AlertCircle size={16} className="text-red-500" />
          <span className="text-sm text-red-500">{error}</span>
        </div>
      )}

      {syncStatus && (
        <div className="mb-4 p-3 bg-green-500 bg-opacity-10 border border-green-500 rounded-lg">
          <p className="text-sm text-green-500">
            Synced {syncStatus.synced} tasks successfully
            {syncStatus.failed > 0 && `, ${syncStatus.failed} failed`}
          </p>
        </div>
      )}

      {calendars.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Select Calendar
          </label>
          <select
            value={selectedCalendar || ''}
            onChange={(e) => setSelectedCalendar(e.target.value)}
            className="w-full px-3 py-2 bg-bg-secondary border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {calendars.map((calendar) => (
              <option key={calendar.id} value={calendar.id}>
                {calendar.summary} {calendar.primary && '(Primary)'}
              </option>
            ))}
          </select>
        </div>
      )}

      <Button
        variant="primary"
        onClick={syncTasksToCalendar}
        disabled={isLoading || !selectedCalendar}
        className="w-full"
      >
        <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
        {isLoading ? 'Syncing...' : 'Sync Tasks to Calendar'}
      </Button>

      <p className="text-xs text-text-tertiary mt-3">
        This will create/update calendar events for all active tasks with due dates.
      </p>
    </div>
  );
};

export default GoogleCalendarSync;
