/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimony } from '../types';
import { INITIAL_TESTIMONIES } from '../data';
import { Play, Pause, ChevronLeft, ChevronRight, PenTool, Sparkles, Feather, HelpCircle } from 'lucide-react';

export default function Witness() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [activeTestimony, setActiveTestimony] = useState<Testimony | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [hoveredKernelId, setHoveredKernelId] = useState<string | null>(null);
  
  // Custom states for submission form
  const [formName, setFormName] = useState('');
  const [formProvince, setFormProvince] = useState('KwaZulu-Natal');
  const [formCategory, setFormCategory] = useState<Testimony['category']>("Professional Growth");
  const [formVerse, setFormVerse] = useState('');
  const [formText, setFormText] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  // Canvas particle state for submission celebration
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioAnimationRef = useRef<number | null>(null);
  const [waveHeights, setWaveHeights] = useState<number[]>([]);

  // Load testimonies from standard mock list + local storage
  useEffect(() => {
    const saved = localStorage.getItem('the_twelve_testimonies');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTestimonies([...INITIAL_TESTIMONIES, ...parsed]);
      } catch (err) {
        setTestimonies(INITIAL_TESTIMONIES);
      }
    } else {
      setTestimonies(INITIAL_TESTIMONIES);
    }
  }, []);

  // Pick first testimony as active by default
  useEffect(() => {
    if (testimonies.length > 0 && !activeTestimony) {
      setActiveTestimony(testimonies[0]);
    }
  }, [testimonies, activeTestimony]);

  // Audio simulated waveform pulse heights
  useEffect(() => {
    if (activeTestimony) {
      setWaveHeights(activeTestimony.soundWavePulse);
    }
  }, [activeTestimony]);

  // Waveform animation when "listening"
  useEffect(() => {
    if (isPlayingAudio) {
      const animateWave = () => {
        setWaveHeights(prev => 
          prev.map(h => {
            const delta = Math.sin(Date.now() / 150 + h) * 15;
            return Math.max(10, Math.min(100, h + delta));
          })
        );
        audioAnimationRef.current = requestAnimationFrame(animateWave);
      };
      audioAnimationRef.current = requestAnimationFrame(animateWave);
    } else {
      if (audioAnimationRef.current) {
        cancelAnimationFrame(audioAnimationRef.current);
      }
      if (activeTestimony) {
        setWaveHeights(activeTestimony.soundWavePulse);
      }
    }

    return () => {
      if (audioAnimationRef.current) {
        cancelAnimationFrame(audioAnimationRef.current);
      }
    };
  }, [isPlayingAudio, activeTestimony]);

  const handlePlayToggle = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleTestimonySelect = (test: Testimony) => {
    setActiveTestimony(test);
    setIsPlayingAudio(false);
  };

  const handleNextSubmit = () => {
    if (!activeTestimony) return;
    const idx = testimonies.findIndex(t => t.id === activeTestimony.id);
    const nextIdx = (idx + 1) % testimonies.length;
    handleTestimonySelect(testimonies[nextIdx]);
  };

  const handlePrevSubmit = () => {
    if (!activeTestimony) return;
    const idx = testimonies.findIndex(t => t.id === activeTestimony.id);
    const prevIdx = (idx - 1 + testimonies.length) % testimonies.length;
    handleTestimonySelect(testimonies[prevIdx]);
  };

  // Sower's Log Testimony submit with visual fireworks!
  const handleSowTestimony = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formText) return;

    const newTestimony: Testimony = {
      id: "cust-" + Date.now(),
      name: formName,
      classYear: "Class of " + new Date().getFullYear(),
      homeProvince: formProvince,
      category: formCategory,
      testimonyText: formText,
      keyVerse: formVerse || "Action Principle",
      avatarSeed: formName.toLowerCase().replace(/[^a-z]/g, '') || "disciple",
      soundWavePulse: Array.from({ length: 17 }, () => Math.round(Math.random() * 80 + 20)),
      dateAdded: new Date().toISOString().split('T')[0]
    };

    const updated = [...testimonies];
    // save to local storage (only the custom ones to avoid duplicate hardcoded)
    const customOnly = [newTestimony];
    const savedCustomRaw = localStorage.getItem('the_twelve_testimonies');
    let customList = [];
    if (savedCustomRaw) {
      try { customList = JSON.parse(savedCustomRaw); } catch(_) {}
    }
    customList.push(newTestimony);
    localStorage.setItem('the_twelve_testimonies', JSON.stringify(customList));

    setTestimonies([...INITIAL_TESTIMONIES, ...customList]);
    setActiveTestimony(newTestimony);
    setIsPlayingAudio(false);

    // Reset Form
    setFormName('');
    setFormText('');
    setFormVerse('');
    setShowForm(false);

    // Trigger explosive sparks celebration
    runCelebrationSparks();
  };

  // Celebration fireworks inside Canvas
  const runCelebrationSparks = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const sparks: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      alpha: number;
      decay: number;
    }> = [];

    const colors = ['#9A7D3C', '#E5D5B8', '#D9C4A1', '#1C1917', '#F3ECE0'];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Create 120 sparkle embers radiating outwards
    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      sparks.push({
        x: centerX,
        y: centerY - 100, // burst from center offset
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 2), // upward bias
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 1.5,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }

    let celebrationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let aliveCount = 0;
      sparks.forEach(p => {
        if (p.alpha > 0) {
          aliveCount++;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          // Move
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08; // gravity
          p.vx *= 0.98; // air friction
          p.alpha -= p.decay;
        }
      });

      ctx.globalAlpha = 1; // reset alpha

      if (aliveCount > 0) {
        celebrationFrame = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-16 py-8 px-4 font-sans relative">
      
      {/* Absolute floating celebrating canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />

      {/* Hero Sub-Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="inline-flex items-center space-x-2 px-3 py-1 bg-[#9A7D3C]/10 border border-[#9A7D3C]/20 rounded-full text-xs font-bold tracking-widest text-[#9A7D3C] uppercase animate-pulse">
          <Feather className="w-3.5 h-3.5 animate-bounce" />
          <span>The Living Experiences</span>
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#1C1917] tracking-tight leading-tight font-extrabold uppercase">
          THE TEAM ARCHIVE
        </h2>
        <p className="text-sm md:text-base text-[#1C1917]/70 font-light">
          Each team member leaves an indelible footprint in our development journey. Read their stories, review their metrics of progress, and record your own testimony.
        </p>
      </div>

      {/* THE SPATIAL MEADOW (Interactive Wheat Field showing kernels) */}
      <div id="meadow-field" className="bg-gradient-to-b from-[#FAF7EF] to-[#F2ECE0] border border-[#E9D5B8] p-6 md:p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden">
        
        {/* Soft atmospheric background mesh vectors */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#9a7d3c_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#EADCC2] pb-6 mb-8 gap-4">
          <div>
            <h3 className="font-serif text-xl text-[#1C1917] font-bold">The Field of Team Members</h3>
            <span className="text-[10px] tracking-wider text-[#9A7D3C] font-black uppercase">
              Click on any golden node to review their active impact journal
            </span>
          </div>

          <button 
            onClick={() => setShowForm(!showForm)}
            id="log-testimony-trigger"
            className="px-5 py-2.5 bg-[#1C1917] text-[#FDFBF7] rounded-xl text-xs font-serif tracking-widest uppercase hover:bg-[#9A7D3C] transition-all cursor-pointer flex items-center gap-2 shadow-md"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Log Your Experience</span>
          </button>
        </div>

        {/* Visual Kernels Grid */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-8 md:py-12">
          {testimonies.map((test, index) => {
            const isSelected = activeTestimony?.id === test.id;
            const isHovered = hoveredKernelId === test.id;
            
            // Generate deterministic colors based on type
            let colorTheme = "bg-[#9A7D3C]";
            let textTheme = "text-[#9A7D3C]";
            if ((test.category as string) === "Fierce Courage") {
              colorTheme = "bg-[#79612c]";
              textTheme = "text-[#79612c]";
            } else if ((test.category as string) === "Found Calling") {
              colorTheme = "bg-[#B58A30]";
              textTheme = "text-[#B58A30]";
            } else if ((test.category as string) === "Servant Leadership") {
              colorTheme = "bg-[#54431E]";
              textTheme = "text-[#54431E]";
            }

            return (
              <motion.button
                key={test.id}
                onClick={() => handleTestimonySelect(test)}
                onMouseEnter={() => setHoveredKernelId(test.id)}
                onMouseLeave={() => setHoveredKernelId(null)}
                className="relative cursor-pointer focus:outline-none"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {/* Glowing halo indicator */}
                <AnimatePresence>
                  {(isSelected || isHovered) && (
                    <motion.span 
                      className="absolute -inset-3 rounded-2xl bg-[#9A7D3C]/10 border border-[#9A7D3C]/30 z-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                {/* Simulated Wheat Seed capsule shape */}
                <div className={`relative z-10 px-4 py-2.5 rounded-xl border flex items-center gap-2 shadow-xs transition-all ${
                  isSelected 
                    ? 'bg-[#1C1917] border-[#9A7D3C] text-[#FDFBF7]' 
                    : 'bg-white border-[#E5D5B8] text-[#1C1917] hover:border-[#9A7D3C]/60'
                }`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-[#9A7D3C] animate-pulse' : colorTheme}`} />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-sans font-bold leading-normal tracking-wide">
                      {test.name.split(' ')[0]}
                    </span>
                    <span className="text-[8px] text-[#9A7D3C] uppercase font-black tracking-widest mt-[-2px]">
                      {test.classYear.split(' ').pop()}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>

      {/* POPUP SUBMISSION JOURNAL DIALOG (Sower's Registry Form) */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#FAF7EF] border-2 border-[#9A7D3C]/40 p-6 md:p-8 rounded-3xl shadow-xl max-w-xl mx-auto space-y-6 z-20 relative"
          >
            <div className="flex justify-between items-center border-b border-[#EADCC2] pb-3 mb-4">
              <span className="font-serif font-bold text-lg text-[#1C1917] flex items-center gap-2">
                <Feather className="w-4 h-4 text-[#9A7D3C]" />
                Write Your Experiential Log
              </span>
              <button 
                onClick={() => setShowForm(false)}
                className="text-xs text-red-500 font-bold uppercase hover:underline cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSowTestimony} className="space-y-4 text-xs md:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-[#1C1917]/60 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. John Doe"
                    id="witness-signer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9D5B8] bg-white text-[#1C1917] focus:outline-none focus:border-[#9A7D3C]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-[#1C1917]/60 uppercase tracking-widest">Home Province</label>
                  <select 
                    value={formProvince}
                    onChange={(e) => setFormProvince(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9D5B8] bg-white text-[#1C1917] focus:outline-none"
                  >
                    {["KwaZulu-Natal", "Gauteng", "Western Cape", "Eastern Cape", "Mpumalanga", "Limpopo", "North West", "Free State", "Northern Cape"].map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-[#1C1917]/60 uppercase tracking-widest">Impact Category</label>
                  <select 
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Testimony['category'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9D5B8] bg-white text-[#1C1917] focus:outline-none"
                  >
                    {["Professional Growth", "Collaborative Leadership", "Civic Empowerment", "Radical Resilience"].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-[#1C1917]/60 uppercase tracking-widest">Core Focus Tag</label>
                  <input 
                    type="text" 
                    value={formVerse}
                    onChange={(e) => setFormVerse(e.target.value)}
                    placeholder="e.g. Identity & Resilience"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9D5B8] bg-white text-[#1C1917] focus:outline-none focus:border-[#9A7D3C]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-[#1C1917]/60 uppercase tracking-widest">Your Account / Experience Narrative</label>
                <textarea 
                  required
                  rows={4}
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="How did the program format shift your leadership direction? Share your general residency account..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E9D5B8] bg-white text-[#1C1917] focus:outline-none focus:border-[#9A7D3C]"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-[#1C1917] text-[#FDFBF7] font-serif uppercase tracking-widest text-xs font-bold rounded-xl hover:bg-[#9A7D3C] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#9A7D3C]" />
                <span>Publish Experiential Log</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE CENTRAL JOURNAL BOOK RENDER (Main selected Testimony detail page) */}
      {activeTestimony && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#FDFBF7] border border-[#EADCC2] rounded-[2.5rem] p-6 md:p-12 shadow-md relative group max-w-4xl mx-auto"
        >
          {/* Aesthetic bookmark binder rings on left for physical book realism */}
          <div className="absolute left-[20px] top-4 bottom-4 w-1 border-r-2 border-dashed border-[#EADCC2]/70 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
            
            {/* Left page: Profile & sound waveform visualizer */}
            <div className="md:col-span-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EADCC2]/60 pb-8 md:pb-0 md:pr-8 space-y-6">
              
              <div className="space-y-4">
                {/* Visual custom sketchy placeholder matching seed initials */}
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-[#1C1917] text-[#FDFBF7] flex items-center justify-center font-serif text-3xl font-bold shadow-lg border border-[#9A7D3C] relative overflow-hidden">
                  <span className="z-10">{activeTestimony.name.charAt(0)}</span>
                  <div className="absolute inset-0 bg-[#9A7D3C]/10 skew-x-12" />
                </div>

                <div className="text-center">
                  <h3 className="font-serif text-lg md:text-xl text-[#1C1917] font-bold">
                    {activeTestimony.name}
                  </h3>
                  <div className="flex justify-center items-center gap-1 text-[10px] font-bold text-[#9A7D3C] uppercase tracking-wider mt-0.5">
                    <span>{activeTestimony.classYear}</span>
                    <span>•</span>
                    <span>{activeTestimony.homeProvince}</span>
                  </div>
                  <span className="inline-block mt-2 px-2.5 py-0.5 bg-amber-500/10 text-[#6B531C] text-[8px] font-black uppercase tracking-widest rounded-full border border-amber-500/20">
                    {activeTestimony.category}
                  </span>
                </div>
              </div>

              {/* Dynamic simulated audio waveform pulse player */}
              <div className="bg-[#FAF7EF] p-4 rounded-2xl border border-[#EADCC2]/50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold text-[#1C1917]/50 uppercase tracking-widest flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full bg-red-500 ${isPlayingAudio ? 'animate-ping' : ''}`} />
                    Audio Projection Mode
                  </span>
                  
                  {/* Symmetrical simple audio state marker */}
                  <span className="text-[8px] font-mono font-bold text-[#9A7D3C] uppercase text-right">
                    {isPlayingAudio ? "Streaming voice..." : "Standby"}
                  </span>
                </div>

                {/* Bars heights list mapped dynamically */}
                <div className="h-14 flex items-end justify-center gap-[3px] select-none">
                  {waveHeights.map((h, i) => (
                    <span 
                      key={i}
                      className={`w-[4px] rounded-full transition-all duration-300 ${isPlayingAudio ? 'bg-[#9A7D3C]' : 'bg-[#D9C4A1]/60'}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                {/* Big play button key toggle */}
                <button
                  onClick={handlePlayToggle}
                  className="w-full py-2.5 rounded-xl bg-[#1C1917] text-[#FDFBF7] text-xs font-serif tracking-widest uppercase hover:bg-[#9A7D3C] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-red-400" />
                      <span>Pause projection</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#9A7D3C]" />
                      <span>Listen to voice</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Right page: The handwritten / beautiful cursive text journal entry */}
            <div className="md:col-span-8 flex flex-col justify-between md:pl-2 space-y-6">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] tracking-wide text-[#1C1917]/40 uppercase font-bold">
                  <span>LOG DIARY REGISTER</span>
                  <span>RECORDED {activeTestimony.dateAdded}</span>
                </div>

                <div className="font-serif italic text-sm md:text-base text-[#1C1917]/90 leading-relaxed font-light space-y-4">
                  <p>&ldquo;{activeTestimony.testimonyText}&rdquo;</p>
                </div>
              </div>

              {/* Signature, Scripture reference & slider navigate links */}
              <div className="space-y-4 pt-6 border-t border-[#EADCC2]/60">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[8px] tracking-wider text-[#1C1917]/40 uppercase font-bold">CORE LEADERSHIP OBJECTIVE</span>
                    <div className="px-3 py-1 bg-[#1C1917] rounded-lg text-white font-serif text-[10px] font-bold inline-block border border-[#9A7D3C]">
                      {activeTestimony.keyVerse}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[8px] tracking-wider text-[#1C1917]/40 uppercase font-black block">LEDGER SIGN-OFF</span>
                    <span className="font-serif italic text-lg text-[#9A7D3C] font-semibold tracking-wide">
                      {activeTestimony.name}
                    </span>
                  </div>
                </div>

                {/* Index navigation selectors */}
                <div className="flex justify-end items-center gap-1.5 pt-2">
                  <button 
                    onClick={handlePrevSubmit}
                    className="p-2 rounded-xl bg-[#FAF7EF] border border-[#EADCC2] text-[#1C1917] hover:bg-white hover:text-[#9A7D3C] cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[10px] font-mono font-bold text-[#1C1917]/50 px-2 select-none">
                    {testimonies.findIndex(t => t.id === activeTestimony.id) + 1} of {testimonies.length}
                  </span>
                  <button 
                    onClick={handleNextSubmit}
                    className="p-2 rounded-xl bg-[#FAF7EF] border border-[#EADCC2] text-[#1C1917] hover:bg-white hover:text-[#9A7D3C] cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      )}

    </div>
  );
}
