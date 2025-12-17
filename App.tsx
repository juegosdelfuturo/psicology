import React, { useState, useEffect } from 'react';
import { ViewState, BookingData, Therapist } from './types';
import { THERAPISTS } from './constants';
import { Hero } from './components/Hero';
import { ComparisonSection } from './components/ComparisonSection';
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
  
  const [booking, setBooking] = useState<BookingData>(() => {
    const saved = sessionStorage.getItem('pending_booking');
    return saved ? JSON.parse(saved) : { therapist: null, date: null, time: null, paid: false };
  });

  // Handle Stripe Redirect detection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('payment_success');
    
    // If returning from a successful payment, move to scheduling
    if (success === 'true' && booking.therapist) {
      const updatedBooking = { ...booking, paid: true };
      setBooking(updatedBooking);
      sessionStorage.setItem('pending_booking', JSON.stringify(updatedBooking));
      setView('scheduling');
      // Clear URL params without refreshing to maintain a clean state
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (booking.paid && booking.therapist && view === 'home') {
      // If user refreshes while on a paid state but at home, put them back to scheduling
      setView('scheduling');
    }
  }, [booking.therapist, view]);

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
    const newBooking = { ...booking, therapist, paid: false };
    setBooking(newBooking);
    sessionStorage.setItem('pending_booking', JSON.stringify(newBooking));
    // New Flow: Go directly to payment after selecting therapist
    setView('payment');
    window.scrollTo(0, 0);
  };

  const handleSchedulingConfirm = (date: string, time: string) => {
    const newBooking = { ...booking, date, time };
    setBooking(newBooking);
    sessionStorage.setItem('pending_booking', JSON.stringify(newBooking));
    // After scheduling is confirmed in Calendly, go to the final confirmation
    setView('confirmation');
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setBooking({ therapist: null, date: null, time: null, paid: false });
    sessionStorage.removeItem('pending_booking');
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
    listDescription = "Routine check-ups for your mental wellbeing. These sessions help you monitor your emotional health with practitioners ready for the job market.";
  } else if (selectedCategory === 'support') {
    if (selectedTopic) {
      filteredTherapists = THERAPISTS.filter(t => t.category === 'support' && t.topics.includes(selectedTopic));
      listTitle = `Support for ${selectedTopic}`;
      listDescription = "These experienced student psychologists have specific focus and interest in helping clients with this topic.";
    } else {
      filteredTherapists = THERAPISTS.filter(t => t.category === 'support');
      listTitle = "Specialized Support";
      listDescription = "Find a practitioner that matches your needs.";
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={handleReset}>
            <div className="bg-emerald-600 p-1.5 rounded-lg mr-2">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 leading-tight tracking-tight">gofeelbetter</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {view === 'home' && (
          <>
            <Hero onSelectPath={handlePathSelect} />
            <ComparisonSection />
          </>
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

        {view === 'payment' && booking.therapist && (
          <PaymentForm 
            bookingData={booking}
            onComplete={() => {}} // Redirection handled by Stripe Buy Button
            onBack={handleBackToTherapists}
          />
        )}

        {view === 'scheduling' && booking.therapist && (
          <BookingScheduler 
            therapist={booking.therapist}
            onConfirm={handleSchedulingConfirm}
            onBack={() => {
              // Since they already paid, "Back" shouldn't reset the payment
              // But logically they shouldn't go back to the list easily
              setView('therapists');
            }}
          />
        )}

        {view === 'confirmation' && booking.therapist && (
          <div className="max-w-2xl mx-auto px-4 py-20 text-center">
            <div className="mb-8 flex justify-center">
              <div className="bg-green-100 p-6 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">All Set!</h2>
            <p className="text-gray-600 text-lg mb-8">
              Payment confirmed and session with <strong>{booking.therapist.name}</strong> has been scheduled.
            </p>
            <div className="bg-emerald-50 p-6 rounded-3xl text-left text-sm text-emerald-900 mb-8 border border-emerald-100">
              <p className="mb-4 font-black uppercase tracking-widest text-[10px] text-emerald-700">Next Steps</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center mr-3 mt-0.5 text-xs font-bold text-emerald-800">1</div>
                  <span>Check your email for the session link.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center mr-3 mt-0.5 text-xs font-bold text-emerald-800">2</div>
                  <span>Complete the short intake form sent to you.</span>
                </li>
              </ul>
            </div>
            <Button onClick={handleReset} className="rounded-3xl px-12">Return to Dashboard</Button>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Sprout className="w-5 h-5 text-emerald-400 mr-2" />
                <span className="text-lg font-bold">gofeelbetter</span>
              </div>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                Empowering the next generation of psychologists while making mental wellness accessible to all.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} gofeelbetter.
          </div>
        </div>
      </footer>
    </div>
  );
}