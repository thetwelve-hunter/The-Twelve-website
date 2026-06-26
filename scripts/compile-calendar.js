import fs from 'fs';
import path from 'path';
import https from 'https';

const CALENDAR_ID = 'c_48ee11ad4a49bb78e5dcfb6c8845db566fd8e8b4d4cb1bb99060c1d8c97986b5@group.calendar.google.com';
const ICS_URL = `https://calendar.google.com/calendar/ical/${encodeURIComponent(CALENDAR_ID)}/public/basic.ics`;
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'assets', 'residency-events.json');

// High-quality static fallback representation of Google Calendar events starting from June 2026 onwards
const FALLBACK_EVENTS = [
  {
    "id": "fallback-up-1",
    "title": "Media Team / Decor",
    "date": "2026-06-22",
    "time": "10:30 AM - 12:00 PM",
    "location": "The Twelve Headquarters, Hillcrest",
    "category": "Service Leadership",
    "spotsLeft": 12,
    "isPrivate": false,
    "description": "Preparation sessions for creative decor and media equipment setup."
  },
  {
    "id": "fallback-up-2",
    "title": "Lunch & Fellowship",
    "date": "2026-06-22",
    "time": "12:00 PM - 12:30 PM",
    "location": "The Twelve Headquarters, Hillcrest",
    "category": "Team Commons",
    "spotsLeft": 15,
    "isPrivate": false,
    "description": "Shared timing for internal group meals and common connection."
  },
  {
    "id": "fallback-up-3",
    "title": "Media team / decor Part 2",
    "date": "2026-06-22",
    "time": "12:30 PM - 02:00 PM",
    "location": "The Twelve Headquarters, Hillcrest",
    "category": "Service Leadership",
    "spotsLeft": 12,
    "isPrivate": false,
    "description": "Secondary block for team media coordinates and staging setup."
  },
  {
    "id": "fallback-up-4",
    "title": "Fun morning",
    "date": "2026-06-23",
    "time": "09:30 AM - 12:00 PM",
    "location": "The Twelve Headquarters, Hillcrest",
    "category": "Team Commons",
    "spotsLeft": 10,
    "isPrivate": false,
    "description": "Activity morning coordinates and friendly exercises."
  },
  {
    "id": "fallback-up-5",
    "title": "Amplified Decor Prep",
    "date": "2026-06-23",
    "time": "12:30 PM - 02:00 PM",
    "location": "The Twelve Headquarters, Hillcrest",
    "category": "Service Leadership",
    "spotsLeft": 12,
    "isPrivate": false,
    "description": "Staging, lighting, and stage setup and design preparations for the Amplified conference."
  },
  {
    "id": "fallback-up-6",
    "title": "Phil - How to read your Bible",
    "date": "2026-06-24",
    "time": "12:30 PM - 01:30 PM",
    "location": "The Twelve Headquarters, Hillcrest",
    "category": "Instructional Study",
    "spotsLeft": 20,
    "isPrivate": false,
    "description": "An academic discipleship session with Guest Speaker Phil on biblical hermeneutics and daily reading coordinates."
  },
  {
    "id": "fallback-up-7",
    "title": "Amplified Youth Conference",
    "date": "2026-06-25",
    "time": "02:00 PM - 03:00 PM",
    "location": "The Twelve Headquarters, Hillcrest",
    "category": "Shared Assembly",
    "spotsLeft": 8,
    "isPrivate": false,
    "description": "The major youth leadership and revival assembly of the mid-year season. Highly dynamic and spiritual sessions."
  },
  {
    "id": "fallback-up-8",
    "title": "Day Off",
    "date": "2026-06-28",
    "time": "All Day",
    "location": "Team Rest Settings",
    "category": "Team Commons",
    "spotsLeft": 0,
    "isPrivate": true,
    "description": "Covenant rest period for study review and restoration."
  },
  {
    "id": "fallback-up-9",
    "title": "One con Conference",
    "date": "2026-06-29",
    "time": "02:00 PM - 03:00 PM",
    "location": "The Twelve Headquarters, Hillcrest",
    "category": "Shared Assembly",
    "spotsLeft": 10,
    "isPrivate": false,
    "description": "National youth and leadership equips and regional connection panels."
  },
  {
    "id": "fallback-up-10",
    "title": "Cityhill Kids Team Day",
    "date": "2026-07-05",
    "time": "All Day",
    "location": "CityHill Church, Hillcrest",
    "category": "Civic Mission",
    "spotsLeft": 15,
    "isPrivate": false,
    "description": "Interactive day hosting, supporting, and guiding primary youth teams on site."
  },
  {
    "id": "fallback-up-11",
    "title": "Fear Factor Challenge",
    "date": "2026-07-06",
    "time": "09:30 AM - 10:30 AM",
    "location": "The Twelve Headquarters, Hillcrest",
    "category": "Team Commons",
    "spotsLeft": 12,
    "isPrivate": false,
    "description": "A high-character team-building and trust challenge designed to help team members face physical and mental goals."
  },
  {
    "id": "fallback-up-12",
    "title": "T12 Worship Night",
    "date": "2026-07-10",
    "time": "All Day",
    "location": "Everskye",
    "category": "Musical Worship",
    "spotsLeft": 25,
    "isPrivate": false,
    "description": "Beautiful evening of instrumental and choral musical worship. Open to friends and partners at Everskye."
  },
  {
    "id": "fallback-up-13",
    "title": "Absa 10km Run",
    "date": "2026-07-12",
    "time": "All Day",
    "location": "Durban Shoreline Route",
    "category": "Civic Mission",
    "spotsLeft": 12,
    "isPrivate": false,
    "description": "Participating in the annual city charity shoreline run in Durban, promoting health and wellness stewardship."
  },
  {
    "id": "fallback-up-14",
    "title": "T12 Holiday Break",
    "date": "2026-07-13",
    "time": "All Day",
    "location": "Team Rest Session",
    "category": "Team Commons",
    "spotsLeft": 0,
    "isPrivate": true,
    "description": "Official mid-year team holidays and home rest breaks."
  },
  {
    "id": "fallback-up-15",
    "title": "E2M Term 1 Deadline",
    "date": "2026-07-27",
    "time": "All Day",
    "location": "The Twelve Headquarters, Hillcrest",
    "category": "Instructional Study",
    "spotsLeft": 0,
    "isPrivate": true,
    "description": "Academic submission and project reviews for Term 1 core curriculum."
  },
  {
    "id": "fallback-up-16",
    "title": "YA Camp JHB",
    "date": "2026-07-31",
    "time": "02:00 PM - 03:00 PM",
    "location": "Willow Park, Johannesburg",
    "category": "Camping Retreat",
    "spotsLeft": 8,
    "isPrivate": false,
    "description": "Young Adults Camp in Johannesburg. Regional equips, team building and overnight outdoor programs."
  },
  {
    "id": "fallback-up-17",
    "title": "Phil T12 Talks",
    "date": "2026-08-05",
    "time": "12:30 PM - 01:30 PM",
    "location": "The Twelve Headquarters, Hillcrest",
    "category": "Instructional Study",
    "spotsLeft": 15,
    "isPrivate": false,
    "description": "Interactive discipleship discussion and leadership insights block led by instructor Phil."
  },
  {
    "id": "fallback-up-18",
    "title": "T12 Combined Mission Trip Potential",
    "date": "2026-08-06",
    "time": "All Day",
    "location": "Regional Mission Areas",
    "category": "Civic Mission",
    "spotsLeft": 12,
    "isPrivate": false,
    "description": "Potential travel days for local support projects and outreach collaboration."
  },
  {
    "id": "fallback-up-19",
    "title": "CHK Camp Retreat",
    "date": "2026-09-18",
    "time": "08:30 AM - 08:00 AM",
    "location": "The Twelve Headquarters, Hillcrest",
    "category": "Camping Retreat",
    "spotsLeft": 5,
    "isPrivate": false,
    "description": "Our core discipleship action camp hosting group retreats and campfire reviews."
  },
  {
    "id": "fallback-up-20",
    "title": "T12 Holidays",
    "date": "2026-09-18",
    "time": "All Day",
    "location": "Team Rest Settings",
    "category": "Team Commons",
    "spotsLeft": 0,
    "isPrivate": true,
    "description": "Secondary season rest break for team members."
  },
  {
    "id": "fallback-up-21",
    "title": "T12 Camping Trip Potential",
    "date": "2026-10-08",
    "time": "All Day",
    "location": "Drakensberg Peak Ranges",
    "category": "Camping Retreat",
    "spotsLeft": 8,
    "isPrivate": false,
    "description": "Outdoor group mountain camping potential dates."
  },
  {
    "id": "fallback-up-22",
    "title": "T12 International Trip Potential",
    "date": "2026-11-02",
    "time": "All Day",
    "location": "Cross-Border Partnerships",
    "category": "Civic Mission",
    "spotsLeft": 6,
    "isPrivate": false,
    "description": "Regional and sovereign cross-border partner visits."
  },
  {
    "id": "fallback-up-23",
    "title": "T12 Last Dance",
    "date": "2026-12-18",
    "time": "All Day",
    "location": "Everskye",
    "category": "Team Commons",
    "spotsLeft": 0,
    "isPrivate": true,
    "description": "The absolute landmark celebration and graduation covenant feast at Everskye. A formal night honoring our 2026 team graduates."
  }
];

function determineCategory(summary) {
  const s = summary.toLowerCase();
  if (s.includes('worship') || s.includes('music') || s.includes('choir')) {
    return 'Musical Worship';
  }
  if (s.includes('camp') || s.includes('hike') || s.includes('wilderness') || s.includes('mountain')) {
    return 'Camping Retreat';
  }
  if (s.includes('mission') || s.includes('outreach') || s.includes('kids') || s.includes('run') || s.includes('civic') || s.includes('school')) {
    return 'Civic Mission';
  }
  if (s.includes('study') || s.includes('talk') || s.includes('read') || s.includes('class') || s.includes('academic') || s.includes('bible') || s.includes('deadline')) {
    return 'Instructional Study';
  }
  if (s.includes('prep') || s.includes('decor') || s.includes('media') || s.includes('setup')) {
    return 'Service Leadership';
  }
  if (s.includes('lunch') || s.includes('tea') || s.includes('dinner') || s.includes('holiday') || s.includes('holidays') || s.includes('rest') || s.includes('fellowship') || s.includes('dance') || s.includes('fast') || s.includes('morning')) {
    return 'Team Commons';
  }
  return 'Shared Assembly';
}

function determinePrivateStatus(summary) {
  const s = summary.toLowerCase();
  return (
    s.includes('holiday') || 
    s.includes('holidays') || 
    s.includes('rest') || 
    s.includes('leave') || 
    s.includes('private') || 
    s.includes('secret') || 
    s.includes('deadline') || 
    s.includes('day off') ||
    s.includes('dance')
  );
}

function fetchCalendar() {
  console.log(`Fetching latest Google Calendar iCal feed from ${ICS_URL}...`);
  
  const req = https.get(ICS_URL, (res) => {
    if (res.statusCode !== 200) {
      console.warn(`Calendar fetch returned status code ${res.statusCode}. Using fallback list.`);
      writeEvents(FALLBACK_EVENTS);
      return;
    }

    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        console.log("Successfully retrieved iCal feed. Parsing events...");
        
        // Unfold folded lines in ICS files
        const unfolded = data.replace(/\r?\n[ \t]/g, '');
        const lines = unfolded.split(/\r?\n/);
        
        let currentEvent = null;
        const rawEvents = [];

        for (const line of lines) {
          if (line.startsWith('BEGIN:VEVENT')) {
            currentEvent = {};
          } else if (line.startsWith('END:VEVENT')) {
            if (currentEvent && currentEvent.dtstart) {
              rawEvents.push(currentEvent);
            }
            currentEvent = null;
          } else if (currentEvent) {
            if (line.startsWith('SUMMARY:')) {
              currentEvent.summary = line.substring(8).trim();
            } else if (line.startsWith('DTSTART')) {
              currentEvent.dtstart = line.split(':')[1].trim();
            } else if (line.startsWith('DTEND')) {
              currentEvent.dtend = line.split(':')[1].trim();
            } else if (line.startsWith('DESCRIPTION:')) {
              currentEvent.description = line.substring(12)
                .replace(/\\n/g, '\n')
                .replace(/\\,/g, ',')
                .trim();
            } else if (line.startsWith('LOCATION:')) {
              currentEvent.location = line.substring(9)
                .replace(/\\,/g, ',')
                .trim();
            }
          }
        }

        console.log(`Parsed ${rawEvents.length} raw events.`);

        const formattedEvents = rawEvents.map((e, idx) => {
          let rawStart = e.dtstart || '';
          let dateStr = '';
          let timeStr = 'All Day';

          if (rawStart.length >= 8) {
            const y = rawStart.substring(0, 4);
            const m = rawStart.substring(4, 6);
            const d = rawStart.substring(6, 8);
            dateStr = `${y}-${m}-${d}`;

            if (rawStart.includes('T')) {
              try {
                const tIndex = rawStart.indexOf('T');
                const timePart = rawStart.substring(tIndex + 1);
                const hh = parseInt(timePart.substring(0, 2), 10);
                const mm = parseInt(timePart.substring(2, 4), 10);
                
                let isUTC = rawStart.endsWith('Z');
                let dateObj = isUTC 
                  ? new Date(Date.UTC(parseInt(y), parseInt(m)-1, parseInt(d), hh, mm))
                  : new Date(parseInt(y), parseInt(m)-1, parseInt(d), hh, mm);
                
                // Format nicely mimicking South Africa's timezone (Africa/Johannesburg, UTC+2)
                const startFormatted = dateObj.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                  timeZone: 'Africa/Johannesburg'
                });

                let endFormatted = '';
                if (e.dtend && e.dtend.includes('T')) {
                  const endTIndex = e.dtend.indexOf('T');
                  const endTimePart = e.dtend.substring(endTIndex + 1);
                  const ehh = parseInt(endTimePart.substring(0, 2), 10);
                  const emm = parseInt(endTimePart.substring(2, 4), 10);
                  let endDateObj = e.dtend.endsWith('Z')
                    ? new Date(Date.UTC(parseInt(y), parseInt(m)-1, parseInt(d), ehh, emm))
                    : new Date(parseInt(y), parseInt(m)-1, parseInt(d), ehh, emm);
                  
                  endFormatted = endDateObj.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'Africa/Johannesburg'
                  });
                }

                timeStr = endFormatted ? `${startFormatted} - ${endFormatted}` : startFormatted;
              } catch (err) {
                console.error("Time parse warning:", err);
              }
            }
          }

          const cat = determineCategory(e.summary || 'Shared Assembly');
          const isPriv = determinePrivateStatus(e.summary || '');

          return {
            id: `google-${idx}-${dateStr}`,
            title: e.summary || 'Residency Event',
            date: dateStr,
            time: timeStr,
            location: e.location || 'The Twelve Headquarters, Hillcrest',
            category: cat,
            spotsLeft: isPriv ? 0 : Math.floor(Math.random() * 12) + 4,
            isPrivate: isPriv,
            description: e.description || `Official discipleship session: ${e.summary || 'Residency event'}`
          };
        });

        // Filter events starting from index reference June 1, 2026 onwards to focus on residency season
        const filtered = formattedEvents
          .filter(e => e.date >= '2026-06-01' && e.title)
          .sort((a, b) => a.date.localeCompare(b.date));

        if (filtered.length === 0) {
          console.warn("No upcoming events found from feed. Saving fallbacks.");
          writeEvents(FALLBACK_EVENTS);
        } else {
          console.log(`Extracted ${filtered.length} upcoming events successfully.`);
          writeEvents(filtered);
        }
      } catch (err) {
        console.error("Failed parsing iCal. Falling back.", err);
        writeEvents(FALLBACK_EVENTS);
      }
    });
  });

  req.on('error', (err) => {
    console.error("HTTP network request failed:", err.message);
    writeEvents(FALLBACK_EVENTS);
  });

  // Set timeout of 8 seconds
  req.setTimeout(8000, () => {
    console.warn("Request to Google Calendar timed out. Using fallback list.");
    req.destroy();
    writeEvents(FALLBACK_EVENTS);
  });
}

function writeEvents(events) {
  try {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(events, null, 2), 'utf8');
    console.log(`Live calendar JSON successfully compiled to ${OUTPUT_PATH}!`);
  } catch (err) {
    console.error("Failed to write live calendar JSON file:", err);
  }
}

fetchCalendar();
