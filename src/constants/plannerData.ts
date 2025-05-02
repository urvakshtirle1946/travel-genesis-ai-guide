
import { Interest } from '@/types/planner';

// All the interests users can select from
export const interests: Interest[] = [
  { id: 'adventure', label: 'Adventure' },
  { id: 'nature', label: 'Nature' },
  { id: 'culture', label: 'Culture' },
  { id: 'food', label: 'Food & Dining' },
  { id: 'relaxation', label: 'Relaxation' },
  { id: 'history', label: 'History' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'nightlife', label: 'Nightlife' },
];

// Sample destinations for autocomplete
export const popularDestinations = [
  'Goa, India',
  'Jaipur, India',
  'Kerala, India',
  'Ladakh, India',
  'Varanasi, India',
  'Delhi, India',
  'Mumbai, India',
  'Udaipur, India',
  'Darjeeling, India',
  'Rishikesh, India'
];

// Sample origins for autocomplete
export const popularOrigins = [
  'Delhi, India',
  'Mumbai, India',
  'Bangalore, India',
  'Chennai, India',
  'Kolkata, India',
  'Hyderabad, India',
  'Pune, India',
  'Ahmedabad, India',
  'Jaipur, India',
  'Lucknow, India'
];

// Budget ranges by destination (approximate daily costs in INR)
export const destinationBudgetRanges: Record<string, { min: number; max: number; average: number }> = {
  'Goa': { min: 2000, max: 15000, average: 5000 },
  'Jaipur': { min: 1800, max: 10000, average: 4000 },
  'Kerala': { min: 2500, max: 12000, average: 5500 },
  'Ladakh': { min: 3000, max: 15000, average: 6000 },
  'Varanasi': { min: 1500, max: 8000, average: 3000 },
  'Delhi': { min: 2000, max: 12000, average: 4500 },
  'Mumbai': { min: 2500, max: 20000, average: 7000 },
  'Udaipur': { min: 2200, max: 15000, average: 5000 },
  'Darjeeling': { min: 2000, max: 10000, average: 4000 },
  'Rishikesh': { min: 1800, max: 8000, average: 3500 }
};
