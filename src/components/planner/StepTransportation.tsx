
import React from 'react';
import RealTimeTripSuggestions from '@/components/planner/RealTimeTripSuggestions';
import TransportationOptions from '@/components/planner/TransportationOptions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Calendar } from 'lucide-react';
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
  const originCity = origin.split(',')[0];
  const destinationCity = destination.split(',')[0];
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-travel-navy">Choose Transportation</h2>
      <p className="text-gray-600 mb-4">
        How would you like to travel from <span className="font-medium text-travel-teal">{originCity}</span> to <span className="font-medium text-travel-teal">{destinationCity}</span>?
      </p>
      
      <Tabs defaultValue="realtime" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="realtime" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Departing Now
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Scheduled Options
          </TabsTrigger>
        </TabsList>
        <TabsContent value="realtime">
          <RealTimeTripSuggestions
            origin={origin}
            destination={destination}
            onSelectOption={onSelectOption}
          />
        </TabsContent>
        <TabsContent value="scheduled">
          <TransportationOptions 
            origin={origin} 
            destination={destination}
            onSelectOption={onSelectOption}
          />
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 pt-4 border-t">
        <p className="text-center text-gray-500 italic">
          Select a transportation option above or click "Generate Itinerary" to proceed without selecting
        </p>
      </div>
    </div>
  );
};

export default StepTransportation;
