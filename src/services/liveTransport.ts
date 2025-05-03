
import { TransportOption } from '@/types/planner';
import { Bus, Train, TrainFront, Cab } from 'lucide-react';
import React from 'react';

// Helper function to generate random time within a range
const generateRandomTime = (min: number, max: number): string => {
  const hour = Math.floor(Math.random() * (max - min) + min);
  const minute = Math.floor(Math.random() * 60);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
};

// Helper function to generate arrival time based on departure time and duration
const calculateArrivalTime = (departureTime: string, durationMinutes: number): string => {
  const [time, period] = departureTime.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  const departureMinutes = hours * 60 + minutes;
  const arrivalMinutes = departureMinutes + durationMinutes;
  
  let arrivalHours = Math.floor(arrivalMinutes / 60) % 24;
  const arrivalMins = arrivalMinutes % 60;
  
  const arrivalPeriod = arrivalHours >= 12 ? 'PM' : 'AM';
  arrivalHours = arrivalHours > 12 ? arrivalHours - 12 : arrivalHours === 0 ? 12 : arrivalHours;
  
  return `${arrivalHours}:${arrivalMins.toString().padStart(2, '0')} ${arrivalPeriod}`;
};

// Generate duration string from minutes
const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Generate a list of transport options based on the current time
export const generateLiveTransportOptions = async (
  origin: string, 
  destination: string
): Promise<TransportOption[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const options: TransportOption[] = [];
  
  // Distance approximation based on origin and destination
  const distanceKm = Math.floor(Math.random() * 30) + 5;
  
  // Generate train options
  const trainCount = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < trainCount; i++) {
    const departureHour = currentHour + Math.floor(i / 2);
    const departureTime = generateRandomTime(departureHour, departureHour + 1);
    const durationMinutes = 45 + Math.floor(Math.random() * 60);
    const arrivalTime = calculateArrivalTime(departureTime, durationMinutes);
    
    options.push({
      id: `train-${i}`,
      type: 'train',
      name: `${Math.floor(Math.random() * 9000) + 1000} Express`,
      provider: 'Indian Railways',
      price: Math.floor(Math.random() * 1000) + 300,
      duration: formatDuration(durationMinutes),
      departure: departureTime,
      arrival: arrivalTime,
      stops: Math.floor(Math.random() * 3),
      icon: React.createElement(TrainFront, { className: "h-5 w-5 text-blue-600" }),
      rating: 3.5 + Math.random() * 1.5,
      reviews: Math.floor(Math.random() * 1000) + 100,
      availability: ['available', 'limited', 'full'][Math.floor(Math.random() * 3)] as 'available' | 'limited' | 'full',
      status: Math.random() > 0.8 ? 'delayed' : 'on-time',
      delayMinutes: Math.random() > 0.8 ? Math.floor(Math.random() * 30) + 5 : undefined,
      distance: `${distanceKm} km`,
      livePrice: Math.random() > 0.7,
    });
  }
  
  // Generate bus options
  const busCount = Math.floor(Math.random() * 4) + 2;
  for (let i = 0; i < busCount; i++) {
    const departureHour = currentHour + Math.floor(i / 3);
    const departureTime = generateRandomTime(departureHour, departureHour + 1);
    const durationMinutes = 60 + Math.floor(Math.random() * 90);
    const arrivalTime = calculateArrivalTime(departureTime, durationMinutes);
    
    options.push({
      id: `bus-${i}`,
      type: 'bus',
      name: `Route ${Math.floor(Math.random() * 900) + 100}`,
      provider: ['BMTC', 'KSRTC', 'RedBus', 'AbhiBus'][Math.floor(Math.random() * 4)],
      price: Math.floor(Math.random() * 200) + 50,
      duration: formatDuration(durationMinutes),
      departure: departureTime,
      arrival: arrivalTime,
      stops: Math.floor(Math.random() * 8) + 1,
      icon: React.createElement(Bus, { className: "h-5 w-5 text-green-600" }),
      rating: 3 + Math.random() * 1.5,
      reviews: Math.floor(Math.random() * 500) + 50,
      availability: ['available', 'limited', 'full'][Math.floor(Math.random() * 3)] as 'available' | 'limited' | 'full',
      status: Math.random() > 0.85 ? (Math.random() > 0.5 ? 'delayed' : 'cancelled') : 'on-time',
      delayMinutes: Math.random() > 0.85 ? Math.floor(Math.random() * 20) + 5 : undefined,
      distance: `${distanceKm} km`,
    });
  }
  
  // Generate cab options
  const cabCount = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < cabCount; i++) {
    const departureTime = generateRandomTime(currentHour, currentHour + 1);
    const durationMinutes = 30 + Math.floor(Math.random() * 60);
    const arrivalTime = calculateArrivalTime(departureTime, durationMinutes);
    
    options.push({
      id: `cab-${i}`,
      type: 'cab',
      name: ['UberGo', 'Uber Premier', 'Ola Mini', 'Ola Prime'][Math.floor(Math.random() * 4)],
      provider: ['Uber', 'Ola', 'Meru', 'BluSmart'][Math.floor(Math.random() * 4)],
      price: Math.floor(Math.random() * 300) + 150,
      duration: formatDuration(durationMinutes),
      departure: departureTime,
      arrival: arrivalTime,
      stops: 0,
      icon: React.createElement(Cab, { className: "h-5 w-5 text-yellow-600" }),
      availability: 'available',
      status: 'on-time',
      distance: `${distanceKm} km`,
      livePrice: true,
    });
  }
  
  // Sort by departure time
  options.sort((a, b) => {
    const aTime = a.departure.split(' ');
    const bTime = b.departure.split(' ');
    const aHour = parseInt(aTime[0].split(':')[0]);
    const bHour = parseInt(bTime[0].split(':')[0]);
    const aMinute = parseInt(aTime[0].split(':')[1]);
    const bMinute = parseInt(bTime[0].split(':')[1]);
    
    if (aTime[1] !== bTime[1]) {
      return aTime[1] === 'AM' ? -1 : 1;
    }
    
    if (aHour !== bHour) {
      return aHour - bHour;
    }
    
    return aMinute - bMinute;
  });
  
  return options;
};
