
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrainFront, Hotel, ShoppingBag, Utensils, Clock } from 'lucide-react';
import RealTimeTripSuggestions from './RealTimeTripSuggestions';
import LiveHotelRecommendations from './LiveHotelRecommendations';
import LiveShoppingRecommendations from './LiveShoppingRecommendations';
import LiveFoodRecommendations from './LiveFoodRecommendations';
import { format } from 'date-fns';
import { TransportOption } from '@/types/planner';

interface LiveRecommendationsProps {
  origin: string;
  destination: string;
  onSelectTransportOption: (option: TransportOption) => void;
}

const LiveRecommendations: React.FC<LiveRecommendationsProps> = ({
  origin,
  destination,
  onSelectTransportOption
}) => {
  const [currentTime] = useState(new Date());
  
  return (
    <div className="space-y-6">
      <motion.div 
        className="bg-gradient-to-r from-travel-blue/10 to-travel-teal/10 p-4 rounded-lg border border-blue-100"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 text-travel-navy">
          <Clock className="h-5 w-5 text-travel-teal" />
          <h3 className="font-semibold">Live Recommendations • {format(currentTime, 'EEEE, h:mm a')}</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Real-time suggestions based on current availability and timing from {origin.split(',')[0]} to {destination.split(',')[0]}
        </p>
      </motion.div>
      
      <Tabs defaultValue="transport" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="transport" className="flex items-center gap-1">
            <TrainFront className="h-4 w-4" />
            <span className="hidden sm:inline">Transport</span>
          </TabsTrigger>
          <TabsTrigger value="hotels" className="flex items-center gap-1">
            <Hotel className="h-4 w-4" />
            <span className="hidden sm:inline">Hotels</span>
          </TabsTrigger>
          <TabsTrigger value="shopping" className="flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Shopping</span>
          </TabsTrigger>
          <TabsTrigger value="food" className="flex items-center gap-1">
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Food</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transport" className="mt-0">
          <RealTimeTripSuggestions 
            origin={origin}
            destination={destination}
            onSelectOption={onSelectTransportOption}
          />
        </TabsContent>
        
        <TabsContent value="hotels" className="mt-0">
          <LiveHotelRecommendations destination={destination} />
        </TabsContent>
        
        <TabsContent value="shopping" className="mt-0">
          <LiveShoppingRecommendations destination={destination} />
        </TabsContent>
        
        <TabsContent value="food" className="mt-0">
          <LiveFoodRecommendations destination={destination} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveRecommendations;
