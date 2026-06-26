/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import HomeView from './components/HomeView';
import Navbar from './components/Navbar';
import Charter from './components/Charter';
import EventsView from './components/EventsView';
import ContactView from './components/ContactView';
import PartnerView from './components/PartnerView';
import ApplyView from './components/ApplyView';
import PageBackground from './components/PageBackground';
import { Mail, Phone, ArrowUp, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnterProgram = () => {
    setCurrentTab('about');
    scrollToTop();
  };

  const handleSelectTab = (tabId: string) => {
    setCurrentTab(tabId);
    scrollToTop();
  };

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView onExplore={handleEnterProgram} />;
      case 'about':
        return <Charter />;
      case 'service':
        return <EventsView />;
      case 'partner':
        return <PartnerView />;
      case 'apply':
        return <ApplyView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView onExplore={handleEnterProgram} />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#1C1917] flex flex-col justify-between selection:bg-[#9A7D3C] selection:text-white relative">
      
      {/* Global floating gold dust background across all pages */}
      <PageBackground />

      {/* Dynamic Navigation Row */}
      <Navbar 
        currentTab={currentTab} 
        onSelectTab={handleSelectTab} 
        onRestart={() => handleSelectTab('home')} 
      />

      {/* Main active sub-page workspace */}
      <main className="flex-grow py-8 md:py-12 bg-transparent relative z-10">
        <div className="opacity-0 animate-fade-in [animation-fill-mode:forwards] [animation-duration:800ms]">
          {renderActiveTab()}
        </div>
      </main>

      {/* Elegant Architectural Footer */}
      <footer className="bg-[#1C1917] text-[#FDF9F7] border-t-2 border-[#9A7D3C]/40 py-12 px-6 md:px-12 selection:bg-white selection:text-[#1C1917]">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/5 pb-10">
          
          {/* Logo & Call to Action summary block */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="bg-[#FAF7EF] p-1 rounded-xl w-10 h-10 flex items-center justify-center overflow-hidden border border-white/10">
                <img 
                  src="/assets/images/the_twelve_logo.png" 
                  alt="The Twelve Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-xs font-bold uppercase text-white">The Twelve</span>
                <span className="text-[9px] tracking-wider text-[#9A7D3C] uppercase font-bold">Discipleship South Africa</span>
              </div>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Equipping South Africa&apos;s youth with deep spiritual resilience, practical discipleship foundations, and 
              character discipline. A rigorous team cycle built on mutual progress and service.
            </p>
          </div>

          {/* Quick links & sites Map */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] tracking-widest text-[#9A7D3C] font-black uppercase block">
              COVENANT NETWORKS
            </span>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a 
                  href="http://www.cityhillchurch.co.za" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-white/70 hover:text-[#9A7D3C] transition-colors"
                >
                  ⛪ CityHill Church Durban / Hillcrest
                </a>
              </li>
              <li>
                <span className="text-white/40 font-light block mt-3">
                  📍 Hillcrest, KwaZulu-Natal, South Africa
                </span>
              </li>
            </ul>
          </div>

          {/* Core Contacts references */}
          <div className="md:col-span-4 space-y-4 text-xs font-medium">
            <span className="text-[10px] tracking-widest text-[#9A7D3C] font-black uppercase block">
              DIRECTORATE INQUIRIES
            </span>
            <div className="space-y-2">
              <a href="mailto:david@thetwelve.co.za" className="flex items-center gap-2 hover:text-[#9A7D3C] transition-colors text-white/70">
                <Mail className="w-4 h-4 text-[#9A7D3C]" />
                <span>david@thetwelve.co.za</span>
              </a>
              <a href="tel:0815411335" className="flex items-center gap-2 hover:text-[#9A7D3C] transition-colors text-white/70">
                <Phone className="w-4 h-4 text-[#9A7D3C]" />
                <span>081 541 1335 (David Hunter Direct)</span>
              </a>
              <a href="mailto:hello@cityhill.co.za" className="flex items-center gap-2 hover:text-[#9A7D3C] transition-colors text-white/70">
                <Mail className="w-4 h-4 text-[#9A7D3C]" />
                <span>hello@cityhill.co.za (CityHill General)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Back to top scroll and licensing */}
        <div className="w-full max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-widest text-white/30 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span>© {new Date().getFullYear()} The Twelve Discipleship. All rights sacred.</span>
            <span className="hidden sm:inline text-white/10">•</span>
            <a 
              href="https://wa.me/27731595846?text=Hi%20Peter%2C%20I%20saw%20your%20work%20on%20The%20Twelve%20website%20and%20would%20love%20to%20chat%20about%20a%20website%20project!" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9A7D3C] hover:text-[#C5A869] transition-colors hover:underline tracking-widest uppercase font-bold text-[9.5px]"
            >
              Developed by Peter
            </a>
          </div>
          
          <button 
            onClick={() => handleSelectTab('apply')}
            className="flex items-center gap-1 hover:text-[#9A7D3C] transition-colors cursor-pointer group"
          >
            <span>Apply</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </footer>

    </div>
  );
}
