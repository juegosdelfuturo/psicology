import React from 'react';
import { ArrowRight, ShieldCheck, Heart, UserCheck, GraduationCap, LifeBuoy } from 'lucide-react';

interface HeroProps {
  onSelectPath: (path: 'wellness' | 'support') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectPath }) => {
  return (
    <div className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-8 border border-emerald-200/50 backdrop-blur-sm tracking-wider uppercase">
            <UserCheck className="w-3.5 h-3.5 mr-2" />
            Experienced Student Psychologists
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Expert support from the next generation of <span className="text-emerald-600 italic font-serif">psychologists</span>.
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto font-medium opacity-80">
            Every session is done by experienced students in their advanced years of psychology studies. These are almost ready students for the job market, providing high-quality guidance at an accessible rate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            
            {/* Box 1: Wellness Check (Now triggers support/topics path) */}
            <div 
              onClick={() => onSelectPath('support')}
              className="group cursor-pointer glass border border-white rounded-3xl p-10 hover:border-emerald-500/30 hover:shadow-[0_20px_50px_rgba(5,150,105,0.1)] transition-all duration-500 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-125 opacity-40"></div>
              
              <div className="bg-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-emerald-200">
                <ShieldCheck className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">
                Psychology Check-In
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Establish your mental health baseline. A structured session to review life balance and preventative strategies with advanced students.
              </p>
              
              <div className="flex items-center font-bold text-emerald-600 group-hover:gap-2 transition-all">
                Find Wellness Practitioners <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>

            {/* Box 2: Support Now (Now triggers wellness/direct path) */}
            <div 
              onClick={() => onSelectPath('wellness')}
              className="group cursor-pointer glass border border-white rounded-3xl p-10 hover:border-orange-500/30 hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)] transition-all duration-500 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-125 opacity-40"></div>
              
              <div className="bg-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-orange-200">
                <LifeBuoy className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-700 transition-colors">
                Targeted Clinical Support
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Address specific challenges with focused psychology students. Ideal for anxiety, pressure, grief, or relationship dynamics.
              </p>
              
              <div className="flex items-center font-bold text-orange-600 group-hover:gap-2 transition-all">
                Match with a Specialist <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left border-t border-slate-200/50 pt-16">
            <div className="space-y-4">
              <div className="bg-sage-100 w-10 h-10 rounded-lg flex items-center justify-center text-sage-600">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Advanced Training</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Our practitioners are in their advanced years of study, bringing fresh clinical knowledge to every session.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-sage-100 w-10 h-10 rounded-lg flex items-center justify-center text-sage-600">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Empathetic Matching</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Practitioners are selected for their emotional intelligence and academic excellence in psychology.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-sage-100 w-10 h-10 rounded-lg flex items-center justify-center text-sage-600">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Universal Access</h3>
              <p className="text-slate-500 text-sm leading-relaxed">By training the next generation, we provide high-quality mental health support at just 20€ per session.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};