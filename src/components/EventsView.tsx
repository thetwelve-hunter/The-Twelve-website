/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// Loaded directly from public directory at runtime

import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Radio, 
  CornerDownRight, 
  Check, 
  X, 
  FileText, 
  Maximize2, 
  Mic2, 
  UserPlus, 
  Sparkles, 
  ArrowRight,
  Sparkle,
  LogOut,
  AlertCircle,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

import { 
  initAuth, 
  googleSignIn, 
  logout, 
  fetchUpcomingCalendarEvents, 
  fetchResidencyCalendarEvents,
  RESIDENCY_CALENDAR_ID,
  addEventToGoogleCalendar, 
  GoogleCalendarEvent 
} from '../lib/firebase';

// Interfaces
interface PastEvent {
  id: string;
  title: string;
  date: string;
  category: string;
  location: string;
  description: string;
  mediaType: 'video' | 'photo-gallery' | 'audio-wave';
  mediaUrl?: string;
  mediaUrls?: string[];
  images?: string[];
  duration?: string;
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string; // ISO date YYYY-MM-DD
  time: string;
  location: string;
  category: string;
  spotsLeft: number;
  isPrivate: boolean;
  description: string;
}

// Data Sets
const PAST_EVENTS: PastEvent[] = [
  {
    id: 'past-embo-teaching-2026',
    title: 'Inhlangano School Weekly Ministry',
    date: 'Ongoing Weekly',
    category: 'Community Outreach',
    location: 'Inhlangano Primary School, Embo, Durban, SA',
    description: 'In partnership with Inhlangano Primary School in Embo, The Twelve team conducts vital classroom ministries twice a week. We teach Grade 5 learners core academic foundation modules in Mathematics and English, integrated with motivational life skills and character discipleship. Supporting these joyful students is a highlight of our weekly mission.',
    mediaType: 'video',
    mediaUrl: '/assets/Embo.mp4',
    duration: '00:24'
  },
  {
    id: 'past-cityhill-kids-2026',
    title: 'Cityhill Kids Monthly Ministry',
    date: 'Ongoing Monthly',
    category: 'Kids Ministry',
    location: 'Cityhill Church, Hillcrest, Durban, South Africa',
    description: 'The Twelve routinely serves with the Cityhill Kids ministry at Cityhill Church in Hillcrest every month. It is an immense joy to partner with the children’s ministry team to teach, mentor, and build up the next generation of believers in a vibrant, faith-filled environment.',
    mediaType: 'video',
    mediaUrl: '/assets/CityHill.mp4',
    duration: '00:06'
  },
  {
    id: 'past-trust-building-2026',
    title: 'Trust Building Morning',
    date: 'May 21, 2026',
    category: 'Team Building',
    location: 'Durban Beach Front, South Africa',
    description: 'The Twelve spent an unforgettable morning doing focus and team building activities on the Durban beachfront. They engaged in shoreline trust-runs, a custom sandcastle challenge to sculpt fortress models with buckets, and completed the session with a joyous group paddle out into the ocean waves.',
    mediaType: 'video',
    mediaUrl: '/assets/Trust_Building.mp4',
    duration: '00:26'
  },
  {
    id: 'past-ncmi-2026',
    title: 'NCMI National Elders 2026',
    date: 'May 06, 2026',
    category: 'National Conference',
    location: 'Durban Central Hall, South Africa',
    description: 'The Twelve actively participated in the NCMI National Elders 2026 conference. Our team members coordinated the registry/resource decks, served meals (including Day 3 tarts & fruits), and assisted the physical floor plan set ups.',
    mediaType: 'video',
    mediaUrl: '/assets/NCMI_National_Elders_2026.mp4',
    mediaUrls: ['/assets/NCMI_National_Elders_2026.mp4', '/assets/NCMI_National_Elders_2026_Day_2.mp4'],
    duration: '00:19 & 00:08'
  },
  {
    id: 'past-business-meeting-2026',
    title: 'Business Morning Meeting',
    date: 'April 22, 2026',
    category: 'Executive Service',
    location: 'Durban, South Africa',
    description: 'The Twelve served breakfast at the high-profile Business Morning Meeting hosting Andrew Kirby, CEO of Toyota in South Africa. Our team was privileged to coordinate dining hospitality and engage with commercial and civic executives.',
    mediaType: 'video',
    mediaUrl: '/assets/Business_Morning_Meeting.mp4',
    duration: '00:10'
  },
  {
    id: 'past-victoria-falls-2026',
    title: 'Victoria Falls Mission Reflection',
    date: 'April 12, 2026',
    category: 'Global Missions',
    location: 'Victoria Falls, Livingstone, Zambia',
    description: 'Following their intensive outreach operations, The Twelve visited the majestic Victoria Falls. Witnessing the awe-inspiring cascade of the world’s largest waterfall, the team was thoroughly drenched by the legendary canyon mist—a memorable, joy-filled experience of team fellowship and reflection on the grandeur of God’s creation.',
    mediaType: 'photo-gallery',
    images: ['/assets/images/Victoria_Falls.png', '/assets/images/Victoria.png']
  },
  {
    id: 'past-zambia-mission-2026',
    title: 'Missions Trip to Zambia',
    date: 'April 11, 2026',
    category: 'Global Missions',
    location: 'Zambia',
    description: 'Joining the Baptist mission church of Zambia for an outreach feeding program. Where we served food to a group of kids in the local village outside of Lusaka. Lusaka, Zambia. What a privilege it was to serve these little kids and see them smile. A real eye-opener and a time that really just crested a heart of gratitude in ourselves as a team',
    mediaType: 'video',
    mediaUrls: ['/assets/Zambia_Mission_Trip_Part_1.mp4', '/assets/Zambia_Mission_Trip_Part_2.mp4'],
    images: ['/assets/images/Zambia_Trip.png'],
    duration: '00:11 & 00:09'
  },
  {
    id: 'past-botswana-mission-2026',
    title: 'Missions Trip to Botswana',
    date: 'April 02, 2026',
    category: 'Global Missions',
    location: 'Marapong Village, Botswana',
    description: 'We embarked on a powerful school ministry outreach and feeding program at a local village boarding school in Marapong. This journey marked the very first time our discipleship team stepped out in complete faith, letting us see firsthand how God truly secures provision and paths when we learn to depend entirely on Him.',
    mediaType: 'video',
    mediaUrl: '/assets/Botswana_Missions_Trip.mp4',
    images: ['/assets/images/school.png'],
    duration: '00:16'
  }
];

const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'up-1',
    title: 'Wilderness Prayer & Peak Ascent',
    date: '2026-07-18',
    time: '06:00 AM - 12:00 PM',
    location: 'Valley of 1000 Hills Reserve',
    category: 'Prayer & Hike',
    spotsLeft: 5,
    isPrivate: false,
    description: 'A physical and spiritual challenge. A strenuous 12-kilometer prayer crawl through the peak ranges, finishing with a communal study review of Ephesians chapter 6.'
  },
  {
    id: 'up-2',
    title: 'CityHill Youth Leadership Summit',
    date: '2026-08-15',
    time: '09:00 AM - 04:00 PM',
    location: 'CityHill Church Auditorium, Hillcrest',
    category: 'Leadership Seminar',
    spotsLeft: 14,
    isPrivate: false,
    description: 'A day of high-tempo seminars, strategic action mapping, and character growth frameworks led by program director David Hunter and guest mentors.'
  },
  {
    id: 'up-3',
    title: 'South Coast Outreach & Mission',
    date: '2026-08-28',
    time: '08:00 AM - 06:00 PM',
    location: 'Port Shepstone Youth Center',
    category: 'Civic Mission',
    spotsLeft: 8,
    isPrivate: false,
    description: 'Engaging secondary schools, coordinating food security baskets, and hosting recreational sports drills. Open to community volunteers willing to assist with transport.'
  },
  {
    id: 'up-4',
    title: 'Covenant Family Dedication Dinner',
    date: '2026-09-20',
    time: '06:00 PM - 09:30 PM',
    location: 'The Manor House, Kloof',
    category: 'Internal Feast',
    spotsLeft: 0,
    isPrivate: true,
    description: 'A private solemn banquet for team parents, direct guardians, and legal sponsors to review progress and write dedication letters.'
  },
  {
    id: 'up-5',
    title: 'Durban Regional Youth Outreach',
    date: '2026-10-16',
    time: '01:00 PM - 05:00 PM',
    location: 'Main Auditorium, Durban Central',
    category: 'Civic Mission',
    spotsLeft: 12,
    isPrivate: false,
    description: 'Our annual youth empowerment rally focusing on peer-led leadership models, creative workshops, and music. Open to public visitors.'
  },
  {
    id: 'up-6',
    title: 'Spring Solitary Praise & Meditation',
    date: '2026-11-13',
    time: '05:30 PM - 08:30 PM',
    location: 'Symphony Hall, Durban',
    category: 'Musical Worship',
    spotsLeft: 20,
    isPrivate: false,
    description: 'An instrumental or multi-choral musical evening gathering under candles to worship and meditate on public service themes.'
  },
  {
    id: 'up-7',
    title: 'Team Graduation & Covenant Feast',
    date: '2026-12-18',
    time: '05:00 PM - 10:00 PM',
    location: 'Legacy Estate, Pietermaritzburg',
    category: 'Graduation',
    spotsLeft: 15,
    isPrivate: false,
    description: 'The formal physical graduation ceremony and covenant declaration dinner for the 2026 discipleship team.'
  }
];

// Months list for the Creative Calendar (June to December 2026)
const CALENDAR_MONTHS = [
  {
    name: 'June 2026',
    year: 2026,
    monthIndex: 5, // 0-indexed count
    daysInMonth: 30,
    startDayOfWeek: 1, // Monday
  },
  {
    name: 'July 2026',
    year: 2026,
    monthIndex: 6, // 0-indexed count
    daysInMonth: 31,
    startDayOfWeek: 3, // Wednesday
  },
  {
    name: 'August 2026',
    year: 2026,
    monthIndex: 7,
    daysInMonth: 31,
    startDayOfWeek: 6, // Saturday
  },
  {
    name: 'September 2026',
    year: 2026,
    monthIndex: 8,
    daysInMonth: 30,
    startDayOfWeek: 2, // Tuesday
  },
  {
    name: 'October 2026',
    year: 2026,
    monthIndex: 9,
    daysInMonth: 31,
    startDayOfWeek: 4, // Thursday
  },
  {
    name: 'November 2026',
    year: 2026,
    monthIndex: 10,
    daysInMonth: 30,
    startDayOfWeek: 0, // Sunday
  },
  {
    name: 'December 2026',
    year: 2026,
    monthIndex: 11,
    daysInMonth: 31,
    startDayOfWeek: 2, // Tuesday
  }
];

// Helper to generate a direct, foolproof Google Calendar link for any event to avoid iframe OAuth popups blocking
const getGoogleCalendarTemplateUrl = (event: any) => {
  if (!event) return '';
  const titleEncoded = encodeURIComponent(event.title || 'Official Event');
  
  // Prepare elegant description
  let cleanDesc = event.description || '';
  cleanDesc += `\n\nDate: ${event.date}\nTime: ${event.time || ''}\nLocation: ${event.location || ''}\n\nSynced from The Twelve Discipleship Program South Africa.`;
  const descEncoded = encodeURIComponent(cleanDesc);
  const locEncoded = encodeURIComponent(event.location || 'The Twelve Headquarters, Hillcrest');
  
  let datesStr = '';
  const cleanDate = (event.date || '').replace(/-/g, ''); // e.g., '20260622'
  
  // Check if it's all day
  const isAllDay = !event.time || event.time.toLowerCase() === 'all-day' || event.time.toLowerCase() === 'all day';
  
  if (isAllDay) {
    const dateParts = (event.date || '').split('-');
    if (dateParts.length === 3) {
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[2], 10);
      const d = new Date(year, month, day);
      d.setDate(d.getDate() + 1);
      const nextYear = d.getFullYear();
      const nextMonth = String(d.getMonth() + 1).padStart(2, '0');
      const nextDay = String(d.getDate()).padStart(2, '0');
      const nextDateStr = `${nextYear}${nextMonth}${nextDay}`;
      datesStr = `${cleanDate}/${nextDateStr}`;
    } else {
      datesStr = `${cleanDate}/${cleanDate}`;
    }
  } else {
    const parseTimeLocal = (timeStr: string) => {
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
      
      const padHour = hours < 10 ? '0' + hours : String(hours);
      const padMin = minutes < 10 ? '0' + minutes : String(minutes);
      return `${padHour}${padMin}00`;
    };
    
    let startStr = '080000';
    let endStr = '170000';
    
    if (event.time && event.time.includes('-')) {
      const timeSplit = event.time.split('-');
      if (timeSplit.length === 2) {
        try {
          startStr = parseTimeLocal(timeSplit[0]);
          endStr = parseTimeLocal(timeSplit[1]);
        } catch (e) {
          console.error("Error parsing times during link generation:", e);
        }
      }
    } else if (event.time) {
      try {
        startStr = parseTimeLocal(event.time);
        const hourNum = parseInt(startStr.slice(0, 2), 10);
        const endHour = (hourNum + 1) % 24;
        const padEndHour = endHour < 10 ? '0' + endHour : String(endHour);
        endStr = `${padEndHour}${startStr.slice(2)}`;
      } catch (e) {
        console.error("Error parsing single time:", e);
      }
    }
    
    datesStr = `${cleanDate}T${startStr}/${cleanDate}T${endStr}`;
  }
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titleEncoded}&dates=${datesStr}&details=${descEncoded}&location=${locEncoded}&ctz=Africa/Johannesburg`;
};

export default function EventsView() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [calendarViewMode, setCalendarViewMode] = useState<'grid' | 'google-live'>('google-live');

  // Calendar States
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0); // Default June 2026
  const [selectedDayNum, setSelectedDayNum] = useState<number | null>(23); // Default to tomorrow June 23 (has fun morning)
  
  // Dynamic compiled events from Google Calendar
  const [upcomingEventsList, setUpcomingEventsList] = useState<UpcomingEvent[]>(UPCOMING_EVENTS);

  // Load live compiled calendar events from assets on mount
  React.useEffect(() => {
    fetch('/assets/residency-events.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setUpcomingEventsList(data);
          
          // Try to select the first upcoming event in June or the closest one to today (June 22, 2026)
          const validEvent = data.find(e => e.date >= '2026-06-22') || data[0];
          if (validEvent) {
            const dateObj = new Date(validEvent.date);
            const matchedMonthIdx = CALENDAR_MONTHS.findIndex(m => m.monthIndex === dateObj.getMonth());
            if (matchedMonthIdx !== -1) {
              setCurrentMonthIndex(matchedMonthIdx);
              setSelectedDayNum(dateObj.getDate());
            }
          }
        }
      })
      .catch(err => {
        console.error("Error loading compiled residency events, falling back:", err);
      });
  }, []);

  // Past Video Simulation States
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoMuted, setVideoMuted] = useState<boolean>(false);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const [videoTimer, setVideoTimer] = useState<any>(null);

  // Past Audio Wave Simulation States
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioTimer, setAudioTimer] = useState<any>(null);

  // Photo Gallery Active Indexes
  const [galleryIndex, setGalleryIndex] = useState<number>(0);

  // RSVP Modal States
  const [isRsvpOpen, setIsRsvpOpen] = useState<boolean>(false);
  const [rsvpEvent, setRsvpEvent] = useState<UpcomingEvent | null>(null);
  const [rsvpFormData, setRsvpFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'Observer',
    message: ''
  });
  const [rsvpSuccess, setRsvpSuccess] = useState<boolean>(false);

  // Google Auth & Calendar States
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [googleEvents, setGoogleEvents] = useState<GoogleCalendarEvent[]>([]);
  const [residencyEvents, setResidencyEvents] = useState<GoogleCalendarEvent[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<{ [eventId: string]: 'idle' | 'syncing' | 'success' | 'error' }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [isInIframe, setIsInIframe] = useState<boolean>(false);
  const [isSimpleSynced, setIsSimpleSynced] = useState<boolean>(() => {
    return localStorage.getItem('twelve_calendar_synced') === 'true';
  });

  React.useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  // Auth Listener
  React.useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setNeedsAuth(false);
        setAuthError(null);
        loadUpcomingGoogleEvents(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
        setGoogleEvents([]);
        setResidencyEvents([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = () => {
    setAuthError(null);
    try {
      // Persist that the user has successfully connected and integrated the calendar feed!
      localStorage.setItem('twelve_calendar_synced', 'true');
      setIsSimpleSynced(true);
    } catch (error: any) {
      console.error("Login failed:", error);
      let errMsg = error?.message || String(error);
      setAuthError(errMsg);
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setGoogleEvents([]);
      setResidencyEvents([]);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const loadUpcomingGoogleEvents = async (accessToken: string) => {
    setIsLoadingEvents(true);
    try {
      const [myEvents, officialEvents] = await Promise.all([
        fetchUpcomingCalendarEvents(accessToken).catch(err => {
          console.error("fetchUpcomingCalendarEvents failed:", err);
          return [];
        }),
        fetchResidencyCalendarEvents(accessToken).catch(err => {
          console.error("fetchResidencyCalendarEvents failed:", err);
          return [];
        })
      ]);
      setGoogleEvents(myEvents);
      setResidencyEvents(officialEvents);
    } catch (error: any) {
      console.error("Error fetching calendar events:", error);
      if (error.message === 'UNAUTHORIZED_TOKEN') {
        handleGoogleLogout();
      }
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const handleAddEventToCalendarUrl = (eventId: string) => {
    setSyncStatus(prev => ({ ...prev, [eventId]: 'success' }));
  };

  const handleAddEventToCalendar = async (event: any) => {
    let activeToken = token;
    if (!activeToken) {
      // If not logged in, trigger sign-in first
      try {
        const result = await googleSignIn();
        if (result) {
          setUser(result.user);
          setToken(result.accessToken);
          setNeedsAuth(false);
          activeToken = result.accessToken;
        } else {
          return;
        }
      } catch (err) {
        console.error("Auth sign in to sync failed:", err);
        return;
      }
    }

    if (!activeToken) return;

    // Direct confirmation as mandated
    const confirmed = window.confirm(
      `Add "${event.title}" on ${event.date} (${event.time}) to your Google Calendar?`
    );
    if (!confirmed) return;

    setSyncStatus(prev => ({ ...prev, [event.id]: 'syncing' }));
    try {
      await addEventToGoogleCalendar(activeToken, {
        title: event.title,
        description: event.description,
        location: event.location,
        date: event.date,
        time: event.time
      });
      setSyncStatus(prev => ({ ...prev, [event.id]: 'success' }));
      // Reload Google events list
      await loadUpcomingGoogleEvents(activeToken);
    } catch (error: any) {
      console.error("Error adding event to calendar:", error);
      if (error.message === 'UNAUTHORIZED_TOKEN') {
        handleGoogleLogout();
      }
      setSyncStatus(prev => ({ ...prev, [event.id]: 'error' }));
    }
  };

  // Toggle Video Simulation
  const handleToggleVideo = () => {
    if (videoPlaying) {
      if (videoTimer) clearInterval(videoTimer);
      setVideoPlaying(false);
    } else {
      setVideoPlaying(true);
      const interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setVideoPlaying(false);
            return 0;
          }
          return prev + 1.5;
        });
      }, 100);
      setVideoTimer(interval);
    }
  };

  // Reset Video Simulation
  const handleResetVideo = () => {
    if (videoTimer) clearInterval(videoTimer);
    setVideoPlaying(false);
    setVideoProgress(0);
  };

  // Toggle Audio Log
  const handleToggleAudio = () => {
    if (audioPlaying) {
      if (audioTimer) clearInterval(audioTimer);
      setAudioPlaying(false);
    } else {
      setAudioPlaying(true);
      const interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setAudioPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 120);
      setAudioTimer(interval);
    }
  };

  const handleResetAudio = () => {
    if (audioTimer) clearInterval(audioTimer);
    setAudioPlaying(false);
    setAudioProgress(0);
  };

  // Convert Google Calendar Events to local UpcomingEvent structure so they integrate seamlessly with our UI
  const parsedResidencyEvents = useMemo(() => {
    return residencyEvents.map((gev) => {
      // Extract date (YYYY-MM-DD)
      let dateStr = '';
      if (gev.start?.dateTime) {
        dateStr = gev.start.dateTime.split('T')[0];
      } else if (gev.start?.date) {
        dateStr = gev.start.date; // already YYYY-MM-DD
      }

      // Format time range beautifully, e.g., "09:00 AM - 04:30 PM"
      let timeStr = 'All Day';
      if (gev.start?.dateTime) {
        try {
          const startD = new Date(gev.start.dateTime);
          const endD = gev.end?.dateTime ? new Date(gev.end.dateTime) : null;
          
          const formatter = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });
          
          const startFormatted = formatter.format(startD);
          const endFormatted = endD ? formatter.format(endD) : '';
          
          timeStr = endFormatted ? `${startFormatted} - ${endFormatted}` : startFormatted;
        } catch (e) {
          console.error("Error formatting time for event:", gev.id, e);
        }
      }

      return {
        id: `google-${gev.id}`,
        title: gev.summary,
        date: dateStr,
        time: timeStr,
        location: gev.location || 'The Twelve Headquarters, Hillcrest',
        category: 'Shared Assembly',
        spotsLeft: 12,
        isPrivate: false,
        description: gev.description || 'This event is integrated directly from the official Google Calendar.'
      } as UpcomingEvent;
    });
  }, [residencyEvents]);

  const activeMonth = CALENDAR_MONTHS[currentMonthIndex];
  
  // Format dates matching the selected month & day, and auto-add Mon-Thu Team Private Events
  const getEventForDay = (day: number) => {
    const monthNum = activeMonth.monthIndex + 1;
    const formattedDate = `2026-${monthNum < 10 ? '0' + monthNum : monthNum}-${day < 10 ? '0' + day : day}`;
    
    // 1. Search in explicit upcoming events
    const explicitEvent = upcomingEventsList.find(e => e.date === formattedDate);
    if (explicitEvent) {
      return explicitEvent;
    }

    // 1b. Search in parsed residency Google Calendar events
    const googleEvent = parsedResidencyEvents.find(e => e.date === formattedDate);
    if (googleEvent) {
      return googleEvent;
    }

    // 2. Check if day falls on Monday to Thursday (1 to 4)
    const date = new Date(2026, activeMonth.monthIndex, day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 4) {
      let title = '';
      let category = 'Team Core';
      let description = '';
      let time = '08:00 AM - 05:00 PM';
      let location = 'The Twelve Headquarters, Hillcrest';

      if (dayOfWeek === 1) {
        title = 'Monday Scripture Intensive';
        category = 'Scripture Study';
        description = 'Weekly intensive exegetical study focusing on Covenant Theology and the Gospels. In the afternoon, members participate in personal progress reviews and action mapping.';
      } else if (dayOfWeek === 2) {
        title = 'Tuesday Civic Duty & Service';
        category = 'Community Outreach';
        description = 'The team deploys to local clinic centers and under-resourced public secondary schools in Durban to contribute physical labor and tutoring services.';
      } else if (dayOfWeek === 3) {
        title = 'Wednesday Character Development';
        category = 'Character Lab';
        description = 'A solemn day of deep character examinations guided by our Sacred-Ash framework, including individual mentoring and group feedback.';
      } else {
        title = 'Thursday Leadership Seminar';
        category = 'Civic Leadership';
        description = 'In-depth lectures on South Africa public policy, administrative design, and coordination strategies. Followed by a rigorous dinner discussion on community footprint.';
      }

      return {
        id: `dynamic-${formattedDate}`,
        title,
        date: formattedDate,
        time,
        location,
        category,
        spotsLeft: 0,
        isPrivate: true,
        description
      };
    }

    return undefined;
  };

  const handleDayClick = (day: number) => {
    setSelectedDayNum(day);
  };

  // Handle RSVP Opening
  const openRsvpModal = (event: UpcomingEvent) => {
    setRsvpEvent(event);
    setRsvpFormData({
      fullName: '',
      email: '',
      phone: '',
      role: 'Observer',
      message: ''
    });
    setRsvpSuccess(false);
    setIsRsvpOpen(true);
  };

  // Handle RSVP Submission
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpFormData.fullName.trim() && rsvpFormData.email.trim() && rsvpFormData.phone.trim()) {
      setRsvpSuccess(true);
    }
  };

  // Get active day event description if any
  const selectedEvent = selectedDayNum ? getEventForDay(selectedDayNum) : null;

  return (
    <div className="w-full flex flex-col space-y-10">
      
      {/* 1. Header Hero Panel */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-[#EADCC2]/60 pb-8">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="font-serif text-3xl md:text-5xl text-[#1C1917] tracking-tight font-extrabold uppercase col-span-full">
              CALENDAR
            </h1>
            <p className="text-sm text-[#1C1917]/70 leading-relaxed font-light font-sans">
              Explore the physical steps of our South Africa residency. Dwell in the recorded memories of past missions, toggle the creative interactive calendar, and register directly to attend public open events.
            </p>
          </div>

          {/* Google Calendar Hub */}
          <div className="lg:col-span-12 xl:col-span-5 bg-[#FAF7EF] border border-[#EADCC2] rounded-3xl p-5 md:p-6 shadow-xs space-y-4 lg:self-stretch flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[#9A7D3C]" />
                <span className="font-serif text-sm font-bold uppercase tracking-wider text-[#1C1917]">
                  Google Calendar Hub
                </span>
              </div>
              {!needsAuth && user && (
                <button
                  onClick={handleGoogleLogout}
                  className="text-xs text-red-700 hover:text-red-950 flex items-center gap-1 font-sans font-bold uppercase tracking-wider border border-red-200 hover:border-red-400 bg-red-50 py-1 px-2.5 rounded-xl cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Disconnect</span>
                </button>
              )}
            </div>

            {isSimpleSynced ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                    <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-serif text-xs font-bold text-emerald-950 uppercase tracking-wide">
                      Twelve Calendar Connected!
                    </span>
                    <p className="text-[11px] text-emerald-800 leading-relaxed font-sans">
                      The Twelve Google Calendar integration has been triggered. All official program dates and residency assemblies will display in your Google Calendar feed.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href="https://calendar.google.com/calendar/u/0?cid=Y180OGVlMTFhZDRhNDliYjc4ZTVkY2ZiNmM4ODQ1ZGI1NjZmZDhlOGI0ZDRjYjFiYjk5MDYwYzFkOGM5Nzk4NmI1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#9A7D3C] hover:bg-[#7D642D] text-white rounded-xl py-2 px-3 text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs text-center"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Open My Calendar Feed</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-80" />
                  </a>

                  <button
                    onClick={() => {
                      localStorage.removeItem('twelve_calendar_synced');
                      setIsSimpleSynced(false);
                    }}
                    className="text-[10px] text-zinc-500 hover:text-zinc-800 font-sans border border-[#EADCC2]/60 py-2 px-3 rounded-xl hover:bg-[#FAF7EF] transition-colors cursor-pointer"
                  >
                    Reset link
                  </button>
                </div>
              </div>
            ) : needsAuth ? (
              <div className="space-y-4 font-sans">
                <p className="text-xs text-[#1C1917]/60 leading-relaxed font-sans">
                  Connect "The Twelve" official calendar with your Google Account to view and synchronize all assemblies and programs.
                </p>

                {/* Google Sign In Material Button */}
                <a 
                  href="https://calendar.google.com/calendar/u/0?cid=Y180OGVlMTFhZDRhNDliYjc4ZTVkY2ZiNmM4ODQ1ZGI1NjZmZDhlOGI0ZDRjYjFiYjk5MDYwYzFkOGM5Nzk4NmI1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-[#9A7D3C] hover:bg-[#7D642D] border border-[#9A7D3C] rounded-2xl py-2.5 px-4 shadow-xs transition-all cursor-pointer text-xs font-bold text-white hover:shadow-md text-center"
                >
                  <svg className="w-5 h-5 flex-shrink-0" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                  <span>Connect to Google Calendar</span>
                </a>

                {/* Helpful prompt when inside an iframe */}
                {isInIframe && (
                  <div className="p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-2xl flex items-start gap-2 text-[11px] text-amber-800 leading-normal">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold">Iframe Preview Restriction Alert</p>
                      <p>
                        Web browsers restrict cross-domain popups and authentication inside preview frames. Please launch this application in a direct tab to connect your Google Calendar:
                      </p>
                      <button
                        onClick={() => window.open(window.location.href, '_blank')}
                        className="inline-flex items-center gap-1 font-bold text-[#9A7D3C] hover:text-[#1C1917] transition-colors underline cursor-pointer mt-1"
                      >
                        <span>Open App in New Tab</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Highly descriptive active authentication errors */}
                {authError && (
                  <div className="p-3.5 bg-red-50/70 border border-red-200/60 rounded-2xl flex items-start gap-2 text-[11px] text-red-800 leading-normal">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold">Google Auth Blocked</p>
                      <p>{authError}</p>
                      <button
                        onClick={() => window.open(window.location.href, '_blank')}
                        className="inline-flex items-center gap-1 font-bold text-red-950 hover:underline transition-colors cursor-pointer mt-1"
                      >
                        <span>Try in a New Tab</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 bg-white/70 border border-[#EADCC2]/40 rounded-2xl p-3">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User avatar"}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full border border-[#9A7D3C]/30"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#9A7D3C]/20 flex items-center justify-center font-serif font-black text-[#9A7D3C]">
                      {user?.displayName ? user.displayName.charAt(0) : "U"}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-serif text-xs font-bold text-[#1C1917]">
                      {user?.displayName || "Connected Member"}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-sans">
                      {user?.email}
                    </span>
                  </div>
                </div>

                {/* Listing of user's current Google Calendar Events */}
                <div className="space-y-2">
                  <span className="text-[10px] text-[#9A7D3C] font-extrabold uppercase tracking-widest block font-sans">
                    My Upcoming Calendar Plan
                  </span>
                  
                  {isLoadingEvents ? (
                    <div className="py-4 text-center">
                      <div className="w-5 h-5 border-2 border-[#9A7D3C] border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                  ) : googleEvents.length === 0 ? (
                    <div className="text-center py-4 bg-white/50 border border-dashed border-[#EADCC2]/50 rounded-2xl">
                      <p className="text-[10px] text-zinc-400 font-sans">
                        No upcoming calendar events detected.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                      {googleEvents.map((gev) => (
                        <a
                          key={gev.id}
                          href={gev.htmlLink}
                          target="_blank"
                          rel="noreferrer"
                          className="block bg-white hover:bg-[#FAF7EF] border border-[#EADCC2]/30 hover:border-[#9A7D3C]/30 rounded-xl p-2.5 transition-all text-left"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-serif font-bold text-[#1C1917] truncate max-w-[200px] block">
                              {gev.summary}
                            </span>
                            <span className="text-[9px] font-sans text-[#9A7D3C] block shrink-0 font-semibold uppercase">
                              {gev.start?.dateTime 
                                ? new Date(gev.start.dateTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                                : gev.start?.date 
                                ? new Date(gev.start.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                                : ''}
                            </span>
                          </div>
                          {gev.location && (
                            <div className="flex items-center gap-1 mt-0.5 text-[10px] text-zinc-500 font-sans truncate">
                              <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                              <span className="truncate">{gev.location}</span>
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#EADCC2]/40">
                    <a
                      href="https://calendar.google.com/calendar/u/0?cid=Y180OGVlMTFhZDRhNDliYjc4ZTVkY2ZiNmM4ODQ1ZGI1NjZmZDhlOGI0ZDRjYjFiYjk5MDYwYzFkOGM5Nzk4NmI1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#FAF7EF] hover:bg-[#EADCC2]/20 border border-[#EADCC2]/50 rounded-xl py-2 px-3 text-[10px] font-sans font-bold text-[#9A7D3C] hover:text-[#7D642D] transition-all cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#9A7D3C]" />
                      <span>Add / Sync The Twelve Calendar</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Container containing BOTH sections (Ordered logically via CSS Flexbox) */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col space-y-20 pb-16">
        
        {/* upcoming/calendar block (Visually ordered after past events) */}
        <div className="order-2 w-full space-y-8">
          <div className="border-b border-[#EADCC2]/60 pb-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-[#9A7D3C] font-extrabold uppercase tracking-widest block font-sans">
                UPCOMING ASSEMBLIES & SCHEDULING
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-black text-[#1C1917] uppercase">
                Live Official Calendar
              </h2>
            </div>
          </div>

          {/* WhatsApp RSVP / Contact Invitation Card */}
          <div className="bg-[#FAF7EF] border border-[#EADCC2] rounded-3xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-mono font-black text-[#9A7D3C] uppercase tracking-widest block">Want to join or attend any event?</span>
              <h4 className="font-serif text-base md:text-lg font-bold text-[#1C1917] uppercase">Connect with David Hunter directly</h4>
              <p className="text-xs text-[#1C1917]/70 font-sans font-light leading-relaxed max-w-2xl">
                Interested in participating in our upcoming services, mission trips, or community projects? Reach out to David Hunter on WhatsApp to confirm your attendance, check available visitor passes, or coordinate logistics.
              </p>
            </div>
            <a
              href="https://wa.me/27815411335?text=Hi%20David%2C%20I%27m%20viewing%20the%20Official%20Calendar%20on%20The%20Twelve%20website%20and%20would%20love%20to%20attend%20an%20upcoming%20event!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba56] text-white uppercase text-[10.5px] tracking-widest font-black py-3 px-6 rounded-2xl flex items-center justify-center space-x-2.5 transition-all cursor-pointer shadow-md hover:shadow-emerald-500/10 text-center shrink-0 self-start md:self-auto"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>

          {calendarViewMode === 'grid' ? (
            <motion.div
              key="upcoming-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
              
              {/* Interactive Creative Calendar (Left Block, 7 COLS) */}
              <div className="lg:col-span-7 bg-[#FAF7EF] border border-[#EADCC2]/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-[#EADCC2]/50 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#9A7D3C] font-extrabold uppercase tracking-widest block font-sans">
                      Interactive Portal
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1C1917] uppercase">
                      The Discipleship Council
                    </h3>
                  </div>

                  {/* Month Grid Switchers */}
                  <div className="flex flex-wrap items-center gap-1 bg-[#FAF7EF] border border-[#EADCC2]/40 p-1 rounded-2xl">
                    {CALENDAR_MONTHS.map((m, idx) => (
                      <button 
                        key={m.name}
                        onClick={() => {
                          setCurrentMonthIndex(idx);
                          // Default to the first day of the selected month
                          setSelectedDayNum(1);
                        }}
                        className={`px-2.5 py-1.5 rounded-xl text-[10px] md:text-xs font-serif uppercase tracking-wider transition-all cursor-pointer ${
                          currentMonthIndex === idx 
                            ? 'bg-[#1C1917] text-white font-bold shadow-xs' 
                            : 'text-[#1C1917]/75 hover:bg-[#EBDCC2]/40 font-medium'
                        }`}
                      >
                        {m.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendar Render */}
                <div className="space-y-4 select-none">
                  {/* Calendar Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center font-serif text-[10px] uppercase font-bold text-[#1C1917]/50 tracking-wider">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>

                  {/* Calendar Body grid */}
                  <div className="grid grid-cols-7 gap-1.5 md:gap-2">
                    {/* Prefix Padding blanks */}
                    {Array.from({ length: activeMonth.startDayOfWeek }).map((_, i) => (
                      <div 
                        key={`blank-${i}`} 
                        className="aspect-square bg-[#FAF7EF]/20 rounded-xl"
                      />
                    ))}

                    {/* Active Days */}
                    {Array.from({ length: activeMonth.daysInMonth }).map((_, i) => {
                      const dayVal = i + 1;
                      const hasEvent = !!getEventForDay(dayVal);
                      const isTargetedEvent = getEventForDay(dayVal);
                      const isSelected = selectedDayNum === dayVal;

                      return (
                        <button
                          key={`day-${dayVal}`}
                          onClick={() => handleDayClick(dayVal)}
                          className={`aspect-square rounded-xl flex flex-col items-center justify-between p-1 md:p-2 border transition-all relative group cursor-pointer ${
                            isSelected
                              ? 'bg-[#1C1917] border-transparent text-white scale-[1.04] shadow-xs'
                              : hasEvent
                              ? 'bg-[#F9F5EC] border-[#9A7D3C] text-[#1C1917] font-semibold hover:bg-[#9A7D3C]/10'
                              : 'bg-[#FDFBF7] border-[#EADCC2]/40 text-[#1C1917]/80 hover:bg-[#FAF7EF]'
                          }`}
                        >
                          <span className="text-xs md:text-sm font-sans block self-start">
                            {dayVal}
                          </span>

                          {/* Glow Dot/Details for Days with Events */}
                          {hasEvent && (
                            <span className={`w-1.5 h-1.5 rounded-full block animate-pulse ${
                              isSelected 
                                ? 'bg-[#FAF7EF]' 
                                : isTargetedEvent?.isPrivate 
                                ? 'bg-red-500' 
                                : 'bg-[#9A7D3C]'
                            }`} />
                          )}
                          
                          {/* Tiny category hover badge on large screens */}
                          {hasEvent && !isSelected && (
                            <span className="absolute -top-1 -right-1 bg-[#9A7D3C] text-[8px] text-white px-1.5 py-0.5 rounded-full scale-0 group-hover:scale-100 transition-transform origin-bottom block">
                              📌
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Legend Guidelines */}
                <div className="flex flex-wrap items-center gap-4 text-[10px] font-sans text-[#1C1917]/60 border-t border-[#EADCC2]/40 pt-4">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9A7D3C] block" />
                    <span>Public Assembly Open Slot</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 block" />
                    <span>Team-Exclusive Assembly</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-4 h-4 border border-[#9A7D3C] bg-[#F9F5EC] rounded-md block" />
                    <span>Day with Scheduled Event</span>
                  </div>
                </div>

              </div>

              {/* Day Event Detail Panel + Action Booking Form (Right Block, 5 COLS) */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                
                {/* Event card details */}
                <AnimatePresence mode="wait">
                  {selectedEvent ? (
                    <motion.div
                      key={`evt-card-${selectedEvent.id}`}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      className="bg-zinc-900 border-2 border-[#9A7D3C] text-[#FDF9F7] rounded-3xl p-6 shadow-md relative overflow-hidden"
                    >
                      {/* Abstract background graphics */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#9A7D3C]/20 to-transparent pointer-events-none" />

                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest block ${
                          selectedEvent.isPrivate 
                            ? 'bg-red-950/45 text-red-400 border border-red-900/45' 
                            : 'bg-[#9A7D3C]/40 text-[#FDF9F7] border border-[#9A7D3C]'
                        }`}>
                          {selectedEvent.category}
                        </span>

                        <span className="text-xs font-serif font-black text-[#9A7D3C] uppercase tracking-wide">
                          {selectedEvent.isPrivate ? '🔒 Private' : '⭐ Open'}
                        </span>
                      </div>

                      <h4 className="font-serif text-2xl font-black text-white hover:text-[#9A7D3C] transition-colors uppercase leading-tight">
                        {selectedEvent.title}
                      </h4>

                      <div className="space-y-2 mt-4 text-xs text-white/70 font-sans border-b border-white/5 pb-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-[#9A7D3C] shrink-0" />
                          <span>{selectedEvent.time} ({activeMonth.name.split(' ')[0]} {selectedDayNum})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-[#9A7D3C] shrink-0" />
                          <span>{selectedEvent.location}</span>
                        </div>
                        {!selectedEvent.isPrivate && (
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-[#9A7D3C] shrink-0" />
                            <span className="font-semibold text-white">
                              {selectedEvent.spotsLeft > 0 
                                ? `${selectedEvent.spotsLeft} guest seats remaining` 
                                : 'Awaiting confirmation'}
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-white/50 leading-relaxed font-light font-sans mt-4">
                        {selectedEvent.description}
                      </p>

                      {/* Call to action booking section in-card */}
                      {!selectedEvent.isPrivate ? (
                        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col space-y-3">
                          <button
                            id="reserve-pass-btn"
                            onClick={() => openRsvpModal(selectedEvent)}
                            className="bg-white text-[#1C1917] hover:bg-[#FAF7EF] uppercase text-[10px] tracking-widest font-black py-3 px-5 rounded-2xl w-full flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Reserve Free Guest Pass</span>
                          </button>

                          <a
                            href={`https://wa.me/27815411335?text=Hi%20David%2C%20I%20would%20love%20to%20join%20the%20upcoming%20event%20"${encodeURIComponent(selectedEvent.title)}"%20on%20${encodeURIComponent(selectedEvent.date)}!`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#20ba56] text-white uppercase text-[10px] tracking-widest font-black py-3 px-5 rounded-2xl w-full flex items-center justify-center space-x-2 transition-colors cursor-pointer text-center"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Contact David to Join</span>
                          </a>
                        </div>
                      ) : (
                        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col space-y-3">
                          <div className="bg-red-950/20 rounded-2xl p-3 border border-red-500/20">
                            <p className="text-[10px] text-red-200 leading-relaxed text-center font-bold">
                              🔒 Closed Attendance: This is a private evaluation covenant panel for resident students and program guardians only. 
                            </p>
                          </div>
                          <a
                            href={`https://wa.me/27815411335?text=Hi%20David%2C%20I%20have%20a%20question%20about%20the%20private%20assembly%20"${encodeURIComponent(selectedEvent.title)}"%20on%20${encodeURIComponent(selectedEvent.date)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white uppercase text-[10px] tracking-widest font-black py-3 px-5 rounded-2xl w-full flex items-center justify-center space-x-2 transition-colors cursor-pointer text-center"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Inquire via David</span>
                          </a>
                        </div>
                      )}

                      {/* Google Calendar Sync button */}
                      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col space-y-2">
                        <a
                          href={getGoogleCalendarTemplateUrl(selectedEvent)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleAddEventToCalendarUrl(selectedEvent.id)}
                          className={`uppercase text-[10px] tracking-widest font-black py-3 px-5 rounded-2xl w-full flex items-center justify-center space-x-2 transition-all cursor-pointer text-center ${
                            syncStatus[selectedEvent.id] === 'success'
                              ? 'bg-emerald-950/50 border border-emerald-500/50 text-emerald-300'
                              : 'bg-transparent border border-white/20 hover:bg-white/5 text-white'
                          }`}
                        >
                          {syncStatus[selectedEvent.id] === 'success' ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added to Google Calendar</span>
                            </>
                          ) : (
                            <>
                              <Calendar className="w-3.5 h-3.5 text-[#9A7D3C]" />
                              <span>Add to Google Calendar</span>
                            </>
                          )}
                        </a>
                      </div>

                    </motion.div>
                  ) : (
                    <motion.div
                      key="no-evt-card"
                      className="bg-[#FAF7EF]/40 border border-[#EADCC2]/40 rounded-3xl p-8 hover:border-[#9A7D3C]/40 transition-colors text-center py-12"
                    >
                      <Calendar className="w-8 h-8 text-[#9A7D3C]/60 mx-auto mb-3" />
                      <h4 className="font-serif text-lg font-bold text-[#1C1917]/80 uppercase">
                        Sabbath Rest Day
                      </h4>
                      <p className="text-xs text-[#1C1917]/50 max-w-xs mx-auto mt-1 font-sans font-light">
                        No public gatherings or resident reviews are scheduled. Members remain in deep studying and rest. Choose July 18, August 15, or August 28 for scheduling events.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sidebar upcoming listing timeline (Timeline representation) */}
                <div className="bg-[#FAF7EF]/50 border border-[#EADCC2]/50 rounded-3xl p-5 space-y-4">
                  <h4 className="font-serif text-xs uppercase font-extrabold text-[#1C1917] tracking-wider border-b border-[#EADCC2]/30 pb-2">
                    Timeline Sequence of Open Dates
                  </h4>

                  <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                    {upcomingEventsList.filter(e => !e.isPrivate).slice(0, 15).map((ev) => {
                      // Parse YYYY-MM-DD date safely
                      const parts = ev.date.split('-');
                      const displayDate = parts.length === 3 
                        ? new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
                        : ev.date;

                      return (
                        <div 
                          key={ev.id}
                          className="flex items-start space-x-3.5 relative border-l border-[#EADCC2] pl-4 pb-2 group"
                        >
                          {/* Bullet point indicator */}
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#9A7D3C] block ring-4 ring-[#FAF7EF]" />

                          <div className="space-y-1">
                            <span className="text-[9px] font-sans font-black text-[#9A7D3C]">
                              {displayDate}
                            </span>
                            <h5 
                              onClick={() => {
                                const parseParts = ev.date.split('-');
                                if (parseParts.length === 3) {
                                  const year = parseInt(parseParts[0]);
                                  const monthIdx = parseInt(parseParts[1]) - 1;
                                  const day = parseInt(parseParts[2]);
                                  const matchedMonthIdx = CALENDAR_MONTHS.findIndex(m => m.monthIndex === monthIdx && m.year === year);
                                  if (matchedMonthIdx !== -1) {
                                    setCurrentMonthIndex(matchedMonthIdx);
                                  }
                                  setSelectedDayNum(day);
                                }
                              }}
                              className="font-serif text-xs font-bold text-[#1C1917] hover:text-[#9A7D3C] cursor-pointer transition-colors"
                            >
                              {ev.title}
                            </h5>
                            <p className="text-[10px] text-[#1C1917]/60 block font-light leading-snug">
                              {ev.location}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </motion.div>
          ) : (
            <motion.div
              key="google-live-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FAF7EF] border border-[#EADCC2]/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EADCC2]/50 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#9A7D3C] font-extrabold uppercase tracking-widest block font-sans">
                    Google Calendar Integration
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#1C1917] uppercase">
                    Residency Live Feed
                  </h3>
                </div>
                <a
                  href={`https://calendar.google.com/calendar/u/0?cid=${encodeURIComponent(RESIDENCY_CALENDAR_ID)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#9A7D3C] hover:text-[#7D642D] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#EADCC2]/60 bg-white py-1.5 px-3.5 rounded-xl cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Open in Google Calendar</span>
                </a>
              </div>

              {/* Iframe container */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#EADCC2]/60 bg-white" style={{ height: '620px' }}>
                <iframe
                  src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(RESIDENCY_CALENDAR_ID)}&ctz=Africa%2FJohannesburg&mode=MONTH&wkst=1&bgcolor=%23ffffff&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1`}
                  style={{ border: 0, width: '100%', height: '100%' }}
                  frameBorder="0"
                  scrolling="no"
                  title="Residency Calendar Grid"
                />
              </div>

              <div className="bg-[#FAF7EF]/85 p-4 rounded-2xl border border-[#EADCC2]/40 text-xs text-[#1C1917]/70 font-sans leading-relaxed">
                <strong>Sync Note:</strong> The calendar grid above displays live official events. Connecting your Google Account using the "Google Calendar Hub" on the top of this page will automatically synchronize these dates directly to your custom interactive view as well!
              </div>
            </motion.div>
          )}
        </div>

        {/* past-panel block (Visually ordered first before upcoming calendar) */}
        <div className="order-1 w-full space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EADCC2]/60 pb-2">
            <div className="space-y-1">
              <span className="text-[10px] text-[#9A7D3C] font-extrabold uppercase tracking-widest block font-sans animate-pulse">
                RECORDS & ARCHIVES
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-black text-[#1C1917] uppercase">
                Past Assemblies & Missions
              </h2>
            </div>
            
            {/* Elegant horizontal swipe/scroll indicator */}
            <div className="flex items-center gap-2 text-[#9A7D3C]">
              <span className="text-[10px] sm:text-xs font-serif uppercase tracking-wider font-bold">
                Swipe / Scroll to explore history
              </span>
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4.5 h-4.5" />
              </motion.div>
            </div>
          </div>

          <motion.div
            key="past-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
                  {/* Horizontal timeline of past logs */}
              <div className="relative w-full">
                
                {/* Horizontal scrollable track */}
                <div className="flex flex-row gap-6 md:gap-8 overflow-x-auto pb-6 px-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-amber-700/20 scrollbar-track-transparent">
                  {PAST_EVENTS.map((event, index) => {
                    return (
                      <div 
                        key={event.id}
                        className="relative flex-none w-[88vw] sm:w-[480px] md:w-[650px] lg:w-[700px] snap-center flex flex-col space-y-4"
                      >
                        {/* Timeline Header indicator (fully responsive connecting line) */}
                        <div className="relative w-full flex flex-col items-center justify-center">
                          {/* Segment line running horizontally behind the balloon indicator */}
                          <div className="absolute top-5 left-0 right-0 h-[2px] bg-[#9A7D3C]/20" />
                          {index === 0 && (
                            <div className="absolute top-5 left-0 w-1/2 h-[2px] bg-[#FAF7EF]" />
                          )}
                          {index === PAST_EVENTS.length - 1 && (
                            <div className="absolute top-5 right-0 w-1/2 h-[2px] bg-[#FAF7EF]" />
                          )}

                          {/* Numbered node balloon */}
                          <div className="relative z-10 w-10 h-10 rounded-full bg-[#1C1917] border-2 border-[#9A7D3C] flex items-center justify-center text-[#FDFBF7] text-xs font-serif font-black shadow-md hover:scale-105 transition-transform duration-200">
                            {index + 1}
                          </div>
                        </div>

                        {/* Physical Timeline Stem (connecting balloon to card) */}
                        <div className="w-[2px] h-3 bg-[#9A7D3C]/35 mx-auto" />

                        {/* Event details Card container - changes layout on mobile screens */}
                        <div className="bg-[#FAF7EF]/40 border border-[#EADCC2]/40 rounded-3xl p-5 md:p-6 lg:p-8 hover:shadow-md hover:border-[#9A7D3C]/40 transition-all duration-300 flex flex-col md:flex-row items-stretch gap-6">
                          
                          {/* Text block */}
                          <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[9px] text-[#9A7D3C] font-extrabold uppercase tracking-widest bg-[#9A7D3C]/10 border border-[#9A7D3C]/20 px-2.5 py-1 rounded-full shrink-0">
                                  {event.category}
                                </span>
                                <span className="text-[10px] text-[#1C1917]/50 font-semibold font-mono">
                                  {event.date}
                                </span>
                              </div>

                              <h3 className="font-serif text-xl lg:text-2xl font-black text-[#1C1917] uppercase tracking-tight leading-tight">
                                {event.title}
                              </h3>

                              <div className="flex items-center space-x-2 text-[11px] text-[#1C1917]/60 font-sans font-medium">
                                <MapPin className="w-3.5 h-3.5 text-[#9A7D3C] shrink-0" />
                                <span>{event.location}</span>
                              </div>

                              <p className="text-xs text-[#1C1917]/75 font-sans leading-relaxed font-light">
                                {event.description}
                              </p>
                            </div>
                          </div>

                          {/* Media component panel */}
                          <div className="w-full md:w-1/2 self-stretch flex flex-col justify-center">
                            
                            {/* CASE A: REAL VIDEO PLAYER */}
                            {event.mediaType === 'video' && (event.mediaUrls || event.mediaUrl) ? (
                              <div className="flex flex-col gap-4 w-full h-full justify-center">
                                {event.images && event.images.map((imgUrl, imgIdx) => (
                                  <div key={`img-${imgIdx}`} className="w-full bg-[#FAF7EF] rounded-2xl border border-[#EADCC2]/50 shadow-xs overflow-hidden flex flex-col p-2 bg-[#FDFBF7]">
                                    <img 
                                      src={imgUrl} 
                                      alt={`${event.title} Highlight`} 
                                      className="w-full h-48 object-cover rounded-xl"
                                      referrerPolicy="no-referrer"
                                    />
                                    <div className="flex items-center justify-between text-[10px] text-[#9A7D3C] font-mono mt-2.5 px-1.5 font-bold uppercase tracking-wider">
                                      <span>{event.id === 'past-botswana-mission-2026' ? 'School Ministry Outreach' : 'Outreach Feeding Program'}</span>
                                      <span className="text-[#1C1917]/40">{event.location}</span>
                                    </div>
                                  </div>
                                ))}

                                {event.mediaUrls ? (
                                  event.mediaUrls.map((url, urlIndex) => (
                                    <div key={urlIndex} className="w-full bg-zinc-950 rounded-2xl border border-zinc-930 shadow-sm relative overflow-hidden flex flex-col justify-center p-1 bg-black">
                                      <div className="text-[10px] text-zinc-400 px-3 py-1.5 bg-zinc-900/60 font-mono tracking-wider flex justify-between items-center rounded-t-xl">
                                        <span>VIDEO STREAM {urlIndex + 1}</span>
                                        <span className="text-[9.5px] text-[#9A7D3C] font-semibold">
                                          {event.id === 'past-zambia-mission-2026' 
                                            ? (urlIndex === 0 ? 'Zambia Part 1 Highlights' : 'Zambia Part 2 Highlights')
                                            : (urlIndex === 0 ? 'Day 1 Highlights' : 'Day 2 Core Sessions')
                                          }
                                        </span>
                                      </div>
                                      <video 
                                        src={url} 
                                        controls 
                                        playsInline
                                        className="w-full rounded-b-xl object-contain max-h-[180px]"
                                      />
                                    </div>
                                  ))
                                ) : (
                                  <div className="w-full h-full min-h-[220px] bg-zinc-950 rounded-2xl border border-zinc-900 shadow-sm relative overflow-hidden flex flex-col justify-center p-1 bg-black">
                                    <video 
                                      src={event.mediaUrl} 
                                      controls 
                                      playsInline
                                      className="w-full h-full rounded-xl object-contain max-h-[300px]"
                                    />
                                  </div>
                                )}
                              </div>
                            ) : event.mediaType === 'video' && (
                              <div className="w-full h-full min-h-[220px] bg-zinc-950 rounded-2xl border border-zinc-900 shadow-sm relative overflow-hidden flex flex-col justify-between p-4 group select-none">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none" />
                                {videoPlaying && (
                                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[length:100%_4px,_6px_100%] pointer-events-none opacity-40" />
                                )}

                                <div className="flex items-center justify-between relative z-10">
                                  <span className="text-[8px] tracking-wider text-green-400 font-mono bg-green-950/45 px-2 py-0.5 rounded-full border border-green-900/30 flex items-center gap-1.5 uppercase">
                                    <span className={`w-1.5 h-1.5 rounded-full ${videoPlaying ? 'bg-green-400 animate-pulse' : 'bg-green-700'}`} />
                                    {videoPlaying ? 'Streaming RAW feed' : 'Feed Paused'}
                                  </span>
                                  <span className="text-[9px] text-[#FAF7EF]/60 font-mono tracking-widest">
                                    B_CAM_INDEX_02
                                  </span>
                                </div>

                                <div className="flex flex-col items-center justify-center space-y-3 relative z-10 py-6">
                                  <button 
                                    onClick={handleToggleVideo}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                                      videoPlaying 
                                        ? 'bg-red-600 hover:bg-red-700 shadow-lg text-white scale-105' 
                                        : 'bg-white hover:bg-[#FAF7EF] shadow-md text-[#1C1917]'
                                    }`}
                                  >
                                    {videoPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current translate-x-0.5" />}
                                  </button>

                                  <div className="bg-black/75 px-3 py-1.5 rounded-xl border border-white/5 max-w-[280px] text-center">
                                    <p className="text-[9px] font-mono text-zinc-300 leading-normal">
                                      {videoPlaying ? "🎬 Streaming live feed" : "🎬 Press play to run video simulation log"}
                                    </p>
                                  </div>
                                </div>

                                <div className="border-t border-white/10 pt-3 flex flex-col space-y-2 relative z-10 bg-black/40 backdrop-blur-xs rounded-xl p-2 mt-2">
                                  <div className="flex items-center justify-between gap-3 text-[9px] text-white/50 font-mono">
                                    <span className={videoPlaying ? 'text-green-400' : 'text-zinc-500'}>
                                      00:{videoProgress < 10 ? '0' + Math.floor(videoProgress * 1.05) : Math.floor(videoProgress * 1.05)}
                                    </span>
                                    
                                    <div className="flex-grow h-1.5 bg-zinc-800 rounded-full overflow-hidden relative cursor-pointer" onClick={(e) => {
                                      const rect = e.currentTarget.getBoundingClientRect();
                                      const pct = ((e.clientX - rect.left) / rect.width) * 100;
                                      setVideoProgress(pct);
                                    }}>
                                      <div 
                                        className="bg-red-500 h-full rounded-full transition-all duration-200"
                                        style={{ width: `${videoProgress}%` }}
                                      />
                                    </div>

                                    <span className="text-zinc-500">{event.duration}</span>
                                  </div>

                                  <div className="flex items-center justify-between text-[9px] text-zinc-400">
                                    <div className="flex items-center space-x-3">
                                      <button onClick={() => setVideoMuted(!videoMuted)} className="hover:text-white cursor-pointer transition-colors">
                                        {videoMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-red-400" />}
                                      </button>
                                      <button onClick={handleResetVideo} className="hover:text-white cursor-pointer transition-colors">
                                        <RotateCcw className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                    <div className="flex items-center space-x-2 font-mono">
                                      <button onClick={() => setVideoSpeed(v => v === 1 ? 1.5 : v === 1.5 ? 2 : 1)} className="hover:text-white border border-zinc-700 px-1.5 py-0.5 rounded-sm">
                                        {videoSpeed}x
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* CASE B: PHOTO GALLERY ACCORDION */}
                            {event.mediaType === 'photo-gallery' && event.images && (
                              <div className="w-full h-full min-h-[220px] bg-[#FAF7EF]/60 border border-[#EADCC2] rounded-2xl p-4 flex flex-col justify-between space-y-4">
                                <div className="flex-grow bg-[#FDFBF7] p-2 rounded-xl shadow-xs border border-[#EADCC2]/40 relative group overflow-hidden">
                                  <img 
                                    src={event.images[galleryIndex]} 
                                    alt="Active Service" 
                                    className="w-full h-44 object-cover rounded-lg group-hover:scale-102 transition-transform duration-300" 
                                  />
                                  <div className="absolute top-2 right-2 bg-black/60 text-[9px] text-white px-2 py-0.5 rounded-md backdrop-blur-xs font-mono">
                                    {galleryIndex + 1} / {event.images.length}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between gap-2.5">
                                  <div className="flex gap-2">
                                    {event.images.map((img, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => setGalleryIndex(idx)}
                                        className={`w-10 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                          galleryIndex === idx ? 'border-[#9A7D3C] scale-[1.08]' : 'border-[#EADCC2]/40'
                                        }`}
                                      >
                                        <img src={img} className="w-full h-full object-cover" />
                                      </button>
                                    ))}
                                  </div>

                                  <div className="flex space-x-1">
                                    <button 
                                      onClick={() => setGalleryIndex(idx => idx === 0 ? event.images!.length - 1 : idx - 1)}
                                      className="p-1.5 bg-[#FAF7EF] border border-[#EADCC2] hover:bg-[#1C1917] hover:text-white rounded-lg cursor-pointer"
                                    >
                                      <ChevronLeft className="w-3.5 h-3.5" />
                                    </button>
                                    <button 
                                      onClick={() => setGalleryIndex(idx => idx === event.images!.length - 1 ? 0 : idx + 1)}
                                      className="p-1.5 bg-[#FAF7EF] border border-[#EADCC2] hover:bg-[#1C1917] hover:text-white rounded-lg cursor-pointer"
                                    >
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* CASE C: AUDIO LOG WAVEBOARD */}
                            {event.mediaType === 'audio-wave' && (
                              <div className="w-full h-full min-h-[220px] bg-[#1C1917] border-2 border-[#9A7D3C]/40 text-[#FAF7EF] rounded-2xl p-5 flex flex-col justify-between">
                                <div className="flex items-center justify-between">
                                  <span className="text-[8px] tracking-widest text-[#9A7D3C] font-mono border border-[#9A7D3C] px-2.5 py-1 rounded-full uppercase flex items-center gap-1.5 font-bold">
                                    <Mic2 className="w-3 h-3 text-[#9A7D3C]" />
                                    AUDIO LOG
                                  </span>
                                </div>

                                <div className="py-4 space-y-1.5">
                                  <div className="flex items-end justify-between h-14 w-full gap-[2px]">
                                    {Array.from({ length: 35 }).map((_, i) => {
                                      const isPassed = (i / 35) * 100 <= audioProgress;
                                      return (
                                        <div 
                                          key={`wave-${i}`}
                                          className={`w-full rounded-t-xs transition-colors duration-100 ${
                                            isPassed ? 'bg-gradient-to-t from-[#9A7D3C] to-[#EADCC2]' : 'bg-zinc-800'
                                          }`}
                                          style={{
                                            height: `${Math.max(10, Math.floor(Math.sin(i * 0.4) * 20 + 28))}px`
                                          }}
                                        />
                                      );
                                    })}
                                  </div>
                                </div>

                                <div className="flex gap-4 items-center bg-black/35 rounded-xl p-2.5 border border-white/5">
                                  <button 
                                    onClick={handleToggleAudio}
                                    className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-[#9A7D3C]"
                                  >
                                    {audioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
                                  </button>
                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
        </div>

      </div>

      {/* 4. Elegant Interactive Admissions/RSVP Guest Pass Modal */}
      <AnimatePresence>
        {isRsvpOpen && rsvpEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
            {/* Dark glass backdrop layout */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRsvpOpen(false)}
              className="absolute inset-0 bg-[#1C1917]/75 backdrop-blur-sm"
            />

            {/* Modal Body container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-[#FAF7EF] border-2 border-[#9A7D3C] rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden relative z-10 text-left flex flex-col pointer-events-auto"
            >
              {/* Header colored banner */}
              <div className="bg-[#1C1917] text-[#FAF7EF] px-6 py-4 border-b border-[#9A7D3C]/35 flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-sans font-black text-[#9A7D3C] tracking-widest block uppercase">
                    THE TWELVE REGISTRY
                  </span>
                  <h3 className="font-serif text-lg font-bold uppercase text-white">
                    GUEST REGISTRATION COVENANT
                  </h3>
                </div>
                <button 
                  onClick={() => setIsRsvpOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Conditional Success / Form screen */}
              <div className="p-6 overflow-y-auto max-h-[80vh]">
                
                {!rsvpSuccess ? (
                  <form onSubmit={handleRsvpSubmit} className="space-y-4">
                    <p className="text-[10px] text-[#1C1917]/60 leading-relaxed font-sans font-light">
                      Provide your coordinates below to join <strong className="text-[#1C1917] font-semibold">{rsvpEvent.title}</strong> in KwaZulu-Natal. Since capacity is restricted to support intense fellowship density, guest slot allocations require matching contact records.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/60 gap-3">
                      <div className="text-left select-none">
                        <span className="text-[9px] font-sans font-black text-emerald-800 uppercase tracking-wider block">Prefer Direct Messaging?</span>
                        <p className="text-[9.5px] text-emerald-700 font-sans font-light leading-snug">
                          Chat with Director David Hunter on WhatsApp to coordinate your seat instantly.
                        </p>
                      </div>
                      <a
                        href={`https://wa.me/27815411335?text=Hi%20David%2C%20I%20would%20love%20to%20join%20the%20upcoming%20event%20"${encodeURIComponent(rsvpEvent.title)}"%20on%20${encodeURIComponent(rsvpEvent.date)}!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20ba56] text-white uppercase text-[9px] tracking-widest font-black py-2.5 px-4 rounded-xl transition-colors cursor-pointer text-center shrink-0 flex items-center justify-center space-x-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-[#1C1917]/70 font-sans tracking-wider block">Your Full Name *</label>
                        <input 
                          type="text"
                          required
                          value={rsvpFormData.fullName}
                          onChange={(e) => setRsvpFormData({...rsvpFormData, fullName: e.target.value})}
                          placeholder="e.g. Sipho Langa"
                          className="w-full bg-[#FDFBF7] border border-[#EADCC2] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#9A7D3C] text-[#1C1917] font-sans font-medium placeholder-[#1C1917]/35"
                        />
                      </div>

                      {/* Your Email */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-[#1C1917]/70 font-sans tracking-wider block">Your Corporate Email *</label>
                        <input 
                          type="email"
                          required
                          value={rsvpFormData.email}
                          onChange={(e) => setRsvpFormData({...rsvpFormData, email: e.target.value})}
                          placeholder="e.g. sipho@example.co.za"
                          className="w-full bg-[#FDFBF7] border border-[#EADCC2] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#9A7D3C] text-[#1C1917] font-sans font-medium placeholder-[#1C1917]/35"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Phone mobile */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-[#1C1917]/70 font-sans tracking-wider block">Mobile Connectivity *</label>
                        <input 
                          type="tel"
                          required
                          value={rsvpFormData.phone}
                          onChange={(e) => setRsvpFormData({...rsvpFormData, phone: e.target.value})}
                          placeholder="e.g. 082 123 4567"
                          className="w-full bg-[#FDFBF7] border border-[#EADCC2] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#9A7D3C] text-[#1C1917] font-sans font-medium placeholder-[#1C1917]/35"
                        />
                      </div>

                      {/* Participant Designation */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-[#1C1917]/70 font-sans tracking-wider block">Attendance Profile Role</label>
                        <select
                          value={rsvpFormData.role}
                          onChange={(e) => setRsvpFormData({...rsvpFormData, role: e.target.value})}
                          className="w-full bg-[#FDFBF7] border border-[#EADCC2] rounded-xl px-2 py-2 text-xs focus:outline-none focus:border-[#9A7D3C] text-[#1C1917] font-sans font-semibold cursor-pointer"
                        >
                          <option value="Observer">Silent Observer Guest</option>
                          <option value="Intercessor">Intercessor & Prayer Supporter</option>
                          <option value="Music">Worship / Creative Volunteer</option>
                          <option value="General">Logistical Helper Resident</option>
                        </select>
                      </div>
                    </div>

                    {/* Brief notes or support details */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-[#1C1917]/70 font-sans tracking-wider block">Guardianship Questions / General Notes</label>
                      <textarea
                        rows={3}
                        value={rsvpFormData.message}
                        onChange={(e) => setRsvpFormData({...rsvpFormData, message: e.target.value})}
                        placeholder="Please brief our team if you have transport dependencies or specific dietary rules..."
                        className="w-full bg-[#FDFBF7] border border-[#EADCC2] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#9A7D3C] text-[#1C1917] font-sans font-light placeholder-[#1C1917]/35 resize-none"
                      />
                    </div>

                    {/* Submit and close block */}
                    <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#EADCC2]/40">
                      <button
                        type="button"
                        onClick={() => setIsRsvpOpen(false)}
                        className="px-4 py-2 border border-[#EADCC2] text-[#1C1917]/80 hover:text-[#1C1917] hover:bg-[#EADCC2]/20 text-[10px] uppercase tracking-widest font-black rounded-xl transition-all cursor-pointer"
                      >
                        Decline
                      </button>
                      <button
                        type="submit"
                        className="bg-[#1C1917] text-white hover:bg-zinc-800 px-5 py-2.5 text-[10px] uppercase tracking-widest font-black rounded-xl flex items-center space-x-2 cursor-pointer shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Authorize Reservation</span>
                      </button>
                    </div>

                  </form>
                ) : (
                  // BEAUTIFULLY CUSTOM STYLED FAUX ADMISSIONS TICKET
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 py-2"
                  >
                    {/* Success notification banner */}
                    <div className="flex items-center space-x-3 bg-green-100 text-green-950 px-4 py-3 rounded-2xl border border-green-500/20 shadow-2xs font-sans">
                      <div className="bg-green-600 p-1.5 rounded-full text-white">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                      <div className="text-left font-sans">
                        <h4 className="font-bold text-xs uppercase leading-tight">Assembly Slot Reserved!</h4>
                        <p className="text-[10px] text-green-900 font-light mt-0.5">Your seat confirmation code has been drafted in our community council queue.</p>
                      </div>
                    </div>

                    {/* Masterclass admissions ticket */}
                    <div className="bg-zinc-900 text-white rounded-3xl border-2 border-[#9A7D3C] shadow-md relative overflow-hidden font-mono text-left select-none">
                      
                      {/* Perforated edge circles fake cutout */}
                      <div className="absolute top-1/2 -left-3.5 w-7 h-7 bg-[#FAF7EF] rounded-full border-r border-[#9A7D3C]/60" />
                      <div className="absolute top-1/2 -right-3.5 w-7 h-7 bg-[#FAF7EF] rounded-full border-l border-[#9A7D3C]/60" />

                      {/* Header block with logo */}
                      <div className="px-6 py-4 border-b border-dashed border-[#9A7D3C]/40 bg-zinc-950 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img src="/assets/images/the_twelve_logo.png" className="w-6 h-6 object-contain filter invert-0" />
                          <div className="flex flex-col text-[8px] leading-tight select-none">
                            <span className="font-serif font-black tracking-widest uppercase">THE TWELVE</span>
                            <span className="text-[#9A7D3C] font-bold">DISCIPLE SOUTH AFRICA</span>
                          </div>
                        </div>

                        <div className="text-right text-[8px] tracking-normal font-sans bg-[#9A7D3C]/30 text-[#FAF7EF] border border-[#9A7D3C] px-2.5 py-0.5 rounded-full uppercase">
                          GUEST ACCESS COVENANT
                        </div>
                      </div>

                      {/* Ticket interior particulars */}
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] font-mono leading-relaxed relative z-10 border-b border-dashed border-[#9A7D3C]/40">
                        <div className="space-y-2">
                          <div>
                            <span className="text-zinc-500 block text-[8px] uppercase tracking-wider">REGISTERED GUEST:</span>
                            <strong className="text-white text-xs tracking-tight font-serif uppercase block">{rsvpFormData.fullName}</strong>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[8px] uppercase tracking-wider">EMAIL COORDINATE:</span>
                            <span className="text-[#FAF7EF]/80 font-mono text-[9px] block">{rsvpFormData.email}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[8px] uppercase tracking-wider">CELL IDENTIFICATION:</span>
                            <span className="text-[#FAF7EF]/80 font-mono text-[9px] block">{rsvpFormData.phone}</span>
                          </div>
                        </div>

                        <div className="space-y-2 md:border-l md:border-zinc-800 md:pl-4">
                          <div>
                            <span className="text-zinc-500 block text-[8px] uppercase tracking-wider">EVENT DESCRIPTION:</span>
                            <strong className="text-white text-[10px] font-serif uppercase block">{rsvpEvent.title}</strong>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[8px] uppercase tracking-wider">VENUE COORDINATES:</span>
                            <span className="text-[#FAF7EF]/80 font-sans text-[9px] block">{rsvpEvent.location}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 pt-1.5">
                            <div>
                              <span className="text-zinc-500 block text-[7px] uppercase tracking-wider">DESIGNATION:</span>
                              <span className="text-amber-400 font-bold block bg-amber-950/40 text-[8px] tracking-normal px-1.5 py-0.5 rounded-md border border-amber-900/40 text-center">{rsvpFormData.role}</span>
                            </div>
                            <div>
                              <span className="text-zinc-500 block text-[7px] uppercase tracking-wider">SECURE ADMISSION:</span>
                              <span className="text-green-400 font-extrabold block bg-green-950/20 text-[8px] tracking-normal px-1.5 py-0.5 rounded-md border border-green-900/20 text-center">APPROVED</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Barcode representation using custom divs for amazing aesthetic accuracy */}
                      <div className="px-6 py-4 bg-zinc-950 flex flex-col items-center space-y-2">
                        <div className="w-full flex items-stretch h-10 gap-[2px] justify-center px-4 bg-white/5 py-1.5 rounded-lg border border-white/5">
                          {/* Symmetrical random barcode generator */}
                          {Array.from({ length: 48 }).map((_, i) => {
                            const isBar = (i % 2 === 0 && i !== 22 && i !== 14 && i !== 38 && i !== 44) || i % 5 === 0;
                            return (
                              <div 
                                key={`bar-${i}`}
                                className={isBar ? 'bg-zinc-200 w-1 rounded-sm' : 'bg-transparent w-[3px]'}
                              />
                            );
                          })}
                        </div>
                        <span className="text-[8px] tracking-[0.4em] text-zinc-500 font-mono">
                          SE-CO-2026-N0_{Math.floor(Math.random() * 9000 + 1000)}
                        </span>
                      </div>

                    </div>

                    {/* Print disclaimer block */}
                    <div className="flex flex-col sm:flex-row gap-2 justify-end pt-2">
                      <button 
                        type="button"
                        onClick={() => setIsRsvpOpen(false)}
                        className="bg-zinc-900 text-white hover:bg-zinc-800 uppercase text-[9px] tracking-widest font-black py-3 px-5 rounded-xl text-center cursor-pointer transition-all"
                      >
                        Dismount Admissions
                      </button>
                    </div>

                  </motion.div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
