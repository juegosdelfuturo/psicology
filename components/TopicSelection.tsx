import React from 'react';
import { SUPPORT_TOPICS } from '../constants';
import { Briefcase, User, Heart, Zap, CloudRain, Smile, ArrowLeft } from 'lucide-react';

interface TopicSelectionProps {
  onSelectTopic: (topic: string) => void;
  onBack: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'Briefcase': <Briefcase className="w-8 h-8 mb-4 text-orange-600" />,
  'User': <User className="w-8 h-8 mb-4 text-orange-600" />,
  'Heart': <Heart className="w-8 h-8 mb-4 text-orange-600" />,
  'Zap': <Zap className="w-8 h-8 mb-4 text-orange-600" />,
  'CloudRain': <CloudRain className="w-8 h-8 mb-4 text-orange-600" />,
  'Smile': <Smile className="w-8 h-8 mb-4 text-orange-600" />,
};

export const TopicSelection: React.FC<TopicSelectionProps> = ({ onSelectTopic, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-teal-600 transition-colors font-medium mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </button>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">What's on your mind?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the topic that best describes what you are going through. We will match you with a student therapist who has specific focus in that area.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {SUPPORT_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className="flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 group"
          >
            <div className="bg-orange-50 p-4 rounded-full mb-2 group-hover:bg-orange-100 transition-colors">
              {iconMap[topic.icon]}
            </div>
            <span className="font-semibold text-slate-800 group-hover:text-orange-700">{topic.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};