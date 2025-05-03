
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { BadgeIndianRupee } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Import our components and hooks
import PlannerSteps from '@/components/planner/PlannerSteps';
import PlannerLoading from '@/components/planner/PlannerLoading';
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

  // Framer Motion variants for animations
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
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
          
          {loading ? (
            <PlannerLoading 
              origin={tripData.origin} 
              destination={tripData.destination} 
            />
          ) : (
            <PlannerSteps
              step={step}
              tripData={tripData}
              itinerary={itinerary}
              suggestedBudget={suggestedBudget}
              totalTripCost={totalTripCost}
              showAdditionalOptions={showAdditionalOptions}
              nextStep={nextStep}
              prevStep={prevStep}
              updateOrigin={updateOrigin}
              updateDestination={updateDestination}
              updateStartDate={updateStartDate}
              updateEndDate={updateEndDate}
              updateBudgetType={updateBudgetType}
              updateBudget={updateBudget}
              updateTotalBudget={updateTotalBudget}
              updateInterests={updateInterests}
              updateTransportation={updateTransportation}
              saveTrip={saveTrip}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Planner;
