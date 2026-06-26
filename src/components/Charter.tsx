/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SACRED_VALUES, ASH_VALUES } from '../data';
import { Sparkles, Trophy, Heart, Flame, Shield, ArrowUpRight, Scale, Users, CheckCircle, ExternalLink } from 'lucide-react';

const davidHunterImg = "/assets/images/Hunter.png";

const DAVID_FACTS = [
  {
    id: 1,
    short: "Born 28 Aug 2003 and lives in Hillcrest, SA (also lived in the US)",
    category: "Roots & Travel",
    extended: "David brings a global perspective to our South African base. Having experienced collegiate fellowship and outreach work in both North America and KwaZulu-Natal, he integrates top-tier administrative discipline with local community roots.",
    noteX: 18, noteY: 10,
    targetX: 43, targetY: 34,
    arrowD: "M 18 10 Q 30 18 43 34"
  },
  {
    id: 2,
    short: "Same hairstyle for 12 years",
    category: "Personal Signature",
    extended: "A testament to unwavering consistency! David jokes that solid leadership requires stable foundations, but some things—like a reliable childhood haircut—remain proudly unchanged.",
    noteX: 16, noteY: 26,
    targetX: 42, targetY: 28,
    arrowD: "M 16 26 Q 28 20 42 28"
  },
  {
    id: 3,
    short: "Oldest of 4 (2 sisters, 1 brother)",
    category: "Family Roots",
    extended: "Being the eldest sibling taught David early responsibility. Balancing household chores and resolving sibling disputes was perfect preparation for managing twelve passionate, high-energy young leaders.",
    noteX: 16, noteY: 42,
    targetX: 41, targetY: 45,
    arrowD: "M 16 42 Q 28 40 41 45"
  },
  {
    id: 4,
    short: "Hobbies: Soccer, music... and annoying his sisters",
    category: "Recreation",
    extended: "Active leadership stays fresh through play. Whether leading a high-tempo football match on the lawn or playing acoustic worship songs around the student hearth, David keeps community joy alive.",
    noteX: 18, noteY: 58,
    targetX: 38, targetY: 60,
    arrowD: "M 18 58 Q 28 62 38 60"
  },
  {
    id: 5,
    short: "Fun Facts: • Broke his arm tripping over a wire • Led worship around the world",
    category: "Memorable Incidents",
    extended: "A beautiful combination of human clumsiness and high-purpose service! Tripping over wire led to a fractured cast as a teen, but didn't stop him from traveling globally to lead deep acoustic worship.",
    noteX: 18, noteY: 74,
    targetX: 36, targetY: 78,
    arrowD: "M 18 74 Q 26 80 36 78"
  },
  {
    id: 6,
    short: "Size 11 shoes",
    category: "Movement Pace",
    extended: "Big shoes to fill! David sets the literal stride of hard physical pacing, running alongside team members through muddy outreach paths and local township development events.",
    noteX: 20, noteY: 92,
    targetX: 43, targetY: 92,
    arrowD: "M 20 92 Q 32 94 43 92"
  },
  {
    id: 7,
    short: "Bucket list: shark cage diving, skydiving, and travelling to Norway, Italy, and Australia.",
    category: "High Ambition",
    extended: "An adventurous spirit is infectious. David urges the team to target monumental dreams, refuse comfort-zone security, and approach their personal calling with deep faith.",
    noteX: 82, noteY: 10,
    targetX: 58, targetY: 30,
    arrowD: "M 82 10 Q 70 18 58 30"
  },
  {
    id: 8,
    short: "Favourite colour: Lumo Green",
    category: "Creative Signature",
    extended: "Vibrant, high-visibility, and full of positive energy. A bright, neon hallmark that inspires our team and reflects active engagement across our community plans.",
    noteX: 84, noteY: 26,
    targetX: 58, targetY: 42,
    arrowD: "M 84 26 Q 72 35 58 42"
  },
  {
    id: 9,
    short: "Ice cream and lasagne lover",
    category: "Culinary Comfort",
    extended: "Nightly shared fellowship tables are crucial to us, and David firmly believes that a warm lasagna tray and fine ice cream are unparalleled for bringing students together to debrief.",
    noteX: 84, noteY: 42,
    targetX: 58, targetY: 53,
    arrowD: "M 84 42 Q 72 48 58 53"
  },
  {
    id: 10,
    short: "Favourite Disney movie: The Lion King",
    category: "Inspirational Movie",
    extended: "A classic narrative of family duties, restoring heritage, and rising to active community responsibility. Simba's growth from avoidance to mature service aligns directly with our mentoring ethos.",
    noteX: 84, noteY: 58,
    targetX: 58, targetY: 65,
    arrowD: "M 84 58 Q 72 63 58 65"
  },
  {
    id: 11,
    short: "Comfort = worship + cartoons + hot choc",
    category: "Unwind Routine",
    extended: "Slowing down is essential for long-term endurance. After rigorous outdoor mentoring, David's favorite reset button is steaming cocoa, cartoons, and peaceful worship space.",
    noteX: 80, noteY: 74,
    targetX: 59, targetY: 82,
    arrowD: "M 80 74 Q 70 80 59 82"
  },
  {
    id: 12,
    short: "1 Corinthians 10:31",
    category: "Life Standard Verse",
    extended: "'So whether you eat or drink or whatever you do, do it all for the glory of God.' This foundational scripture drives our entire standard of character and performance excellence.",
    noteX: 74, noteY: 92,
    targetX: 56, targetY: 88,
    arrowD: "M 74 92 Q 65 94 56 88"
  }
];

const zoePadburyImg = "/assets/images/zoe_padbury.png";

const ZOE_FACTS = [
  {
    id: 1,
    short: "Born on 23 August 2005, lives in Hillcrest South Africa (but currently based in PTA for uni)",
    category: "Roots & Base",
    extended: "Zoe balances her academic pursuits in Pretoria with her deep-seated roots in Hillcrest. Her journey represents the heart of the modern South African student—determined, adaptive, and anchored in home values.",
    noteX: 82, noteY: 10,
    targetX: 58, targetY: 30,
    arrowD: "M 82 10 Q 70 18 58 30"
  },
  {
    id: 2,
    short: "Siblings: 1 older sister (whose her best friend)",
    category: "Family & Bond",
    extended: "Family forms the bedrock of Zoe's team spirit. Her close connection with her older sister speaks to her loyalty, devotion, and capacity to nurture peer relationships in the residency.",
    noteX: 16, noteY: 26,
    targetX: 42, targetY: 28,
    arrowD: "M 16 26 Q 28 20 42 28"
  },
  {
    id: 3,
    short: "Favourite colour: blue (with pink as a close second)",
    category: "Aesthetic",
    extended: "A serene, calming blue baseline with vibrant pink accents. Zoe's aesthetic choices reflect her capability to blend peaceful structure with energetic, joyful service.",
    noteX: 18, noteY: 74,
    targetX: 36, targetY: 78,
    arrowD: "M 18 74 Q 26 80 36 78"
  },
  {
    id: 4,
    short: "Could live off pasta and cake for the rest of her life.",
    category: "Food & Fellowship",
    extended: "In terms of communal dining, Zoe's simple, happy comfort food list is a reminder of the raw, honest conversations shared around the training camp hearth.",
    noteX: 16, noteY: 42,
    targetX: 41, targetY: 45,
    arrowD: "M 16 42 Q 28 40 41 45"
  },
  {
    id: 5,
    short: "Fun Facts: Has a serious rooibos tea addiction (like 6 cups a day)",
    category: "Habits & Warmth",
    extended: "A warm cup of classic South African Rooibos is Zoe's ultimate daily companion, fueling long reading sessions, early study groups, and deep team reflections.",
    noteX: 18, noteY: 58,
    targetX: 38, targetY: 60,
    arrowD: "M 18 58 Q 28 62 38 60"
  },
  {
    id: 6,
    short: "Probably wearing a dress with a ribbon or bow in hair",
    category: "Style Signature",
    extended: "Zoe's vintage, classic style speaks to her love for elegant traditions. Elegant bows and ribbons symbolize her gentle, orderly spirit.",
    noteX: 84, noteY: 26,
    targetX: 58, targetY: 42,
    arrowD: "M 84 26 Q 72 35 58 42"
  },
  {
    id: 7,
    short: "A folk-pop music fan- Noah Kahan is usually playing",
    category: "Inspiration",
    extended: "With acoustic guitar hooks and vulnerable storytelling, Noah Kahan's songwriting provides the perfect gentle background rhythm to Zoe's team study blocks.",
    noteX: 84, noteY: 42,
    targetX: 58, targetY: 53,
    arrowD: "M 84 42 Q 72 48 58 53"
  },
  {
    id: 8,
    short: "Loves classic books and exploring",
    category: "Intellect",
    extended: "An avid reader of timeless literary masterpieces and a passionate explorer of South African trails, Zoe blends deep intellectual wisdom with active adventure.",
    noteX: 84, noteY: 58,
    targetX: 58, targetY: 65,
    arrowD: "M 84 58 Q 72 63 58 65"
  },
  {
    id: 9,
    short: "Has attachement issues with her water bottles.",
    category: "Essentials",
    extended: "A playful quirk! Zoe is rarely seen without her trusty reusable hydration flask, representing her commitment to physical readiness and active health.",
    noteX: 80, noteY: 74,
    targetX: 59, targetY: 82,
    arrowD: "M 80 74 Q 70 80 59 82"
  },
  {
    id: 10,
    short: "John 3:30 — \"He must become greater; I must become less.\"",
    category: "Life Standard",
    extended: "This deeply humble scripture sits at the dead center of Zoe's life goal. It frames her absolute devotion to self-sacrificing leadership and Christ-centered service.",
    noteX: 18, noteY: 10,
    targetX: 43, targetY: 34,
    arrowD: "M 18 10 Q 30 18 43 34"
  }
];

const joshMunnImg = "/assets/images/Josh Munn.png";

const JOSH_FACTS = [
  {
    id: 1,
    short: "Born 11 February 2004 in Ireland, raised in Hillcrest, South Africa",
    category: "Roots & Travel",
    extended: "Josh was born in Ireland and raised in Hillcrest, South Africa. His early days in Ireland paired with a South African upbringing give him a resilient, internationally grounded perspective.",
    noteX: 82,
    noteY: 10,
    targetX: 58,
    targetY: 20,
    arrowD: "M 82 10 Q 70 12 58 20"
  },
  {
    id: 2,
    short: "Siblings: 1 sister, 3 step brothers",
    category: "Family Roots",
    extended: "Josh grew up in a supportive household with a sister and three step brothers, developing a collaborative spirit and deep appreciation for strong sibling bonds.",
    noteX: 16,
    noteY: 26,
    targetX: 42,
    targetY: 28,
    arrowD: "M 16 26 Q 28 24 42 28"
  },
  {
    id: 3,
    short: "Favourite food: Chicken Chow Mein",
    category: "Culinary Comfort",
    extended: "Fueling long team exercises and fellowship discussions, Josh's go-to meal is a hot, savory plate of Chicken Chow Mein, embodying his simple, down-to-earth style.",
    noteX: 16,
    noteY: 42,
    targetX: 41,
    targetY: 45,
    arrowD: "M 16 42 Q 28 40 41 45"
  },
  {
    id: 4,
    short: "Favourite colour: Green",
    category: "Creative Signature",
    extended: "Symbolizing growth, vitality, and outdoor adventure, green is Josh's signature colour—matching his vibrant leadership style and constant push for personal improvement.",
    noteX: 84,
    noteY: 26,
    targetX: 58,
    targetY: 42,
    arrowD: "M 84 26 Q 72 35 58 42"
  },
  {
    id: 5,
    short: "Favourite books in the Bible: Acts and James",
    category: "Scriptural Foundation",
    extended: "Josh is deeply inspired by the early church's intense action in Acts and the absolute call to authentic, lived-out faith in the Book of James.",
    noteX: 84,
    noteY: 42,
    targetX: 58,
    targetY: 53,
    arrowD: "M 84 42 Q 72 48 58 53"
  },
  {
    id: 6,
    short: "Competitive",
    category: "Action Drive",
    extended: "Josh brings healthy competition and high focus to everything he tackles. He pushes his team peers to set higher performance marks and exceed their comfort zones.",
    noteX: 84,
    noteY: 58,
    targetX: 58,
    targetY: 65,
    arrowD: "M 84 58 Q 72 63 58 65"
  },
  {
    id: 7,
    short: "Redeemed and saved",
    category: "Spiritual Stand",
    extended: "Everything Josh does stems from a place of profound gratitude for being redeemed and saved, walking forward in confidence of his security in faith.",
    noteX: 80,
    noteY: 74,
    targetX: 59,
    targetY: 82,
    arrowD: "M 80 74 Q 70 80 59 82"
  },
  {
    id: 8,
    short: "Trained and qualified barista",
    category: "Professional Craft",
    extended: "A certified craft barista, Josh knows the meticulous details of brewing, serving, and crafting a perfect espresso. It is a humble skill that pairs warm service with disciplined precision.",
    noteX: 20,
    noteY: 92,
    targetX: 43,
    targetY: 92,
    arrowD: "M 20 92 Q 32 94 43 92"
  },
  {
    id: 9,
    short: "Fun Facts: • Wants build own house from scratch • Debadged as deputy head boy of Maritzburg College",
    category: "Memorable Incidents",
    extended: "Josh has plenty of depth! From dreaming big about building his own physical house from the ground up, to the famous lesson of humility and resilience when he was debadged as deputy head boy at Maritzburg College.",
    noteX: 18,
    noteY: 74,
    targetX: 36,
    targetY: 78,
    arrowD: "M 18 74 Q 26 80 36 78"
  },
  {
    id: 10,
    short: "James 2:26",
    category: "Life Standard Verse",
    extended: "Josh's ultimate standard: 'For as the body apart from the spirit is dead, so also faith apart from works is dead.' An active, service-oriented call to live our discipleship out loud.",
    noteX: 18,
    noteY: 10,
    targetX: 43,
    targetY: 34,
    arrowD: "M 18 10 Q 30 18 43 34"
  }
];

export default function Charter() {
  const [activeValueTab, setActiveValueTab] = useState<'SACRED' | 'ASH'>('SACRED');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedMember, setSelectedMember] = useState<'DAVID' | 'ZOE' | 'JOSH'>('DAVID');
  const [activeFactIndex, setActiveFactIndex] = useState<number>(0);

  const activeValues = activeValueTab === 'SACRED' ? SACRED_VALUES : ASH_VALUES;
  const currentSelected = activeValues[selectedIndex] || activeValues[0];

  const facts = selectedMember === 'DAVID' ? DAVID_FACTS : selectedMember === 'JOSH' ? JOSH_FACTS : ZOE_FACTS;
  const memberImg = selectedMember === 'DAVID' ? davidHunterImg : selectedMember === 'JOSH' ? joshMunnImg : zoePadburyImg;
  const currentFact = facts[activeFactIndex] || facts[0];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-20 py-8 px-4 font-sans">
      
      {/* Dynamic Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3 py-1 bg-[#9A7D3C]/10 border border-[#9A7D3C]/20 rounded-full text-xs font-bold tracking-widest text-[#9A7D3C] uppercase"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Foundation</span>
        </motion.div>
        <p className="text-sm md:text-base text-[#1C1917]/70 leading-relaxed font-light">
          We believe in equipping future leaders with exceptional professional and personal standards. Explore the core principles that guide our team's path.
        </p>
      </div>

      {/* Grid: Mission Statments & Scriptural Foundation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: The Vision Manifest */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 bg-[#F6F2E9] border border-[#E1D4BB] rounded-3xl p-6 md:p-10 flex flex-col justify-between space-y-8 shadow-sm"
        >
          <div className="space-y-6">
            <span className="text-xs tracking-widest text-[#9A7D3C] font-black uppercase">THE MISSION STATEMENTS</span>
            
            <div className="space-y-4">
              <h3 className="font-serif text-2xl md:text-3xl text-[#1C1917] font-semibold leading-snug">
                Equipping South Africa&apos;s Next Generation of Grounded Disciples
              </h3>
              <p className="text-sm text-[#1C1917]/80 leading-relaxed font-light">
                As an intensive discipleship development residency program, our mission is to unlock latent talent, promote spiritual resilience, civic empowerment, and build social responsibility. We establish a pathway that is highly professional and profoundly transformative.
              </p>
            </div>

            <blockquote className="border-l-4 border-[#9A7D3C] pl-6 py-1 italic text-xs md:text-sm text-[#1C1917]/70 leading-relaxed bg-[#F3ECE0] rounded-r-xl">
              &ldquo;The mission of The Twelve is to foster self-mastery while executing community-enhancing work. Real discipleship begins with cultivating personal resilience, accountability, and the confidence to walk in faith and serve local communities.&rdquo;
            </blockquote>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E1D4BB]/60">
            <div>
              <span className="block text-2xl font-serif text-[#9A7D3C] font-bold">12</span>
              <span className="text-[10px] tracking-wider text-[#1C1917]/60 uppercase font-bold">Capacity Team / Yr</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-[#9A7D3C] font-bold">100%</span>
              <span className="text-[10px] tracking-wider text-[#1C1917]/60 uppercase font-bold">Hands-On Development</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-[#9A7D3C] font-bold">10k+</span>
              <span className="text-[10px] tracking-wider text-[#1C1917]/60 uppercase font-bold">Service Hours Contributed</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Scripture Anchors */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col justify-between space-y-6"
        >
          {/* Matthew verse card */}
          <div className="bg-[#1C1917] text-[#FDFBF7] p-8 rounded-3xl border border-[#3E3834] relative overflow-hidden group shadow-md flex-1 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#9A7D3C]/20 to-transparent rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono tracking-widest text-[#9A7D3C] font-bold uppercase">The Sower&apos;s Mandate</span>
                <span className="px-2.5 py-0.5 rounded bg-[#9A7D3C]/20 text-[#9A7D3C] text-[10px] font-bold uppercase">Strategic Directive</span>
              </div>
              <p className="font-serif italic text-[#FDFBF7]/90 text-sm md:text-base leading-relaxed mb-6">
                &ldquo;The opportunities for positive impact in modern society are immense, but dedicated, disciplined disciples are far too rare. We work to raise, train, and deploy those disciples.&rdquo;
              </p>
            </div>
            <div className="text-[10px] tracking-wider text-[#FDFBF7]/40 uppercase font-semibold">
              The blueprint of active discipleship deployment
            </div>
          </div>

          {/* Psalm verse card */}
          <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#E9D5B8] flex-1 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] tracking-widest text-[#9A7D3C] font-black uppercase">The Civic Mandate</span>
                <span className="px-2.5 py-0.5 rounded bg-[#F4F1EA] text-[#9A7D3C] text-[10px] font-bold uppercase border border-[#EADCC2]">Socio-Civic Vision</span>
              </div>
              <p className="font-serif italic text-[#1C1917]/90 text-sm md:text-base leading-relaxed mb-6">
                &ldquo;True discipleship looks beyond immediate boundaries to create global synergy, driving sustainable growth in every sphere of public community life.&rdquo;
              </p>
            </div>
            <div className="text-[10px] tracking-wider text-[#1C1917]/50 uppercase font-bold">
              Uncompromising commitment to local and national progress
            </div>
          </div>

        </motion.div>
      </div>

      {/* The Sacred Ash concept introduction */}
      <div className="bg-[#FBF8EF] border border-[#E2D5BE] p-6 md:p-12 rounded-3xl flex flex-col lg:flex-row gap-8 items-center shadow-xs">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#1C1917] rounded-full flex items-center justify-center text-[#FDFBF7] shadow-lg flex-shrink-0 relative overflow-hidden">
          <Flame className="w-10 h-10 text-[#9A7D3C] z-10" />
          <div className="absolute inset-0 bg-[#A2572D]/20 animate-pulse" />
        </div>
        <div className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl text-[#1C1917] font-semibold">The Dual Philosophy of Sacred Ash</h3>
          <p className="text-sm text-[#1C1917]/80 leading-relaxed font-light">
            <strong>&quot;Sacred&quot;</strong> represents the absolute, intrinsic value of every individual—possessing unique, unrepeatable potential and deserving of the highest dignity. 
            <strong>&quot;Ash&quot;</strong> represents deep humility and realistic self-awareness—realizing our shared human fragility, and learning to keep the ego grounded. When 
            <strong>focused energy</strong> and professional drive align, this duality allows our collective team to burn with productive focus and drive exceptional, selfless results.
          </p>
        </div>
      </div>

      {/* The Core Values interactive module */}
      <div id="sacred-values-panel" className="bg-[#FAF7EF] border border-[#E7D6BA] rounded-[2rem] p-6 md:p-10 shadow-sm space-y-10">
        
        {/* Module Sub-Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#E7D6BA]/60 pb-6 space-y-4 md:space-y-0">
          <div>
            <span className="text-[10px] tracking-wider text-[#9A7D3C] font-black uppercase">Interactive Explorer</span>
            <h3 className="font-serif text-2xl text-[#1C1917] font-bold">Our core values: Sacred Ash</h3>
          </div>
          
          {/* Tabs switch */}
          <div className="flex space-x-2 bg-[#F3EDE0] p-1 rounded-xl border border-[#DFD3BA]">
            <button 
              onClick={() => { setActiveValueTab('SACRED'); setSelectedIndex(0); }}
              className={`px-6 py-2.5 rounded-lg text-xs font-serif tracking-widest uppercase transition-all cursor-pointer ${activeValueTab === 'SACRED' ? 'bg-[#1C1917] text-[#FDFBF7] shadow-md' : 'text-[#1C1917]/70 hover:bg-[#FAF7EF]'}`}
            >
              SACRED Core
            </button>
            <button 
              onClick={() => { setActiveValueTab('ASH'); setSelectedIndex(0); }}
              className={`px-6 py-2.5 rounded-lg text-xs font-serif tracking-widest uppercase transition-all cursor-pointer ${activeValueTab === 'ASH' ? 'bg-[#1C1917] text-[#FDFBF7] shadow-md' : 'text-[#1C1917]/70 hover:bg-[#FAF7EF]'}`}
            >
              ASH Essence
            </button>
          </div>
        </div>

        {/* Letters Row & Details Panel */}
        <div id="values-selector" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Big letters array */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-wrap justify-center gap-3">
              {activeValues.map((val, idx) => (
                <button
                  key={val.letter + idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-2xl font-serif font-bold cursor-pointer transition-all ${
                    selectedIndex === idx 
                      ? 'bg-[#1C1917] text-[#FDFBF7] scale-110 shadow-lg border-2 border-[#9A7D3C]' 
                      : 'bg-[#F2ECE0] text-[#1C1917]/60 border border-[#DFD3BA]/80 hover:bg-[#EADCC2]/40 hover:text-[#1C1917]'
                  }`}
                >
                  {val.letter}
                </button>
              ))}
            </div>
            <div className="text-[10px] tracking-wider text-[#1C1917]/40 uppercase font-black">
              Select any letter of {activeValueTab} to reveal depth
            </div>
          </div>

          {/* Right Column: Display Card with Animation */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSelected.letter}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-[#E9D5B8] p-8 rounded-3xl shadow-sm space-y-6 relative overflow-hidden"
              >
                {/* Background soft watermark */}
                <div className="absolute right-4 bottom-[-30px] font-serif text-9xl font-black text-[#9A7D3C]/5 pointer-events-none select-none">
                  {currentSelected.letter}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#9A7D3C] text-[#FDFBF7] rounded-xl flex items-center justify-center font-serif text-lg font-bold">
                    {currentSelected.letter}
                  </div>
                  <div>
                    <h4 className="font-serif text-xl md:text-2xl text-[#1C1917] font-semibold">{currentSelected.word}</h4>
                    <span className="text-[10px] tracking-widest text-[#9A7D3C] font-bold uppercase">FOUNDATIONAL CORE</span>
                  </div>
                </div>

                <p className="text-sm text-[#1C1917]/80 leading-relaxed font-light min-h-[60px]">
                  {currentSelected.description}
                </p>

                <div className="border-t border-[#F2ECE0] pt-4">
                  <span className="text-[10px] tracking-wide text-[#1C1917]/40 uppercase font-bold block mb-1">ANCHOR REFLECTION</span>
                  <p className="font-serif italic text-xs text-[#9A7D3C] leading-normal font-semibold">
                    &ldquo;{currentSelected.quote}&rdquo;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* --- Meet The Team Section --- */}
      <div id="meet-the-team-section" className="space-y-12 pt-16 border-t border-[#EADCC2]">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center space-x-2 px-3 py-1 bg-[#9A7D3C]/10 border border-[#9A7D3C]/20 rounded-full text-xs font-bold tracking-widest text-[#9A7D3C] uppercase text-center justify-center">
            <Users className="w-3.5 h-3.5" />
            <span>The Team Pillars</span>
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1C1917] tracking-tight leading-tight">
            MEET THE TEAM
          </h2>
          <p className="text-sm md:text-base text-[#1C1917]/70 font-light font-serif">
            The core strategic minds guiding the residency day after day with dedication, faith, and local South African execution.
          </p>
        </div>

        {/* Team Member Switcher Tabs */}
        <div className="flex justify-center md:space-x-4 space-x-2 max-w-lg mx-auto p-1.5 bg-[#FAF7EF] border border-[#E9D5B8]/80 rounded-2xl shadow-2xs">
          <button
            onClick={() => { setSelectedMember('DAVID'); setActiveFactIndex(0); }}
            className={`flex-1 py-3 px-4 rounded-xl font-serif text-xs md:text-sm font-bold tracking-widest uppercase transition-all cursor-pointer ${
              selectedMember === 'DAVID'
                ? 'bg-[#1C1917] hover:bg-[#2C2724] text-[#FAF7EF] shadow-sm'
                : 'text-[#1C1917]/75 hover:bg-[#FAF7EF]/60'
            }`}
          >
            David Hunter
          </button>
          <button
            onClick={() => { setSelectedMember('JOSH'); setActiveFactIndex(0); }}
            className={`flex-1 py-3 px-4 rounded-xl font-serif text-xs md:text-sm font-bold tracking-widest uppercase transition-all cursor-pointer ${
              selectedMember === 'JOSH'
                ? 'bg-[#1C1917] hover:bg-[#2C2724] text-[#FAF7EF] shadow-sm'
                : 'text-[#1C1917]/75 hover:bg-[#FAF7EF]/60'
            }`}
          >
            Josh Munn
          </button>
          <button
            onClick={() => { setSelectedMember('ZOE'); setActiveFactIndex(0); }}
            className={`flex-1 py-3 px-4 rounded-xl font-serif text-xs md:text-sm font-bold tracking-widest uppercase transition-all cursor-pointer ${
              selectedMember === 'ZOE'
                ? 'bg-[#1C1917] hover:bg-[#2C2724] text-[#FAF7EF] shadow-sm'
                : 'text-[#1C1917]/75 hover:bg-[#FAF7EF]/60'
            }`}
          >
            Zoe Padbury
          </button>
        </div>

        {/* Selected Member Spotlight Deck */}
        <div className="bg-[#FAF7EF] border border-[#E9D5B8] rounded-[2.5rem] p-6 md:p-10 shadow-sm space-y-10 relative overflow-hidden">
          
          {/* Bio Intro Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-[#EADCC2]/60 pb-8">
            <div className="md:col-span-4 lg:col-span-3">
              <span className="text-[10px] tracking-[0.25em] text-[#9A7D3C] font-black uppercase block mb-1">
                {selectedMember === 'DAVID' 
                  ? 'FOUNDER & OPERATIONS' 
                  : selectedMember === 'JOSH' 
                    ? 'MENTORSHIP DIRECTOR' 
                    : 'SOCIAL MEDIA MANAGER'}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-black text-[#1C1917] leading-none uppercase">
                {selectedMember === 'DAVID' 
                  ? 'David Hunter' 
                  : selectedMember === 'JOSH' 
                    ? 'Josh Munn' 
                    : 'Zoe Padbury'}
              </h3>
              <p className="text-xs text-[#9A7D3C] font-semibold mt-1 italic">
                {selectedMember === 'DAVID' 
                  ? 'Founder / Day-to-Day Operations' 
                  : selectedMember === 'JOSH' 
                    ? 'Director / Mentorship & Discipleship' 
                    : 'Social Media Manager'}
              </p>
            </div>
            
            <div className="md:col-span-8 lg:col-span-9">
              <p className="text-xs md:text-sm text-[#1C1917]/85 font-light leading-relaxed border-l-2 border-[#9A7D3C] pl-6 py-1 font-serif">
                {selectedMember === 'DAVID' 
                  ? "David is the founder of The Twelve who handles day-to-day operations of the organization. He looks after the ground-level administration and logistical alignment, running alongside peers, pushing and growing the team as we move forward together."
                  : selectedMember === 'JOSH'
                    ? "Josh is a director at The Twelve who leads hands-on mentorship within the team. Deeply anchored in James 2:26, Josh combines a heart for real-life working faith with specialized barista training, helping our young leaders grow spiritually, competitively, and practically."
                    : "Zoe is our creative Social Media Manager, managing storytelling, community highlights, and creative communication channels. Pursuing studies in Pretoria while deeply connected in Hillcrest, she grounds our operational narrative with warm leadership and profound faith."
                }
              </p>
            </div>
          </div>

          {/* Interactive Fact diagram & selectors */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* LEFT SIDE: Words & interactive list */}
            <div className="lg:col-span-4 flex flex-col justify-between py-2 space-y-4">
              <div>
                <span className="text-[9px] font-black text-[#9A7D3C] tracking-wider uppercase block mb-1">TEAM HIGHLIGHT INDEX</span>
                <h4 className="font-serif text-base text-[#1C1917] font-bold">Interactive Records</h4>
                <p className="text-xs text-[#1C1917]/60">
                  Select any point to trace its handwritten target on {selectedMember === 'DAVID' ? "David's" : selectedMember === 'JOSH' ? "Josh's" : "Zoe's"} chalkboard portrait.
                </p>
              </div>

              {/* Items column list */}
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                {facts.map((fact, idx) => {
                  const isActive = activeFactIndex === idx;
                  return (
                    <button
                      key={fact.id}
                      onClick={() => setActiveFactIndex(idx)}
                      className={`w-full p-3 rounded-xl text-left border text-xs transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden group ${
                        isActive 
                          ? 'bg-[#1C1917] border-[#1C1917] text-[#FAF7EF] shadow-md' 
                          : 'bg-white border-[#E9D5B8]/60 text-[#1C1917]/85 hover:border-[#9A7D3C]/40 hover:bg-[#FAF7EF]/40'
                      }`}
                    >
                      {/* Active indicator bar */}
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-[#9D8E5F]' : 'bg-[#EADCC2]/80 group-hover:bg-[#9A7D3C]'}`} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className={`text-[8px] font-black uppercase tracking-wider ${isActive ? 'text-[#9A7D3C]' : 'text-[#1C1917]/50'}`}>
                            {fact.category}
                          </span>
                          {isActive && (
                            <span className="text-[7px] bg-[#9D8E5F]/35 text-[#FDF9F7] px-2 py-0.5 rounded uppercase font-mono leading-none">
                              Active Path
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-normal leading-snug truncate">
                          {fact.short}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE: The High-Fidelity Interactive Visual Board */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
              
              {/* Outer Board Frame */}
              <div className="w-full aspect-[4/5] bg-[#9D8E5F] border-4 sm:border-8 border-double border-[#72643a] rounded-[1.5rem] sm:rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between p-3 sm:p-4 md:p-6 shadow-lg select-none">
                
                {/* Vintage Sketch Board Background items */}
                <div className="absolute inset-0 bg-radial from-[#B0A170]/10 to-[#807243]/20 pointer-events-none" />
                
                {/* Large handwritten bubble watermark in the middle backdrop */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                  <span className={`font-serif font-black tracking-widest text-[16vw] lg:text-[11rem] select-none uppercase transition-colors ${selectedMember === 'DAVID' ? 'text-[#4C6B7B]/20' : selectedMember === 'JOSH' ? 'text-[#50664B]/20' : 'text-[#CE9EB9]/25'}`}>
                    {selectedMember === 'DAVID' ? 'DAVID' : selectedMember === 'JOSH' ? 'JOSH' : 'ZOË'}
                  </span>
                </div>

                {/* Centered High Resolution portrait */}
                <div className="absolute top-[8%] bottom-[20%] left-[20%] right-[20%] sm:top-[12%] sm:bottom-[18%] sm:left-[26%] sm:right-[26%] rounded-xl sm:rounded-2xl overflow-hidden border border-dashed border-[#FDFBF7]/30 shadow-2xl z-10 bg-[#FAF7EF]/5 flex flex-col">
                  <div className="flex-1 w-full relative overflow-hidden">
                    <img 
                      src={memberImg} 
                      className={`w-full h-full object-cover grayscale-[15%] hover:scale-105 transition-transform duration-700 ${
                        selectedMember === 'DAVID' ? 'object-[22%_10%]' : 'object-center'
                      }`} 
                      alt={selectedMember === 'DAVID' ? "David Hunter" : selectedMember === 'JOSH' ? 'Josh Munn' : "Zoe Padbury"} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  {/* Full Name display centered inside the profile view */}
                  <div className="bg-[#1C1917]/95 text-[#FAF7EF] py-1 md:py-2 px-1 md:px-3 text-center border-t border-[#FAF7EF]/10 font-serif text-[10px] sm:text-xs font-bold uppercase tracking-widest truncate">
                    {selectedMember === 'DAVID' ? 'David Hunter' : selectedMember === 'JOSH' ? 'Josh Munn' : 'Zoe Padbury'}
                  </div>
                </div>

                {/* SVG Connecting Hand-Drawn Style Curved Arrows Layer */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none z-20 font-serif" 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                >
                  <defs>
                    <marker 
                      id="sketch-arrow" 
                      viewBox="0 0 10 10" 
                      refX="6" 
                      refY="5" 
                      markerWidth="7" 
                      markerHeight="7" 
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 9 5 L 0 9 L 2 5 z" fill="#1C1917" />
                    </marker>
                  </defs>

                  {/* Draw arrow matching active selection point */}
                  {activeFactIndex !== null && facts[activeFactIndex] && (
                    <motion.path
                      key={`${selectedMember}-${activeFactIndex}`}
                      d={facts[activeFactIndex].arrowD}
                      stroke="#1C1917"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      fill="none"
                      markerEnd="url(#sketch-arrow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  )}
                </svg>

                {/* Dynamic Coordinate Highlights on portrait for the selected fact */}
                {activeFactIndex !== null && facts[activeFactIndex] && (
                  <motion.div
                    key={`dot-${selectedMember}-${activeFactIndex}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute z-21 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-[#1C1917] rounded-full border border-[#FAF7EF] flex items-center justify-center shadow-lg"
                    style={{ 
                      left: `${facts[activeFactIndex].targetX}%`, 
                      top: `${facts[activeFactIndex].targetY}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#FAF7EF] rounded-full animate-ping" />
                  </motion.div>
                )}

                {/* Scoped CSS Style to make absolute note buttons beautifully small on mobile screen resolutions */}
                <style>{`
                  @media (max-width: 639px) {
                    .team-notes-container button {
                      max-width: 68px !important;
                      padding: 2.5px 4px !important;
                      border-radius: 6px !important;
                      font-size: 5px !important;
                      line-height: 1.15 !important;
                    }
                    .team-notes-container button strong {
                      font-size: 5px !important;
                    }
                  }
                `}</style>

                {/* Conditionally Render DAVID Notes or ZOE Notes */}
                <div className="block team-notes-container">
                  {selectedMember === 'DAVID' ? (
                  <>
                    {/* Top Left Note */}
                    <button
                      onClick={() => setActiveFactIndex(0)}
                      className={`absolute left-[3%] top-[6%] z-30 max-w-[130px] text-center p-1.5 py-2.5 rounded-xl transition-all font-serif font-medium leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 0 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-2deg] scale-105 shadow-md border border-[#9A7D3C]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-1'
                      }`}
                    >
                      Born 28 Aug 2003 and lives in Hillcrest, SA (also lived in the US)
                    </button>

                    {/* Same hairstyle note */}
                    <button
                      onClick={() => setActiveFactIndex(1)}
                      className={`absolute left-[3%] top-[23%] z-30 max-w-[100px] text-center p-1.5 rounded-xl transition-all font-serif font-medium leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 1 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[3deg] scale-105 shadow-md border border-[#9A7D3C]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:-rotate-1'
                      }`}
                    >
                      Same hairstyle for 12 years
                    </button>

                    {/* Oldest of 4 note */}
                    <button
                      onClick={() => setActiveFactIndex(2)}
                      className={`absolute left-[3%] top-[37%] z-30 max-w-[110px] text-center p-1.5 rounded-xl transition-all font-serif font-semibold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 2 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-3deg] scale-105 shadow-md border border-[#9A7D3C]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-1'
                      }`}
                    >
                      Oldest of 4 (2 sisters, 1 brother)
                    </button>

                    {/* Hobbies note */}
                    <button
                      onClick={() => setActiveFactIndex(3)}
                      className={`absolute left-[3%] top-[51%] z-30 max-w-[120px] text-center p-1.5 rounded-xl transition-all font-serif font-medium leading-snug text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 3 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[2deg] scale-105 shadow-md border border-[#9A7D3C]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      Hobbies: Soccer, music... and annoying his sisters
                    </button>

                    {/* Fun facts list note */}
                    <button
                      onClick={() => setActiveFactIndex(4)}
                      className={`absolute left-[3%] bottom-[14%] z-30 max-w-[130px] text-left p-1.5 rounded-xl transition-all font-serif leading-relaxed text-[8px] cursor-pointer ${
                        activeFactIndex === 4 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-1deg] scale-105 shadow-md border border-[#9A7D3C]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      <strong>Fun Facts:</strong><br />
                      • Broke arm tripping over wire<br />
                      • Led worship around world
                    </button>

                    {/* Shoes size note */}
                    <button
                      onClick={() => setActiveFactIndex(5)}
                      className={`absolute left-[18%] bottom-[4%] z-30 p-1.5 px-3 rounded-xl transition-all font-serif font-bold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 5 
                          ? 'bg-[#1C1917] text-[#FAF7EF] scale-105 shadow-md border border-[#9A7D3C]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      Size 11 shoes
                    </button>

                    {/* RIGHT COLUMN NOTES */}
                    {/* Bucket list note */}
                    <button
                      onClick={() => setActiveFactIndex(6)}
                      className={`absolute right-[3%] top-[6%] z-30 max-w-[130px] text-center p-1.5 py-2.5 rounded-xl transition-all font-serif font-medium leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 6 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[2deg] scale-105 shadow-md border border-[#9A7D3C]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-[-1deg]'
                      }`}
                    >
                      Bucket list: shark cage diving, skydiving, and travelling to Norway, Italy, and Australia.
                    </button>

                    {/* Favorite color: Lumo Green */}
                    <button
                      onClick={() => setActiveFactIndex(7)}
                      className={`absolute right-[3%] top-[23%] z-30 max-w-[110px] text-center p-1.5 rounded-xl transition-all font-serif font-semibold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 7 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-2deg] scale-105 shadow-md border border-[#9A7D3C]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-1'
                      }`}
                    >
                      Favourite colour: Lumo Green
                    </button>

                    {/* Ice cream lasagne */}
                    <button
                      onClick={() => setActiveFactIndex(8)}
                      className={`absolute right-[3%] top-[37%] z-30 max-w-[110px] text-center p-1.5 rounded-xl transition-all font-serif font-semibold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 8 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[3deg] scale-105 shadow-md border border-[#9A7D3C]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      Ice cream and lasagne lover
                    </button>

                    {/* Lion King note */}
                    <button
                      onClick={() => setActiveFactIndex(9)}
                      className={`absolute right-[3%] top-[51%] z-30 max-w-[110px] text-center p-1.5 rounded-xl transition-all font-serif font-medium leading-snug text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 9 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-2deg] scale-105 shadow-md border border-[#9A7D3C]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-1'
                      }`}
                    >
                      Favourite Disney movie: The Lion King
                    </button>

                    {/* Comfort parameters */}
                    <button
                      onClick={() => setActiveFactIndex(10)}
                      className={`absolute right-[3%] bottom-[14%] z-30 max-w-[130px] text-center p-1.5 rounded-xl transition-all font-serif font-medium leading-relaxed text-[8px] cursor-pointer ${
                        activeFactIndex === 10 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[2deg] scale-105 shadow-md border border-[#9A7D3C]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      Comfort = worship + cartoons + hot choc
                    </button>

                    {/* Anchor Verse 1 Corinthians */}
                    <button
                      onClick={() => setActiveFactIndex(11)}
                      className={`absolute right-[11%] bottom-[4%] z-30 p-1.5 px-3 rounded-xl transition-all font-serif font-black leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 11 
                          ? 'bg-[#1C1917] text-[#FAF7EF] scale-105 shadow-md border border-[#9A7D3C]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      1 Corinthians 10:31
                    </button>
                  </>
                ) : selectedMember === 'JOSH' ? (
                  <>
                    {/* JOSH LEFT COLUMN NOTES */}
                    {/* Verse Note James 2:26 */}
                    <button
                      onClick={() => setActiveFactIndex(9)}
                      className={`absolute left-[3%] top-[6%] z-30 max-w-[130px] text-center p-1.5 py-2.5 rounded-xl transition-all font-serif font-semibold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 9 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-2deg] scale-105 shadow-md border border-[#50664B]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-1'
                      }`}
                    >
                      &ldquo;For as the body apart from the spirit is dead, so also faith apart from works is dead&rdquo; – James 2:26
                    </button>

                    {/* Siblings Note */}
                    <button
                      onClick={() => setActiveFactIndex(1)}
                      className={`absolute left-[3%] top-[23%] z-30 max-w-[110px] text-center p-1.5 rounded-xl transition-all font-serif font-medium leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 1 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[3deg] scale-105 shadow-md border border-[#50664B]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:-rotate-1'
                      }`}
                    >
                      Siblings: 1 sister, 3 step brothers
                    </button>

                    {/* Chicken Chow Mein Note */}
                    <button
                      onClick={() => setActiveFactIndex(2)}
                      className={`absolute left-[3%] top-[37%] z-30 max-w-[120px] text-center p-1.5 rounded-xl transition-all font-serif font-semibold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 2 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-3deg] scale-105 shadow-md border border-[#50664B]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-1'
                      }`}
                    >
                      Favourite food: Chicken Chow Mein
                    </button>

                    {/* Fun Facts Note */}
                    <button
                      onClick={() => setActiveFactIndex(8)}
                      className={`absolute left-[3%] bottom-[14%] z-30 max-w-[130px] text-left p-1.5 rounded-xl transition-all font-serif leading-relaxed text-[8px] cursor-pointer ${
                        activeFactIndex === 8 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-1deg] scale-105 shadow-md border border-[#50664B]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      <strong>Fun Facts:</strong><br />
                      • Wants build own house from scratch<br />
                      • Debadged as deputy head boy of Maritzburg College
                    </button>

                    {/* Barista Note */}
                    <button
                      onClick={() => setActiveFactIndex(7)}
                      className={`absolute left-[18%] bottom-[4%] z-30 p-1.5 px-3 rounded-xl transition-all font-serif font-bold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 7 
                          ? 'bg-[#1C1917] text-[#FAF7EF] scale-105 shadow-md border border-[#50664B]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      Trained &amp; qualified barista
                    </button>

                    {/* JOSH RIGHT COLUMN NOTES */}
                    {/* Birth Info Note */}
                    <button
                      onClick={() => setActiveFactIndex(0)}
                      className={`absolute right-[3%] top-[6%] z-30 max-w-[135px] text-center p-1.5 py-2 rounded-xl transition-all font-serif font-medium leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 0 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[2deg] scale-105 shadow-md border border-[#50664B]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-[-1deg]'
                      }`}
                    >
                      Born on 11 February 2004 in Ireland, raised in Hillcrest, South Africa
                    </button>

                    {/* Colour Note */}
                    <button
                      onClick={() => setActiveFactIndex(3)}
                      className={`absolute right-[3%] top-[23%] z-30 max-w-[110px] text-center p-1.5 rounded-xl transition-all font-serif font-semibold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 3 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-2deg] scale-105 shadow-md border border-[#50664B]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-1'
                      }`}
                    >
                      Favourite colour: Green
                    </button>

                    {/* Books Note */}
                    <button
                      onClick={() => setActiveFactIndex(4)}
                      className={`absolute right-[3%] top-[39%] z-30 max-w-[110px] text-center p-1.5 rounded-xl transition-all font-serif font-semibold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 4 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[3deg] scale-105 shadow-md border border-[#50664B]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      Favourite books in the Bible: Acts and James
                    </button>

                    {/* Competitive Note */}
                    <button
                      onClick={() => setActiveFactIndex(5)}
                      className={`absolute right-[3%] top-[54%] z-30 max-w-[110px] text-center p-1.5 rounded-xl transition-all font-serif font-medium leading-snug text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 5 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-2deg] scale-105 shadow-md border border-[#50664B]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-1'
                      }`}
                    >
                      Competitive
                    </button>

                    {/* Redeemed & Saved Note */}
                    <button
                      onClick={() => setActiveFactIndex(6)}
                      className={`absolute right-[3%] bottom-[14%] z-30 max-w-[120px] text-center p-1.5 rounded-xl transition-all font-serif font-medium leading-relaxed text-[8px] cursor-pointer ${
                        activeFactIndex === 6 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[2deg] scale-105 shadow-md border border-[#50664B]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      Redeemed and saved
                    </button>
                  </>
                ) : (
                  <>
                    {/* ZOE LEFT COLUMN NOTES */}
                    {/* Verse Note John 3:30 */}
                    <button
                      onClick={() => setActiveFactIndex(9)}
                      className={`absolute left-[3%] top-[6%] z-30 max-w-[130px] text-center p-1.5 py-2 rounded-xl transition-all font-serif font-semibold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 9 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-2deg] scale-105 shadow-md border border-[#CE9EB9]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-1'
                      }`}
                    >
                      John 3:30 — &quot;He must become greater; I must become less.&quot;
                    </button>

                    {/* Siblings note */}
                    <button
                      onClick={() => setActiveFactIndex(1)}
                      className={`absolute left-[3%] top-[23%] z-30 max-w-[110px] text-center p-1.5 rounded-xl transition-all font-serif font-medium leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 1 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[3deg] scale-105 shadow-md border border-[#CE9EB9]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:-rotate-1'
                      }`}
                    >
                      Siblings: 1 older sister (whose her best friend)
                    </button>

                    {/* Could live off pasta and cake */}
                    <button
                      onClick={() => setActiveFactIndex(3)}
                      className={`absolute left-[3%] top-[39%] z-30 max-w-[120px] text-center p-1.5 rounded-xl transition-all font-serif font-semibold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 3 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-3deg] scale-105 shadow-md border border-[#CE9EB9]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-1'
                      }`}
                    >
                      Could live off pasta and cake for the rest of her life.
                    </button>

                    {/* Tea addiction note */}
                    <button
                      onClick={() => setActiveFactIndex(4)}
                      className={`absolute left-[3%] top-[54%] z-30 max-w-[130px] text-left p-1.5 rounded-xl transition-all font-serif font-medium leading-normal text-[8px] cursor-pointer ${
                        activeFactIndex === 4 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-1deg] scale-105 shadow-md border border-[#CE9EB9]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      <strong>Fun Facts:</strong> Has a serious rooibos tea addiction (like 6 cups a day)
                    </button>

                    {/* Favorite color selection note */}
                    <button
                      onClick={() => setActiveFactIndex(2)}
                      className={`absolute left-[3%] bottom-[14%] z-30 max-w-[130px] text-center p-1.5 rounded-xl transition-all font-serif font-bold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 2 
                          ? 'bg-[#1C1917] text-[#FAF7EF] scale-105 shadow-md border border-[#CE9EB9]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      Favourite colour: blue (with pink as a close second)
                    </button>

                    {/* ZOE RIGHT COLUMN NOTES */}
                    {/* Birth info top right */}
                    <button
                      onClick={() => setActiveFactIndex(0)}
                      className={`absolute right-[3%] top-[6%] z-30 max-w-[135px] text-center p-1.5 py-2 rounded-xl transition-all font-serif font-medium leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 0 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[2deg] scale-105 shadow-md border border-[#CE9EB9]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-[-1deg]'
                      }`}
                    >
                      Born on 23 August 2005, lives in Hillcrest South Africa (but currently based in PTA for uni)
                    </button>

                    {/* Dressing note */}
                    <button
                      onClick={() => setActiveFactIndex(5)}
                      className={`absolute right-[3%] top-[23%] z-30 max-w-[110px] text-center p-1.5 rounded-xl transition-all font-serif font-semibold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 5 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-2deg] scale-105 shadow-md border border-[#CE9EB9]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-1'
                      }`}
                    >
                      Probably wearing a dress with a ribbon or bow in hair
                    </button>

                    {/* Noah Kahan note */}
                    <button
                      onClick={() => setActiveFactIndex(6)}
                      className={`absolute right-[3%] top-[39%] z-30 max-w-[110px] text-center p-1.5 rounded-xl transition-all font-serif font-semibold leading-tight text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 6 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[3deg] scale-105 shadow-md border border-[#CE9EB9]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      A folk-pop music fan- Noah Kahan is usually playing
                    </button>

                    {/* Books and explores */}
                    <button
                      onClick={() => setActiveFactIndex(7)}
                      className={`absolute right-[3%] top-[54%] z-30 max-w-[110px] text-center p-1.5 rounded-xl transition-all font-serif font-medium leading-snug text-[8px] sm:text-[9px] cursor-pointer ${
                        activeFactIndex === 7 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[-2deg] scale-105 shadow-md border border-[#CE9EB9]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20 hover:rotate-1'
                      }`}
                    >
                      Loves classic books and exploring
                    </button>

                    {/* Attachment issues with water bottles */}
                    <button
                      onClick={() => setActiveFactIndex(8)}
                      className={`absolute right-[3%] bottom-[14%] z-30 max-w-[120px] text-center p-1.5 rounded-xl transition-all font-serif font-medium leading-relaxed text-[8px] cursor-pointer ${
                        activeFactIndex === 8 
                          ? 'bg-[#1C1917] text-[#FAF7EF] rotate-[2deg] scale-105 shadow-md border border-[#CE9EB9]/30' 
                          : 'text-[#1C1917] hover:bg-[#FAF7EF]/20'
                      }`}
                    >
                      Has attachement issues with her water bottles.
                    </button>
                  </>
                )}
                </div>

              </div>

              {/* Live Explanatory narrative card linked with chosen fact */}
              <div className="bg-white border border-[#E9D5B8] p-5 rounded-3xl flex items-start gap-4 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#9A7D3C]/10 text-[#9A7D3C] flex items-center justify-center flex-shrink-0 text-xs font-serif font-bold">
                  #{activeFactIndex + 1}
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] tracking-widest text-[#9A7D3C] font-black uppercase">
                    {facts[activeFactIndex]?.category || 'PROFILE'} • FIELD DETAIL
                  </span>
                  <p className="text-xs text-[#1C1917] font-bold">
                    &quot;{facts[activeFactIndex]?.short}&quot;
                  </p>
                  <p className="text-[11px] text-[#1C1917]/75 font-light leading-relaxed pt-0.5 font-serif">
                    {facts[activeFactIndex]?.extended}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
