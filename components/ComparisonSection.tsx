import React from 'react';
import { Check, X, Info } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const features = [
    { 
      label: "Students in their advanced years of psychology studies", 
      tooltip: "Practitioners are experienced students almost ready for the job market",
      us: true, 
      them: false 
    },
    { 
      label: "Affordable (~20€ per session)", 
      tooltip: "Significantly more affordable than private practice rates",
      us: true, 
      them: false 
    },
    { 
      label: "Therapy from anywhere", 
      tooltip: "Secure video calls from the comfort of your home",
      us: true, 
      them: false 
    },
    { 
      label: "Immediate Availability", 
      tooltip: "No waiting lists - book a slot for this week",
      us: true, 
      them: false 
    },
    { 
      label: "Clinical Psychology Background", 
      tooltip: "Practitioners have an extensive university background in clinical psychology",
      us: true, 
      them: false 
    },
    { 
      label: "Digital-first Scheduling", 
      tooltip: "See real-time availability and book instantly",
      us: true, 
      them: false 
    },
    { 
      label: "Zero Travel Friction", 
      tooltip: "Save time and money on commuting",
      us: true, 
      them: false 
    },
  ];

  return (
    <div className="py-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Designed for accessibility.</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium opacity-80">
            Compare the gofeelbetter experience with traditional therapy pathways.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-0 relative z-20">
             {/* Empty Corner */}
            <div className="col-span-5 md:col-span-6"></div>
            
            {/* Our Product Header */}
            <div className="col-span-3 md:col-span-3 bg-slate-900 rounded-t-3xl py-10 text-center shadow-2xl mx-1 md:mx-2 transform translate-y-3">
              <h3 className="text-white font-bold text-sm md:text-lg leading-tight uppercase tracking-widest">gofeelbetter</h3>
            </div>

            {/* Competitor Header */}
            <div className="col-span-4 md:col-span-3 py-10 text-center flex items-end justify-center pb-6">
              <h3 className="text-slate-500 font-bold text-sm md:text-lg uppercase tracking-wider">Traditional</h3>
            </div>
          </div>

          {/* Table Content */}
          <div className="relative z-10 glass rounded-3xl border border-white overflow-hidden shadow-sm">
            {features.map((feature, idx) => (
              <div key={idx} className={`grid grid-cols-12 gap-0 border-b border-slate-100 last:border-0 ${idx % 2 === 0 ? 'bg-white/30' : ''}`}>
                {/* Feature Label */}
                <div className="col-span-5 md:col-span-6 py-6 pl-6 md:pl-10 flex items-center pr-4">
                  <span className="font-semibold text-slate-800 text-xs md:text-base">{feature.label}</span>
                  <div className="group relative ml-2 hidden sm:block">
                    <Info className="w-3.5 h-3.5 text-slate-300 hover:text-emerald-500 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white text-xs p-3 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      {feature.tooltip}
                    </div>
                  </div>
                </div>

                {/* Our Product Column (Highlighted) */}
                <div className={`col-span-3 md:col-span-3 py-6 flex justify-center items-center bg-slate-900 mx-1 md:mx-2 ${idx === features.length - 1 ? 'rounded-b-3xl' : ''}`}>
                   <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-400" strokeWidth={3} />
                  </div>
                </div>

                {/* Competitor Column */}
                <div className="col-span-4 md:col-span-3 py-6 flex justify-center items-center">
                  {feature.us && idx === 0 ? (
                    // Specialized check for the first row where we are unique
                    <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center opacity-30">
                      <X className="w-4 h-4 text-slate-400" />
                    </div>
                  ) : feature.them ? (
                    <div className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center">
                      <Check className="w-5 h-5 text-slate-400" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center opacity-30">
                      <X className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};