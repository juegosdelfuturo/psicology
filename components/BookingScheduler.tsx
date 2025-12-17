import React, { useState, useEffect } from 'react';
import { Therapist, DaySchedule } from '../types';
import { generateMockSchedule } from '../constants';
import { Button } from './Button';
import { Calendar, Clock, ChevronLeft, Euro } from 'lucide-react';

interface BookingSchedulerProps {
  therapist: Therapist;
  onConfirm: (date: string, time: string) => void;
  onBack: () => void;
}

export const BookingScheduler: React.FC<BookingSchedulerProps> = ({ therapist, onConfirm, onBack }) => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    setSchedule(generateMockSchedule());
  }, []);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (selectedTime && schedule[selectedDateIndex]) {
      onConfirm(schedule[selectedDateIndex].label, selectedTime);
    }
  };

  if (schedule.length === 0) return <div className="p-10 text-center">Loading schedule...</div>;

  const currentDay = schedule[selectedDateIndex];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button onClick={onBack} variant="secondary" className="mb-8 flex items-center text-sm px-4 py-2">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Therapists
      </Button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row h-full min-h-[600px]">
        {/* Left Panel: Therapist Info */}
        <div className="lg:w-1/3 bg-slate-50 p-8 border-r border-gray-100 flex flex-col">
          <h4 className="text-gray-500 font-medium uppercase tracking-wider text-xs mb-2">Student Therapist</h4>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{therapist.name}</h2>
          
          <div className="flex items-start mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 shadow-md flex-shrink-0">
              <img src={therapist.image} alt={therapist.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm text-gray-600 italic">"{therapist.description}"</p>
          </div>

          <div className="mt-auto space-y-4">
             <div className="flex items-center text-gray-700">
               <Clock className="w-5 h-5 mr-3 text-teal-600" />
               <span className="font-medium">1 Hour Session</span>
             </div>
             <div className="flex items-center text-gray-700">
               <div className="w-5 h-5 mr-3 text-teal-600 flex items-center justify-center"><Euro size={20} /></div>
               <span className="font-medium">20.00€</span>
             </div>
          </div>
        </div>

        {/* Right Panel: Calendar */}
        <div className="lg:w-2/3 p-8 flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Select a Date & Time</h3>
          
          {/* Date Selector */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2" /> Available Dates
            </h4>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {schedule.map((day, idx) => (
                <button
                  key={day.date}
                  onClick={() => { setSelectedDateIndex(idx); setSelectedTime(null); }}
                  className={`flex-shrink-0 px-4 py-3 rounded-xl border transition-all ${
                    selectedDateIndex === idx 
                      ? 'border-teal-600 bg-teal-50 text-teal-800 ring-1 ring-teal-600' 
                      : 'border-gray-200 hover:border-teal-300 text-gray-600'
                  }`}
                >
                  <div className="text-sm font-bold whitespace-nowrap">{day.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Selector */}
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2" /> Available Times (EDT)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {currentDay.slots.map((slot, idx) => (
                <button
                  key={idx}
                  disabled={!slot.available}
                  onClick={() => handleTimeSelect(slot.time)}
                  className={`py-3 px-2 rounded-lg text-sm font-medium border transition-all ${
                    !slot.available 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-transparent'
                      : selectedTime === slot.time
                        ? 'bg-slate-800 text-white border-slate-800 shadow-md transform scale-105'
                        : 'bg-white text-teal-700 border-teal-200 hover:border-teal-600 hover:shadow-sm'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <Button 
              onClick={handleNext} 
              disabled={!selectedTime}
              className="w-full sm:w-auto"
            >
              Confirm & Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};