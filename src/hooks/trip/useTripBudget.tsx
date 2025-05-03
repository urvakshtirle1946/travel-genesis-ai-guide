
import { useState } from 'react';
import { calculateTripDuration } from '@/utils/dateUtils';

export const useTripBudget = (
  initialBudget: number,
  initialTotalBudget: number,
  initialBudgetType: 'fixed' | 'flexible',
  startDate?: Date,
  endDate?: Date
) => {
  const [budgetType, setBudgetType] = useState<'fixed' | 'flexible'>(initialBudgetType);
  const [budget, setBudget] = useState(initialBudget);
  const [totalBudget, setTotalBudget] = useState(initialTotalBudget);

  const updateBudgetType = (type: 'fixed' | 'flexible') => {
    setBudgetType(type);
  };

  // Update to accept number[] to match the StepBudget component's expected prop type
  const updateBudget = (value: number[]) => {
    setBudget(value[0]);
    
    // If dates are set, update total budget based on days
    if (startDate && endDate) {
      const days = calculateTripDuration(startDate, endDate) || 1;
      setTotalBudget(value[0] * days);
    }
  };

  // Update to accept number[] to match the StepBudget component's expected prop type
  const updateTotalBudget = (value: number[]) => {
    const newTotalBudget = value[0];
    const days = calculateTripDuration(startDate, endDate) || 1;
    
    setTotalBudget(newTotalBudget);
    setBudget(Math.round(newTotalBudget / days)); // Update daily budget based on new total
  };

  return {
    budgetType,
    budget,
    totalBudget,
    updateBudgetType,
    updateBudget,
    updateTotalBudget,
    setBudget,
    setTotalBudget
  };
};

export default useTripBudget;
