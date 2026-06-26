/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, BookOpen, Heart, Info, Coins, Clock, ClipboardList, 
  CheckCircle, ArrowRight, ChevronRight, AlertCircle, ShieldCheck,
  User, Mail, Phone, MapPin, Church, GraduationCap, Activity, FileText,
  DollarSign, Check, Eye
} from 'lucide-react';

interface ApplyViewProps {
  onSuccessSubmit?: () => void;
}

export default function ApplyView({ onSuccessSubmit }: ApplyViewProps) {
  // Navigation within the Apply Portal
  const [activeConfigTab, setActiveConfigTab] = useState<'life' | 'cost' | 'form' | 'downloads'>('life');

  // Application Form Steps
  const [formStep, setFormStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Application Form States
  const [gender, setGender] = useState<string>('');
  const [personType, setPersonType] = useState<string>('');
  const [hoodySize, setHoodySize] = useState<string>('');
  const [tShirtSize, setTShirtSize] = useState<string>('');
  const [worshipBand, setWorshipBand] = useState<string>('');
  const [soundTeam, setSoundTeam] = useState<string>('');
  const [kidsTeam, setKidsTeam] = useState<string>('');
  const [baristaTeam, setBaristaTeam] = useState<string>('');
  const [rateWalk, setRateWalk] = useState<number>(5);
  const [otherParents, setOtherParents] = useState<string>('');
  const [completedStudy, setCompletedStudy] = useState<string>('');
  const [rateHealth, setRateHealth] = useState<string>('');
  const [physicalLimitation, setPhysicalLimitation] = useState<string>('');
  const [takingMedication, setTakingMedication] = useState<string>('');
  const [medicalAid, setMedicalAid] = useState<string>('');
  const [agreedIndemnity, setAgreedIndemnity] = useState<boolean>(false);
  const [agreedParents, setAgreedParents] = useState<boolean>(false);
  
  // Text inputs states (prevent reset)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryBirth: '',
    citizenship: '',
    dualCitizenship: '',
    currentEmployer: '',
    age: '',
    idNumber: '',
    passportNumber: '',
    phone: '',
    email: '',
    postalAddress: '',
    city: '',
    postalCode: '',
    physicalAddress: '',
    primaryContactPhone: '',
    primaryContactEmail: '',
    primaryContactAddress: '',
    primaryContactCity: '',
    primaryContactPostalCode: '',
    accountName: '',
    accountSurname: '',
    accountPhone: '',
    accountEmail: '',
    accountID: '',
    accountRelation: '',
    accountAddress: '',
    accountCity: '',
    accountPostalCode: '',
    homeChurch: '',
    churchAddress: '',
    leadPastor: '',
    churchCity: '',
    churchPostalCode: '',
    attendDuration: '',
    whyJoin: '',
    programExpectations: '',
    walkExplanation: '',
    bandSkills: '',
    soundSkills: '',
    kidsInvolvement: '',
    baristaInvolvement: '',
    otherInvolvement: '',
    parentName: '',
    parentSurname: '',
    parentTitle: '',
    parentInitials: '',
    parentPostalCode: '',
    parentPhysicalAddress: '',
    parentPhone: '',
    parentEmail: '',
    parentOccupation: '',
    parentRelation: '',
    otherParentName: '',
    otherParentSurname: '',
    otherParentPhone: '',
    familyFeelings: '',
    highschool: '',
    schoolCity: '',
    highestGrade: '',
    matricYear: '',
    furtherStudies: '',
    schoolActivities: '',
    tertiaryDetails: '',
    yearsAttended: '',
    qualificationObtained: '',
    hearAboutUs: '',
    allergies: '',
    explainLimitations: '',
    explainMedications: '',
    medicalAidName: '',
    medicalAidNumber: '',
    fitnessLevel: '',
    applicantFullName: '',
    agreementDate: '',
    parentFullName: '',
    parentDate: '',
    parentID: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    // Scroll to form header gently
    const formHeader = document.getElementById('application-form-portal');
    if (formHeader) {
      formHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setFormStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    const formHeader = document.getElementById('application-form-portal');
    if (formHeader) {
      formHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setFormStep(prev => prev - 1);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedIndemnity) {
      alert("Please accept the Agreement & Indemnity term to proceed.");
      return;
    }
    setSubmitted(true);
    if (onSuccessSubmit) {
      onSuccessSubmit();
    }
    const formHeader = document.getElementById('application-form-portal');
    if (formHeader) {
      formHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Schedule Timeline representation for "Life of a Member"
  const dailyTimeline = [
    { time: '05:30', title: 'Awaken & Personal Devotion', desc: 'Starting the day in absolute quietness and prayer before God. Strengthening the mind.' },
    { time: '06:30', title: 'Physical Training & Calisthenics', desc: 'Rigorous physical activation to build grit, coordination, and physical health.' },
    { time: '07:45', title: 'Communal Cleaning & Prep', desc: 'Onus on students to keep all common areas and rooms strictly immaculate.' },
    { time: '08:30', title: 'Team Breakfast & House Duties', desc: 'Sharing morning meals, detailing schedules, and coordinating assigned household duties.' },
    { time: '09:30', title: 'Theological & Character Modules', desc: 'Structured academic lessons, reading assignments, and scripture study hours.' },
    { time: '13:00', title: 'Outreach Prep / Community Service', desc: 'Preparing meals for elderly centers, setting up sound/AV, or secondary preaching setups.' },
    { time: '18:00', title: 'Communal Dinner & Fellowship', desc: 'Nightly dinners cooked together on budget rosters. Deep, honest group interaction.' },
    { time: '20:00', title: 'Mentorship / Accountability Loop', desc: 'Coffee reviews, character check-ins, or small group vulnerability tables with leaders.' },
    { time: '22:00', title: 'Curfew & Lights Out (Mon-Thu)', desc: 'Absolute rest to restore the body. (Seniors split up; gender separation enforced).' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in pb-16">
      
      {/* Imposing Decorative Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2.5 bg-amber-50/70 border border-[#9A7D3C]/40 px-3.5 py-1.5 rounded-full">
          <ClipboardList className="w-4 h-4 text-[#9A7D3C]" />
          <span className="text-[10px] font-mono text-[#9A7D3C] font-black uppercase tracking-widest">TEAM ENROLLMENT PROTOCOL</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-black text-[#1C1917] tracking-tight">
          Apply for the Next Team
        </h1>
        <div className="bg-amber-500/10 border border-[#EADCC2] rounded-2xl px-5 py-3 text-[#9A7D3C] text-xs font-serif font-black uppercase tracking-wider max-w-xl mx-auto shadow-xs select-none">
          ✨ Applications are now OPEN until the 1st of September!
        </div>
        <p className="text-xs md:text-sm text-[#1C1917]/70 leading-relaxed font-light">
          Commit one year of your life to absolute accountability, rigorous spiritual growth, 
          and community service. Applications for our next 12-member residency intake are open until September 1st. Review policies, study the core schedules, and register below.
        </p>

        {/* Printable resources download drawer immediately visible at top for high availability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
          <a
            href="/Application_Form_Printable.pdf"
            download="Application_Form_Printable.pdf"
            className="flex items-center justify-between p-3.5 bg-stone-900 text-stone-100 hover:text-white rounded-xl border border-stone-800 hover:border-[#9A7D3C] shadow-lg hover:shadow-[#9A7D3C]/10 transition-all group shrink-0"
          >
            <div className="flex items-center space-x-3 text-left">
              <div className="p-2 bg-stone-850 rounded-lg group-hover:bg-[#9A7D3C]/10 transition-colors">
                <FileText className="w-4 h-4 text-[#9A7D3C]" />
              </div>
              <div>
                <p className="text-[10px] font-mono font-black text-white uppercase tracking-wider">Printable Application PDF</p>
                <p className="text-[9px] text-stone-400 font-light font-sans">Full 10-page enrollment manual</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-stone-400 group-hover:text-white transition-colors" />
          </a>

          <a
            href="/Costs Booklet.pdf"
            download="Costs Booklet.pdf"
            className="flex items-center justify-between p-3.5 bg-stone-900 text-stone-100 hover:text-white rounded-xl border border-stone-800 hover:border-[#9A7D3C] shadow-lg hover:shadow-[#9A7D3C]/10 transition-all group shrink-0"
          >
            <div className="flex items-center space-x-3 text-left">
              <div className="p-2 bg-stone-850 rounded-lg group-hover:bg-[#9A7D3C]/10 transition-colors">
                <Coins className="w-4 h-4 text-[#9A7D3C]" />
              </div>
              <div>
                <p className="text-[10px] font-mono font-black text-white uppercase tracking-wider">Costs Booklet PDF</p>
                <p className="text-[9px] text-stone-400 font-light font-sans font-sans">Official payment schedule & policies</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-stone-400 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>

      {/* Main Navigation Tab Ribbons */}
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-1.5 p-1 bg-[#FAF7EF] border border-[#EADCC2] rounded-24 max-w-4xl mx-auto">
        <button
          onClick={() => setActiveConfigTab('life')}
          className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-full text-[10px] md:text-xs font-serif uppercase tracking-widest cursor-pointer transition-all flex items-center justify-center gap-2 ${
            activeConfigTab === 'life'
              ? 'bg-[#1C1917] text-white font-bold shadow-md'
              : 'text-[#1C1917]/70 hover:bg-stone-200/50 hover:text-black'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>1. Life & Day</span>
        </button>
        <button
          onClick={() => setActiveConfigTab('cost')}
          className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-full text-[10px] md:text-xs font-serif uppercase tracking-widest cursor-pointer transition-all flex items-center justify-center gap-2 ${
            activeConfigTab === 'cost'
              ? 'bg-[#1C1917] text-white font-bold shadow-md'
              : 'text-[#1C1917]/70 hover:bg-stone-200/50 hover:text-black'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>2. Program Cost</span>
        </button>
        <button
          onClick={() => setActiveConfigTab('form')}
          className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-full text-[10px] md:text-xs font-serif uppercase tracking-widest cursor-pointer transition-all flex items-center justify-center gap-2 ${
            activeConfigTab === 'form'
              ? 'bg-[#1C1917] text-white font-bold shadow-md'
              : 'text-[#1C1917]/70 hover:bg-stone-200/50 hover:text-black'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>3. Online Application</span>
        </button>
      </div>

      {/* Tabs View Workspace with Framer Motion transitions */}
      <div className="relative">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: LIFE & DAY */}
          {activeConfigTab === 'life' && (
            <motion.div
              key="life-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {/* Mission Statement Showcase Card */}
              <div className="bg-[#1C1917] border-2 border-[#9A7D3C]/35 rounded-[2.5rem] p-6 md:p-12 text-[#FDF9F7] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
                  <BookOpen className="w-64 h-64 text-[#9A7D3C]" />
                </div>
                <div className="max-w-2xl space-y-6 text-left">
                  <span className="text-[10px] font-mono text-[#9A7D3C] font-black uppercase tracking-widest block">
                    OUR ULTIMATE CALLING
                  </span>
                  <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                    The Mission of The Twelve
                  </h2>
                  <p className="text-stone-300 text-xs md:text-sm font-light leading-relaxed">
                    As a <strong className="font-serif text-white">Year of Your Life program</strong>, our mission is to help show the lost who is Jesus and His love for His children. We believe that we have all been called to go out into all nations and spread the light of Jesus Christ. Our mission is to make a statement that Jesus Christ is King and that all who call on His name, will be saved.
                  </p>
                  <p className="text-stone-300 text-xs md:text-sm font-light leading-relaxed">
                    The mission of The Twelve is not only to impact the lives of others but to <strong className="font-serif text-white">impact the team as well</strong>. Just as the twelve disciples who walked alongside Jesus made an impact and changed the world, Jesus first changed theirs. We create a space where the team can grow spiritually, discover their calling, learn, and experience new things.
                  </p>
                  <div className="border-t border-stone-800 pt-6 flex flex-wrap gap-4 items-center justify-between">
                    <div>
                      <p className="font-serif italic text-stone-200 text-sm font-bold">"We all have a limited time on this earth. How are you going to spend it?"</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code of Conduct & Expectations split grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                {/* Code of Conduct Section */}
                <div className="bg-white border border-[#EADCC2] rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                  <div className="flex items-center space-x-3 border-b border-[#FAF7EF] pb-4">
                    <div className="p-2.5 bg-[#FAF7EF] text-[#9A7D3C] rounded-xl">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-black text-[#1C1917] uppercase tracking-wide">Code of Conduct</h3>
                      <p className="text-[10px] font-mono text-[#9A7D3C] font-bold">SACRED EXPECTATIONS & MORAL CONDUCT</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#1C1917]/70 font-light leading-relaxed">
                    As a Christian-based program, the Bible serves as our primary point of reference. Members represent Christ and are expected to act with integrity.
                  </p>

                  <ul className="space-y-3.5 text-xs">
                    <li className="flex items-start gap-2.5 font-light">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9A7D3C] shrink-0" />
                      <span><strong>Respect Others:</strong> Complete care for church team and student house properties.</span>
                    </li>
                    <li className="flex items-start gap-2.5 font-light">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9A7D3C] shrink-0" />
                      <span><strong>Modest Dress:</strong> Dress appropriate for ministry at all times (above approach).</span>
                    </li>
                    <li className="flex items-start gap-2.5 font-light">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9A7D3C] shrink-0" />
                      <span><strong>Intimacy Limit:</strong> One-on-one boy/girl relationships within the team are strictly prohibited. Treat opposite sex as brothers/sisters in Christ.</span>
                    </li>
                    <li className="flex items-start gap-2.5 font-light">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9A7D3C] shrink-0" />
                      <span><strong>Prohibitions:</strong> Alcohol, smoking, vaping, drugs, and pornography are absolute forbidden. Any intoxication results in immediate suspension.</span>
                    </li>
                    <li className="flex items-start gap-2.5 font-light">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9A7D3C] shrink-0" />
                      <span><strong>Rigorous Offenses System:</strong> 1st level: Verbal warning. 2nd level: Program suspension. 3rd level: Expulsion.</span>
                    </li>
                  </ul>
                </div>

                {/* Day In the Life expectations */}
                <div className="bg-white border border-[#EADCC2] rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                  <div className="flex items-center space-x-3 border-b border-[#FAF7EF] pb-4">
                    <div className="p-2.5 bg-[#FAF7EF] text-[#9A7D3C] rounded-xl">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-black text-[#1C1917] uppercase tracking-wide">Duties & Expectations</h3>
                      <p className="text-[10px] font-mono text-[#9A7D3C] font-bold">ROSTERS, MISSIONS & MENTORSHIP</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#1C1917]/70 font-light leading-relaxed">
                    Members hold a heavy roster to prepare them for lifelong dedication. You must be fully present.
                  </p>

                  <ul className="space-y-3.5 text-xs">
                    <li className="flex items-start gap-2.5 font-light">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9A7D3C] shrink-0" />
                      <span><strong>Home Duties:</strong> Join roster teams for night dinners, cooking, budget control, and immaculate room maintenance. (Spontaneous inspections conducted).</span>
                    </li>
                    <li className="flex items-start gap-2.5 font-light">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9A7D3C] shrink-0" />
                      <span><strong>Separation split-ups:</strong> Curfew at 10pm (Mon-Thu) and midnight (Fri-Sun). Genders must separate and move to designated rooms/spaces at 9pm on weekdays and 10pm weekends.</span>
                    </li>
                    <li className="flex items-start gap-2.5 font-light">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9A7D3C] shrink-0" />
                      <span><strong>Church Service:</strong> Sunday youth activities (AMPED squads), setup of regional conferences, sound registry, and evening services.</span>
                    </li>
                    <li className="flex items-start gap-2.5 font-light">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9A7D3C] shrink-0" />
                      <span><strong>Global Missions:</strong> Compulsory participation in termly national builds and physical mission excursions (e.g., Zambia builds, US outreach).</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Day in Life interactive schedule */}
              <div className="space-y-6 text-left">
                <div className="text-center md:text-left">
                  <h3 className="font-serif text-2xl font-black text-[#1C1917]">Interactive Team Daily Routine</h3>
                  <p className="text-xs text-[#1C1917]/70 font-light mt-1">A sample of the rigorous hours maintained to shape character and foster absolute alignment.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dailyTimeline.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-[#EADCC2]/75 hover:border-[#9A7D3C] shadow-xs hover:shadow-md transition-all space-y-2 group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-stone-900 text-stone-100 font-bold">
                          {item.time}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#9A7D3C] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h4 className="font-serif text-xs font-black text-[#1C1917] uppercase tracking-wider">{item.title}</h4>
                      <p className="text-[11px] text-[#1C1917]/65 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Values Sacred Ash callout */}
              <div className="bg-amber-50/45 border border-[#EADCC2] rounded-[2rem] p-6 md:p-8 text-left grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center space-x-2 text-[#9A7D3C]">
                    <Heart className="w-5 h-5 fill-[#9A7D3C]/10" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">SACRED ASH COVENANT</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#1C1917]">Our Core values structure: SACRED ASH</h3>
                  <p className="text-xs text-[#1C1917]/70 font-light leading-relaxed">
                    <strong>SACRED:</strong> Spiritual growth, Adventure, Called in courage, Real, Eternal mindset, Discipleship.<br/>
                    <strong>ASH:</strong> Authentic, Servant-hearted, Honesty.
                  </p>
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setActiveConfigTab('form')}
                    className="w-full py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-[#9A7D3C] text-white text-xs font-serif tracking-widest uppercase font-bold transition-all shadow-md cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Apply</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: PROGRAM COST */}
          {activeConfigTab === 'cost' && (
            <motion.div
              key="cost-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-10 text-left"
            >
              {/* Payment Details Table layout */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl md:text-2xl font-black text-[#1C1917] uppercase tracking-tight">Payment Details & Packages</h3>
                  <p className="text-xs text-[#1C1917]/60 font-light">All pricing plans and additional mission contributions for the 12-month program mapped cleanly.</p>
                </div>

                <div className="border border-[#EADCC2] rounded-3xl overflow-hidden bg-white shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#FAF7EF] border-b border-[#EADCC2]/80 text-[#1C1917] font-serif uppercase tracking-widest font-black text-[10px]">
                          <th className="p-4 w-16 text-center">Option</th>
                          <th className="p-4">Description</th>
                          <th className="p-4 w-44">Frequecy / Option Details</th>
                          <th className="p-4 w-32 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        <tr className="hover:bg-amber-50/20 transition-colors">
                          <td className="p-4 text-center font-mono font-bold">1</td>
                          <td className="p-4">
                            <p className="font-serif font-black text-[#1C1917] uppercase text-[10.5px]">Standard Program (no accommodation)</p>
                            <p className="text-[10px] text-stone-500 font-light">12 Months discipleship structure including academic theological modules & local transport.</p>
                          </td>
                          <td className="p-4 font-mono text-[10px] text-stone-600">Once off payment</td>
                          <td className="p-4 text-right font-mono font-bold text-base text-[#1C1917]">R54 000</td>
                        </tr>
                        <tr className="hover:bg-amber-50/20 transition-colors">
                          <td className="p-4 text-center font-mono font-bold bg-[#FAF7EF]/20">2</td>
                          <td className="p-4">
                            <p className="font-serif font-black text-[#9A7D3C] uppercase text-[10.5px]">Program WITH Accommodation</p>
                            <p className="text-[10px] text-stone-500 font-light">12 Months complete discipleship including fully serviced lodging (excludes holiday phases) & dinner.</p>
                          </td>
                          <td className="p-4 font-mono text-[10px] text-[#9A7D3C] font-bold">Once off payment</td>
                          <td className="p-4 text-right font-mono font-bold text-base text-[#9A7D3C]">R90 000</td>
                        </tr>
                        <tr className="hover:bg-amber-50/20 transition-colors">
                          <td className="p-4 text-center font-mono font-bold">3</td>
                          <td className="p-4">
                            <p className="font-serif font-black text-[#1C1917] uppercase text-[10.5px]">Standard Program (Monthly Plan)</p>
                            <p className="text-[10px] text-stone-500 font-light">12-month program structured into monthly increments.</p>
                          </td>
                          <td className="p-4 font-mono text-[10px] text-stone-600">Monthly invoice</td>
                          <td className="p-4 text-right font-mono font-bold text-base text-[#1C1917]">R4 500 <span className="text-[9px] text-stone-500">pm</span></td>
                        </tr>
                        <tr className="hover:bg-amber-50/20 transition-colors">
                          <td className="p-4 text-center font-mono font-bold bg-[#FAF7EF]/20">4</td>
                          <td className="p-4">
                            <p className="font-serif font-black text-[#9A7D3C] uppercase text-[10.5px]">Program WITH Accommodation (Monthly Plan)</p>
                            <p className="text-[10px] text-stone-500 font-light">Equips lodging roster, ground transit, dinner and curriculum billed continuously.</p>
                          </td>
                          <td className="p-4 font-mono text-[10px] text-stone-600">Monthly invoice</td>
                          <td className="p-4 text-right font-mono font-bold text-base text-[#9A7D3C]">R7 500 <span className="text-[9px] text-[#9A7D3C]">pm</span></td>
                        </tr>
                        <tr className="hover:bg-amber-50/20 transition-colors">
                          <td className="p-4 text-center font-mono font-bold">5</td>
                          <td className="p-4">
                            <p className="font-serif font-black text-[#1C1917]/85 uppercase text-[10.5px]">America Mission Trip (Optional 2 months)</p>
                            <p className="text-[10px] text-stone-500 font-light">Full additional contribution required to cover global mission costs.</p>
                          </td>
                          <td className="p-4 font-mono text-[10px] text-stone-600">Additional once off</td>
                          <td className="p-4 text-right font-mono font-semibold text-[#1C1917]">R5 000</td>
                        </tr>
                        <tr className="hover:bg-amber-50/20 transition-colors">
                          <td className="p-4 text-center font-mono font-bold bg-[#FAF7EF]/20">6</td>
                          <td className="p-4">
                            <p className="font-serif font-black text-[#1C1917]/85 uppercase text-[10.5px]">America Mission Trip (Monthly Split)</p>
                            <p className="text-[10px] text-stone-500 font-light">Over 2-month phase contributions.</p>
                          </td>
                          <td className="p-4 font-mono text-[10px] text-stone-600">Billed over 2 mos</td>
                          <td className="p-4 text-right font-mono font-semibold text-[#1C1917]">R2 500 <span className="text-[9px] text-stone-500 font-light">pm</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bank Zero allocation block */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-[#FAF7EF] border border-[#EADCC2] rounded-24 p-5 gap-3.5">
                  <div className="flex items-center space-x-3 text-left">
                    <div className="w-10 h-10 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-serif font-black text-sm border-2 border-[#9A7D3C]">R</div>
                    <div>
                      <p className="text-xs font-serif font-black uppercase text-[#1C1917] leading-tight">Payment Recipient Register</p>
                      <p className="text-[10.5px] text-[#1C1917]/60 font-light leading-tight">The Twelve Experience NPC • Registered Non-Profit Corporation</p>
                    </div>
                  </div>
                  <div className="font-mono text-[10.5px] text-[#1C1917]/80 text-left sm:text-right bg-white py-2 px-4 rounded-xl border border-stone-200 w-full sm:w-auto">
                    <strong>Bank Name:</strong> Bank Zero • <strong>Branch:</strong> 888000 <br className="hidden sm:inline" />
                    <strong>Account Number:</strong> 80205326191
                  </div>
                </div>
              </div>

              {/* What is covered vs what is not covered block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {/* Covers card */}
                <div className="p-6 md:p-8 rounded-3xl bg-emerald-50/20 border border-emerald-600/20 space-y-4">
                  <h4 className="font-serif text-sm font-black uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>What your payments cover:</span>
                  </h4>
                  <ul className="space-y-2 text-xs font-light text-emerald-950">
                    <li className="flex gap-2">✔ <span><strong>Accommodation:</strong> Safe, clean shared housing (excludes holiday periods).</span></li>
                    <li className="flex gap-2">✔ <span><strong>Dinner:</strong> Specified roster-cooked team meals nightly.</span></li>
                    <li className="flex gap-2">✔ <span><strong>Theology Courses:</strong> Accredited, certified theology curriculum.</span></li>
                    <li className="flex gap-2">✔ <span><strong>Outreach Projects:</strong> Feeding, community builds, printing material.</span></li>
                    <li className="flex gap-2">✔ <span><strong>Ground Transit:</strong> All transportation required for group ministry.</span></li>
                    <li className="flex gap-2">✔ <span><strong>Missions excursions:</strong> Comprehensive local & regional team tours.</span></li>
                  </ul>
                </div>

                {/* Does NOT cover card */}
                <div className="p-6 md:p-8 rounded-3xl bg-amber-50/25 border border-amber-600/20 space-y-4">
                  <h4 className="font-serif text-sm font-black uppercase tracking-wider text-amber-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>What is NOT covered:</span>
                  </h4>
                  <ul className="space-y-2 text-xs font-light text-amber-950">
                    <li className="flex gap-2">✖ <span><strong>Airfare:</strong> Flight transit to/from program hub or global launch sites.</span></li>
                    <li className="flex gap-2">✖ <span><strong>Visa Fees:</strong> Securement of passports or optional travel visas.</span></li>
                    <li className="flex gap-2">✖ <span><strong>Personal Expenses:</strong> Monthly snack allowances, gifts, laundry soap.</span></li>
                    <li className="flex gap-2">✖ <span><strong>Medical Care:</strong> Doctor visits, hospital stay, or chronic medicine costs.</span></li>
                    <li className="flex gap-2">✖ <span><strong>Travel Insurance:</strong> Individuals must secure private coverage.</span></li>
                  </ul>
                </div>
              </div>

              {/* Crucial Policies & Deadlines Banner */}
              <div className="bg-[#1C1917] text-stone-200 border-l-4 border-[#9A7D3C] rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center space-x-2 text-[#9A7D3C]">
                  <Info className="w-5 h-5" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#EADCC2]">CRITICAL COVENANT POLICIES</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-300 font-light leading-relaxed">
                  <div className="space-y-2">
                    <p>
                      <strong className="text-white font-mono uppercase tracking-wider text-[10px] block mb-1">📅 Payment Deadline Clause</strong>
                      Payment must be submitted by the <strong className="text-white">28th of the previous month</strong>. Strict adherence secures materials, meal allocations, and local transit.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p>
                      <strong className="text-white font-mono uppercase tracking-wider text-[10px] block mb-1">⚠️ Late Payment Offense & Fine</strong>
                      Late payments incur a penalty of <strong className="text-white">R200</strong>. Continued outstanding balances risk suspension. However, we walk in grace—if facing family emergency, contact David directly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form redirect btn */}
              <div className="text-center">
                <button
                  onClick={() => setActiveConfigTab('form')}
                  className="py-4 px-8 rounded-xl bg-[#9A7D3C] hover:bg-black text-white rounded-xl text-xs font-serif tracking-widest uppercase font-black transition-all shadow-lg shadow-[#9A7D3C]/10 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Open Interactive Application Form</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ONLINE APPLICATION FORM PORTAL */}
          {activeConfigTab === 'form' && (
            <motion.div
              key="form-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              id="application-form-portal"
              className="space-y-8"
            >
              {submitted ? (
                <div className="max-w-xl mx-auto py-12 px-6 bg-white border border-[#EADCC2] rounded-[2.5rem] shadow-xl text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-black text-[#1C1917] uppercase tracking-tight">Application Transmitted!</h3>
                    <p className="text-xs text-stone-500 font-light">Your enrollment request is recorded on our secure ledger. A duplicate of your response is queued for David Hunter Direct.</p>
                  </div>

                  <div className="p-4 bg-[#FAF7EF] border border-[#EADCC2]/65 rounded-2xl text-left text-xs text-stone-700 space-y-2 font-light">
                    <p><strong>Applicant Name:</strong> {formData.firstName} {formData.lastName}</p>
                    <p><strong>Registered Country:</strong> {formData.countryBirth}</p>
                    <p><strong>Primary Contact:</strong> {formData.email} • {formData.phone}</p>
                    <p><strong>Assigned Log Time:</strong> {new Date().toLocaleString()}</p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <p className="text-[10px] text-stone-405 font-mono uppercase tracking-widest text-[#9A7D3C]">REQUIRED NEXT ACTIONS</p>
                    <p className="text-[11px] text-stone-600 font-light leading-relaxed">
                      Download the printable manual below, secure witness signatures, check off required medical aid items, and dispatch copies directly to <strong className="text-stone-850">david@thetwelve.co.za</strong>.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormStep(1);
                    }}
                    className="w-full py-3 rounded-xl bg-stone-900 text-white text-xs font-serif uppercase tracking-widest font-bold hover:bg-[#9A7D3C] transition-colors cursor-pointer"
                  >
                    Register Another Person
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-[#EADCC2] rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-6 md:p-10 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  
                  {/* Left steps indicator tracker sidebar */}
                  <div className="w-full md:w-1/4 flex flex-row overflow-x-auto md:flex-col gap-2 md:gap-4 md:border-r border-[#FAF7EF] md:pr-6 shrink-0 text-left pb-4 md:pb-0 scrollbar-none">
                    <span className="text-[9px] font-mono text-[#9A7D3C] font-black uppercase tracking-widest hidden md:block mb-2">STEPS CONTROL CENTER</span>
                    
                    {[
                      { step: 1, title: 'Personal Info' },
                      { step: 2, title: 'Contact Registry' },
                      { step: 3, title: 'Church & Spiritual' },
                      { step: 4, title: 'Previous Church' },
                      { step: 5, title: 'Family & Education' },
                      { step: 6, title: 'Health Profile' },
                      { step: 7, title: 'Agreement & Documents' }
                    ].map((st) => (
                      <button
                        key={st.step}
                        type="button"
                        onClick={() => {
                          if (st.step < formStep || agreedIndemnity || true) {
                            setFormStep(st.step);
                          }
                        }}
                        className={`flex-shrink-0 flex items-center space-x-2 p-2 px-3 md:px-2 rounded-xl transition-all cursor-pointer text-left ${
                          formStep === st.step
                            ? 'bg-[#1C1917] text-white'
                            : 'hover:bg-[#FAF7EF] text-stone-600 bg-[#FAF7EF]/20'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0 ${
                          formStep === st.step ? 'bg-[#9A7D3C] text-white' : 'bg-[#FAF7EF] text-[#9A7D3C]'
                        }`}>
                          {st.step}
                        </div>
                        <span className="text-[10px] md:text-[11px] font-serif font-black uppercase tracking-wider whitespace-nowrap">{st.title}</span>
                      </button>
                    ))}

                    <div className="pt-6 border-t border-stone-100 hidden md:block">
                      <p className="text-[9px] text-[#9A7D3C] font-mono leading-relaxed uppercase tracking-wider">Note: This secure form transmits your responses directly to our registration ledger.</p>
                    </div>
                  </div>

                  {/* Right: Actual Form Fields based on step */}
                  <form onSubmit={handleSubmitForm} className="flex-1 w-full text-left space-y-6">
                    <div className="border-b border-[#FAF7EF] pb-4">
                      <h4 className="font-serif text-sm sm:text-base md:text-lg font-black text-[#1C1917] uppercase tracking-wider leading-snug">
                        Page {formStep} of 7: {[
                          'Personal Information Registration',
                          'Address & Account Contacts',
                          'Church & Spiritual Life Register',
                          'Previous Church Ministry Service',
                          'Family Background & Education Details',
                          'Health & Fitness Profile',
                          'Sacred Indemnity Agreement & File Upload Checklist'
                        ][formStep - 1]}
                      </h4>
                      <p className="text-[9px] sm:text-[10px] text-[#9A7D3C] font-mono font-bold uppercase tracking-widest mt-1">TEAM ENROLLMENT SHEET</p>
                      <div className="flex items-center space-x-1.5 mt-1.5 text-[9px] sm:text-[10px] text-amber-800 bg-amber-500/10 border border-amber-200/40 rounded-lg px-2.5 py-1 w-fit select-none font-sans font-bold">
                        <span>📅 INTAKE WINDOW: APPLICATIONS CLOSE 1 SEPTEMBER 2026</span>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={formStep}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-5"
                      >
                        {/* STEP 1: PERSONAL INFO */}
                        {formStep === 1 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5 col-span-1 sm:col-span-1">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">First Name(s): *</label>
                              <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                            </div>
                            <div className="space-y-1.5 col-span-1 sm:col-span-1">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Last Name / Surname: *</label>
                              <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Country of Birth: *</label>
                              <input required type="text" name="countryBirth" value={formData.countryBirth} onChange={handleInputChange} placeholder="e.g. South Africa" className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Citizenship: *</label>
                              <input required type="text" name="citizenship" value={formData.citizenship} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Dual Citizenship (If applicable):</label>
                              <input type="text" name="dualCitizenship" value={formData.dualCitizenship} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Age (as of next program year): *</label>
                              <input required type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">ID Number / National ID: *</label>
                              <input required type="text" name="idNumber" value={formData.idNumber} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Passport Number (For mission travels):</label>
                              <input type="text" name="passportNumber" value={formData.passportNumber} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                            </div>

                            <div className="col-span-1 sm:col-span-2 space-y-2">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">Gender: *</label>
                              <div className="flex gap-4">
                                {['Male', 'Female'].map((g) => (
                                  <label key={g} className="flex items-center space-x-2 text-xs font-light cursor-pointer">
                                    <input required type="radio" name="genderRadio" checked={gender === g} onChange={() => setGender(g)} className="accent-[#9A7D3C]" />
                                    <span>{g}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="col-span-1 sm:col-span-2 space-y-2">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">Current Status: *</label>
                              <div className="flex flex-wrap gap-4">
                                {['Scholar', 'Student', 'Employee', 'Other'].map((status) => (
                                  <label key={status} className="flex items-center space-x-2 text-xs font-light cursor-pointer">
                                    <input required type="radio" name="statusRadio" checked={personType === status} onChange={() => setPersonType(status)} className="accent-[#9A7D3C]" />
                                    <span>{status}</span>
                                  </label>
                                ))}
                              </div>
                              {personType === 'Other' && (
                                <input type="text" name="currentEmployer" value={formData.currentEmployer} onChange={handleInputChange} placeholder="Specify current occupation details..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs mt-1" />
                              )}
                            </div>

                            <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Hoody Size: *</label>
                                <select required value={hoodySize} onChange={(e) => setHoodySize(e.target.value)} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs bg-white">
                                  <option value="">Select Size</option>
                                  <option value="XS">XS</option>
                                  <option value="S">S</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XL">XL</option>
                                  <option value="XXL">XXL</option>
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">T-Shirt Size: *</label>
                                <select required value={tShirtSize} onChange={(e) => setTShirtSize(e.target.value)} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs bg-white">
                                  <option value="">Select Size</option>
                                  <option value="XS">XS</option>
                                  <option value="S">S</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XL">XL</option>
                                  <option value="XXL">XXL</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 2: CONTACT REGISTRY */}
                        {formStep === 2 && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <h5 className="font-serif font-black text-xs uppercase tracking-wider text-stone-500 col-span-1 sm:col-span-2 border-b pb-1">Applicant Contact Info</h5>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Phone Number: *</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Email Address: *</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Physical Street Address: *</label>
                                <textarea required name="physicalAddress" value={formData.physicalAddress} onChange={handleInputChange} rows={2} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Town / City: *</label>
                                <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Postal Code: *</label>
                                <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <h5 className="font-serif font-black text-xs uppercase tracking-wider text-stone-500 col-span-1 sm:col-span-2 border-b pb-1">Person Account Responsibility (Finances)</h5>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Sponsor Name: *</label>
                                <input required type="text" name="accountName" value={formData.accountName} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Sponsor Surname: *</label>
                                <input required type="text" name="accountSurname" value={formData.accountSurname} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Relationship to Applicant: *</label>
                                <input required type="text" name="accountRelation" value={formData.accountRelation} onChange={handleInputChange} placeholder="e.g. Father, Supporter, Church" className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Sponsor Phone Number: *</label>
                                <input required type="tel" name="accountPhone" value={formData.accountPhone} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Sponsor Email: *</label>
                                <input required type="email" name="accountEmail" value={formData.accountEmail} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 3: CHURCH & SPIRITUAL */}
                        {formStep === 3 && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Home Church: *</label>
                                <input required type="text" name="homeChurch" value={formData.homeChurch} onChange={handleInputChange} placeholder="e.g. CityHill Church Durban" className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Lead Pastor / Elder: *</label>
                                <input required type="text" name="leadPastor" value={formData.leadPastor} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">How long have you attended this church? *</label>
                                <input required type="text" name="attendDuration" value={formData.attendDuration} onChange={handleInputChange} placeholder="e.g., 3 years" className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Why do you want to join "The Twelve"? *</label>
                              <textarea required name="whyJoin" value={formData.whyJoin} onChange={handleInputChange} rows={3} placeholder="Describe your heart, calling, and reasons..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">What expectations do you have of this program? *</label>
                              <textarea required name="programExpectations" value={formData.programExpectations} onChange={handleInputChange} rows={3} placeholder="Expectations from team leadership, mentors, and team peers..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                            </div>

                            <div className="space-y-3.5 border-t pt-4">
                              <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">
                                Rate your own personal walk with Jesus (out of 10): * ({rateWalk} / 10)
                              </label>
                              <div className="flex items-center space-x-4">
                                <input type="range" min="1" max="10" value={rateWalk} onChange={(e) => setRateWalk(parseInt(e.target.value))} className="w-full accent-[#9A7D3C] cursor-pointer" />
                                <span className="text-sm font-bold w-6 text-center text-[#9A7D3C]">{rateWalk}</span>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Why did you rate your walk this way? *</label>
                                <textarea required name="walkExplanation" value={formData.walkExplanation} onChange={handleInputChange} rows={2} placeholder="Briefly clarify your current spiritual focus, habits or obstacles..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 4: PREVIOUS EXPERIENCE */}
                        {formStep === 4 && (
                          <div className="space-y-5">
                            <p className="text-xs text-[#1C1917]/70 font-light italic leading-snug">Detailing your background assists in proper skill and ministry matching during conferences and active services.</p>
                            
                            <div className="space-y-3.5">
                              {/* Band Yes/No */}
                              <div className="border border-[#EADCC2]/40 rounded-xl p-4 bg-[#FAF7EF]/30 space-y-2">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">Were you previously part of your church&apos;s band/worship team? *</label>
                                <div className="flex gap-4">
                                  {['Yes', 'No'].map((op) => (
                                    <label key={op} className="flex items-center space-x-2 text-xs font-light cursor-pointer">
                                      <input required type="radio" name="bandRadio" checked={worshipBand === op} onChange={() => setWorshipBand(op)} className="accent-[#9A7D3C]" />
                                      <span>{op}</span>
                                    </label>
                                  ))}
                                </div>
                                {worshipBand === 'Yes' && (
                                  <input type="text" name="bandSkills" value={formData.bandSkills} onChange={handleInputChange} placeholder="Specify capacity, instruments, or vocals (e.g. Band leader, bass guitar)..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs mt-2 bg-white" />
                                )}
                              </div>

                              {/* AV/Sound Yes/No */}
                              <div className="border border-[#EADCC2]/40 rounded-xl p-4 bg-[#FAF7EF]/30 space-y-2">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">Were you previously part of your church&apos;s AV / Sound team? *</label>
                                <div className="flex gap-4">
                                  {['Yes', 'No'].map((op) => (
                                    <label key={op} className="flex items-center space-x-2 text-xs font-light cursor-pointer">
                                      <input required type="radio" name="soundRadio" checked={soundTeam === op} onChange={() => setSoundTeam(op)} className="accent-[#9A7D3C]" />
                                      <span>{op}</span>
                                    </label>
                                  ))}
                                </div>
                                {soundTeam === 'Yes' && (
                                  <input type="text" name="soundSkills" value={formData.soundSkills} onChange={handleInputChange} placeholder="Specify capacity (e.g. Ran sound board, projection layout)..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs mt-2 bg-white" />
                                )}
                              </div>

                              {/* Youth/Kids Ministry */}
                              <div className="border border-[#EADCC2]/40 rounded-xl p-4 bg-[#FAF7EF]/30 space-y-2">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">Were you previously part of youth / kids ministry / childcare? *</label>
                                <div className="flex gap-4">
                                  {['Yes', 'No'].map((op) => (
                                    <label key={op} className="flex items-center space-x-2 text-xs font-light cursor-pointer">
                                      <input required type="radio" name="kidsRadio" checked={kidsTeam === op} onChange={() => setKidsTeam(op)} className="accent-[#9A7D3C]" />
                                      <span>{op}</span>
                                    </label>
                                  ))}
                                </div>
                                {kidsTeam === 'Yes' && (
                                  <input type="text" name="kidsInvolvement" value={formData.kidsInvolvement} onChange={handleInputChange} placeholder="Detail your specific classes, lesson groups, or activities..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs mt-2 bg-white" />
                                )}
                              </div>

                              {/* Coffee / Barista */}
                              <div className="border border-[#EADCC2]/40 rounded-xl p-4 bg-[#FAF7EF]/30 space-y-2">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">Were you previously part of church Coffee Shop / Barista team? *</label>
                                <div className="flex gap-4">
                                  {['Yes', 'No'].map((op) => (
                                    <label key={op} className="flex items-center space-x-2 text-xs font-light cursor-pointer">
                                      <input required type="radio" name="baristaRadio" checked={baristaTeam === op} onChange={() => setBaristaTeam(op)} className="accent-[#9A7D3C]" />
                                      <span>{op}</span>
                                    </label>
                                  ))}
                                </div>
                                {baristaTeam === 'Yes' && (
                                  <input type="text" name="baristaInvolvement" value={formData.baristaInvolvement} onChange={handleInputChange} placeholder="Detail experience, machines, or roster routines..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs mt-2 bg-white" />
                                )}
                              </div>

                              {/* Other ministry */}
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">Any other church involvement capacity?</label>
                                <textarea name="otherInvolvement" value={formData.otherInvolvement} onChange={handleInputChange} rows={2} placeholder="e.g., outreach setups, ushering, logistical packing..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 5: FAMILY & EDUCATION */}
                        {formStep === 5 && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <h5 className="font-serif font-black text-xs uppercase tracking-wider text-stone-500 col-span-1 sm:col-span-2 border-b pb-1">Parent & Guardian Contact Details</h5>
                              <div className="space-y-1.5 col-span-1 sm:col-span-1">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Guardian Name & Initials: *</label>
                                <input required type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5 col-span-1 sm:col-span-1">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Guardian Surname: *</label>
                                <input required type="text" name="parentSurname" value={formData.parentSurname} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Telephone / Mobile: *</label>
                                <input required type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Email Address: *</label>
                                <input required type="email" name="parentEmail" value={formData.parentEmail} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] text-xs" />
                              </div>
                              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">How does your family feel about your application? *</label>
                                <textarea required name="familyFeelings" value={formData.familyFeelings} onChange={handleInputChange} rows={2} placeholder="Explain guardian support level..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <h5 className="font-serif font-black text-xs uppercase tracking-wider text-stone-500 col-span-1 sm:col-span-2 border-b pb-1">Highest Level of Education</h5>
                              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">High School Attended: *</label>
                                <input required type="text" name="highschool" value={formData.highschool} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Highest Grade Passed: *</label>
                                <input required type="text" name="highestGrade" value={formData.highestGrade} onChange={handleInputChange} placeholder="e.g. National Senior Certificate (Grade 12)" className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Year of Matriculation: *</label>
                                <input required type="number" name="matricYear" value={formData.matricYear} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>

                              <div className="col-span-1 sm:col-span-2 space-y-2">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">Have you completed tertiary / college study? *</label>
                                <div className="flex gap-4">
                                  {['Yes', 'No'].map((op) => (
                                    <label key={op} className="flex items-center space-x-2 text-xs font-light cursor-pointer">
                                      <input required type="radio" name="tertiaryRadio" checked={completedStudy === op} onChange={() => setCompletedStudy(op)} className="accent-[#9A7D3C]" />
                                      <span>{op}</span>
                                    </label>
                                  ))}
                                </div>
                                {completedStudy === 'Yes' && (
                                  <textarea name="tertiaryDetails" value={formData.tertiaryDetails} onChange={handleInputChange} rows={2} placeholder="Specify institution name, major, and degree obtained..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs mt-2 bg-white" />
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 6: HEALTH PROFILE */}
                        {formStep === 6 && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="col-span-1 sm:col-span-2 space-y-2">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">Rate Your General Health: *</label>
                                <div className="flex flex-wrap gap-4">
                                  {['Excellent', 'Good', 'Fair', 'Poor'].map((hl) => (
                                    <label key={hl} className="flex items-center space-x-2 text-xs font-light cursor-pointer">
                                      <input required type="radio" name="healthRadio" checked={rateHealth === hl} onChange={() => setRateHealth(hl)} className="accent-[#9A7D3C]" />
                                      <span>{hl}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">List any allergies & details of medical warnings:</label>
                                <textarea name="allergies" value={formData.allergies} onChange={handleInputChange} rows={2} placeholder="e.g. Peanuts, Penicillin (leave blank if none)..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>

                              <div className="col-span-1 sm:col-span-2 space-y-2 border-t pt-3">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">Do you have any physical limitations? *</label>
                                <div className="flex gap-4">
                                  {['Yes', 'No'].map((op) => (
                                    <label key={op} className="flex items-center space-x-2 text-xs font-light cursor-pointer">
                                      <input required type="radio" name="limitRadio" checked={physicalLimitation === op} onChange={() => setPhysicalLimitation(op)} className="accent-[#9A7D3C]" />
                                      <span>{op}</span>
                                    </label>
                                  ))}
                                </div>
                                {physicalLimitation === 'Yes' && (
                                  <input type="text" name="explainLimitations" value={formData.explainLimitations} onChange={handleInputChange} placeholder="Please describe physical constraints..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs mt-2 bg-white" />
                                )}
                              </div>

                              <div className="col-span-1 sm:col-span-2 space-y-2 border-t pt-3">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">Are you taking any medication? *</label>
                                <div className="flex gap-4">
                                  {['Yes', 'No'].map((op) => (
                                    <label key={op} className="flex items-center space-x-2 text-xs font-light cursor-pointer">
                                      <input required type="radio" name="medicationRadio" checked={takingMedication === op} onChange={() => setTakingMedication(op)} className="accent-[#9A7D3C]" />
                                      <span>{op}</span>
                                    </label>
                                  ))}
                                </div>
                                {takingMedication === 'Yes' && (
                                  <input type="text" name="explainMedications" value={formData.explainMedications} onChange={handleInputChange} placeholder="Detail medications and reasons..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs mt-2 bg-white" />
                                )}
                              </div>

                              <div className="col-span-1 sm:col-span-2 space-y-2 border-t pt-3">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider block">Are you covered on medical aid? *</label>
                                <div className="flex gap-4">
                                  {['Yes', 'No'].map((op) => (
                                    <label key={op} className="flex items-center space-x-2 text-xs font-light cursor-pointer">
                                      <input required type="radio" name="medicalAidRadio" checked={medicalAid === op} onChange={() => setMedicalAid(op)} className="accent-[#9A7D3C]" />
                                      <span>{op}</span>
                                    </label>
                                  ))}
                                </div>
                                {medicalAid === 'Yes' && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 bg-[#FAF7EF]/20 p-3 rounded-lg border">
                                    <div className="space-y-1.5">
                                      <label className="text-[9px] font-mono font-black uppercase text-[#1C1917]">Medical Aid Plan Name:</label>
                                      <input type="text" name="medicalAidName" value={formData.medicalAidName} onChange={handleInputChange} className="w-full p-2 border rounded text-xs bg-white" />
                                    </div>
                                    <div className="space-y-1.5">
                                      <label className="text-[9px] font-mono font-black uppercase text-[#1C1917]">Medical Aid Member Number:</label>
                                      <input type="text" name="medicalAidNumber" value={formData.medicalAidNumber} onChange={handleInputChange} className="w-full p-2 border rounded text-xs bg-white" />
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="space-y-1.5 col-span-1 sm:col-span-2 border-t pt-3">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Rate your fitness level & activity routines: *</label>
                                <textarea required name="fitnessLevel" value={formData.fitnessLevel} onChange={handleInputChange} rows={2} placeholder="Explain how you stay active, participate in sports, or gym routines..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 7: AGREEMENT / DOCUMENTS */}
                        {formStep === 7 && (
                          <div className="space-y-6">
                            
                            {/* Terms Checkbox */}
                            <div className="p-4 bg-[#FAF7EF] border border-[#EADCC2] rounded-2xl select-none text-stone-800 space-y-4">
                              <h5 className="font-serif font-black text-xs uppercase tracking-wide border-b pb-1">Covenant, Agreement & Indemnity</h5>
                              <p className="text-[10.5px] leading-relaxed font-light font-sans text-left">
                                By signing, I declare that I stand capable and aligned to enter the Covenant under David&apos;s supervising authority. I pledge to pay the full program fees in accordance with the specified package (e.g. R54,000 standard or R90,000 accommodation, or monthly rates R4,500 / R7,500), avoid drinking/smoking/vaping and sexual sin, obey lights-out curfew split-ups (Mon-Thu: 10pm, Fri-Sun: 12am), and submit assignments punctually.
                              </p>

                              <label className="flex items-start gap-2 text-xs font-semibold cursor-pointer text-left block text-[#1C1917]">
                                <input required type="checkbox" checked={agreedIndemnity} onChange={(e) => setAgreedIndemnity(e.target.checked)} className="mt-1 accent-[#9A7D3C]" />
                                <span>I, the applicant, declare and agree to abide by all the rules & regulations of The Twelve Discipleship.</span>
                              </label>
                            </div>

                            {/* Required Documents checks */}
                            <div className="space-y-3.5 border-t pt-4">
                              <h5 className="font-serif font-black text-xs uppercase tracking-wide text-stone-500">Required Documents checklist</h5>
                              <p className="text-[10px] text-stone-400 font-light font-sans">Compile copies of these documents to hand in to David Hunter: *</p>

                              <div className="space-y-2 text-xs font-light text-stone-800">
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                  <input type="checkbox" required className="accent-[#9A7D3C]" />
                                  <span>1. Copy of Applicant&apos;s National ID or ID Document Equivalent</span>
                                </label>
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                  <input type="checkbox" required className="accent-[#9A7D3C]" />
                                  <span>2. Copy of Applicant&apos;s Passport (required for global missions builds)</span>
                                </label>
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                  <input type="checkbox" className="accent-[#9A7D3C]" />
                                  <span>3. Copy of Driver&apos;s License (if applicable)</span>
                                </label>
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                  <input type="checkbox" className="accent-[#9A7D3C]" />
                                  <span>4. Copy of Medical Aid Membership Card (if applicable)</span>
                                </label>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Full name of Applicant (Signature): *</label>
                                <input required type="text" name="applicantFullName" value={formData.applicantFullName} onChange={handleInputChange} placeholder="Type full name as digital signature..." className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-black text-[#1C1917] uppercase tracking-wider">Date of signature: *</label>
                                <input required type="date" name="agreementDate" value={formData.agreementDate} onChange={handleInputChange} className="w-full p-2.5 border border-[#EADCC2] rounded-lg text-xs" />
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Step buttons row */}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 border-t border-[#FAF7EF] pt-5">
                      {formStep > 1 ? (
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="px-5 py-2.5 border border-stone-200 text-stone-700 rounded-lg text-[10px] sm:text-xs font-serif uppercase tracking-wider hover:bg-stone-50 cursor-pointer text-center"
                        >
                          Back
                        </button>
                      ) : (
                        <div className="hidden sm:block" />
                      )}

                      {formStep < 7 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-6 py-2.5 bg-[#1C1917] text-white rounded-lg text-[10px] sm:text-xs font-serif uppercase tracking-wider hover:bg-[#9A7D3C] transition-colors cursor-pointer text-center"
                        >
                          Next Step
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-4 sm:px-7 py-3 bg-[#9A7D3C] hover:bg-black text-white rounded-lg text-[10px] sm:text-xs font-serif uppercase tracking-widest font-black transition-colors shadow-lg cursor-pointer flex items-center justify-center space-x-1"
                        >
                          <span>Complete & Submit Registration</span>
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
