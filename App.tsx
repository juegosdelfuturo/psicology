import React, { useState } from 'react';
import { ViewState, BookingData, Therapist } from './types';
import { THERAPISTS } from './constants';
import { Hero } from './components/Hero';
import { TherapistList } from './components/TherapistList';
import { TopicSelection } from './components/TopicSelection';
import { BookingScheduler } from './components/BookingScheduler';
import { PaymentForm } from './components/PaymentForm';
import { Button } from './components/Button';
import { Sprout, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<'wellness' | 'support' | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  const [booking, setBooking] = useState<BookingData>({
    therapist: null,
    date: null,
    time: null
  });

  const handlePathSelect = (path: 'wellness' | 'support') => {
    setSelectedCategory(path);
    if (path === 'support') {
      setView('topics');
    } else {
      setView('therapists');
    }
    window.scrollTo(0, 0);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setView('therapists');
    window.scrollTo(0, 0);
  };

  const handleTherapistSelect = (therapist: Therapist) => {
    setBooking({ ...booking, therapist });
    setView('scheduling');
    window.scrollTo(0, 0);
  };

  const handleSchedulingConfirm = (date: string, time: string) => {
    setBooking({ ...booking, date, time });
    setView('payment');
    window.scrollTo(0, 0);
  };

  const handlePaymentComplete = () => {
    setView('confirmation');
    window.scrollTo(0, 0);
  };
  
  const handleReset = () => {
    setBooking({ therapist: null, date: null, time: null });
    setSelectedCategory(null);
    setSelectedTopic(null);
    setView('home');
    window.scrollTo(0, 0);
  };

  const handleBackFromTherapists = () => {
    if (selectedCategory === 'support') {
      setView('topics');
    } else {
      setView('home');
    }
    window.scrollTo(0, 0);
  };

  const handleBackToTherapists = () => {
    setView('therapists');
  };

  // Filter therapists logic
  let filteredTherapists = THERAPISTS;
  let listTitle = "";
  let listDescription = "";

  if (selectedCategory === 'wellness') {
    filteredTherapists = THERAPISTS.filter(t => t.category === 'wellness');
    listTitle = "Mental Health Check-In";
    listDescription = "Routine check-ups for your mental wellbeing. These sessions help you monitor your emotional health, just like a physical check-up.";
  } else if (selectedCategory === 'support') {
    // Filter by topic if selected
    if (selectedTopic) {
      filteredTherapists = THERAPISTS.filter(t => t.category === 'support' && t.topics.includes(selectedTopic));
      listTitle = `Support for ${selectedTopic}`;
      listDescription = "These student therapists have specific focus and interest in helping clients with this topic.";
    } else {
      // Fallback if no topic (shouldn't happen in this flow)
      filteredTherapists = THERAPISTS.filter(t => t.category === 'support');
      listTitle = "Specialized Support";
      listDescription = "Find a therapist that matches your needs.";
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={handleReset}
          >
            <div className="bg-teal-600 p-1.5 rounded-lg mr-2">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">The Next Step</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Student Sessions</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <span className="bg-orange-50 text-orange-800 text-xs font-medium px-3 py-1 rounded-full border border-orange-100">
              Supervised Student Platform
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {view === 'home' && (
          <Hero onSelectPath={handlePathSelect} />
        )}

        {view === 'topics' && (
          <TopicSelection 
            onSelectTopic={handleTopicSelect}
            onBack={() => setView('home')}
          />
        )}

        {view === 'therapists' && (
          <TherapistList 
            therapists={filteredTherapists}
            title={listTitle}
            description={listDescription}
            onSelect={handleTherapistSelect}
            onBack={handleBackFromTherapists}
          />
        )}

        {view === 'scheduling' && booking.therapist && (
          <BookingScheduler 
            therapist={booking.therapist}
            onConfirm={handleSchedulingConfirm}
            onBack={handleBackToTherapists}
          />
        )}

        {view === 'payment' && booking.therapist && (
          <PaymentForm 
            bookingData={booking}
            onComplete={handlePaymentComplete}
            onBack={() => setView('scheduling')}
          />
        )}

        {view === 'confirmation' && booking.therapist && (
          <div className="max-w-2xl mx-auto px-4 py-20 text-center">
            <div className="mb-8 flex justify-center">
              <div className="bg-green-100 p-6 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 text-lg mb-8">
              You have successfully booked a session with <strong>{booking.therapist.name}</strong> on <strong>{booking.date}</strong> at <strong>{booking.time}</strong>.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl text-left text-sm text-gray-500 mb-8 border border-gray-200">
              <p className="mb-2"><strong>What happens next?</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>You will receive a confirmation email shortly.</li>
                <li>Your student therapist will review the intake form.</li>
                <li>A secure video link will be sent 15 minutes before the session.</li>
              </ul>
            </div>
            <Button onClick={handleReset}>Return Home</Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Sprout className="w-5 h-5 text-teal-400 mr-2" />
                <span className="text-lg font-bold">The Next Step</span>
              </div>
              <p className="text-slate-400 text-sm max-w-md">
                Connecting you with the next generation of mental health professionals. 
                Affordable, accessible, and compassionate care under expert supervision.
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-sm font-semibold text-orange-400 mb-2">Important Disclaimer</p>
              <p className="text-slate-400 text-xs max-w-md ml-auto">
                All sessions are conducted by psychology students currently enrolled in accredited graduate programs. 
                They work under the direct supervision of licensed clinical psychologists. This service is not suitable for crisis situations.
                If you are in an emergency, please call 911 or your local emergency number.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
            © {new Date().getFullYear()} The Next Step Student Sessions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}