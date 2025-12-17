import React from 'react';
import { Therapist } from '../types';
import { Button } from './Button';
import { GraduationCap, ArrowLeft } from 'lucide-react';

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
      <div className="mb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-teal-600 transition-colors font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Selection
        </button>
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {therapists.map((therapist) => (
          <div key={therapist.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="relative h-64 overflow-hidden group">
              <img 
                src={therapist.image} 
                alt={therapist.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-700 flex items-center shadow-sm">
                <GraduationCap className="w-3 h-3 mr-1 text-teal-600" />
                Supervised Student
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-1">{therapist.name}</h3>
              <p className="text-teal-600 font-medium text-sm mb-4 h-10 line-clamp-2">{therapist.specialty}</p>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                {therapist.description}
              </p>
              
              <Button 
                onClick={() => onSelect(therapist)} 
                fullWidth 
                variant="outline"
                className="mt-auto"
              >
                Book Session
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};