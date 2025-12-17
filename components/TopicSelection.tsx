import React from 'react';
import { SUPPORT_TOPICS } from '../constants';
import { Briefcase, User, Heart, Zap, CloudRain, Smile, ArrowLeft } from 'lucide-react';

interface TopicSelectionProps {
  onSelectTopic: (topic: string) => void;
  onBack: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'Briefcase': <Briefcase className="w-8 h-8 text-orange-600" />,
  'User': <User className="w-8 h-8 text-orange-600" />,
  'Heart': <Heart className="w-8 h-8 text-orange-600" />,
  'Zap': <Zap className="w-8 h-8 text-orange-600" />,
  'CloudRain': <CloudRain className="w-8 h-8 text-orange-600" />,
  'Smile': <Smile className="w-8 h-8 text-orange-600" />,
};

export const TopicSelection: React.FC<TopicSelectionProps> = ({ onSelectTopic, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <button 
        onClick={onBack}
        className="group flex items-center text-slate-400 hover:text-emerald-600 transition-all font-bold text-sm uppercase tracking-widest mb-10"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
      </button>

      <div className="text-left mb-16 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">What's on your mind?</h2>
        <p className="text-lg text-slate-500 font-medium leading-relaxed opacity-80">
          Select the topic that best describes what you are going through. We will match you with a student practitioner who has a focused academic background in that area.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
        {SUPPORT_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className="flex flex-col items-start p-10 bg-white/40 glass border border-white rounded-[2.5rem] shadow-sm hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)] hover:border-orange-500/30 transition-all duration-500 group text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-125 opacity-40"></div>
            
            <div className="bg-orange-50 p-5 rounded-2xl mb-6 group-hover:bg-orange-100 transition-colors">
              {iconMap[topic.icon]}
            </div>
            <span className="text-xl font-bold text-slate-800 group-hover:text-orange-700 transition-colors">{topic.label}</span>
            <p className="mt-3 text-sm text-slate-500 font-medium opacity-70">Expert support from clinical students specializing in this area.</p>
          </button>
        ))}
      </div>
    </div>
  );
};