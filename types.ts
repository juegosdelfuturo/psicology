export interface Therapist {
  id: number;
  name: string;
  specialty: string;
  description: string;
  image: string;
  category: 'wellness' | 'support';
  topics: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DaySchedule {
  date: string; // ISO string or formatted string
  label: string; // e.g., "Mon, Oct 24"
  slots: TimeSlot[];
}

export type ViewState = 'home' | 'topics' | 'therapists' | 'scheduling' | 'payment' | 'confirmation';

export interface BookingData {
  therapist: Therapist | null;
  date: string | null;
  time: string | null;
}