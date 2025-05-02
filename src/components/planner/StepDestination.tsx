
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, SearchIcon } from "lucide-react";
import { popularDestinations, popularOrigins } from '@/constants/plannerData';
import { motion } from "framer-motion";

interface StepDestinationProps {
  origin: string;
  destination: string;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
}

const StepDestination: React.FC<StepDestinationProps> = ({
  origin,
  destination,
  onOriginChange,
  onDestinationChange
}) => {
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>([]);
  const [filteredOrigins, setFilteredOrigins] = useState<string[]>([]);
  const [showDestinations, setShowDestinations] = useState(false);
  const [showOrigins, setShowOrigins] = useState(false);

  const handleOriginChange = (value: string) => {
    onOriginChange(value);

    if (value.length > 1) {
      const filtered = popularOrigins.filter(orig => 
        orig.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOrigins(filtered);
      setShowOrigins(true);
    } else {
      setShowOrigins(false);
    }
  };

  const handleDestinationChange = (value: string) => {
    onDestinationChange(value);

    if (value.length > 1) {
      const filtered = popularDestinations.filter(dest => 
        dest.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDestinations(filtered);
      setShowDestinations(true);
    } else {
      setShowDestinations(false);
    }
  };

  const selectOrigin = (origin: string) => {
    onOriginChange(origin);
    setShowOrigins(false);
  };

  const selectDestination = (destination: string) => {
    onDestinationChange(destination);
    setShowDestinations(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-semibold text-travel-navy bg-clip-text text-transparent bg-gradient-to-r from-travel-blue to-travel-teal">
          Where are you traveling?
        </h2>
      </motion.div>
      
      <div className="space-y-8">
        {/* Starting Location - Made more prominent */}
        <motion.div className="relative" variants={itemVariants}>
          <Label htmlFor="origin" className="font-medium text-lg text-travel-navy mb-2 block">Starting Location</Label>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-travel-blue/20 to-travel-teal/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-travel-teal/50 focus-within:border-travel-teal bg-white/90 backdrop-blur-sm relative z-10 shadow-sm overflow-hidden group-hover:shadow-md transition-all">
              <div className="flex items-center justify-center ml-3 h-10 w-10 bg-gradient-to-r from-travel-blue/10 to-travel-teal/10 rounded-full">
                <Navigation className="h-5 w-5 text-travel-teal" />
              </div>
              <Input
                id="origin"
                placeholder="Where are you starting from? (e.g. Mumbai, Delhi)"
                value={origin}
                onChange={(e) => handleOriginChange(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              />
              {origin && (
                <button 
                  className="mr-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => handleOriginChange("")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {showOrigins && filteredOrigins.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-20 w-full mt-1 bg-white rounded-md shadow-lg border max-h-60 overflow-auto backdrop-blur-sm bg-white/90"
            >
              {filteredOrigins.map((origin, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="px-4 py-2 hover:bg-travel-teal/10 cursor-pointer flex items-center gap-2"
                  onClick={() => selectOrigin(origin)}
                >
                  <Navigation className="h-4 w-4 text-travel-teal" />
                  {origin}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Destination */}
        <motion.div className="relative" variants={itemVariants}>
          <Label htmlFor="destination" className="font-medium text-lg text-travel-navy mb-2 block">Destination</Label>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-travel-teal/20 to-travel-blue/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-travel-teal/50 focus-within:border-travel-teal bg-white/90 backdrop-blur-sm relative z-10 shadow-sm overflow-hidden group-hover:shadow-md transition-all">
              <div className="flex items-center justify-center ml-3 h-10 w-10 bg-gradient-to-r from-travel-teal/10 to-travel-blue/10 rounded-full">
                <MapPin className="h-5 w-5 text-travel-teal" />
              </div>
              <Input
                id="destination"
                placeholder="Where are you going? (e.g. Goa, Kerala)"
                value={destination}
                onChange={(e) => handleDestinationChange(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              />
              {destination && (
                <button 
                  className="mr-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => handleDestinationChange("")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {showDestinations && filteredDestinations.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-20 w-full mt-1 bg-white rounded-md shadow-lg border max-h-60 overflow-auto backdrop-blur-sm bg-white/90"
            >
              {filteredDestinations.map((dest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="px-4 py-2 hover:bg-travel-teal/10 cursor-pointer flex items-center gap-2"
                  onClick={() => selectDestination(dest)}
                >
                  <MapPin className="h-4 w-4 text-travel-teal" />
                  {dest}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div 
        variants={itemVariants}
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border border-blue-100"
      >
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-white rounded-full">
            <SearchIcon className="h-5 w-5 text-travel-teal" />
          </div>
          <div>
            <h4 className="font-medium text-travel-navy">Travel Tip</h4>
            <p className="text-sm text-gray-600 mt-1">
              Popular destinations like Goa, Kerala, and Rajasthan offer unique experiences. 
              Consider the season and local festivals when planning your travel.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StepDestination;
