
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Import our new components and hooks
import StepDestination from '@/components/planner/StepDestination';
import StepDates from '@/components/planner/StepDates';
import StepBudget from '@/components/planner/StepBudget';
import StepInterests from '@/components/planner/StepInterests';
import StepTransportation from '@/components/planner/StepTransportation';
import ItineraryResult from '@/components/planner/ItineraryResult';
import useTripPlanner from '@/hooks/useTripPlanner';

const Planner = () => {
  const { user } = useAuth();
  const {
    step,
    loading,
    tripData,
    itinerary,
    suggestedBudget,
    totalTripCost,
    showAdditionalOptions,
    nextStep,
    prevStep,
    updateOrigin,
    updateDestination,
    updateStartDate,
    updateEndDate,
    updateBudgetType,
    updateBudget,
    updateInterests,
    updateTransportation,
    saveTrip
  } = useTripPlanner(user);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepDestination
            origin={tripData.origin}
            destination={tripData.destination}
            onOriginChange={updateOrigin}
            onDestinationChange={updateDestination}
          />
        );
        
      case 2:
        return (
          <StepDates
            startDate={tripData.startDate}
            endDate={tripData.endDate}
            onStartDateChange={updateStartDate}
            onEndDateChange={updateEndDate}
          />
        );
        
      case 3:
        return (
          <StepBudget
            budgetType={tripData.budgetType}
            budget={tripData.budget}
            suggestedBudget={suggestedBudget}
            destination={tripData.destination}
            onBudgetTypeChange={updateBudgetType}
            onBudgetChange={updateBudget}
          />
        );
        
      case 4:
        return (
          <StepInterests
            selectedInterests={tripData.interests}
            onInterestChange={updateInterests}
          />
        );
        
      case 5:
        return (
          <StepTransportation
            origin={tripData.origin}
            destination={tripData.destination}
            onSelectOption={updateTransportation}
          />
        );
        
      case 6:
        return (
          <ItineraryResult
            tripData={tripData}
            itinerary={itinerary}
            totalTripCost={totalTripCost}
            showAdditionalOptions={showAdditionalOptions}
            onSaveTrip={saveTrip}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-travel-navy">
            Plan Your Perfect Trip
          </h1>
          
          {step < 6 && (
            <div className="mb-10">
              <Stepper steps={5} currentStep={step} className="mb-8" />
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex flex-col items-center"
              >
                <Loader className="h-16 w-16 text-travel-teal animate-spin mb-4" />
                <h3 className="text-xl font-medium text-travel-navy">Creating your itinerary from {tripData.origin.split(',')[0]} to {tripData.destination.split(',')[0]}...</h3>
                <p className="text-gray-500 mt-2">This might take a moment</p>
              </motion.div>
            </div>
          ) : (
            <>
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                {renderStep()}
              </div>
              
              {step < 6 && (
                <div className="flex justify-between mt-6">
                  {step > 1 ? (
                    <Button variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button 
                    onClick={nextStep} 
                    className="bg-travel-blue hover:bg-travel-blue/90"
                  >
                    {step === 5 ? 'Generate Itinerary' : 'Next'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Planner;
