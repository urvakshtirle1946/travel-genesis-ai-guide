
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
  'Bali, Indonesia',
  'Paris, France',
  'Tokyo, Japan',
  'New York, USA',
  'Rome, Italy',
  'Santorini, Greece',
  'Bangkok, Thailand',
  'London, UK',
  'Sydney, Australia',
  'Dubai, UAE'
];

// Sample origins for autocomplete
export const popularOrigins = [
  'London, UK',
  'New York, USA',
  'Sydney, Australia',
  'Toronto, Canada',
  'Dubai, UAE',
  'Singapore',
  'Berlin, Germany',
  'San Francisco, USA',
  'Mumbai, India',
  'Shanghai, China'
];

// Budget ranges by destination (approximate daily costs in USD)
export const destinationBudgetRanges: Record<string, { min: number; max: number; average: number }> = {
  'Bali': { min: 30, max: 200, average: 70 },
  'Paris': { min: 80, max: 400, average: 150 },
  'Tokyo': { min: 70, max: 350, average: 120 },
  'New York': { min: 100, max: 500, average: 200 },
  'Rome': { min: 70, max: 300, average: 120 },
  'Santorini': { min: 90, max: 400, average: 150 },
  'Bangkok': { min: 30, max: 150, average: 60 },
  'London': { min: 90, max: 400, average: 170 },
  'Sydney': { min: 80, max: 350, average: 130 },
  'Dubai': { min: 100, max: 500, average: 200 }
};
