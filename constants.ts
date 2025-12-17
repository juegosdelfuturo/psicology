import { Therapist, DaySchedule } from './types';

export const THERAPISTS: Therapist[] = [
  // --- SUPPORT THERAPISTS ---
  
  {
    id: 1,
    name: "Elara Vane",
    specialty: "Anxiety & Academic Pressure Specialist",
    description: "Elara helps you navigate high-pressure environments. If you are feeling overwhelmed by deadlines, exams, or workplace expectations, she provides concrete tools to manage anxiety and regain your focus.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    category: 'support',
    topics: ['Work & Academic Stress', 'Anxiety & Panic']
  },
  {
    id: 2,
    name: "Liam Chen",
    specialty: "Relationships & Connection",
    description: "Specializing in interpersonal dynamics, Liam is here for those feeling lonely or struggling with relationships. He helps you build better communication skills and find meaningful connections in your life.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
    category: 'support',
    topics: ['Relationships', 'Loneliness', 'Self-Esteem']
  },
  {
    id: 3,
    name: "Sofia Russo",
    specialty: "Emotional Processing & Grief",
    description: "Sofia provides a gentle space for heavy hearts. Whether you are dealing with a loss, a breakup, or deep sadness, she helps you process these difficult emotions at your own pace.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
    category: 'support',
    topics: ['Grief & Loss', 'Depression', 'Loneliness']
  },
  {
    id: 6,
    name: "Noah Williams",
    specialty: "Performance & Confidence Building",
    description: "Noah focuses on the link between self-worth and achievement. He works with students who feel 'not good enough' or suffer from imposter syndrome, helping them build genuine self-esteem.",
    image: "https://images.unsplash.com/photo-1488161628813-99c97485fe11?q=80&w=600&auto=format&fit=crop",
    category: 'support',
    topics: ['Work & Academic Stress', 'Self-Esteem', 'Anxiety & Panic']
  },
  {
    id: 7,
    name: "Maya Patel",
    specialty: "Transitions & Life Changes",
    description: "Maya specializes in the anxiety that comes with change. Whether it's moving to a new city, graduation fears, or a recent breakup, she offers strategies to ground yourself during turbulent times.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600&auto=format&fit=crop",
    category: 'support',
    topics: ['Grief & Loss', 'Relationships', 'Anxiety & Panic']
  },
  {
    id: 8,
    name: "Lucas Silva",
    specialty: "Social Connection & Belonging",
    description: "Lucas understands the pain of isolation. He works with students struggling to make friends or feeling like outsiders, providing a warm environment to practice social skills and build confidence.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    category: 'support',
    topics: ['Loneliness', 'Self-Esteem', 'Relationships']
  },
  {
    id: 9,
    name: "Chloe Kim",
    specialty: "Mindfulness & Stress Reduction",
    description: "Chloe integrates mindfulness into her sessions to help combat panic attacks and chronic stress. She teaches breathing techniques and cognitive reframing to help you stay calm under pressure.",
    image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=600&auto=format&fit=crop",
    category: 'support',
    topics: ['Anxiety & Panic', 'Work & Academic Stress']
  },

  // --- WELLNESS CHECK THERAPISTS (Only 2) ---
  
  {
    id: 4,
    name: "Marcus King",
    specialty: "General Mental Health Check-in",
    description: "A standard check-up for your mind. Marcus conducts a general review of your current life balance, sleep patterns, and stress levels to ensure you are maintaining optimal mental hygiene.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    category: 'wellness',
    topics: ['Wellness Check']
  },
  {
    id: 5,
    name: "Jasmine Khan",
    specialty: "Preventative Mental Wellness Screen",
    description: "Jasmine offers a structured mental health screening. Even if you feel 'fine', this session helps identify potential burnout or hidden stressors early, giving you a clear report on your emotional resilience.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
    category: 'wellness',
    topics: ['Wellness Check']
  }
];

export const SUPPORT_TOPICS = [
  { id: 'Work & Academic Stress', label: 'Work & Academic Stress', icon: 'Briefcase' },
  { id: 'Loneliness', label: 'Loneliness', icon: 'User' },
  { id: 'Relationships', label: 'Relationships', icon: 'Heart' },
  { id: 'Anxiety & Panic', label: 'Anxiety & Panic', icon: 'Zap' },
  { id: 'Grief & Loss', label: 'Grief & Loss', icon: 'CloudRain' },
  { id: 'Self-Esteem', label: 'Self-Esteem', icon: 'Smile' }
];

// Helper to generate mock schedule for the next 4 days
export const generateMockSchedule = (): DaySchedule[] => {
  const schedule: DaySchedule[] = [];
  const today = new Date();
  
  for (let i = 0; i < 4; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i + 1); // Start tomorrow
    
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const label = nextDate.toLocaleDateString('en-US', options);
    
    schedule.push({
      date: nextDate.toISOString().split('T')[0],
      label: label,
      slots: [
        { time: "10:00 AM", available: true },
        { time: "11:00 AM", available: true },
        { time: "12:00 PM", available: Math.random() > 0.3 }, // Randomly unavailable
        { time: "1:00 PM", available: true },
        { time: "2:00 PM", available: true },
        { time: "3:00 PM", available: Math.random() > 0.3 },
        { time: "4:00 PM", available: true },
        { time: "5:00 PM", available: true },
      ]
    });
  }
  return schedule;
};