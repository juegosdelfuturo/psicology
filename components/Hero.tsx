import React from 'react';
import { ArrowRight, ShieldCheck, Heart, UserCheck, Stethoscope, LifeBuoy } from 'lucide-react';

interface HeroProps {
  onSelectPath: (path: 'wellness' | 'support') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectPath }) => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-teal-50 opacity-50 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 text-orange-700 text-sm font-semibold mb-8 border border-orange-100">
            <UserCheck className="w-4 h-4 mr-2" />
            Supervised Student Sessions
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            How can we help you <span className="text-teal-600">take the next step</span> today?
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Choose the path that fits your current needs. Whether you need a general check-up or immediate support for a specific issue, our supervised students are here.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            
            {/* Box 1: Wellness Check */}
            <div 
              onClick={() => onSelectPath('wellness')}
              className="group cursor-pointer bg-white border-2 border-teal-100 rounded-2xl p-8 hover:border-teal-500 hover:shadow-xl transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              
              <div className="bg-teal-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-teal-600 relative z-10">
                <Stethoscope className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">
                Check My Mental Wellness
              </h3>
              <p className="text-gray-600 mb-6">
                Get a general assessment of your mental health. Perfect if you want to understand your baseline, prevent burnout, or just have a mental "check-up".
              </p>
              
              <span className="inline-flex items-center font-semibold text-teal-600 group-hover:translate-x-1 transition-transform">
                Find Wellness Therapists <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </div>

            {/* Box 2: Support Now */}
            <div 
              onClick={() => onSelectPath('support')}
              className="group cursor-pointer bg-white border-2 border-orange-100 rounded-2xl p-8 hover:border-orange-400 hover:shadow-xl transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              
              <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-orange-600 relative z-10">
                <LifeBuoy className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-700 transition-colors">
                I Need Support Now
              </h3>
              <p className="text-gray-600 mb-6">
                Find a specialist for specific challenges. Select this if you are dealing with anxiety, relationship issues, grief, or body image concerns.
              </p>
              
              <span className="inline-flex items-center font-semibold text-orange-600 group-hover:translate-x-1 transition-transform">
                Find Specialists <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-gray-100 pt-10">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-teal-100 p-3 rounded-full mb-4 text-teal-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Professionally Supervised</h3>
              <p className="text-gray-500 text-sm">Every session is conducted under the strict guidance of licensed clinical psychologists.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-teal-100 p-3 rounded-full mb-4 text-teal-700">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Compassionate Care</h3>
              <p className="text-gray-500 text-sm">Our students are trained to provide a safe, non-judgmental space for your growth.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-teal-100 p-3 rounded-full mb-4 text-teal-700">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Affordable Access</h3>
              <p className="text-gray-500 text-sm">High-quality support at a fraction of the cost (20€/session), making mental health accessible.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};