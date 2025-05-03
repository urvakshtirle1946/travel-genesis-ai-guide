
import { useState, useEffect } from 'react';
import { calculateTripDuration } from '@/utils/dateUtils';
import { TripData } from '@/types/planner';

export const useTripDates = (initialTripData: TripData) => {
  const [startDate, setStartDate] = useState<Date | undefined>(initialTripData.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(initialTripData.endDate);
  const [totalBudget, setTotalBudget] = useState(initialTripData.totalBudget);
  const [dailyBudget, setDailyBudget] = useState(initialTripData.budget);

  // Update total budget when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const days = calculateTripDuration(startDate, endDate);
      if (days > 0) {
        // Update total budget based on daily budget and trip duration
        setTotalBudget(dailyBudget * days);
      }
    }
  }, [startDate, endDate, dailyBudget]);

  const updateStartDate = (date: Date | undefined) => {
    setStartDate(date);
  };

  const updateEndDate = (date: Date | undefined) => {
    setEndDate(date);
  };

  return {
    startDate,
    endDate,
    totalBudget,
    updateStartDate,
    updateEndDate,
    setDailyBudget,
    setTotalBudget
  };
};

export default useTripDates;
