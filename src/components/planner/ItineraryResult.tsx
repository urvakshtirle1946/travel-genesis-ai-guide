
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import HotelRecommendations from '@/components/planner/HotelRecommendations';
import ShoppingRecommendations from '@/components/planner/ShoppingRecommendations';
import { TripData, ItineraryDay, TransportOption } from '@/types/planner';
import { motion } from 'framer-motion';

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
            <p className="text-gray-500">
              {format(tripData.startDate, "MMM d")} - {format(tripData.endDate, "MMM d, yyyy")}
            </p>
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
        className="relative overflow-hidden rounded-xl"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 opacity-70"></div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-blue-100/50 relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-xl text-travel-navy">Trip Budget Summary</h3>
            <div className="text-xl font-bold text-travel-teal bg-travel-teal/10 px-4 py-1.5 rounded-full">
              ₹{totalTripCost.toLocaleString('en-IN')} <span className="text-sm font-normal">total</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
              <div className="text-sm text-gray-500 mb-1">Daily Budget</div>
              <div className="text-lg font-medium text-travel-navy">₹{tripData.budget.toLocaleString('en-IN')}/day</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
              <div className="text-sm text-gray-500 mb-1">Duration</div>
              <div className="text-lg font-medium text-travel-navy">
                {tripData.startDate && tripData.endDate 
                  ? Math.ceil((tripData.endDate.getTime() - tripData.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
                  : 0} days
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
              <div className="text-sm text-gray-500 mb-1">Budget Status</div>
              <div className={`text-lg font-medium ${
                totalTripCost > (tripData.budget * itinerary.length) 
                  ? "text-red-500" 
                  : "text-green-500"}`
              }>
                {totalTripCost > (tripData.budget * itinerary.length) 
                  ? `₹${(totalTripCost - (tripData.budget * itinerary.length)).toLocaleString('en-IN')} over budget` 
                  : `₹${((tripData.budget * itinerary.length) - totalTripCost).toLocaleString('en-IN')} under budget`}
              </div>
            </div>
          </div>
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
        <h3 className="text-2xl font-semibold text-travel-navy">Your Itinerary</h3>
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

// Helper component for transportation details
const TransportationDetail: React.FC<{
  transportation: TransportOption;
  origin: string;
  destination: string;
}> = ({ transportation, origin, destination }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-travel-blue/5 to-travel-teal/5"></div>
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-travel-blue/20 relative">
        <h3 className="font-semibold text-lg text-travel-navy mb-4">Selected Transportation</h3>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-travel-blue/10 to-travel-teal/10 rounded-full">
              {transportation.icon}
            </div>
            <div>
              <h4 className="font-medium text-lg text-travel-navy">{transportation.name}</h4>
              <div className="text-sm text-gray-500 mt-1">
                Provider: {transportation.provider}
                {transportation.stops > 0 && <span> • {transportation.stops} stop{transportation.stops > 1 ? 's' : ''}</span>}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-travel-blue">₹{transportation.price.toLocaleString('en-IN')}</div>
            <div className="text-sm text-gray-500">{transportation.duration}</div>
          </div>
        </div>
        <div className="mt-6 flex justify-between text-sm relative">
          <div className="w-full h-[1px] bg-gray-300 absolute top-4"></div>
          
          <div className="bg-white px-3 z-10">
            <div className="font-medium">{transportation.departure}</div>
            <div className="text-gray-500">{origin.split(',')[0]}</div>
          </div>
          
          <div className="z-10 bg-white px-4">
            <div className="text-xs text-center text-gray-500 -mt-2 mb-2">{transportation.duration}</div>
          </div>
          
          <div className="bg-white px-3 z-10">
            <div className="font-medium text-right">{transportation.arrival}</div>
            <div className="text-gray-500 text-right">{destination.split(',')[0]}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper component for day itinerary
const DayItinerary: React.FC<{
  day: ItineraryDay;
  startDate: Date | undefined;
  destination: string;
}> = ({ day, startDate, destination }) => {
  return (
    <motion.div 
      className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 mb-6 relative"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-travel-blue/5 to-travel-teal/5 -z-10"></div>
      
      <div className="bg-gradient-to-r from-travel-blue to-travel-teal text-white p-4">
        <h3 className="text-xl font-medium">Day {day.day}</h3>
        {startDate && (
          <p className="text-sm opacity-90">
            {format(
              new Date(startDate.getTime() + (day.day - 1) * 24 * 60 * 60 * 1000), 
              "EEEE, MMMM d, yyyy"
            )}
          </p>
        )}
      </div>
      
      <div className="divide-y">
        {day.activities.map((activity, index) => (
          <motion.div 
            key={index} 
            className="p-4 hover:bg-gray-50 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex justify-between">
              <span className="font-medium text-travel-navy bg-travel-blue/10 px-2 py-0.5 rounded">{activity.time}</span>
              <div className="flex items-center space-x-2">
                {activity.cost !== undefined && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    ₹{activity.cost.toLocaleString('en-IN')}
                  </span>
                )}
                <Badge className="bg-travel-teal/10 text-travel-teal hover:bg-travel-teal/20 border-0">
                  {activity.type}
                </Badge>
              </div>
            </div>
            <h4 className="font-semibold mt-2 text-lg">{activity.title}</h4>
            <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
          </motion.div>
        ))}

        <div className="p-4 bg-gray-50/80">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg className="h-4 w-4 text-travel-teal mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Accommodation</span>
            </div>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              ₹
              {destination.toLowerCase().includes('bali') ? '2,800' : 
               destination.toLowerCase().includes('paris') ? '8,400' : 
               destination.toLowerCase().includes('tokyo') ? '7,000' : 
               destination.toLowerCase().includes('new york') ? '10,500' : '5,600'}
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-1 ml-6">
            {destination.toLowerCase().includes('bali') ? 'Standard Villa' : 
             destination.toLowerCase().includes('paris') ? 'Boutique Hotel' : 
             destination.toLowerCase().includes('tokyo') ? 'Business Hotel' : 
             destination.toLowerCase().includes('new york') ? 'Manhattan Hotel' : 'Standard Hotel'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItineraryResult;
