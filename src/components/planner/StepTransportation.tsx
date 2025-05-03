
import React from 'react';
import TransportationOptions from '@/components/planner/TransportationOptions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Calendar, BadgeIndianRupee, Hotel, ShoppingBag, Utensils } from 'lucide-react';
import { TransportOption } from '@/types/planner';
import LiveRecommendations from '@/components/planner/LiveRecommendations';

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
          <TabsTrigger value="all" className="flex items-center">
            <BadgeIndianRupee className="mr-2 h-4 w-4" />
            All Trip Suggestions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="realtime">
          <LiveRecommendations
            origin={origin}
            destination={destination}
            onSelectTransportOption={onSelectOption}
          />
        </TabsContent>
        <TabsContent value="scheduled">
          <TransportationOptions 
            origin={origin} 
            destination={destination}
            onSelectOption={onSelectOption}
          />
        </TabsContent>
        <TabsContent value="all">
          <div className="bg-travel-blue/10 p-6 rounded-lg border border-travel-blue/20">
            <h3 className="text-xl font-semibold text-travel-navy flex items-center gap-2 mb-4">
              <BadgeIndianRupee className="h-5 w-5 text-travel-teal" />
              Complete Trip Planner
            </h3>
            <p className="text-gray-600 mb-6">
              Select transportation from the other tabs first, then see comprehensive recommendations for your entire trip including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Hotel className="h-5 w-5 text-travel-teal" />
                  <h4 className="font-medium text-travel-navy">Hotel Options</h4>
                </div>
                <p className="text-sm text-gray-600">Recommended hotels with real-time availability</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag className="h-5 w-5 text-travel-teal" />
                  <h4 className="font-medium text-travel-navy">Shopping Recommendations</h4>
                </div>
                <p className="text-sm text-gray-600">Malls, markets, and shopping areas with current timing</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="h-5 w-5 text-travel-teal" />
                  <h4 className="font-medium text-travel-navy">Food & Dining</h4>
                </div>
                <p className="text-sm text-gray-600">Restaurant suggestions with table availability</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-travel-teal" />
                  <h4 className="font-medium text-travel-navy">Daily Itinerary</h4>
                </div>
                <p className="text-sm text-gray-600">AI-generated day plans based on your preferences</p>
              </div>
            </div>
          </div>
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
