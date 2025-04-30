
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation } from "lucide-react";
import { popularDestinations, popularOrigins } from '@/constants/plannerData';

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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-travel-navy">Where are you traveling?</h2>
      
      <div className="space-y-6"> {/* Increased space between inputs */}
        {/* Starting Location - Made more prominent */}
        <div className="relative">
          <Label htmlFor="origin" className="font-medium text-lg text-travel-navy">Starting Location</Label>
          <p className="text-gray-500 text-sm mb-2">Where will your journey begin?</p>
          <div className="flex items-center border mt-1 rounded-md focus-within:ring-2 focus-within:ring-travel-teal/50 focus-within:border-travel-teal bg-white shadow-sm">
            <Navigation className="ml-3 h-5 w-5 text-travel-teal" />
            <Input
              id="origin"
              placeholder="Where are you starting from? (e.g. London, Sydney)"
              value={origin}
              onChange={(e) => handleOriginChange(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          
          {showOrigins && filteredOrigins.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border max-h-60 overflow-auto">
              {filteredOrigins.map((origin, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectOrigin(origin)}
                >
                  {origin}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Destination */}
        <div className="relative">
          <Label htmlFor="destination" className="font-medium text-lg text-travel-navy">Destination</Label>
          <p className="text-gray-500 text-sm mb-2">Where do you want to go?</p>
          <div className="flex items-center border mt-1 rounded-md focus-within:ring-2 focus-within:ring-travel-teal/50 focus-within:border-travel-teal bg-white shadow-sm">
            <MapPin className="ml-3 h-5 w-5 text-travel-teal" />
            <Input
              id="destination"
              placeholder="Where are you going? (e.g. Paris, Tokyo)"
              value={destination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          
          {showDestinations && filteredDestinations.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border max-h-60 overflow-auto">
              {filteredDestinations.map((dest, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectDestination(dest)}
                >
                  {dest}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepDestination;
