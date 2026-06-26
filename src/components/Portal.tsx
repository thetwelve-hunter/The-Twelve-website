/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Shield, Flame, BookOpen } from 'lucide-react';

interface PortalProps {
  onEnter: () => void;
}

export function WheatStemSvg({ className = "w-24 h-48", animate = true }) {
  return (
    <svg 
      viewBox="0 0 100 220" 
      className={`${className} text-[#9A7D3C] drop-shadow-[0_2px_10px_rgba(154,125,60,0.15)]`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stem */}
      <motion.path 
        d="M50 210 Q50 110 52 20" 
        stroke="currentColor" 
        strokeWidth="3.5" 
        strokeLinecap="round"
        initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Left and Right Seeds */}
      {[
        { cy: 170, leftX: 25, rightX: 75, angle: 30, delay: 0.3 },
        { cy: 145, leftX: 23, rightX: 77, angle: 25, delay: 0.5 },
        { cy: 120, leftX: 21, rightX: 79, angle: 20, delay: 0.7 },
        { cy: 95,  leftX: 22, rightX: 78, angle: 15, delay: 0.9 },
        { cy: 70,  leftX: 24, rightX: 76, angle: 10, delay: 1.1 },
        { cy: 45,  leftX: 28, rightX: 72, angle: 5,  delay: 1.3 },
      ].map((grain, idx) => (
        <React.Fragment key={idx}>
          {/* Left grain */}
          <motion.path
            d={`M51 ${grain.cy} Q${grain.leftX} ${grain.cy - 12} 50 ${grain.cy - 24}`}
            stroke="currentColor"
            strokeWidth="3"
            fill="currentColor"
            fillOpacity="0.15"
            strokeLinecap="round"
            initial={animate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            animate={animate ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: grain.delay, duration: 0.6, type: "spring", stiffness: 100 }}
            className="origin-bottom-right"
          />
          <motion.circle
            cx={grain.leftX + 2}
            cy={grain.cy - 14}
            r="1.5"
            fill="currentColor"
            initial={animate ? { scale: 0 } : { scale: 1 }}
            animate={animate ? { scale: 1 } : {}}
            transition={{ delay: grain.delay + 0.2 }}
          />

          {/* Right grain */}
          <motion.path
            d={`M51 ${grain.cy} Q${grain.rightX} ${grain.cy - 12} 52 ${grain.cy - 24}`}
            stroke="currentColor"
            strokeWidth="3"
            fill="currentColor"
            fillOpacity="0.15"
            strokeLinecap="round"
            initial={animate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            animate={animate ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: grain.delay + 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
            className="origin-bottom-left"
          />
          <motion.circle
            cx={grain.rightX - 2}
            cy={grain.cy - 14}
            r="1.5"
            fill="currentColor"
            initial={animate ? { scale: 0 } : { scale: 1 }}
            animate={animate ? { scale: 1 } : {}}
            transition={{ delay: grain.delay + 0.3 }}
          />
        </React.Fragment>
      ))}

      {/* Top seed */}
      <motion.path
        d="M52 20 Q50 2 48 20"
        stroke="currentColor"
        strokeWidth="3"
        fill="currentColor"
        initial={animate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        animate={animate ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
    </svg>
  );
}

export default function Portal({ onEnter }: PortalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [typedIndex, setTypedIndex] = useState(0);
  const scriptureQuote = "WE ALL HAVE A LIMITED TIME ON THIS EARTH. HOW ARE YOU GOING TO SPEND IT?";

  // Float particles effect in background
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth || window.innerWidth);
    let height = (canvas.height = container.clientHeight || 600);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        width = canvas.width = rect.width || container.clientWidth || window.innerWidth;
        height = canvas.height = rect.height || container.clientHeight || 600;
      }
    });
    
    resizeObserver.observe(container);

    const particles: Array<{
      x: number;
      y: number;
      r: number;
      d: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    // Create gold dust particles
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.5,
        d: Math.random() * 100,
        speedY: -(Math.random() * 0.6 + 0.2), // float upwards gently like embers
        speedX: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Gold particles
      ctx.fillStyle = 'rgba(154, 125, 60, 0.4)';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        ctx.fillStyle = `rgba(154, 125, 60, ${p.opacity})`;
        ctx.fill();

        // Update positions
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.d) * 0.1;
        p.d += 0.01;

        // Reset if goes off top
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      id="landing-portal" 
      className="relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center py-16 px-4 md:px-12 font-sans select-none overflow-hidden rounded-3xl bg-transparent"
    >
      {/* Visual Canvas Background with glowing gold dust */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Main Branding Section */}
      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center my-auto space-y-8">
        
        {/* The Twelve Brand Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="relative p-2"
        >
          <img 
            src="/assets/images/The_Twelve_Logo preview.png" 
            className="w-32 md:w-44 h-auto object-contain mx-auto drop-shadow-[0_2px_10px_rgba(154,125,60,0.15)]" 
            alt="The Twelve Logo"
          />
        </motion.div>

        {/* Dynamic Typography Title */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2.5"
          >
            <div className="text-xs tracking-[0.25em] text-[#9A7D3C] font-extrabold uppercase">
              Premier Youth Discipleship Program
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#9A7D3C]/10 border border-[#9A7D3C]/30 text-[#9A7D3C] text-[9px] font-mono font-black uppercase tracking-widest animate-pulse">
              <span>📅 Applications open until 1 September</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="font-serif text-4xl md:text-6xl text-[#1C1917] tracking-tight leading-tight"
          >
            THE TWELVE
            <span className="block font-sans text-lg md:text-2xl font-light text-[#9A7D3C] tracking-[0.3em] uppercase mt-2">
              Discipleship Team
            </span>
          </motion.h1>
        </div>

        {/* The Core Question Call-out */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-xl mx-auto py-2 px-6"
        >
          <p className="font-serif text-[#1C1917]/90 text-sm md:text-lg italic tracking-wide leading-relaxed font-semibold">
            &ldquo;We all have a limited time on this earth. How are you going to spend it?&rdquo;
          </p>
        </motion.div>

        {/* Navigation Action */}
        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          id="enter-btn"
          className="relative group px-10 py-4 overflow-hidden rounded-full bg-[#1C1917] text-[#FDFBF7] shadow-xl hover:shadow-[#9A7D3C]/10 cursor-pointer transition-all"
        >
          {/* Ambient dust effect in hover */}
          <div className="absolute inset-0 w-full h-full bg-[#9A7D3C] translate-y-12 group-hover:translate-y-0 transition-transform duration-300 -z-10" />
          
          <span className="flex items-center space-x-3 text-xs md:text-sm tracking-[0.2em] font-bold uppercase z-10">
            <span>Explore the Portal</span>
            <ArrowRight className="w-4 h-4 text-[#9A7D3C] group-hover:text-[#FDFBF7] transition-colors" />
          </span>
        </motion.button>
      </div>
    </div>
  );
}
