/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Testimony {
  id: string;
  name: string;
  classYear: string;
  homeProvince: string;
  category: "Professional Growth" | "Collaborative Leadership" | "Civic Empowerment" | "Radical Resilience";
  testimonyText: string;
  keyVerse: string;
  avatarSeed: string; // for custom visual rendering
  soundWavePulse: number[];
  dateAdded: string;
}

export interface ValueCard {
  letter: string;
  word: string;
  description: string;
  quote: string;
}

export interface HouseRole {
  day: string;
  cookingTeam: string[];
  cleaningTeam: string[];
  dutyDetail: string;
}

export interface EmergencyContact {
  role: string;
  name: string;
  phone: string;
  email?: string;
  secondary?: string;
}
