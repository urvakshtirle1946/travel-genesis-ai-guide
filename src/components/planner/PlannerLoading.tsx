
import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

interface PlannerLoadingProps {
  origin: string;
  destination: string;
}

const PlannerLoading: React.FC<PlannerLoadingProps> = ({ origin, destination }) => {
  return (
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
          Creating your itinerary from {origin.split(',')[0]} to {destination.split(',')[0]}...
        </h3>
        <p className="text-gray-500 mt-2">We're crafting the perfect travel experience for you</p>
      </motion.div>
    </motion.div>
  );
};

export default PlannerLoading;
