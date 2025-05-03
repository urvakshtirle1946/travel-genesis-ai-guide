
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { TripData } from '@/types/planner';

// Import new modular hooks
import useTripLocation from './trip/useTripLocation';
import useTripDates from './trip/useTripDates';
import useTripBudget from './trip/useTripBudget';
import useInterestsAndTransport from './trip/useInterestsAndTransport';
import useItineraryGeneration from './trip/useItineraryGeneration';

export const useTripPlanner = (user: any) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Initialize trip data state
  const [tripData, setTripData] = useState<TripData>({
    origin: '',
    destination: '',
    startDate: undefined,
    endDate: undefined,
    budgetType: 'fixed',
    budget: 5000, // Daily budget in INR
    totalBudget: 35000, // Total budget in INR (for the entire trip)
    interests: [],
  });

  // Initialize modular hooks
  const handleBudgetUpdate = (dailyBudget: number, totalBudget: number) => {
    // Update budget values when location affects suggested budget
    tripBudget.setBudget(dailyBudget);
    tripBudget.setTotalBudget(totalBudget);
    
    // Also update in the combined tripData state
    setTripData(prev => ({
      ...prev,
      budget: dailyBudget,
      totalBudget: totalBudget
    }));
  };
  
  const tripLocation = useTripLocation(handleBudgetUpdate);
  const tripDates = useTripDates(tripData);
  const tripBudget = useTripBudget(
    tripData.budget, 
    tripData.totalBudget, 
    tripData.budgetType,
    tripDates.startDate,
    tripDates.endDate
  );
  const interestsAndTransport = useInterestsAndTransport();
  const itineraryGeneration = useItineraryGeneration(user, tripData);

  // Sync individual states with combined tripData state
  useEffect(() => {
    setTripData({
      origin: tripLocation.origin,
      destination: tripLocation.destination,
      startDate: tripDates.startDate,
      endDate: tripDates.endDate,
      budgetType: tripBudget.budgetType,
      budget: tripBudget.budget,
      totalBudget: tripBudget.totalBudget,
      interests: interestsAndTransport.interests,
      selectedTransportation: interestsAndTransport.selectedTransportation
    });
  }, [
    tripLocation.origin,
    tripLocation.destination,
    tripDates.startDate,
    tripDates.endDate,
    tripBudget.budgetType,
    tripBudget.budget,
    tripBudget.totalBudget,
    interestsAndTransport.interests,
    interestsAndTransport.selectedTransportation
  ]);

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to create a trip plan");
      navigate('/');
    }
  }, [user, navigate]);

  const nextStep = async () => {
    if (step === 1 && (!tripData.origin.trim() || !tripData.destination.trim())) {
      toast.error("Please enter both origin and destination");
      return;
    }
    
    if (step === 2 && (!tripData.startDate || !tripData.endDate)) {
      toast.error("Please select both start and end dates");
      return;
    }
    
    if (step === 4 && tripData.interests.length === 0) {
      toast.error("Please select at least one interest");
      return;
    }

    if (step < 5) {
      setStep(step + 1);
    } else if (step === 5) {
      const result = await itineraryGeneration.generateItinerary();
      if (result?.success) {
        setStep(6);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return {
    // Step state
    step,
    setStep,
    nextStep,
    prevStep,
    
    // Combined trip data
    tripData,
    
    // Trip location data
    suggestedBudget: tripLocation.suggestedBudget,
    updateOrigin: tripLocation.updateOrigin,
    updateDestination: (destination: string) => 
      tripLocation.updateDestination(destination, tripDates.startDate, tripDates.endDate),
    
    // Trip dates data
    updateStartDate: tripDates.updateStartDate,
    updateEndDate: tripDates.updateEndDate,
    
    // Trip budget data
    updateBudgetType: tripBudget.updateBudgetType,
    updateBudget: tripBudget.updateBudget,
    updateTotalBudget: tripBudget.updateTotalBudget,
    
    // Interests and transportation data
    updateInterests: interestsAndTransport.updateInterests,
    updateTransportation: interestsAndTransport.updateTransportation,
    
    // Itinerary generation data
    loading: itineraryGeneration.loading,
    itinerary: itineraryGeneration.itinerary,
    totalTripCost: itineraryGeneration.totalTripCost,
    showAdditionalOptions: itineraryGeneration.showAdditionalOptions,
    saveTrip: itineraryGeneration.saveTrip,
    generateItinerary: itineraryGeneration.generateItinerary
  };
};

export default useTripPlanner;
