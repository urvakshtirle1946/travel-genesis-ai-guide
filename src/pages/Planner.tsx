
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeIndianRupee, Loader } from 'lucide-react';
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
    updateTotalBudget,
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
            totalBudget={tripData.totalBudget}
            suggestedBudget={suggestedBudget}
            destination={tripData.destination}
            startDate={tripData.startDate}
            endDate={tripData.endDate}
            onBudgetTypeChange={updateBudgetType}
            onBudgetChange={updateBudget}
            onTotalBudgetChange={updateTotalBudget}
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

  // Framer Motion variants for animations
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gray-50"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-travel-blue to-travel-teal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BadgeIndianRupee className="h-8 w-8 text-travel-teal" />
            <span>Plan Your Perfect Trip</span>
          </motion.h1>
          
          {step < 6 && (
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Stepper steps={5} currentStep={step} className="mb-8" />
            </motion.div>
          )}
          
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                className="text-center py-16"
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-flex flex-col items-center"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-travel-teal/10 absolute inset-0 animate-ping"></div>
                    <Loader className="h-20 w-20 text-travel-teal animate-spin relative z-10" />
                  </div>
                  <h3 className="text-xl font-medium text-travel-navy mt-6">
                    Creating your itinerary from {tripData.origin.split(',')[0]} to {tripData.destination.split(',')[0]}...
                  </h3>
                  <p className="text-gray-500 mt-2">We're crafting the perfect travel experience for you</p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key={`step-${step}`}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                variants={contentVariants}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-travel-blue/5 via-white to-travel-teal/5 rounded-xl blur-md"></div>
                  <div className="backdrop-blur-sm bg-white/90 p-8 rounded-xl shadow-sm border border-blue-100/20 relative">
                    {renderStep()}
                  </div>
                </div>
                
                {step < 6 && (
                  <motion.div 
                    className="flex justify-between mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {step > 1 ? (
                      <Button 
                        variant="outline" 
                        onClick={prevStep}
                        className="border-travel-blue text-travel-blue hover:bg-travel-blue/10 transition-all"
                      >
                        Previous
                      </Button>
                    ) : (
                      <div />
                    )}
                    <Button 
                      onClick={nextStep} 
                      className="relative group overflow-hidden"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-travel-blue to-travel-teal opacity-100 group-hover:opacity-90 transition-opacity"></span>
                      <span className="relative text-white">
                        {step === 5 ? 'Generate Itinerary' : 'Next'}
                      </span>
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Planner;
