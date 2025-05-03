import { useState } from 'react';
import { toast } from 'sonner';
import { ItineraryDay, TripData, TransportOption } from '@/types/planner';
import { calculateTripDuration } from '@/utils/dateUtils';

export const useItineraryGeneration = (user: any, tripData: TripData) => {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [totalTripCost, setTotalTripCost] = useState(0);
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);

  const saveTrip = async () => {
    if (!user) {
      toast.error("Please sign in to save your trip");
      return;
    }

    toast.success("Trip saved successfully!");
  };

  const generateItinerary = async () => {
    if (!user) {
      toast.error("Please sign in to generate an itinerary");
      return;
    }

    if (!tripData.destination) {
      toast.error("Please select a destination");
      return;
    }

    if (!tripData.origin) {
      toast.error("Please select an origin");
      return;
    }

    setLoading(true);
    try {
      // In a real app, we'd make an API call here
      // For demo, let's create a mock itinerary after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const dayCount = calculateTripDuration(tripData.startDate, tripData.endDate);
      
      // Generate activities based on destination and user interests
      const mockItinerary: ItineraryDay[] = Array.from({ length: dayCount }, (_, i) => {
        // Customize activities based on the destination
        let activities = [];
        const destination = tripData.destination.toLowerCase();
        
        // Bali activities
        if (destination.includes('bali')) {
          activities = [
            {
              time: '09:00 AM',
              title: i === 0 ? 'Sacred Monkey Forest Sanctuary' : i === 1 ? 'Tegallalang Rice Terraces' : 'Uluwatu Temple',
              description: 'Explore the beautiful natural and cultural sites of Bali',
              type: tripData.interests.includes('culture') ? 'Culture' : 'Nature',
              cost: i === 0 ? 1050 : i === 1 ? 700 : 1400 // in INR
            },
            {
              time: '12:30 PM',
              title: 'Traditional Balinese Lunch',
              description: 'Enjoy authentic local cuisine at a popular restaurant',
              type: 'Food',
              cost: 1050 // in INR
            },
            {
              time: '03:00 PM',
              title: i === 0 ? 'Ubud Art Market' : i === 1 ? 'Bali Swing' : 'Kuta Beach Sunset',
              description: 'Experience the unique attractions of the island',
              type: i === 1 ? 'Adventure' : 'Culture',
              cost: i === 1 ? 2450 : 0 // in INR
            },
            {
              time: '07:00 PM',
              title: i % 2 === 0 ? 'Dinner at Warung Babi Guling' : 'Seafood Dinner at Jimbaran Bay',
              description: 'Savor delicious local specialties',
              type: 'Food',
              cost: i % 2 === 0 ? 700 : 1750 // in INR
            }
          ];
        } 
        // Paris activities
        else if (destination.includes('paris')) {
          activities = [
            {
              time: '09:00 AM',
              title: i === 0 ? 'Eiffel Tower' : i === 1 ? 'Louvre Museum' : 'Notre-Dame Cathedral',
              description: 'Visit the iconic landmarks of Paris',
              type: 'Culture',
              cost: i === 0 ? 1960 : i === 1 ? 1190 : 0 // in INR
            },
            {
              time: '01:00 PM',
              title: 'French Cuisine Experience',
              description: 'Taste authentic French dishes at a local bistro',
              type: 'Food',
              cost: 2450 // in INR
            },
            {
              time: '04:00 PM',
              title: i === 0 ? 'Champs-Élysées Shopping' : i === 1 ? 'Seine River Cruise' : 'Montmartre Walk',
              description: 'Enjoy the Parisian atmosphere',
              type: i === 1 ? 'Relaxation' : 'Culture',
              cost: i === 0 ? 0 : i === 1 ? 1050 : 0 // in INR
            },
            {
              time: '08:00 PM',
              title: i % 3 === 0 ? 'Dinner in Le Marais' : i % 3 === 1 ? 'Wine Tasting' : 'Dinner at Montparnasse',
              description: 'Experience French culinary delights',
              type: 'Food',
              cost: 3150 // in INR
            }
          ];
        } 
        // Tokyo activities
        else if (destination.includes('tokyo')) {
          activities = [
            {
              time: '08:00 AM',
              title: i === 0 ? 'Tsukiji Outer Market' : i === 1 ? 'Meiji Shrine' : 'Sensō-ji Temple',
              description: 'Explore Tokyo\'s cultural landmarks',
              type: tripData.interests.includes('culture') ? 'Culture' : 'History',
              cost: 0 // in INR
            },
            {
              time: '12:00 PM',
              title: i === 0 ? 'Sushi at Ginza' : i === 1 ? 'Ramen Experience' : 'Traditional Bento Box',
              description: 'Taste authentic Japanese cuisine',
              type: 'Food',
              cost: i === 0 ? 3500 : 1050 // in INR
            },
            {
              time: '03:00 PM',
              title: i === 0 ? 'Shibuya Crossing' : i === 1 ? 'Akihabara Electronics District' : 'Harajuku Shopping',
              description: 'Experience Tokyo\'s vibrant districts',
              type: tripData.interests.includes('shopping') ? 'Shopping' : 'Culture',
              cost: 0 // in INR
            },
            {
              time: '07:00 PM',
              title: i === 0 ? 'Robot Restaurant Show' : i === 1 ? 'Izakaya Dinner' : 'Karaoke Night',
              description: 'Enjoy Tokyo\'s unique nightlife',
              type: 'Nightlife',
              cost: i === 0 ? 5600 : 2450 // in INR
            }
          ];
        }
        // New York activities
        else if (destination.includes('new york')) {
          activities = [
            {
              time: '09:00 AM',
              title: i === 0 ? 'Statue of Liberty & Ellis Island' : i === 1 ? 'Central Park Exploration' : 'Metropolitan Museum of Art',
              description: 'Visit iconic NYC landmarks',
              type: i === 0 ? 'Culture' : i === 1 ? 'Nature' : 'History',
              cost: i === 0 ? 1750 : i === 1 ? 0 : 1750 // in INR
            },
            {
              time: '01:00 PM',
              title: i === 0 ? 'New York Pizza for Lunch' : i === 1 ? 'Gourmet Food Hall' : 'Deli Sandwich Classic',
              description: 'Try New York\'s famous food',
              type: 'Food',
              cost: 1050 // in INR
            },
            {
              time: '03:30 PM',
              title: i === 0 ? 'Times Square & Broadway' : i === 1 ? 'Brooklyn Bridge Walk' : 'High Line & Chelsea Market',
              description: 'Experience the city\'s unique atmosphere',
              type: i === 1 ? 'Adventure' : 'Culture',
              cost: 0 // in INR
            },
            {
              time: '07:00 PM',
              title: i === 0 ? 'Broadway Show' : i === 1 ? 'Rooftop Bar Experience' : 'Chinatown Dinner',
              description: 'Enjoy New York\'s vibrant nightlife',
              type: i === 0 ? 'Culture' : 'Nightlife',
              cost: i === 0 ? 8400 : i === 1 ? 2800 : 1750 // in INR
            }
          ];
        }
        // Generic activities for any other destination (India-focused)
        else {
          activities = [
            {
              time: '09:00 AM',
              title: tripData.interests.includes('nature') 
                ? `${tripData.destination.split(',')[0]} Nature Exploration` 
                : `${tripData.destination.split(',')[0]} City Tour`,
              description: 'Explore the beautiful surroundings',
              type: tripData.interests.includes('nature') ? 'Nature' : 'Culture',
              cost: 1400 // in INR
            },
            {
              time: '12:30 PM',
              title: tripData.interests.includes('food') 
                ? 'Local Food Tasting' 
                : 'Lunch at Restaurant',
              description: 'Enjoy delicious local cuisine',
              type: 'Food',
              cost: 1750 // in INR
            },
            {
              time: '03:00 PM',
              title: tripData.interests.includes('culture') 
                ? 'Museum Visit'
                : tripData.interests.includes('adventure')
                  ? 'Adventure Activity'
                  : 'Shopping',
              description: 'Immerse yourself in the local experience',
              type: tripData.interests.includes('culture') 
                ? 'Culture' 
                : tripData.interests.includes('adventure')
                  ? 'Adventure'
                  : 'Shopping',
              cost: tripData.interests.includes('adventure') ? 3500 : 1050 // in INR
            },
            {
              time: '07:00 PM',
              title: tripData.interests.includes('nightlife') 
                ? 'Nightlife Tour'
                : 'Dinner and Relaxation',
              description: 'Unwind after a day of exploration',
              type: tripData.interests.includes('nightlife') ? 'Nightlife' : 'Relaxation',
              cost: tripData.interests.includes('nightlife') ? 2800 : 2100 // in INR
            }
          ];
        }

        return {
          day: i + 1,
          activities
        };
      });
      
      // Calculate total trip cost in INR
      const totalCost = mockItinerary.reduce((total, day) => {
        // Sum activity costs
        const activitiesCost = day.activities.reduce((sum, activity) => sum + (activity.cost || 0), 0);
        
        // Add accommodation cost in INR
        const accommodationCost = tripData.destination.toLowerCase().includes('bali') ? 2800 : 
                              tripData.destination.toLowerCase().includes('paris') ? 8400 : 
                              tripData.destination.toLowerCase().includes('tokyo') ? 7000 : 
                              tripData.destination.toLowerCase().includes('new york') ? 10500 : 5600;
        
        // Add transportation cost
        const transportationCost = 1400; // Generic daily transportation cost in INR
        
        return total + activitiesCost + accommodationCost + transportationCost;
      }, 0);
      
      // Add the selected transportation cost if any
      const transportationTotalCost = tripData.selectedTransportation ? tripData.selectedTransportation.price : 0;
      
      setTotalTripCost(totalCost + transportationTotalCost);
      setItinerary(mockItinerary);
      setShowAdditionalOptions(true); // Show additional recommendations
      toast.success("Your itinerary for " + tripData.destination + " has been generated!");

      return { success: true, itinerary: mockItinerary };
    } catch (error) {
      toast.error("Failed to generate itinerary. Please try again.");
      console.error("Error generating itinerary:", error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    itinerary,
    totalTripCost,
    showAdditionalOptions,
    saveTrip,
    generateItinerary,
    setItinerary,
    setTotalTripCost,
    setShowAdditionalOptions
  };
};

export default useItineraryGeneration;
