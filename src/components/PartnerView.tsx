/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Map, 
  Users, 
  Globe, 
  Sparkles, 
  Gift, 
  ArrowRight, 
  CheckCircle, 
  ChevronRight, 
  Info, 
  Coins, 
  MessageCircle, 
  X, 
  ThumbsUp,
  Award,
  BookOpen,
  DollarSign
} from 'lucide-react';

interface FloatingTestimony {
  id: string;
  author: string;
  role: string;
  location: string;
  quote: string;
  fullStory: string;
  // Positioning classes (e.g. top-[12%] left-[4%] ...)
  x: string;
  delay: number; // for float offset animation
  scale: number;
}

export default function PartnerView() {
  const [selectedTestimony, setSelectedTestimony] = useState<FloatingTestimony | null>(null);
  const [activeMissionsDestination, setActiveMissionsDestination] = useState<'trips' | 'general'>('trips');
  const [sponsorMemberTier, setSponsorMemberTier] = useState<'study' | 'stipend' | 'full' | 'custom'>('stipend');
  const [customAmount, setCustomAmount] = useState<number>(350);
  
  // Interactive Pledge Modal State
  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [pledgeType, setPledgeType] = useState<'missions' | 'member'>('missions');
  const [pledgeAmount, setPledgeAmount] = useState<number>(500);
  const [pledgeSuccess, setPledgeSuccess] = useState(false);
  
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formFrequency, setFormFrequency] = useState<'once' | 'monthly'>('monthly');
  const [formNotes, setFormNotes] = useState('');

  // Non-financial contribution form states
  const [nonFinancialName, setNonFinancialName] = useState('');
  const [nonFinancialEmail, setNonFinancialEmail] = useState('');
  const [nonFinancialPhone, setNonFinancialPhone] = useState('');
  const [nonFinancialInterest, setNonFinancialInterest] = useState('Mentoring & Tutoring');
  const [nonFinancialMessage, setNonFinancialMessage] = useState('');
  const [nonFinancialSuccess, setNonFinancialSuccess] = useState(false);

  // Floating Reviews & Testimonies arranged strategically to populate the whole page background
  const testimoniesList: FloatingTestimony[] = [
    {
      id: "t-1",
      author: "Robbie Krause",
      role: "Community Relations Rep",
      location: "CityHill",
      quote: "The Twelve have been absolute pillars. Their work ethic and heart are unmatched!",
      fullStory: "Our partnership with The Twelve was spectacular. During major national events, team members single-handedly coordinated the sound, prepared meals, managed registrars, and set up complex floor guidelines with an unmatched spirit of active excellence and joy.",
      x: "top-[1%] left-[2%] md:left-[5%]",
      delay: 0,
      scale: 1
    },
    {
      id: "t-2",
      author: "Pastor Grace",
      role: "Youth Ministry Lead",
      location: "Durban",
      quote: "These disciples hold a standard of moral rectitude that is extremely rare today.",
      fullStory: "The study hours and house chores program at The Twelve create a rare balance of academic rigor and service. Their team represents a standard of spiritual discipline and integrity that is serving as a blueprint for young South Africans.",
      x: "top-[7%] right-[2%] md:right-[6%]",
      delay: 2.1,
      scale: 0.97
    },
    {
      id: "t-3",
      author: "Sarah Hunter",
      role: "Team Parent",
      location: "Joburg",
      quote: "Watching my son grow into a highly disciplined, selfless leader is a true miracle.",
      fullStory: "Before joining the program, my son was unsure about his future. Through the systematic academic studies and physically demanding missions trips, he returned home with a profound sense of accountability, deep spiritual grit, and absolute ownership of his actions.",
      x: "top-[16%] left-[8%] md:left-[14%]",
      delay: 1.5,
      scale: 0.95
    },
    {
      id: "t-4",
      author: "KZN Community Council",
      role: "Director of Care",
      location: "Hillcrest",
      quote: "Their tireless care and service setups during local elder events brought so much hope.",
      fullStory: "The Twelve coordinated our regional retirement shelter physical layout, served dynamic fruit grids, and spent hours listening to local stories. This is the definition of putting others before self in a tangible, deeply personal format.",
      x: "top-[23%] right-[8%] md:right-[15%]",
      delay: 0.5,
      scale: 1.02
    },
    {
      id: "t-5",
      author: "Zambia Mission Elder",
      role: "Outreach Coordinator",
      location: "Zambia",
      quote: "They didn't just visit; they built infrastructure and mentored our youth with humility.",
      fullStory: "The team was invaluable on our recent local church build. From laying brick works to hosting outdoor soccer academies, they engaged directly with orphans and youths, and established continuous mentoring frameworks that will endure for decades.",
      x: "top-[32%] left-[1%] md:left-[4%]",
      delay: 3.2,
      scale: 1.05
    },
    {
      id: "t-6",
      author: "Botswana Team Pastor",
      role: "Regional Leader",
      location: "Gaborone",
      quote: "The Botswana missions drive was highly structured. Absolute strategic partners.",
      fullStory: "During the intensive April missions timeline, the team managed the core fuel routing, coordinated the local registry, and facilitated complex workshops with absolute punctuality and care. They are genuine, ready, and highly efficient.",
      x: "top-[41%] right-[3%] md:right-[8%]",
      delay: 4.0,
      scale: 0.95
    },
    {
      id: "t-7",
      author: "David M.",
      role: "Sponsor Rep",
      location: "Gauteng",
      quote: "Sponsoring two disciples is the most rewarding, high-civic impact investment I've made.",
      fullStory: "Seeing monthly analytical reports, letters of progress, and tracking the team's local community developments makes me proud to partner with this system. This is leadership training executed with total financial and moral transparency.",
      x: "top-[49%] left-[6%] md:left-[12%]",
      delay: 0.8,
      scale: 0.98
    },
    {
      id: "t-8",
      author: "James S.",
      role: "Alumni Leader",
      location: "KZN",
      quote: "I found a true family of brothers standing shoulder-to-shoulder in complete alignment.",
      fullStory: "Under David's guiding supervision, we worked past conflicts, learned proper financial stewardship, and faced arduous physical labor on missions. If you want to see standard-level young men turned into giants of accountability, support this work.",
      x: "top-[59%] right-[1%] md:right-[5%]",
      delay: 1.2,
      scale: 1.04
    },
    {
      id: "t-9",
      author: "Dr. Elijah Sibiya",
      role: "Theological Advisor",
      location: "Pretoria",
      quote: "The programmatic theological modules here hold exceptional academic and moral density.",
      fullStory: "Having evaluated several youth curricula, the system at The Twelve is unique. It enforces deep intellectual study combined with mandatory daily chores, hard physical fitness, and real outreach work. It shapes outstanding mindsets.",
      x: "top-[68%] left-[2%] md:left-[8%]",
      delay: 2.7,
      scale: 1.01
    },
    {
      id: "t-10",
      author: "Mrs. Thandeka Zuma",
      role: "Local School Principal",
      location: "Durban",
      quote: "Their peer mentoring groups at our secondary schools transformed class discipline.",
      fullStory: "The disciples ran weekly academic mentoring sessions at our school. Their clean dress, active listening, and rigorous leadership examples profoundly influenced our youths. Many of our boys found true direction through their dedication.",
      x: "top-[77%] right-[6%] md:right-[14%]",
      delay: 1.8,
      scale: 0.96
    },
    {
      id: "t-11",
      author: "CityHill Deacon",
      role: "Outreach Supporter",
      location: "Hillcrest",
      quote: "Financial stewardship reports from The Twelve are perfectly tracked. Unrivaled integrity.",
      fullStory: "As an outreach auditor, I am deeply impressed by how perfectly David tracks and utilizes every budget cent. Every receipt for missions transit, food grids, books, and stipend distribution is completely audited and accounted for.",
      x: "top-[86%] left-[8%] md:left-[15%]",
      delay: 3.5,
      scale: 0.99
    },
    {
      id: "t-12",
      author: "Pastor Abraham Phiri",
      role: "Ministry Partner",
      location: "Lusaka",
      quote: "We were blessed by their humble service during the Zambia building project.",
      fullStory: "The disciples showed up in Lusaka ready for hard labor. From mixing concrete to bricklaying and coordinating registry queues, they served with pure joy, and established ongoing mentoring bounds with our community youth.",
      x: "top-[93%] right-[2%] md:right-[7%]",
      delay: 0.9,
      scale: 1.03
    }
  ];

  const handleOpenPledge = (type: 'missions' | 'member', initialAmt: number) => {
    setPledgeType(type);
    setPledgeAmount(initialAmt);
    setPledgeSuccess(false);
    setFormNotes(
      type === 'missions' 
        ? `Sponsorship dedicated to supporting the upcoming ${activeMissionsDestination.toUpperCase()} Outreaches.` 
        : `Sponsorship dedicated to the ${sponsorMemberTier.toUpperCase()} support level (R${initialAmt}/month).`
    );
    setShowPledgeModal(true);
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    
    // Securely trigger the direct Yoco credit card payment portal
    window.open(`https://pay.yoco.com/the-twelve-experience?amount=${pledgeAmount}`, '_blank');
    
    // Simulate API storage / communication
    setPledgeSuccess(true);
  };

  const getSponsorshipImpact = (amount: number) => {
    if (amount < 200) return "Provides comprehensive theological books and research study guides for one team member.";
    if (amount < 500) return "Provides complete study materials, leadership portfolios, and modules for two disciples.";
    if (amount < 1000) return "Sponsors active local transport grids and fuel for municipal youth community outreaches.";
    if (amount < 2500) return "Sponsors a team member's monthly living and discipleship stipend, covering meals & chores support.";
    if (amount < 5000) return "Funds core team accommodation and safety resources for an entire regional missions trip.";
    return "Provides full educational tuition, community residence development, and regional outreach support for multiple members.";
  };

  const getMissionsImpactData = () => {
    switch (activeMissionsDestination) {
      case 'trips':
        return {
          title: "Mission Trips",
          dates: "Dates to be announced",
          details: "Supporting our team travel fuel, cross-border transit permits, outreach gear, materials logistics, and local discipleship setups in key destination fields.",
          tiers: [
            { amt: 500, desc: "Outreach Materials Packet" },
            { amt: 1500, desc: "Team Transit Fuel Share" },
            { amt: 5000, desc: "Community Support & Outreach Logistics" }
          ]
        };
      case 'general':
      default:
        return {
          title: "General Fund",
          dates: "Ongoing cycle",
          details: "Our general fund supports continuous operational needs, strategic leadership equips, materials printing, and emergency residency setups throughout the year.",
          tiers: [
            { amt: 400, desc: "Bibles & Literature Dispatch" },
            { amt: 1200, desc: "Core Stewardship Reserve" },
            { amt: 3500, desc: "General Residency & Care Fund" }
          ]
        };
    }
  };

  const currentMissions = getMissionsImpactData();

  const getMemberTierData = () => {
    switch (sponsorMemberTier) {
      case 'study':
        return {
          title: "Study Portfolio Sponsor",
          cost: 150,
          term: "per month",
          subtitle: "Intellectual & Spiritual Prep",
          desc: "Equips a disciple with full academic dossiers, theological textbooks, systematic booklets, and active research portfolios for the leadership team curriculum.",
          perks: ["Termly curriculum logs", "Personal alumni newsletter", "Prayer updates"]
        };
      case 'stipend':
        return {
          title: "Active Discipleship Stipend",
          cost: 500,
          term: "per month",
          subtitle: "Daily Service & Chores Mobility",
          desc: "Directly funds a member's local transport grids, community work attire, weekly outreach expenses, and meal supplies support while residing in the discipleship dwelling.",
          perks: ["Direct member card update", "Special mid-year video review", "Monthly letters", "Outreach summary report"]
        };
      case 'full':
        return {
          title: "Full Core Legacy Partner",
          cost: 2000,
          term: "per month",
          subtitle: "Prestige Holistic Support",
          desc: "A premium tier supporting the full residency scale: general mentoring supervision, regional missions transit, standard lodging, utility grids, and theological seminars.",
          perks: ["Holistic performance dashboard access", "VIP invitation to general assembly", "Personal hand-written journal log", "Official partnership plaque"]
        };
      case 'custom':
        default:
        return {
          title: "Custom Strategic Patron",
          cost: customAmount,
          term: "custom frequency",
          subtitle: "Targeted Discipleship Gift",
          desc: "Provide custom-allocated support matching your heart or financial scope. Every South African Rand is audited to ensure absolute, verified stewardship.",
          perks: ["Stewardship report details", "Sponsorship progress notifications"]
        };
    }
  };

  const currentMemberTier = getMemberTierData();

  return (
    <div className="relative min-h-screen w-full px-4 md:px-8 py-6 select-none overflow-hidden bg-transparent font-sans">
      
      {/* 
        =========================================
        MAIN COMPACT SECTION WORKSPACE (Foreground Content)
        =========================================
      */}
      <div className="relative z-10 w-full max-w-5xl mx-auto space-y-12">
        
        {/* Architectural Tab Title / Header Card */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#9A7D3C]/10 border border-[#9A7D3C]/30 text-[#9A7D3C] px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-black font-mono">
            <Heart className="w-3 h-3 fill-[#9A7D3C]" />
            <span>Stewardship & Covenant Partnership</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#1C1917] tracking-tight font-black">
            Partner With <span className="text-[#9A7D3C]">The Twelve</span>
          </h1>
          <p className="text-xs md:text-sm text-[#1C1917]/70 font-light leading-relaxed max-w-xl mx-auto">
            Our mission is supported completely by partners like you, who understand that 
            empowering South Africa&apos;s youth builds the blueprint for our tomorrow. Help us 
            sponsor missions cross-border programs and individual discipleship stipends with total transparency.
          </p>
        </div>

        {/* Banking Details Corner - Alternative Way to Partner */}
        <div id="banking-details" className="bg-[#FAF7EF] border-2 border-[#9A7D3C]/20 rounded-3xl p-5 md:p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#9A7D3C]/5 rounded-full translate-x-8 -translate-y-8 animate-pulse" />
          <div className="space-y-2 flex-1 text-left">
            <div className="inline-flex items-center gap-1 bg-[#1C1917]/5 text-[#1C1917]/70 px-2.5 py-1 rounded-md text-[9px] uppercase tracking-wider font-bold font-mono">
              <Info className="w-3 h-3 text-[#9A7D3C]" />
              <span>Alternative Covenant Path • South African EFT</span>
            </div>
            <h2 className="font-serif text-base font-bold text-[#1C1917] tracking-tight">
              Official Corporate Banking Details
            </h2>
            <p className="text-[11px] text-[#1C1917]/60 leading-normal font-light max-w-xl">
              Should you prefer to partner through manual electronic funds transfer (EFT) directly, please utilize the non-profit registration account below. We encourage you to message David Hunter once you've completed the transaction so we can confirm allocations.
            </p>
          </div>
          <div className="font-mono text-[10.5px] text-[#1C1917]/90 bg-white grid grid-cols-1 gap-1.5 p-4 md:p-5 rounded-2xl border border-[#E9D5B8]/80 min-w-full md:min-w-[340px] shadow-2xs relative z-10 text-left">
            <div><strong>Recipient:</strong> <span className="font-sans font-medium text-[#1C1917]/70">The Twelve Experience NPC</span></div>
            <div><strong>Bank Name:</strong> <span className="text-[#9A7D3C] font-black">Bank Zero</span></div>
            <div><strong>Branch Code:</strong> <span className="text-stone-700">888000</span></div>
            <div className="border-t border-stone-100 pt-1.5 mt-0.5">
              <strong>Account Number:</strong>{" "}
              <span className="text-xs bg-[#FAF7EF] px-1.5 py-0.5 rounded font-black text-[#1C1917]">
                80205326191
              </span>
            </div>
          </div>
        </div>

        {/* 
          =========================================
          DYNAMIC GRID: SECTIONS 1 & 2
          =========================================
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* SECTION 1: SPONSOR A MISSIONS TRIP */}
          <div className="flex flex-col bg-white border border-[#E9D5B8] rounded-[2rem] p-6 lg:p-8 shadow-xs hover:shadow-sm transition-all duration-300 relative justify-between">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#9A7D3C]/10 flex items-center justify-center text-[#9A7D3C]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#9A7D3C] font-black uppercase tracking-wider block">MISSION CORE I</span>
                    <h3 className="font-serif text-lg font-bold text-[#1C1917]">Sponsor our Mission Trips</h3>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#9A7D3C]/10 text-[#9A7D3C] text-[8.5px] font-mono font-bold uppercase tracking-wider">
                  Dates Pending
                </div>
              </div>

              <p className="text-[12px] text-[#1C1917]/70 leading-relaxed font-light">
                We travel on intensive cross-border developmental drives to support regional assemblies. Sponsoring a missions trip directly offsets essential fuel, transit permits, Bibles, and local meal distributions in our various destinations such as Botswana, Zambia, and other locations.
              </p>

              {/* Destination selector tabs */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#FAF7EF] rounded-xl border border-[#E9D5B8]/50">
                <button
                  onClick={() => setActiveMissionsDestination('trips')}
                  className={`py-2 text-[10px] font-serif uppercase tracking-widest font-black rounded-lg transition-all cursor-pointer ${
                    activeMissionsDestination === 'trips'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#1C1917]/60 hover:text-[#1C1917] hover:bg-[#EADCC2]/10'
                  }`}
                >
                  Mission Trips
                </button>
                <button
                  onClick={() => setActiveMissionsDestination('general')}
                  className={`py-2 text-[10px] font-serif uppercase tracking-widest font-black rounded-lg transition-all cursor-pointer ${
                    activeMissionsDestination === 'general'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#1C1917]/60 hover:text-[#1C1917] hover:bg-[#EADCC2]/10'
                  }`}
                >
                  General Fund
                </button>
              </div>

              {/* Active Destination Card without progress tracker */}
              <div className="p-4 rounded-2xl bg-[#FAF7EF]/40 border border-[#E9D5B8]/40 space-y-3">
                <div className="flex justify-between items-center text-xs font-serif font-black text-[#1C1917]">
                  <span className="tracking-wide">{currentMissions.title}</span>
                  <span className="text-[#9A7D3C] font-sans font-bold text-[11px] block">{currentMissions.dates}</span>
                </div>
                
                <p className="text-[11px] text-[#1C1917]/70 leading-relaxed font-light">
                  {currentMissions.details}
                </p>
              </div>

              {/* Preset support levels for this mission */}
              <div className="space-y-2 pt-2">
                <span className="text-[9.5px] font-mono uppercase tracking-wider text-stone-500 block">Select active support levels for this drive:</span>
                <div className="grid grid-cols-1 gap-2.5">
                  {currentMissions.tiers.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOpenPledge('missions', t.amt)}
                      className="p-3 text-left bg-[#FDFBF7] hover:bg-[#FAF7EF] border border-[#E9D5B8]/60 hover:border-[#9A7D3C] rounded-xl flex items-center justify-between transition-colors group cursor-pointer w-full text-left"
                    >
                      <div className="space-y-0.5 text-left">
                        <span className="text-[11px] text-[#1C1917] font-semibold block">{t.desc}</span>
                        <span className="text-[9.5px] text-[#1C1917]/60 block leading-none font-light">Audited allocation receipt offered</span>
                      </div>
                      <div className="flex items-center space-x-1.5 flex-shrink-0">
                        <span className="font-mono text-xs font-black text-[#9A7D3C] group-hover:underline">R {t.amt}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#9A7D3C]" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-[#E9D5B8]/40 mt-6 shrink-0">
              <button
                type="button"
                onClick={() => handleOpenPledge('missions', 1500)}
                className="w-full py-3.5 bg-[#9A7D3C] hover:bg-[#1C1917] text-[#FAF7EF] rounded-xl font-serif text-xs font-bold uppercase tracking-widest transition-all text-center flex items-center justify-center space-x-2 shadow-xs cursor-pointer group"
              >
                <span>Back Missions Destination Fund</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* SECTION 2: SPONSOR A MEMBER */}
          <div className="flex flex-col bg-white border border-[#E9D5B8] rounded-[2rem] p-6 lg:p-8 shadow-xs hover:shadow-sm transition-all duration-300 relative justify-between">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#9A7D3C]/10 flex items-center justify-center text-[#9A7D3C]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#9A7D3C] font-black uppercase tracking-wider block">MISSION CORE II</span>
                    <h3 className="font-serif text-lg font-bold text-[#1C1917]">Sponsor a Team Member</h3>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-stone-900 text-[#FAF7EF] text-[8.5px] font-mono font-bold uppercase tracking-wider">
                  The 2026 Team
                </div>
              </div>

              <p className="text-[12px] text-[#1C1917]/70 leading-relaxed font-light">
                Our disciples undergo rigorous guidelines of intellectual, moral, and active community studies. Sponsoring a member directly covers materials tuition, transport stipends, and residential resources. Let&apos;s build strategic peer leaders.
              </p>

              {/* Tier selector tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-[#FAF7EF] rounded-xl border border-[#E9D5B8]/50">
                <button
                  onClick={() => setSponsorMemberTier('study')}
                  className={`py-2 text-[8.5px] font-serif uppercase tracking-wider font-black rounded-lg transition-all cursor-pointer truncate ${
                    sponsorMemberTier === 'study'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#1C1917]/60 hover:text-[#1C1917] hover:bg-[#EADCC2]/10'
                  }`}
                >
                  Books
                </button>
                <button
                  onClick={() => setSponsorMemberTier('stipend')}
                  className={`py-2 text-[8.5px] font-serif uppercase tracking-wider font-black rounded-lg transition-all cursor-pointer truncate ${
                    sponsorMemberTier === 'stipend'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#1C1917]/60 hover:text-[#1C1917] hover:bg-[#EADCC2]/10'
                  }`}
                >
                  Stipend
                </button>
                <button
                  onClick={() => setSponsorMemberTier('full')}
                  className={`py-2 text-[8.5px] font-serif uppercase tracking-wider font-black rounded-lg transition-all cursor-pointer truncate ${
                    sponsorMemberTier === 'full'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#1C1917]/60 hover:text-[#1C1917] hover:bg-[#EADCC2]/10'
                  }`}
                >
                  Tuition
                </button>
                <button
                  onClick={() => setSponsorMemberTier('custom')}
                  className={`py-2 text-[8.5px] font-serif uppercase tracking-wider font-black rounded-lg transition-all cursor-pointer truncate ${
                    sponsorMemberTier === 'custom'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#1C1917]/60 hover:text-[#1C1917] hover:bg-[#EADCC2]/10'
                  }`}
                >
                  Custom
                </button>
              </div>

              {/* Dynamic Content Display of current tier */}
              <div className="p-5 rounded-2xl bg-[#FAF7EF]/40 border border-[#E9D5B8]/40 space-y-4">
                <div className="flex justify-between items-start border-b border-[#E9D5B8]/40 pb-3">
                  <div>
                    <h4 className="font-serif text-sm font-black text-[#1C1917]">{currentMemberTier.title}</h4>
                    <span className="text-[10px] text-[#9A7D3C] font-mono uppercase tracking-wider font-bold block">{currentMemberTier.subtitle}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-base font-black text-[#1C1917] block leading-none">R {currentMemberTier.cost}</span>
                    <span className="text-[9px] text-[#1C1917]/40 uppercase font-mono font-bold">{currentMemberTier.term}</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#1C1917]/70 leading-relaxed font-light">
                  {currentMemberTier.desc}
                </p>

                {/* Custom price slider if custom selection was made */}
                {sponsorMemberTier === 'custom' && (
                  <div className="space-y-2 pt-1 border-t border-[#E9D5B8]/40 mt-1">
                    <div className="flex justify-between text-[10px] leading-none text-stone-500 font-mono">
                      <span>Specify monthly value (ZAR):</span>
                      <span className="text-[#9A7D3C] font-extrabold font-sans text-[11px]">R {customAmount} / month</span>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="5000" 
                      step="50"
                      value={customAmount} 
                      onChange={(e) => setCustomAmount(Number(e.target.value))}
                      className="w-full accent-[#9A7D3C] cursor-pointer"
                    />
                  </div>
                )}

                {/* Included benefits */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[9px] font-mono text-[#101010]/50 tracking-wider uppercase block">PARTNERSHIP TOUCHPOINTS:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {currentMemberTier.perks.map((p, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-[10.5px] text-[#1C1917]/80">
                        <CheckCircle className="w-3.5 h-3.5 text-[#9A7D3C] flex-shrink-0" />
                        <span className="font-light">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-[#E9D5B8]/40 mt-6 shrink-0">
              <button
                type="button"
                onClick={() => handleOpenPledge('member', currentMemberTier.cost)}
                className="w-full py-3.5 bg-[#1C1917] hover:bg-[#9A7D3C] text-white rounded-xl font-serif text-xs font-bold uppercase tracking-widest transition-all text-center flex items-center justify-center space-x-2 shadow-xs cursor-pointer group"
              >
                <span>Commit Support Level</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

        {/* 
          =========================================
          SECTION 3: ALTERNATIVE & NON-FINANCIAL CONTRIBUTIONS
          =========================================
        */}
        <div className="bg-white border border-[#E9D5B8] rounded-[2rem] p-6 lg:p-8 shadow-xs hover:shadow-sm transition-all duration-300 relative">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#9A7D3C] rounded-t-[2rem]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Information and the WhatsApp Direct Liaison */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-1.5 bg-[#9A7D3C]/10 border border-[#9A7D3C]/35 text-[#9A7D3C] px-3.5 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-black font-mono">
                  <Sparkles className="w-3 h-3" />
                  <span>Other Contributions</span>
                </div>
                <h3 className="font-serif text-2xl font-black text-[#1C1917]">
                  Alternative Ways to Support & Co-Labour
                </h3>
                <p className="text-[12px] text-[#1C1917]/70 leading-relaxed font-light">
                  There are countless ways to stand with the team that do not require financial contributions. From mentoring our disciples to donating operational supplies, hosting a team, or offering guest-speaker lessons—your skills and presence are highly valued.
                </p>
              </div>

              {/* Direct Liaison with David - WhatsApp Button */}
              <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-500/10 space-y-4">
                <div className="flex items-center space-x-3 text-emerald-800">
                  <div className="p-2 bg-emerald-500/10 rounded-xl">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-emerald-700 font-black uppercase tracking-wider block">DIRECT LEADERSHIP CORRESPONDENCE</span>
                    <h4 className="font-serif text-sm font-bold">Chat Directly with David Hunter</h4>
                  </div>
                </div>
                <p className="text-[11px] text-[#1C1917]/70 leading-relaxed font-light">
                  Have a unique idea, strategic partnership, or want to discuss the residency face-to-face? Reach out to David Hunter immediately on WhatsApp to connect.
                </p>
                <a
                  href="https://wa.me/27815411335?text=Hi%20David%2C%20I%27m%20visiting%20The%20Twelve%20Partner%20Page%20and%20would%20like%20to%20connect%20with%20you%20directly."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-serif font-bold uppercase tracking-widest transition-colors shadow-xs hover:shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Alternate Contribution Form */}
            <div className="bg-[#FAF7EF]/40 border border-[#E9D5B8]/40 rounded-2xl p-5 md:p-6 space-y-4">
              <h4 className="font-serif text-sm font-black text-[#1C1917] border-b border-[#E9D5B8]/40 pb-2">
                Register Your Non-Financial Contribution
              </h4>
              
              {!nonFinancialSuccess ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!nonFinancialName || !nonFinancialEmail) return;
                    setNonFinancialSuccess(true);
                  }}
                  className="space-y-3"
                >
                  <div className="space-y-1">
                    <label className="text-[9.5px] text-[#1C1917]/60 uppercase font-black font-mono tracking-wider block">Full Name:</label>
                    <input
                      type="text"
                      required
                      value={nonFinancialName}
                      onChange={(e) => setNonFinancialName(e.target.value)}
                      placeholder="e.g. Robbie Krause"
                      className="w-full px-4 py-2 bg-white border border-[#E9D5B8] rounded-xl text-xs focus:ring-1 focus:ring-[#9A7D3C] focus:border-[#9A7D3C] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9.5px] text-[#1C1917]/60 uppercase font-black font-mono tracking-wider block">Email Address:</label>
                    <input
                      type="email"
                      required
                      value={nonFinancialEmail}
                      onChange={(e) => setNonFinancialEmail(e.target.value)}
                      placeholder="e.g. robbie@example.com"
                      className="w-full px-4 py-2 bg-white border border-[#E9D5B8] rounded-xl text-xs focus:ring-1 focus:ring-[#9A7D3C] focus:border-[#9A7D3C] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9.5px] text-[#1C1917]/60 uppercase font-black font-mono tracking-wider block">Phone Number (Optional):</label>
                    <input
                      type="text"
                      value={nonFinancialPhone}
                      onChange={(e) => setNonFinancialPhone(e.target.value)}
                      placeholder="e.g. +27 82 123 4567"
                      className="w-full px-4 py-2 bg-white border border-[#E9D5B8] rounded-xl text-xs focus:ring-1 focus:ring-[#9A7D3C] focus:border-[#9A7D3C] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9.5px] text-[#1C1917]/60 uppercase font-black font-mono tracking-wider block">Primary Area of Interest:</label>
                    <select
                      value={nonFinancialInterest}
                      onChange={(e) => setNonFinancialInterest(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#E9D5B8] rounded-xl text-xs focus:ring-1 focus:ring-[#9A7D3C] focus:border-[#9A7D3C] focus:outline-none"
                    >
                      <option value="Mentoring & Tutoring">Mentoring & Academic Tutoring</option>
                      <option value="Media & Creative Tech">Media & Creative Staged Design</option>
                      <option value="Host a Mission Team">Host or Lodge a Mission Team</option>
                      <option value="Catering & Cooking supplies">Catering & Meals Logistics</option>
                      <option value="Construction & Physical Chores">Building & Manual Construction Labor</option>
                      <option value="Prayer Partner">Intercessory Prayer Partnership</option>
                      <option value="Special Guest Speaker Lessons">Guest Speaker Theological Lectures</option>
                      <option value="Other Area">Other Custom Collaboration</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9.5px] text-[#1C1917]/60 uppercase font-black font-mono tracking-wider block">Message / Collaboration Idea:</label>
                    <textarea
                      rows={3}
                      value={nonFinancialMessage}
                      onChange={(e) => setNonFinancialMessage(e.target.value)}
                      placeholder="Describe how you'd love to partner or any ideas you carry..."
                      className="w-full px-4 py-2 bg-white border border-[#E9D5B8] rounded-xl text-xs focus:ring-1 focus:ring-[#9A7D3C] focus:border-[#9A7D3C] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#1C1917] hover:bg-[#9A7D3C] text-white rounded-xl font-serif text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer text-center"
                  >
                    Register My Support
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-serif text-xs font-bold text-[#1C1917]">Registration Received!</h5>
                    <p className="text-[10px] text-[#1C1917]/60 leading-normal font-light max-w-xs mx-auto mt-1">
                      Thank you for co-labouring with The Twelve residency. David Hunter and our staff will review your details and contact you directly to discuss arrangements.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setNonFinancialName('');
                      setNonFinancialEmail('');
                      setNonFinancialPhone('');
                      setNonFinancialMessage('');
                      setNonFinancialSuccess(false);
                    }}
                    className="mt-2 text-[9px] font-mono text-[#9A7D3C] uppercase tracking-wider underline hover:text-[#1C1917] transition-colors"
                  >
                    Register Another Interest
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 
          =========================================
          INTERACTIVE IMPACT PREVIEWER
          =========================================
        */}
        <div className="bg-[#FAF7EF]/30 border border-[#E9D5B8] rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#9A7D3C]/10 rounded-xl text-[#9A7D3C]">
              <Coins className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#9A7D3C] font-black uppercase tracking-wider block">ALLOCATION TRANSPARENCY SIMULATOR</span>
              <h3 className="font-serif text-base font-bold text-[#1C1917]">Dynamic Stewardship Pledge Calculator</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-4 space-y-3">
              <p className="text-[11.5px] text-[#1C1917]/70 leading-relaxed font-light">
                Interact with the dynamic gauge to locate and preview how specific stewardship contributions support team milestones physically.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {[150, 500, 1000, 2500, 5000].map((presetAmt) => (
                  <button
                    key={presetAmt}
                    onClick={() => setCustomAmount(presetAmt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                      customAmount === presetAmt 
                        ? 'bg-[#9A7D3C] text-white' 
                        : 'bg-white text-stone-600 border border-[#E9D5B8]/60 hover:border-stone-400'
                    }`}
                  >
                    R {presetAmt}
                  </button>
                ))}
              </div>

              {/* Enter custom manual amount */}
              <div className="space-y-1.5 pt-2">
                <label className="text-[9.5px] text-[#1C1917]/60 uppercase font-black font-mono tracking-wider block">Or enter any custom amount (ZAR):</label>
                <div className="relative rounded-xl border border-[#E9D5B8] bg-white overflow-hidden shadow-2xs">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-stone-400">R</span>
                  <input
                    type="number"
                    min="1"
                    value={customAmount || ''}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setCustomAmount(isNaN(val) ? 0 : val);
                    }}
                    placeholder="Enter custom amount"
                    className="w-full pl-8 pr-4 py-2 bg-transparent text-xs font-mono font-bold text-[#1C1917] outline-none placeholder:text-stone-300"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-8 p-5 bg-white border border-[#E9D5B8] rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-2 text-center sm:text-left flex-1">
                <span className="text-[9px] font-bold text-[#9A7D3C] uppercase tracking-widest font-mono">Real-world stewardship impact</span>
                <p className="text-xs md:text-sm text-[#1C1917] font-serif font-black leading-relaxed">
                  "{getSponsorshipImpact(customAmount)}"
                </p>
                {/* Button to pledge this amount */}
                <button
                  type="button"
                  onClick={() => handleOpenPledge('member', customAmount)}
                  className="mt-3 inline-flex items-center space-x-2 px-4 py-2.5 bg-[#9A7D3C] hover:bg-[#1C1917] text-white rounded-xl text-[11px] font-serif font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Pledge This Amount</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="px-6 py-5 bg-[#FAF7EF] border border-[#E9D5B8]/50 rounded-[1.5rem] flex flex-col justify-center items-center text-center w-full sm:w-auto flex-shrink-0 min-w-[140px] shadow-2xs">
                <span className="text-[9px] text-[#1C1917]/40 leading-none uppercase font-mono font-bold tracking-wider mb-1">AUDIT STAMP</span>
                <span className="text-xl font-mono font-black text-[#1C1917]">R {customAmount}</span>
                <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest font-mono block mt-1.5">100% Directed</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 
        =========================================
        LIGHTBOX MODAL: EXPANDED FLOATING TESTIMONIES
        =========================================
      */}
      <AnimatePresence>
        {selectedTestimony && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-[#070605] text-stone-100 overflow-y-auto flex flex-col justify-between"
          >
            {/* Top Navigation Row in Fullscreen */}
            <div className="max-w-7xl w-full mx-auto px-6 py-6 md:py-8 flex justify-between items-center border-b border-stone-850 shrink-0">
              <div className="flex items-center space-x-2.5">
                <Award className="w-5 h-5 text-[#9A7D3C] animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono text-[#EADCC2] font-black uppercase tracking-widest">THE TWELVE • COVENANT WITNESS PROTOCOL</span>
              </div>
              <button
                onClick={() => setSelectedTestimony(null)}
                className="flex items-center space-x-2 px-4 py-2 border border-stone-800 hover:border-[#9A7D3C] text-stone-400 hover:text-white rounded-full bg-stone-900/50 hover:bg-stone-950 transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Close Expansion</span>
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Split Content Area */}
            <div className="max-w-7xl w-full mx-auto px-6 py-8 md:py-16 flex-1 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
              {/* Left Column: Big Beautiful Display Quote */}
              <div className="w-full lg:w-1/2 space-y-6 text-left">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 bg-[#9A7D3C]/20 border border-[#9A7D3C]/35 text-[#EADCC2] px-3.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-black font-mono">
                    <span>{selectedTestimony.location} REGISTER</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                    {selectedTestimony.author}
                  </h2>
                  <p className="text-xs md:text-sm text-[#9A7D3C] font-mono uppercase tracking-widest font-bold">
                    {selectedTestimony.role} • {selectedTestimony.location}
                  </p>
                </div>

                <div className="relative pt-4">
                  <span className="absolute -top-6 -left-4 text-7xl md:text-8xl font-serif text-[#9A7D3C]/10 select-none">“</span>
                  <p className="font-serif text-lg md:text-2xl lg:text-3xl italic text-[#EADCC2] leading-relaxed relative z-10 font-medium pl-6 border-l-2 border-[#9A7D3C]/40 py-1">
                    {selectedTestimony.quote}
                  </p>
                </div>
              </div>

              {/* Right Column: Full Narrative & Story */}
              <div className="w-full lg:w-1/2 space-y-6 text-left lg:border-l lg:border-stone-800/80 lg:pl-16">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-[#9A7D3C] font-black uppercase tracking-widest block mb-1">COMPLETE UNEDITED ACCOUNT</span>
                  <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed font-sans whitespace-pre-wrap">
                    {selectedTestimony.fullStory}
                  </p>
                </div>

                <div className="p-4 bg-stone-900/45 border border-stone-800/60 rounded-2xl flex items-start space-x-3.5">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider font-extrabold text-white">VERIFIED TEAM STEWARDSHIP</h4>
                    <p className="text-[10.5px] text-stone-400 font-light leading-snug">David manages program allocations with full financial and administrative rectitude, audited transparently.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="bg-stone-950 border-t border-stone-850 py-6 px-6 shrink-0 z-10">
              <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-stone-400 font-light">Are you inspired to empower more young South African disciples directly?</p>
                  <p className="text-[11px] text-[#9A7D3C] font-mono uppercase tracking-wider font-black">100% of public partnership goes to materials, stipends, and outreach logs.</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedTestimony(null);
                    }}
                    className="flex-1 sm:flex-none px-6 py-3.5 border border-stone-800 hover:border-stone-600 text-stone-400 hover:text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Back to Partner Page
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTestimony(null);
                      handleOpenPledge('member', 500);
                    }}
                    className="flex-1 sm:flex-none px-7 py-3.5 bg-[#9A7D3C] hover:bg-white text-white hover:text-black rounded-xl text-xs font-serif font-black uppercase tracking-widest transition-all shadow-lg shadow-[#9A7D3C]/10 flex items-center justify-center space-x-2 cursor-pointer group text-center"
                  >
                    <span>Commit Direct Support</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        =========================================
        INTERACTIVE PLEDGE FORM MODAL SHEET
        =========================================
      */}
      <AnimatePresence>
        {showPledgeModal && (
          <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
            {/* Backdrop click dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPledgeModal(false)}
              className="absolute inset-0 bg-[#1C1917]/70 backdrop-blur-md cursor-pointer"
            />

            {/* Pledge Card Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#FDFBF7] border-2 border-[#9A7D3C]/30 rounded-[2.5rem] p-6 md:p-8 text-[#1C1917] shadow-2xl z-20 overflow-hidden"
            >
              
              {/* decor header banner */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#9A7D3C]" />

              <div className="flex justify-between items-start mb-6">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2 text-[10px] text-[#9A7D3C] font-bold uppercase tracking-wider font-mono">
                    <Gift className="w-4 h-4" />
                    <span>Covenant Commitment Entry</span>
                  </div>
                  <h3 className="font-serif text-lg font-black text-[#1C1917]">
                    {pledgeType === 'missions' ? "Partner with Missions" : "Discipleship Member Pledge"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowPledgeModal(false)}
                  className="p-1.5 rounded-full border border-stone-200 hover:border-[#9A7D3C] text-stone-400 hover:text-[#9A7D3C] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!pledgeSuccess ? (
                <form onSubmit={handlePledgeSubmit} className="space-y-4">
                  
                  {/* Summary/Receipt Block */}
                  <div className="p-4 rounded-xl bg-[#FAF7EF] border border-[#E9D5B8]/80 flex justify-between items-center">
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#1C1917]/40 uppercase font-mono block">PARTNERSHIP CATEGORY:</span>
                      <span className="text-xs font-bold block">{pledgeType === 'missions' ? "Outreach Transit & Materials Support" : "Strategic Leadership Support"}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-[#1C1917]/40 uppercase font-mono block">VALUE:</span>
                      <span className="font-mono text-base font-black text-[#9A7D3C]">R {pledgeAmount}</span>
                    </div>
                  </div>

                  {/* Input Rows */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-[#1C1917]/60 uppercase font-bold tracking-wider block">Full Name:</label>
                      <input 
                        type="text" 
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. David Hunter"
                        className="w-full px-4 py-2.5 bg-white border border-[#E9D5B8] rounded-xl text-xs focus:ring-1 focus:ring-[#9A7D3C] focus:border-[#9A7D3C] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-[#1C1917]/60 uppercase font-bold tracking-wider block">Email Address:</label>
                      <input 
                        type="email" 
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. david@thetwelve.co.za"
                        className="w-full px-4 py-2.5 bg-white border border-[#E9D5B8] rounded-xl text-xs focus:ring-1 focus:ring-[#9A7D3C] focus:border-[#9A7D3C] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-[#1C1917]/60 uppercase font-bold tracking-wider block">Pledge Frequency:</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormFrequency('once')}
                          className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all ${
                            formFrequency === 'once'
                              ? 'bg-[#1C1917] border-[#1C1917] text-white font-black'
                              : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          Single Donation
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormFrequency('monthly')}
                          className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all ${
                            formFrequency === 'monthly'
                              ? 'bg-[#1C1917] border-[#1C1917] text-white font-black'
                              : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          Monthly Pledge (ZAR)
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-[#1C1917]/60 uppercase font-bold tracking-wider block">Allocations & Covenant Notes:</label>
                      <textarea 
                        rows={2}
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                        placeholder="Optional notes to the supervisors of The Twelve..."
                        className="w-full px-4 py-2 bg-white border border-[#E9D5B8] rounded-xl text-xs focus:ring-1 focus:ring-[#9A7D3C] focus:border-[#9A7D3C] focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  <p className="text-[9.5px] italic text-[#1C1917]/50 leading-relaxed text-center font-light pt-2">
                    Note: Placing a pledge initiates an official coordinator review. David or the board will connect directly with payment credentials & instructions for regular updates.
                  </p>

                  <div className="pt-4 flex select-none gap-3">
                    <button
                      type="button"
                      onClick={() => setShowPledgeModal(false)}
                      className="flex-1 py-3 bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-xl text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer text-center"
                    >
                      Dismiss
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-[#9A7D3C] hover:bg-[#1C1917] text-white rounded-xl text-xs uppercase font-serif font-extrabold tracking-widest transition-colors cursor-pointer text-center"
                    >
                      Process Payment
                    </button>
                  </div>

                </form>
              ) : (
                <div className="py-6 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-1 border border-emerald-500/30">
                    <ThumbsUp className="w-5 h-5 animate-bounce" />
                  </div>
                  
                  <h4 className="font-serif text-lg font-black text-[#1C1917]">Covenant Partner Registered!</h4>
                  
                  <div className="bg-[#FAF7EF] p-4 rounded-2xl text-[11px] text-[#1C1917]/75 leading-relaxed space-y-2.5 font-light text-left border border-[#E9D5B8]/40">
                    <p>
                      <strong>Thank you so much, {formName}!</strong> Your commitment to support <strong>{pledgeType === 'missions' ? 'Global Outreaches' : 'Team Disciples'}</strong> with <strong>R {pledgeAmount}</strong> is recorded.
                    </p>
                    <p className="text-stone-500 text-[10.5px]">
                      We have opened the secure Yoco credit card checkout in a new window. If the payment portal did not open, click below to proceed.
                    </p>
                    
                    <div className="pt-2 space-y-2 border-t border-stone-200/50 mt-2">
                      <a
                        href={`https://pay.yoco.com/the-twelve-experience?amount=${pledgeAmount}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-2 w-full py-2.5 bg-[#9A7D3C] hover:bg-[#1C1917] hover:text-white text-stone-100 rounded-xl text-xs font-mono font-bold uppercase tracking-widest transition-all text-center"
                      >
                        <span>Open Secure Yoco Checkout (R {pledgeAmount})</span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-100" />
                      </a>

                      <p className="text-[10px] text-[#1C1917]/70 font-semibold pt-1">
                        ★ Once completed, please message David Hunter on WhatsApp to confirm so we can safely log and allocate your contribution:
                      </p>

                      <a
                        href={`https://wa.me/27815411335?text=Hi%20David%2C%20I%27ve%20just%20completed%20a%20financial%20transaction%20of%20R${pledgeAmount}%20via%20Yoco%20to%20partner%20with%20The%20Twelve%20Experience!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-mono font-bold uppercase tracking-widest transition-colors shadow-2xs"
                      >
                        <MessageCircle className="w-4 h-4 fill-white text-white" />
                        <span>Message David on WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowPledgeModal(false);
                      setFormName('');
                      setFormEmail('');
                    }}
                    className="w-full py-3 bg-[#1C1917] hover:bg-[#9A7D3C] text-white rounded-xl text-xs font-serif uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Close & Return to Sanctuary
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
