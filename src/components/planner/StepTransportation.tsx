
import React from 'react';
import TransportationOptions from '@/components/planner/TransportationOptions';
import { TransportOption } from '@/types/planner';

interface StepTransportationProps {
  origin: string;
  destination: string;
  onSelectOption: (option: TransportOption) => void;
}

const StepTransportation: React.FC<StepTransportationProps> = ({
  origin,
  destination,
  onSelectOption
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-travel-navy">Choose Transportation</h2>
      <p className="text-gray-600 mb-4">Select how you want to travel from {origin.split(',')[0]} to {destination.split(',')[0]}</p>
      
      <TransportationOptions 
        origin={origin} 
        destination={destination}
        onSelectOption={onSelectOption}
      />
      
      <div className="mt-6 pt-4 border-t">
        <p className="text-center text-gray-500 italic">
          Select a transportation option above or click "Generate Itinerary" to proceed without selecting
        </p>
      </div>
    </div>
  );
};

export default StepTransportation;
