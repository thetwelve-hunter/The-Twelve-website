import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Configure Google OAuth provider with Calendar scopes
export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar');
provider.addScope('https://www.googleapis.com/auth/calendar.events');

// In-memory token cache
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize Auth Listener and trigger callbacks
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else {
        // Since Firebase SDK does not persist the provider's OAuth access token across sessions automatically,
        // we prompt the user to sign-in again or keep track of the token in-memory during active sessions.
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Trigger Google Sign-In pop-up
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Auth Provider.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Retrieve currently cached access token
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

// Sign-out and discard token cache
export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// Type definition for a Google Calendar event
export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
  htmlLink?: string;
}

// Google Calendar API Helper: Fetch upcoming 5 events from user's primary calendar
export const fetchUpcomingCalendarEvents = async (token: string): Promise<GoogleCalendarEvent[]> => {
  try {
    // Current time in ISO 8601 format
    const now = new Date().toISOString();
    
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${now}&maxResults=5&orderBy=startTime&singleEvents=true`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('UNAUTHORIZED_TOKEN');
      }
      throw new Error(`Google Calendar API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('fetchUpcomingCalendarEvents error:', error);
    throw error;
  }
};

// Google Calendar ID shared by user
export const RESIDENCY_CALENDAR_ID = 'c_48ee11ad4a49bb78e5dcfb6c8845db566fd8e8b4d4cb1bb99060c1d8c97986b5@group.calendar.google.com';

// Fetch events from the specfied residency calendar
export const fetchResidencyCalendarEvents = async (token: string): Promise<GoogleCalendarEvent[]> => {
  try {
    const calendarId = encodeURIComponent(RESIDENCY_CALENDAR_ID);
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?maxResults=50&orderBy=startTime&singleEvents=true`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('UNAUTHORIZED_TOKEN');
      }
      throw new Error(`Google Calendar API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('fetchResidencyCalendarEvents error:', error);
    throw error;
  }
};

// Google Calendar API Helper: Create a residency event on user's calendar
export const addEventToGoogleCalendar = async (
  token: string,
  event: {
    title: string;
    description: string;
    location: string;
    date: string; // YYYY-MM-DD
    time: string; // e.g., "06:00 AM - 12:00 PM"
  }
): Promise<GoogleCalendarEvent> => {
  try {
    // Helper to parse time strings like "06:00 AM" into standard HH:MM
    const parseTime = (timeStr: string) => {
      const parts = timeStr.trim().split(' ');
      const timePart = parts[0];
      const ampm = parts[1];
      const [hoursStr, minutesStr] = timePart.split(':');
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      
      if (ampm === 'PM' && hours !== 12) {
        hours += 12;
      } else if (ampm === 'AM' && hours === 12) {
        hours = 0;
      }
      
      return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:00`;
    };

    // Extract start/end times
    let startStr = '08:00:00';
    let endStr = '17:00:00';
    
    if (event.time && event.time.includes('-')) {
      const timeSplit = event.time.split('-');
      if (timeSplit.length === 2) {
        startStr = parseTime(timeSplit[0]);
        endStr = parseTime(timeSplit[1]);
      }
    }

    // construct ISO 8601 strings
    // South Africa Standard Time (SAST) is UTC+2
    const startDateTime = `${event.date}T${startStr}`;
    const endDateTime = `${event.date}T${endStr}`;

    const body = {
      summary: event.title,
      description: `${event.description}\n\nSynced from The Twelve Discipleship Program South Africa.`,
      location: event.location,
      start: {
        dateTime: startDateTime,
        timeZone: 'Africa/Johannesburg'
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Africa/Johannesburg'
      },
      reminders: {
        useDefault: true
      }
    };

    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('UNAUTHORIZED_TOKEN');
      }
      throw new Error(`Failed to create Google Calendar event: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('addEventToGoogleCalendar error:', error);
    throw error;
  }
};
