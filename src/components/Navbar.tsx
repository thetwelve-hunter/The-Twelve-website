/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, BookOpen, Clock, Home, Flame, Mail, Award, Users, Calendar, Heart, ClipboardList } from 'lucide-react';

const theTwelveLogoImg = "/assets/images/the_twelve_logo.png";

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onRestart: () => void;
}

export default function Navbar({ currentTab, onSelectTab, onRestart }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pages = [
    { 
      id: 'home', 
      label: 'Home', 
      description: 'The Welcome Portal, live highlights, and team member spotlight', 
      icon: Home, 
      tag: 'Section I' 
    },
    { 
      id: 'about', 
      label: 'About', 
      description: 'Our Core Philosophy, discipleship values, & foundational mission charter', 
      icon: BookOpen, 
      tag: 'Section II' 
    },
    { 
      id: 'service', 
      label: 'Events', 
      description: 'Interactive creative calendar showing upcoming open devotionals & physical timelines', 
      icon: Calendar, 
      tag: 'Section III' 
    },
    { 
      id: 'partner', 
      label: 'Partner', 
      description: 'Sponsor dynamic regional missions trips & monthly team discipleship stipends', 
      icon: Heart, 
      tag: 'Section IV' 
    },
    { 
      id: 'apply', 
      label: 'Apply', 
      description: 'Team Application, daily routine handbook, cost structure review, and manuals catalog', 
      icon: ClipboardList, 
      tag: 'Section V' 
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      description: 'Emergency protocols, telephone listings, and our interactive message panel', 
      icon: Mail, 
      tag: 'Section VI' 
    },
  ];

  const handleTabClick = (tabId: string) => {
    onSelectTab(tabId);
    setDrawerOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-[#FDFBF7]/85 backdrop-blur-md border-b border-[#EADCC2]/75 hover:border-[#9A7D3C]/45 transition-colors select-none">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">
          
          {/* Brand logo link */}
          <button 
            onClick={() => { handleTabClick('home'); }}
            className="flex items-center space-x-2.5 cursor-pointer text-left focus:outline-none group animate-fade-in"
            id="nav-logo-btn"
          >
            <div className="bg-[#FAF7EF] p-1 rounded-xl text-[#FDF9F7] group-hover:bg-[#FAF7EF] transition-colors w-10 h-10 flex items-center justify-center overflow-hidden border border-[#EADCC2]">
              <img 
                src={theTwelveLogoImg} 
                alt="The Twelve Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="flex flex-col col-span-2">
              <span className="font-serif tracking-widest text-[11px] font-black text-[#1C1917] uppercase">The Twelve</span>
              <span className="text-[9px] tracking-wider text-[#9A7D3C] uppercase font-bold">Discipleship Program</span>
            </div>
          </button>

          {/* Symmetrical Desktop Inline Selection layout */}
          <div className="hidden lg:flex items-center space-x-1 border-r border-[#EADCC2]/60 pr-4">
            {pages.map((page) => {
              const isActive = currentTab === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => handleTabClick(page.id)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-serif uppercase tracking-widest cursor-pointer transition-all ${
                    isActive 
                      ? 'text-[#FDFBF7] bg-[#1C1917] font-bold shadow-xs' 
                      : 'text-[#1C1917]/70 hover:bg-[#EADCC2]/30 hover:text-[#1c1917]'
                  }`}
                >
                  {page.label}
                </button>
              );
            })}
          </div>

          {/* Absolute Menu Icon Controller with Text badge */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleTabClick('apply')}
              className="hidden sm:inline-block px-4 py-1.5 rounded-full border border-[#9A7D3C]/60 text-[#9A7D3C] hover:bg-[#9A7D3C] hover:text-[#FDFBF7] transition-colors text-[10px] tracking-wider uppercase font-bold cursor-pointer"
            >
              Apply
            </button>

            {/* Menu icon connected with pages */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              id="global-menu-trigger"
              className="px-3 py-1.5 rounded-xl border border-[#EADCC2] text-[#1C1917] hover:bg-[#FAF7EF] cursor-pointer flex items-center space-x-2 transition-colors duration-200 z-50 text-xs font-serif uppercase tracking-wider font-bold"
            >
              <AnimatePresence mode="wait">
                {drawerOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center space-x-1.5"
                  >
                    <X className="w-4 h-4 text-red-500" />
                    <span>Close</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center space-x-1.5 text-[#9A7D3C]"
                  >
                    <Menu className="w-4 h-4" />
                    <span>Menu</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </nav>

      {/* Deluxe Menu Shell Drawer overlay (Slides from right, dark aesthetic matching the sanctuary look) */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            
            {/* Backdrop click dismiss */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-[#1C1917]/50 backdrop-blur-xs cursor-pointer"
            />

            {/* Main Menu Panel drawer sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              id="navigation-drawer"
              className="relative w-full max-w-lg h-full bg-[#1C1917] hover:border-l hover:border-[#9A7D3C]/40 border-l border-[#3E3834] text-[#FDF9F7] shadow-2xl flex flex-col justify-between p-6 md:p-10 z-10 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-800"
            >
              
              {/* Header inside Menu */}
              <div className="flex justify-between items-center border-b border-[#3E3834] pb-6">
                <div className="flex items-center space-x-2.5">
                  <div className="bg-[#FAF7EF] p-1 rounded-xl w-10 h-10 flex items-center justify-center overflow-hidden border border-[#EADCC2]/20">
                    <img 
                      src={theTwelveLogoImg} 
                      alt="The Twelve Logo" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif tracking-widest text-xs font-black text-white uppercase">The Twelve</span>
                    <span className="text-[9px] tracking-wider text-[#9A7D3C] uppercase font-bold">Discipleship Program</span>
                  </div>
                </div>

                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-lg border border-[#3E3834] text-white/60 hover:text-[#9A7D3C] hover:border-[#9A7D3C] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Connected Pages list */}
              <div className="my-auto py-6 space-y-3">
                <span className="text-[9px] tracking-widest text-[#9A7D3C] font-black uppercase block mb-2">
                  EXPLORE TEAM SECTIONS
                </span>

                {pages.map((page) => {
                  const IconComp = page.icon;
                  const isActive = currentTab === page.id;
                  
                  return (
                    <button
                      key={page.id}
                      onClick={() => handleTabClick(page.id)}
                      className={`w-full p-4 rounded-2xl text-left cursor-pointer transition-all flex items-start gap-4 ${
                        isActive 
                          ? 'bg-[#9A7D3C] text-white shadow-lg border border-[#BA9A55]' 
                          : 'bg-[#292523] hover:bg-[#3E3834]/80 text-[#FDFBF7]/90 border border-transparent'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${isActive ? 'bg-white/20' : 'bg-[#1C1917]'} text-[#FDF9F7] mt-0.5`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="font-serif text-sm font-bold tracking-wide">{page.label}</span>
                          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${isActive ? 'bg-black/10 text-white' : 'bg-[#1C1917]'}`}>
                            {page.tag}
                          </span>
                        </div>
                        <p className={`text-[10px] leading-relaxed font-light ${isActive ? 'text-white/80' : 'text-white/50'}`}>
                          {page.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Drawer footer (Direct home portal restart) */}
              <div className="border-t border-[#3E3834] pt-6 space-y-4">
                <button
                  onClick={() => { handleTabClick('home'); }}
                  className="w-full py-3 rounded-xl bg-[#292523] hover:bg-[#9A7D3C]/20 border border-[#9A7D3C]/30 text-[#9A7D3C] text-xs font-serif tracking-widest uppercase font-bold transition-all text-center block cursor-pointer flex items-center justify-center gap-2"
                >
                  <Flame className="w-3.5 h-3.5 animate-pulse" />
                  <span>Restart Welcome Portal</span>
                </button>

                <p className="text-[9px] text-center text-white/30 uppercase font-mono tracking-wider">
                  Established 2012 • South Africa
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
