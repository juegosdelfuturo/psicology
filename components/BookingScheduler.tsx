import React, { useEffect, useRef } from 'react';
import { Therapist } from '../types';
import { Clock, Euro, Star, GraduationCap, CalendarCheck, CheckCircle2 } from 'lucide-react';

interface BookingSchedulerProps {
  therapist: Therapist;
  onConfirm: (date: string, time: string) => void;
  onBack: () => void;
}

export const BookingScheduler: React.FC<BookingSchedulerProps> = ({ therapist, onConfirm }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const initWidget = () => {
      if ((window as any).Calendly && containerRef.current) {
        containerRef.current.innerHTML = '';
        (window as any).Calendly.initInlineWidget({
          url: 'https://calendly.com/pedro-sanmiguel-alumni/30min?primary_color=47f07b',
          parentElement: containerRef.current,
          prefill: {},
          utm: {}
        });
      }
    };

    const timer = setTimeout(initWidget, 300);

    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        onConfirm("Confirmed Date", "Confirmed Time");
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, [onConfirm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center text-emerald-600 font-black text-sm uppercase tracking-widest">
          <CheckCircle2 className="w-5 h-5 mr-2" /> Payment Verified
        </div>
        <div className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Step 2 of 2: Select Date</div>
      </div>

      <div className="glass bg-white/50 rounded-[3rem] shadow-2xl overflow-hidden border border-white flex flex-col lg:flex-row min-h-[850px]">
        {/* Left Panel: Therapist Info */}
        <div className="lg:w-1/3 bg-slate-900/5 backdrop-blur-sm p-10 border-r border-white flex flex-col">
          <div className="mb-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black mb-6 uppercase tracking-wider">
              <GraduationCap className="w-3 h-3 mr-2" />
              Advanced Clinical Student
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight">{therapist.name}</h2>
            
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-8 bg-sage-200/50 flex items-center justify-center border-4 border-white shadow-xl max-w-[280px] mx-auto lg:mx-0">
               <span className="text-7xl font-black text-white drop-shadow-md select-none tracking-tighter opacity-80">
                {therapist.name.split(' ').map(n => n[0]).join('')}
              </span>
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg flex items-center">
                 <Star className="w-3 h-3 mr-1.5 text-yellow-500 fill-yellow-500" />
                 <span className="text-[10px] font-black text-slate-800 tracking-wider">TOP RATED</span>
              </div>
            </div>
            
            <p className="text-base text-slate-600 font-medium italic opacity-80 leading-relaxed">
              "{therapist.description}"
            </p>
          </div>

          <div className="mt-auto pt-8 border-t border-slate-200/50 space-y-5">
             <div className="flex items-center text-slate-800 font-bold opacity-60">
               <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center mr-4">
                 <Euro className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-0.5">Payment Status</p>
                 <span className="text-base">Successfully Paid</span>
               </div>
             </div>
             <div className="flex items-center text-slate-800 font-bold">
               <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mr-4 text-emerald-700">
                 <Clock className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-0.5">Session Duration</p>
                 <span className="text-base">60 Minute Session</span>
               </div>
             </div>
          </div>
        </div>

        {/* Right Panel: Calendly Integration */}
        <div className="lg:w-2/3 p-4 lg:p-10 flex flex-col bg-white">
          <div className="mb-6 px-6 pt-4 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">Pick your time.</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Select an available slot below to finalize your booking</p>
            </div>
            <div className="hidden sm:flex items-center text-emerald-600 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
              <CalendarCheck className="w-4 h-4 mr-2" />
              <span className="text-[10px] font-black uppercase tracking-widest">Final Step</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden rounded-[2rem] border border-slate-100 bg-slate-50 shadow-inner min-h-[700px]">
            <div 
              ref={containerRef}
              className="w-full h-full"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>

          <div className="mt-6 px-6 text-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Your session is pre-paid. Selecting a 60-minute slot above will complete your formal booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};