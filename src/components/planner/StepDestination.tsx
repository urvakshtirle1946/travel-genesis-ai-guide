
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
      
      <div className="space-y-4">
        <div className="relative">
          <Label htmlFor="origin">Starting Location</Label>
          <div className="flex items-center border mt-1 rounded-md focus-within:ring-2 focus-within:ring-travel-teal/50 focus-within:border-travel-teal">
            <Navigation className="ml-3 h-5 w-5 text-gray-400" />
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

        <div className="relative">
          <Label htmlFor="destination">Destination</Label>
          <div className="flex items-center border mt-1 rounded-md focus-within:ring-2 focus-within:ring-travel-teal/50 focus-within:border-travel-teal">
            <MapPin className="ml-3 h-5 w-5 text-gray-400" />
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
