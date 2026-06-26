/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Portal from './Portal';
import CohortSection from './CohortSection';
import { Sparkles, Trophy, Users, Shield } from 'lucide-react';

interface HomeViewProps {
  onExplore: () => void;
}

export default function HomeView({ onExplore }: HomeViewProps) {
  return (
    <div className="w-full flex flex-col space-y-16">
      
      {/* 1. Hero Portal Greeting */}
      <Portal onEnter={onExplore} />

      {/* 2. Key Highlights Info Block */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="p-6 bg-white border border-[#E9D5B8] rounded-[2rem] flex items-start gap-4 hover:border-[#9A7D3C]/40 transition-colors shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[#9A7D3C]/10 flex items-center justify-center text-[#9A7D3C] flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-[#9A7D3C] font-extrabold uppercase tracking-widest block font-sans">TEAM SCALE</span>
            <h4 className="font-serif text-sm font-bold text-[#1C1917] leading-tight">12 Members Maximum</h4>
            <p className="text-[11px] text-[#1C1917]/70 font-light leading-relaxed font-sans">
              We focus purely on deep, systematic mentorship with only twelve carefully chosen individuals yearly.
            </p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 bg-white border border-[#E9D5B8] rounded-[2rem] flex items-start gap-4 hover:border-[#9A7D3C]/40 transition-colors shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[#9A7D3C]/10 flex items-center justify-center text-[#9A7D3C] flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-[#9A7D3C] font-extrabold uppercase tracking-widest block font-sans">LOCATED BOUNDS</span>
            <h4 className="font-serif text-sm font-bold text-[#1C1917] leading-tight">Durban, South Africa</h4>
            <p className="text-[11px] text-[#1C1917]/70 font-light leading-relaxed font-sans">
              Rooted in Hillcrest, KwaZulu-Natal, delivering strategic local support and high-performance guidelines.
            </p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 bg-white border border-[#E9D5B8] rounded-[2rem] flex items-start gap-4 hover:border-[#9A7D3C]/40 transition-colors shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-[#9A7D3C]/10 flex items-center justify-center text-[#9A7D3C] flex-shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-[#9A7D3C] font-extrabold uppercase tracking-widest block font-sans">CIVIC IMPACT</span>
            <h4 className="font-serif text-sm font-bold text-[#1C1917] leading-tight">10k+ Dedicated Hours</h4>
            <p className="text-[11px] text-[#1C1917]/70 font-light leading-relaxed font-sans">
              Our team contributes thousands of hours of service to community clinics and secondary schools.
            </p>
          </div>
        </div>

      </div>

      {/* 3. Interactive Team Members Spotlight Section */}
      <CohortSection />

    </div>
  );
}
