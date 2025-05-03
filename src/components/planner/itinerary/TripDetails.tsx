
import React from 'react';
import { MapPin, BadgeIndianRupee } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { TripData } from '@/types/planner';

interface TripDetailsProps {
  tripData: TripData;
}

const TripDetails: React.FC<TripDetailsProps> = ({ tripData }) => {
  return (
    <div className="relative overflow-hidden rounded-xl h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-travel-blue/5 to-travel-teal/5"></div>
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-travel-blue/20 relative h-full">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-semibold text-lg text-travel-navy flex items-center gap-2">
            <MapPin className="h-5 w-5 text-travel-teal" />
            Trip Details
          </h3>
          <div className="bg-blue-50 text-travel-blue text-xs px-3 py-1 rounded-full">
            {tripData.budgetType === 'fixed' ? 'Fixed Budget' : 'Flexible Budget'}
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-full">
              <MapPin className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Origin</div>
              <div className="font-medium">{tripData.origin}</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-full">
              <MapPin className="h-4 w-4 text-travel-blue" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Destination</div>
              <div className="font-medium">{tripData.destination}</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-50 rounded-full">
              <BadgeIndianRupee className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Interests</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {tripData.interests.map((interest, index) => (
                  <Badge key={index} className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
