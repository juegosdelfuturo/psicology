import React from 'react';
import { Therapist } from '../types';
import { Button } from './Button';
import { GraduationCap, ArrowLeft, Star } from 'lucide-react';

interface TherapistListProps {
  therapists: Therapist[];
  title: string;
  description: string;
  onSelect: (therapist: Therapist) => void;
  onBack: () => void;
}

export const TherapistList: React.FC<TherapistListProps> = ({ therapists, title, description, onSelect, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <button 
          onClick={onBack}
          className="group flex items-center text-slate-400 hover:text-emerald-600 transition-all font-bold text-sm uppercase tracking-widest mb-10"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Selection Overview
        </button>
        
        <div className="text-left max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{title}</h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed opacity-80">
            {description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {therapists.map((therapist) => (
          <div key={therapist.id} className="glass rounded-[2rem] border border-white overflow-hidden hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 flex flex-col p-2">
            <div className="relative h-64 rounded-[1.6rem] overflow-hidden group bg-sage-100 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-sage-900/10 to-transparent"></div>
              <span className="text-7xl font-black text-white drop-shadow-sm select-none tracking-tighter opacity-80">
                {therapist.name.split(' ').map(n => n[0]).join('')}
              </span>
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-emerald-700 flex items-center shadow-sm">
                  <GraduationCap className="w-3 h-3 mr-2" />
                  Clinical Student
                </div>
                <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[10px] font-bold text-white flex items-center shadow-sm">
                  <Star className="w-2.5 h-2.5 mr-1.5 text-yellow-400 fill-yellow-400" />
                  Top Rated
                </div>
              </div>
            </div>
            
            <div className="px-6 py-8 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{therapist.name}</h3>
              <p className="text-emerald-600 font-bold text-sm mb-6 uppercase tracking-wider">{therapist.specialty}</p>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 font-medium opacity-90">
                {therapist.description}
              </p>
              
              <Button 
                onClick={() => onSelect(therapist)} 
                fullWidth 
                variant="primary"
                className="rounded-2xl py-4"
              >
                Schedule Session
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};