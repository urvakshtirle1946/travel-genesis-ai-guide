
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import StepDestination from '@/components/planner/StepDestination';
import StepDates from '@/components/planner/StepDates';
import StepBudget from '@/components/planner/StepBudget';
import StepInterests from '@/components/planner/StepInterests';
import StepTransportation from '@/components/planner/StepTransportation';
import ItineraryResult from '@/components/planner/ItineraryResult';
import { TripData } from '@/types/planner';

interface PlannerStepsProps {
  step: number;
  tripData: TripData;
  itinerary: any;
  suggestedBudget: { min: number; max: number; average: number };
  totalTripCost: number;
  showAdditionalOptions: boolean;
  nextStep: () => void;
  prevStep: () => void;
  updateOrigin: (origin: string) => void;
  updateDestination: (destination: string) => void;
  updateStartDate: (date: Date) => void;
  updateEndDate: (date: Date) => void;
  updateBudgetType: (type: 'fixed' | 'flexible') => void;
  updateBudget: (budget: number[]) => void;
  updateTotalBudget: (budget: number[]) => void;
  updateInterests: (interest: string, checked: boolean) => void;
  updateTransportation: (option: any) => void;
  saveTrip: () => Promise<void>;
}

const PlannerSteps: React.FC<PlannerStepsProps> = ({
  step,
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
}) => {
  // Content variants for animations
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

  return (
    <>
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
      </AnimatePresence>
    </>
  );
};

export default PlannerSteps;
