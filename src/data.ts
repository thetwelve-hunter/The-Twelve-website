/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Testimony, ValueCard, HouseRole, EmergencyContact } from './types';

export const SACRED_VALUES: ValueCard[] = [
  {
    letter: "S",
    word: "Strategic Growth",
    description: "Developing a robust foundation of personal maturity, critical reasoning, and high emotional intellect. We strive to refine our individual and collective capability continuously.",
    quote: "Building strength through calculated self-reflection and professional excellence."
  },
  {
    letter: "A",
    word: "Active Initiative",
    description: "Embracing unique developmental challenges, stepping outside of comfort zones, and leading complex projects with a deep commitment to excellence.",
    quote: "Progress belongs to those who act with resolve and venture into new horizons."
  },
  {
    letter: "C",
    word: "Courage & Integrity",
    description: "Standing firm on ethical principles and facing structural difficulties with bold resolve. We raise the civic standards within our community.",
    quote: "The highest command of leadership is keeping your word and protecting shared standards."
  },
  {
    letter: "R",
    word: "Real & Genuine",
    description: "Rejecting superficial masks, corporate jargon, and pretenses. We foster real collaboration, transparent workspace dynamics, and profound personal connection.",
    quote: "Real community is built when transparency and alignment replace passive compliance."
  },
  {
    letter: "E",
    word: "Enduring Mindset",
    description: "Targeting your efforts toward long-term institutional and social value. We focus on sustainability, environmental custody, and leaving an exceptional legacy.",
    quote: "Measure your success by the value that remains long after your work is complete."
  },
  {
    letter: "D",
    word: "Discipline & Mentorship",
    description: "Holding oneself accountable to rigorous professional guidelines, refining peer capabilities, and training the next wave of leaders.",
    quote: "Leadership is the deliberate practice of coaching others to surpass your own standards."
  }
];

export const ASH_VALUES: ValueCard[] = [
  {
    letter: "A",
    word: "Accountable",
    description: "Representing high standards in execution, and taking ownership of words, actions, deadlines, and household systems without requiring reminders.",
    quote: "Rejecting a culture of excuses in favor of direct, proactive responsibility."
  },
  {
    letter: "S",
    word: "Service-Minded",
    description: "Demonstrating civic commitment—eagerly supporting team operations, executing logistical tasks behind the scenes, and collaborating dynamically.",
    quote: "The value of a leader is measured in active contributions to the progress of the whole."
  },
  {
    letter: "H",
    word: "Honesty",
    description: "Upholding absolute, transparent rectitude in fiscal stewardship, professional relationships, and guidelines. Living clearly and beyond reproach.",
    quote: "Fostering absolute transparency breeds total mutual trust."
  }
];

export const HOUSE_ROSTER: HouseRole[] = [
  {
    day: "Monday",
    cookingTeam: ["Andrew", "Micaella"],
    cleaningTeam: ["Jarryd", "Tehillah"],
    dutyDetail: "Traditional dinner preparation / Curfew at 10:00 PM"
  },
  {
    day: "Tuesday",
    cookingTeam: ["Ben", "Kaitlyn"],
    cleaningTeam: ["James", "Caelyn"],
    dutyDetail: "Weekly Leadership Workshop setup / Mandatory seminar attendance at CityHill Hall"
  },
  {
    day: "Wednesday",
    cookingTeam: ["Jarryd", "James"],
    cleaningTeam: ["Andrew", "Ben"],
    dutyDetail: "Team peer-review sessions / Curfew at 10:00 PM"
  },
  {
    day: "Thursday",
    cookingTeam: ["Micaella", "Tehillah"],
    cleaningTeam: ["Kaitlyn", "Caelyn"],
    dutyDetail: "Analysis memo submission / Resident progress review panel"
  },
  {
    day: "Friday",
    cookingTeam: ["Andrew", "Caelyn"],
    cleaningTeam: ["Ben", "Micaella"],
    dutyDetail: "Youth Outreach & Empowerment workshop prep / Curfew at 12:00 Midnight"
  },
  {
    day: "Saturday",
    cookingTeam: ["Team Effort (Rostered)"],
    cleaningTeam: ["Whole Team (Facility Maintenance)"],
    dutyDetail: "Local community development programs & development logistics / Flexible evening hours"
  },
  {
    day: "Sunday",
    cookingTeam: ["Team dining events"],
    cleaningTeam: ["Kitchen Team A"],
    dutyDetail: "General assembly, team presentation block, and goal setting session"
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    role: "Program Director / Captain",
    name: "David Hunter",
    phone: "081 541 1335",
    email: "david@thetwelve.co.za"
  },
  {
    role: "Community Relations Board Rep",
    name: "Robbie Krause",
    phone: "0861122331",
    email: "hello@cityhill.co.za"
  },
  {
    role: "South African Police Services",
    name: "Local Hillcrest SAPS",
    phone: "10111",
    secondary: "031 761 5898 (Hillcrest Station)"
  },
  {
    role: "Medical Emergency & Hospital",
    name: "Hillcrest Private Hospital",
    phone: "031 761 5898",
    secondary: "Ambulance: 10177"
  }
];

export const INITIAL_TESTIMONIES: Testimony[] = [
  {
    id: "t1",
    name: "Andrew",
    classYear: "Team 2026",
    homeProvince: "Gauteng",
    category: "Professional Growth",
    testimonyText: "Connecting deeply in fellowship at The Twelve has entirely transformed my walk. Studying the Word together with the guys and sharing in community chore rosters has built a grit in me that I didn't know I possessed. It is about laying up treasures in Heaven rather than chasing earthly comforts.",
    keyVerse: "Treasures in Heaven",
    avatarSeed: "andrew",
    soundWavePulse: [10, 40, 20, 60, 80, 45, 90, 70, 30, 50, 10, 65, 80, 20, 95, 40, 20],
    dateAdded: "2026-03-15"
  },
  {
    id: "t2",
    name: "Jarryd",
    classYear: "Team 2026",
    homeProvince: "KwaZulu-Natal",
    category: "Radical Resilience",
    testimonyText: "Playing rugby and practicing sportsmanship taught me to tackle physical resistance, but here at The Twelve, I've learned spiritual perseverance. Responding to trials with a sense of humor and standing strong under pressure is how true discipleship is modeled. It's about how hard you can get hit and keep moving forward.",
    keyVerse: "Grit & Perseverance",
    avatarSeed: "jarryd",
    soundWavePulse: [30, 20, 50, 70, 40, 60, 50, 90, 80, 30, 40, 60, 20, 70, 50, 90, 40],
    dateAdded: "2026-04-10"
  },
  {
    id: "t3",
    name: "Kaitlyn",
    classYear: "Team 2026",
    homeProvince: "Free State",
    category: "Collaborative Leadership",
    testimonyText: "Waiting patiently on the Lord and serving behind the scenes with administrative care has defined my year here. In chore grids or dance tracks, I've found that true leaders serve first. He set my feet on a solid rock, putting a new song of praise in my heart.",
    keyVerse: "Patient Devotion",
    avatarSeed: "kaitlyn",
    soundWavePulse: [15, 30, 60, 80, 90, 45, 25, 75, 85, 95, 40, 35, 50, 75, 45, 60, 15],
    dateAdded: "2026-03-22"
  },
  {
    id: "t4",
    name: "Caelyn",
    classYear: "Team 2026",
    homeProvince: "KwaZulu-Natal",
    category: "Civic Empowerment",
    testimonyText: "Being part of our regional youth outreaches and cooking alongside others has made me realize how called and set-apart we really are. As an only child, navigating this large, energetic sibling circle showed me the deep beauty of Christian family. There is absolutely nothing that can separate us from His love.",
    keyVerse: "Set-Apart Devotion",
    avatarSeed: "caelyn",
    soundWavePulse: [20, 50, 40, 30, 80, 90, 100, 70, 50, 80, 60, 30, 45, 90, 75, 40, 30],
    dateAdded: "2026-05-18"
  }
];
