
import React from 'react';
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import HotelRecommendations from '@/components/planner/HotelRecommendations';
import ShoppingRecommendations from '@/components/planner/ShoppingRecommendations';
import { TripData, ItineraryDay, TransportOption } from '@/types/planner';
import { motion } from 'framer-motion';
import { BadgeIndianRupee, Calendar, Plane } from 'lucide-react';
import { calculateTripDuration } from '@/utils/dateUtils';

// Import refactored components
import TransportationDetail from './itinerary/TransportationDetail';
import DayItinerary from './itinerary/DayItinerary';
import BudgetSummary from './itinerary/BudgetSummary';
import TripDetails from './itinerary/TripDetails';

interface ItineraryResultProps {
  tripData: TripData;
  itinerary: ItineraryDay[];
  totalTripCost: number;
  showAdditionalOptions: boolean;
  onSaveTrip: () => void;
}

const ItineraryResult: React.FC<ItineraryResultProps> = ({
  tripData,
  itinerary,
  totalTripCost,
  showAdditionalOptions,
  onSaveTrip
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Calculate remaining budget
  const remainingBudget = tripData.totalBudget - totalTripCost;
  // Calculate trip duration
  const tripDuration = calculateTripDuration(tripData.startDate, tripData.endDate);

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        variants={itemVariants}
      >
        <div>
          <h2 className="text-2xl font-semibold text-travel-navy bg-clip-text text-transparent bg-gradient-to-r from-travel-blue to-travel-teal">
            Your Trip: {tripData.origin.split(',')[0]} to {tripData.destination.split(',')[0]}
          </h2>
          {tripData.startDate && tripData.endDate && (
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="h-4 w-4 text-travel-teal" />
              {format(tripData.startDate, "MMM d")} - {format(tripData.endDate, "MMM d, yyyy")}
              <span className="text-travel-blue font-semibold ml-1">
                ({tripDuration} {tripDuration === 1 ? 'day' : 'days'})
              </span>
            </div>
          )}
        </div>
        <Button 
          onClick={onSaveTrip} 
          className="bg-travel-teal hover:bg-travel-teal/90 relative group overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-travel-blue to-travel-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative">Save Trip</span>
        </Button>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        variants={itemVariants}
      >
        <div className="lg:col-span-3">
          <BudgetSummary
            totalBudget={tripData.totalBudget}
            totalTripCost={totalTripCost}
            dailyBudget={tripData.budget}
            remainingBudget={remainingBudget}
          />
        </div>
        
        <div className="lg:col-span-2">
          <TripDetails tripData={tripData} />
        </div>
      </motion.div>
      
      {/* Transportation details if selected */}
      {tripData.selectedTransportation && (
        <motion.div variants={itemVariants}>
          <TransportationDetail 
            transportation={tripData.selectedTransportation} 
            origin={tripData.origin} 
            destination={tripData.destination} 
          />
        </motion.div>
      )}
      
      <motion.div 
        className="space-y-8 mt-6"
        variants={itemVariants}
      >
        <h3 className="text-2xl font-semibold text-travel-navy flex items-center gap-2">
          <Plane className="h-6 w-6 text-travel-teal" />
          Your Itinerary
        </h3>
        {itinerary.map((day) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (day.day * 0.1) }}
          >
            <DayItinerary 
              day={day} 
              startDate={tripData.startDate} 
              destination={tripData.destination}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {showAdditionalOptions && (
        <motion.div 
          className="mt-8 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-travel-navy">Recommended Accommodations</h3>
            <div className="mt-4">
              <HotelRecommendations destination={tripData.destination} />
            </div>
          </motion.div>
          
          {tripData.interests.includes('shopping') && (
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-travel-navy">Shopping Recommendations</h3>
              <div className="mt-4">
                <ShoppingRecommendations destination={tripData.destination} />
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ItineraryResult;
