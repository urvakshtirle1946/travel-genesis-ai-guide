
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import HotelRecommendations from '@/components/planner/HotelRecommendations';
import ShoppingRecommendations from '@/components/planner/ShoppingRecommendations';
import { TripData, ItineraryDay, TransportOption } from '@/types/planner';

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
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-travel-navy">
            Your Trip: {tripData.origin.split(',')[0]} to {tripData.destination.split(',')[0]}
          </h2>
          {tripData.startDate && tripData.endDate && (
            <p className="text-gray-500">
              {format(tripData.startDate, "MMM d")} - {format(tripData.endDate, "MMM d, yyyy")}
            </p>
          )}
        </div>
        <Button onClick={onSaveTrip} className="bg-travel-teal hover:bg-travel-teal/90">
          Save Trip
        </Button>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Trip Budget Summary</h3>
          <span className="text-travel-teal font-semibold">${totalTripCost.toFixed(0)} total</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Budget:</span>
            <span>${tripData.budget}/day</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Duration:</span>
            <span>
              {tripData.startDate && tripData.endDate 
                ? Math.ceil((tripData.endDate.getTime() - tripData.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
                : 0} days
            </span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t">
            <span>Budget Status:</span>
            <span className={
              totalTripCost > (tripData.budget * itinerary.length) 
                ? "text-red-500" 
                : "text-green-500"
            }>
              {totalTripCost > (tripData.budget * itinerary.length) 
                ? `$${(totalTripCost - (tripData.budget * itinerary.length)).toFixed(0)} over budget` 
                : `$${((tripData.budget * itinerary.length) - totalTripCost).toFixed(0)} under budget`}
            </span>
          </div>
        </div>
      </div>
      
      {/* Transportation details if selected */}
      {tripData.selectedTransportation && (
        <TransportationDetail transportation={tripData.selectedTransportation} origin={tripData.origin} destination={tripData.destination} />
      )}
      
      <div className="space-y-8 mt-6">
        <h3 className="text-xl font-medium text-travel-navy">Your Itinerary</h3>
        {itinerary.map((day) => (
          <DayItinerary 
            key={day.day} 
            day={day} 
            startDate={tripData.startDate} 
            destination={tripData.destination}
          />
        ))}
      </div>
      
      {showAdditionalOptions && (
        <div className="mt-8 space-y-8">
          <h3 className="text-xl font-medium text-travel-navy">Recommended Accommodations</h3>
          <HotelRecommendations destination={tripData.destination} />
          
          {tripData.interests.includes('shopping') && (
            <>
              <h3 className="text-xl font-medium text-travel-navy">Shopping Recommendations</h3>
              <ShoppingRecommendations destination={tripData.destination} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Helper component for transportation details
const TransportationDetail: React.FC<{
  transportation: TransportOption;
  origin: string;
  destination: string;
}> = ({ transportation, origin, destination }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mt-4">
      <h3 className="font-semibold mb-3">Selected Transportation</h3>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-full">
            {transportation.icon}
          </div>
          <div>
            <h4 className="font-medium">{transportation.name}</h4>
            <div className="text-sm text-gray-500">
              Provider: {transportation.provider}
              {transportation.stops > 0 && <span> • {transportation.stops} stop{transportation.stops > 1 ? 's' : ''}</span>}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-travel-blue">${transportation.price}</div>
          <div className="text-sm">{transportation.duration}</div>
        </div>
      </div>
      <div className="mt-3 flex justify-between text-sm">
        <div>
          <div className="font-medium">{transportation.departure}</div>
          <div className="text-gray-500">{origin.split(',')[0]}</div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full h-[1px] bg-gray-300 relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white px-2 text-xs text-gray-500">
              {transportation.duration}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium">{transportation.arrival}</div>
          <div className="text-gray-500">{destination.split(',')[0]}</div>
        </div>
      </div>
    </div>
  );
};

// Helper component for day itinerary
const DayItinerary: React.FC<{
  day: ItineraryDay;
  startDate: Date | undefined;
  destination: string;
}> = ({ day, startDate, destination }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
      <div className="bg-travel-blue text-white p-4">
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
          <div key={index} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between">
              <span className="font-medium text-travel-navy">{activity.time}</span>
              <div className="flex items-center space-x-2">
                {activity.cost !== undefined && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    ${activity.cost}
                  </span>
                )}
                <span className="text-xs bg-travel-teal/10 text-travel-teal px-2 py-1 rounded-full">
                  {activity.type}
                </span>
              </div>
            </div>
            <h4 className="font-semibold mt-1">{activity.title}</h4>
            <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
          </div>
        ))}

        <div className="p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Accommodation</span>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              $
              {destination.toLowerCase().includes('bali') ? '40' : 
               destination.toLowerCase().includes('paris') ? '120' : 
               destination.toLowerCase().includes('tokyo') ? '100' : 
               destination.toLowerCase().includes('new york') ? '150' : '80'}
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {destination.toLowerCase().includes('bali') ? 'Standard Villa' : 
             destination.toLowerCase().includes('paris') ? 'Boutique Hotel' : 
             destination.toLowerCase().includes('tokyo') ? 'Business Hotel' : 
             destination.toLowerCase().includes('new york') ? 'Manhattan Hotel' : 'Standard Hotel'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryResult;
