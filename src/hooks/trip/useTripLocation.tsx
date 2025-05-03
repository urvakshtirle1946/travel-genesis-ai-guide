
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { destinationBudgetRanges } from '@/constants/plannerData';
import { calculateTripDuration } from '@/utils/dateUtils';

export const useTripLocation = (
  onBudgetUpdate?: (dailyBudget: number, totalBudget: number) => void
) => {
  const location = useLocation();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestedBudget, setSuggestedBudget] = useState<{ min: number; max: number; average: number }>({ min: 2500, max: 15000, average: 5000 });

  // Check for query parameters when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryDestination = params.get('destination');
    const queryOrigin = params.get('origin');
    
    if (queryDestination) {
      setDestination(decodeURIComponent(queryDestination));
      
      // Update the suggested budget based on destination
      updateSuggestedBudget(decodeURIComponent(queryDestination));
    }

    if (queryOrigin) {
      setOrigin(decodeURIComponent(queryOrigin));
    }
  }, [location]);

  const updateSuggestedBudget = (destination: string, startDate?: Date, endDate?: Date) => {
    // Extract first part of destination (e.g., "Paris" from "Paris, France")
    const mainDestination = destination.split(',')[0].trim();
    
    // Find the budget range for this destination
    for (const [dest, budgetRange] of Object.entries(destinationBudgetRanges)) {
      if (mainDestination.toLowerCase().includes(dest.toLowerCase()) || dest.toLowerCase().includes(mainDestination.toLowerCase())) {
        setSuggestedBudget(budgetRange);
        
        // Calculate initial budget values if callback exists
        if (onBudgetUpdate && startDate && endDate) {
          const days = calculateTripDuration(startDate, endDate) || 1;
          const dailyBudget = budgetRange.average;
          const calculatedTotalBudget = dailyBudget * days;
          
          onBudgetUpdate(dailyBudget, calculatedTotalBudget);
        }
        break;
      }
    }
  };

  const updateOrigin = (newOrigin: string) => {
    setOrigin(newOrigin);
  };

  const updateDestination = (newDestination: string, startDate?: Date, endDate?: Date) => {
    setDestination(newDestination);
    
    // Update suggested budget when destination is selected
    updateSuggestedBudget(newDestination, startDate, endDate);
  };

  return {
    origin,
    destination,
    suggestedBudget,
    updateOrigin,
    updateDestination,
    updateSuggestedBudget
  };
};

export default useTripLocation;
