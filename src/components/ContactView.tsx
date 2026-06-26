/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Program Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // Simulate real database submission / email delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('General Program Inquiry');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-16 py-8 px-4 font-sans">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="inline-flex items-center space-x-2 px-3 py-1 bg-[#9A7D3C]/10 border border-[#9A7D3C]/20 rounded-full text-xs font-bold tracking-widest text-[#9A7D3C] uppercase text-center justify-center">
          <Mail className="w-3.5 h-3.5" />
          <span>Connect & Reach Out</span>
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#1C1917] tracking-tight leading-tight">
          CONTACT & DIRECTORY
        </h2>
        <p className="text-sm md:text-base text-[#1C1917]/70 font-light">
          Whether you are an aspiring leader, a community development officer, or a partner, we invite you to leave a message. 
          Our residency directorate in Durban / Hillcrest will respond shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct contact details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick contact credentials */}
          <div className="bg-[#FAF7EF] border border-[#E9D5B8] p-6 md:p-8 rounded-[2.5rem] shadow-sm space-y-6">
            <div>
              <span className="text-[10px] tracking-widest text-[#9A7D3C] font-black uppercase">DIRECT ACCESS</span>
              <h3 className="font-serif text-lg md:text-xl text-[#1C1917] font-bold">Contact Coordinates</h3>
              <p className="text-xs text-[#1C1917]/50 mt-0.5">
                Reach the program directors directly or visit the Hillcrest campus.
              </p>
            </div>

            <div className="space-y-4 text-xs font-medium">
              
              {/* Address detail */}
              <div className="flex items-start gap-3 p-4 bg-white border border-[#EADCC2]/40 rounded-2xl">
                <MapPin className="w-5 h-5 text-[#9A7D3C] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-serif text-xs font-bold text-[#1C1917] block">Main Campus Bounds</span>
                  <p className="text-[#1C1917]/70 leading-relaxed font-light">
                    CityHill Church Hillcrest Campus,<br />
                    1 Greenmeadow Ln, Hillcrest 3610,<br />
                    KwaZulu-Natal, South Africa
                  </p>
                </div>
              </div>

              {/* David Hunter Direct */}
              <div className="flex items-start gap-3 p-4 bg-white border border-[#EADCC2]/40 rounded-2xl">
                <Phone className="w-5 h-5 text-[#9A7D3C] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-serif text-xs font-bold text-[#1C1917] block">Residency Director Inquiries</span>
                  <a href="tel:0815411335" className="block text-xs text-[#9A7D3C] hover:underline hover:text-[#1C1917] transition-all">
                    📞 081 541 1335 (David Hunter, Director)
                  </a>
                  <a href="mailto:david@thetwelve.co.za" className="block text-xs text-stone-500 hover:underline">
                    ✉️ david@thetwelve.co.za
                  </a>
                </div>
              </div>

              {/* Office Inquiries */}
              <div className="flex items-start gap-3 p-4 bg-white border border-[#EADCC2]/40 rounded-2xl">
                <Mail className="w-5 h-5 text-[#9A7D3C] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-serif text-xs font-bold text-[#1C1917] block">Administrative Assistant</span>
                  <a href="mailto:hello@cityhill.co.za" className="block text-xs text-[#9A7D3C] hover:underline hover:text-[#1C1917] transition-all">
                    ✉️ hello@cityhill.co.za
                  </a>
                </div>
              </div>

            </div>

            {/* Verification of presence */}
            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
              <span className="text-[10px] tracking-wider text-[#9A7D3C] font-bold uppercase block mb-1">
                📅 APPLICATIONS WINDOW
              </span>
              <p className="text-[11px] text-[#1C1917]/70 leading-normal font-light">
                Applications for the upcoming 12-member capacity team cycle are currently <strong>OPEN until the 1st of September</strong>. 
                Our team conducts selection panels quarterly in South Africa.
              </p>
            </div>

          </div>

          {/* Sentry & safety contact section */}
          <div className="bg-white border border-[#E9D5B8] p-6 md:p-8 rounded-[2.5rem] shadow-sm space-y-4">
            <div>
              <span className="text-[10px] tracking-widest text-[#EF4444] font-black uppercase">CRISIS SENTRY DIRECTORY</span>
              <h3 className="font-serif text-base font-bold text-[#1C1917]">Emergency Contacts</h3>
            </div>
            
            <div className="space-y-3">
              {EMERGENCY_CONTACTS.slice(2, 4).map((item, idx) => (
                <div key={idx} className="p-3 bg-[#FAF7EF] rounded-xl border border-[#E9D5B8]/40 space-y-1">
                  <span className="text-[8px] font-bold text-red-500 uppercase tracking-widest block">{item.role}</span>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-stone-800">{item.name}</span>
                    <a href={`tel:${item.phone.replace(/\s+/g, '')}`} className="text-[#9A7D3C] font-bold hover:underline">
                      {item.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Interactive contact form with complete states */}
        <div className="lg:col-span-7 bg-white border border-[#E9D5B8] p-6 md:p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <span className="text-[10px] tracking-widest text-[#9A7D3C] font-black uppercase">SECURE DISPATCH</span>
                  <h3 className="font-serif text-xl md:text-2xl text-[#1C1917] font-bold">Inquiry Form</h3>
                  <p className="text-xs text-[#1C1917]/50 mt-0.5">
                    Your message goes directly to the Program Sentry desk. None of your data is shared.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name input */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-[#1C1917]/60 uppercase tracking-widest">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sipho Langa"
                        id="contact-name-field"
                        className="w-full px-4 py-3 rounded-xl border border-[#E9D5B8] bg-white text-[#1C1917] focus:outline-none focus:border-[#9A7D3C] text-xs font-semibold"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-[#1C1917]/60 uppercase tracking-widest">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. sipho@example.co.za"
                        id="contact-email-field"
                        className="w-full px-4 py-3 rounded-xl border border-[#E9D5B8] bg-white text-[#1C1917] focus:outline-none focus:border-[#9A7D3C] text-xs font-semibold"
                      />
                    </div>

                  </div>

                  {/* Subject input */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-[#1C1917]/60 uppercase tracking-widest">Regarding Subject</label>
                    <select 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-3 rounded-xl border border-[#E9D5B8] bg-[#FDFBF7] text-[#1C1917] focus:outline-none focus:border-[#9A7D3C] text-xs font-bold"
                    >
                      <option value="General Program Inquiry">General Program Inquiry</option>
                      <option value="Team Application Process">Upcoming Team Cycle Application</option>
                      <option value="Partner of Excellence Sponsorship">Partner of Excellence Sponsorship</option>
                      <option value="Direct Director Appointment">Direct appointment with Robbie / David</option>
                    </select>
                  </div>

                  {/* Message input */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-[#1C1917]/60 uppercase tracking-widest">Message Narrative</label>
                    <textarea 
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please state how we can support, partner, or review your selection application..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E9D5B8] bg-white text-[#1C1917] focus:outline-none focus:border-[#9A7D3C] text-xs leading-relaxed"
                    />
                  </div>

                  {/* Action submit button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#1C1917] hover:bg-[#9A7D3C] text-[#FDFBF7] font-serif uppercase tracking-[0.25em] text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2.5 shadow-md flex-shrink-0"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Sending Transmission...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-6 max-w-md mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-[#9A7D3C]/10 flex items-center justify-center mx-auto text-[#9A7D3C]">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-serif text-xl md:text-2xl text-[#1C1917] font-bold">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs text-[#1C1917]/70 leading-relaxed font-light font-serif">
                    Honored <strong>{name}</strong>, thank you for writing. Your message has been safely logged in our Durban registry 
                    and will be reviewed personally by Robbie and David within 24 working hours.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7EF] rounded-2xl border border-[#E9D5B8]/40 text-left text-[11px] leading-relaxed font-light text-stone-600">
                  <span className="font-bold text-stone-800 uppercase text-[9px] tracking-wider block mb-1">RECORDED ENTRIES:</span>
                  <div><strong>Email:</strong> {email}</div>
                  <div><strong>Theme:</strong> {subject}</div>
                  <div className="mt-1 font-serif italic text-stone-500">
                    &quot;Your message is safely recorded. We appreciate your interest in The Twelve.&quot;
                  </div>
                </div>

                <button 
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-[#1C1917] hover:bg-[#9A7D3C] text-white text-xs font-serif uppercase tracking-widest font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 mx-auto"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Send Another Query</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
