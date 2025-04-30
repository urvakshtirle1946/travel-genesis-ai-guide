
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { TripData, ItineraryDay, TransportOption } from '@/types/planner';
import { destinationBudgetRanges } from '@/constants/plannerData';

export const useTripPlanner = (user: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tripData, setTripData] = useState<TripData>({
    origin: '',
    destination: '',
    startDate: undefined,
    endDate: undefined,
    budgetType: 'fixed',
    budget: 100,
    interests: [],
  });
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [suggestedBudget, setSuggestedBudget] = useState({ min: 50, max: 300, average: 100 });
  const [totalTripCost, setTotalTripCost] = useState(0);
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);

  // Check for query parameters when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryDestination = params.get('destination');
    const queryOrigin = params.get('origin');
    
    if (queryDestination) {
      setTripData(prev => ({
        ...prev,
        destination: decodeURIComponent(queryDestination)
      }));

      // Update the suggested budget based on destination
      updateSuggestedBudget(decodeURIComponent(queryDestination));
    }

    if (queryOrigin) {
      setTripData(prev => ({
        ...prev,
        origin: decodeURIComponent(queryOrigin)
      }));
    }
  }, [location]);

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to create a trip plan");
      navigate('/');
    }
  }, [user, navigate]);

  const updateSuggestedBudget = (destination: string) => {
    // Extract first part of destination (e.g., "Paris" from "Paris, France")
    const mainDestination = destination.split(',')[0].trim();
    
    // Find the budget range for this destination
    for (const [dest, budgetRange] of Object.entries(destinationBudgetRanges)) {
      if (mainDestination.toLowerCase().includes(dest.toLowerCase()) || dest.toLowerCase().includes(mainDestination.toLowerCase())) {
        setSuggestedBudget(budgetRange);
        setTripData(prev => ({...prev, budget: budgetRange.average}));
        break;
      }
    }
  };

  const updateOrigin = (origin: string) => {
    setTripData({
      ...tripData,
      origin
    });
  };

  const updateDestination = (destination: string) => {
    setTripData({
      ...tripData,
      destination
    });
    
    // Update suggested budget when destination is selected
    updateSuggestedBudget(destination);
  };

  const updateStartDate = (date: Date | undefined) => {
    setTripData({
      ...tripData,
      startDate: date
    });
  };

  const updateEndDate = (date: Date | undefined) => {
    setTripData({
      ...tripData,
      endDate: date
    });
  };

  const updateBudgetType = (type: 'fixed' | 'flexible') => {
    setTripData({
      ...tripData,
      budgetType: type
    });
  };

  const updateBudget = (value: number[]) => {
    setTripData({
      ...tripData,
      budget: value[0]
    });
  };

  const updateInterests = (interest: string, checked: boolean) => {
    if (checked) {
      setTripData({
        ...tripData,
        interests: [...tripData.interests, interest],
      });
    } else {
      setTripData({
        ...tripData,
        interests: tripData.interests.filter((i) => i !== interest),
      });
    }
  };

  const updateTransportation = (option: TransportOption) => {
    setTripData({
      ...tripData,
      selectedTransportation: option
    });
    toast.success(`Selected ${option.type} transportation option`);
  };

  const nextStep = () => {
    if (step === 1 && (!tripData.origin.trim() || !tripData.destination.trim())) {
      toast.error("Please enter both origin and destination");
      return;
    }
    
    if (step === 2 && (!tripData.startDate || !tripData.endDate)) {
      toast.error("Please select both start and end dates");
      return;
    }
    
    if (step === 4 && tripData.interests.length === 0) {
      toast.error("Please select at least one interest");
      return;
    }

    if (step < 5) {
      setStep(step + 1);
    } else if (step === 5) {
      generateItinerary();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

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
      
      const dayCount = tripData.endDate && tripData.startDate 
        ? Math.ceil((tripData.endDate.getTime() - tripData.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
        : 3;
      
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
              cost: i === 0 ? 15 : i === 1 ? 10 : 20
            },
            {
              time: '12:30 PM',
              title: 'Traditional Balinese Lunch',
              description: 'Enjoy authentic local cuisine at a popular restaurant',
              type: 'Food',
              cost: 15
            },
            {
              time: '03:00 PM',
              title: i === 0 ? 'Ubud Art Market' : i === 1 ? 'Bali Swing' : 'Kuta Beach Sunset',
              description: 'Experience the unique attractions of the island',
              type: i === 1 ? 'Adventure' : 'Culture',
              cost: i === 1 ? 35 : 0
            },
            {
              time: '07:00 PM',
              title: i % 2 === 0 ? 'Dinner at Warung Babi Guling' : 'Seafood Dinner at Jimbaran Bay',
              description: 'Savor delicious local specialties',
              type: 'Food',
              cost: i % 2 === 0 ? 10 : 25
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
              cost: i === 0 ? 28 : i === 1 ? 17 : 0
            },
            {
              time: '01:00 PM',
              title: 'French Cuisine Experience',
              description: 'Taste authentic French dishes at a local bistro',
              type: 'Food',
              cost: 35
            },
            {
              time: '04:00 PM',
              title: i === 0 ? 'Champs-Élysées Shopping' : i === 1 ? 'Seine River Cruise' : 'Montmartre Walk',
              description: 'Enjoy the Parisian atmosphere',
              type: i === 1 ? 'Relaxation' : 'Culture',
              cost: i === 0 ? 0 : i === 1 ? 15 : 0
            },
            {
              time: '08:00 PM',
              title: i % 3 === 0 ? 'Dinner in Le Marais' : i % 3 === 1 ? 'Wine Tasting' : 'Dinner at Montparnasse',
              description: 'Experience French culinary delights',
              type: 'Food',
              cost: 45
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
              cost: 0
            },
            {
              time: '12:00 PM',
              title: i === 0 ? 'Sushi at Ginza' : i === 1 ? 'Ramen Experience' : 'Traditional Bento Box',
              description: 'Taste authentic Japanese cuisine',
              type: 'Food',
              cost: i === 0 ? 50 : 15
            },
            {
              time: '03:00 PM',
              title: i === 0 ? 'Shibuya Crossing' : i === 1 ? 'Akihabara Electronics District' : 'Harajuku Shopping',
              description: 'Experience Tokyo\'s vibrant districts',
              type: tripData.interests.includes('shopping') ? 'Shopping' : 'Culture',
              cost: 0
            },
            {
              time: '07:00 PM',
              title: i === 0 ? 'Robot Restaurant Show' : i === 1 ? 'Izakaya Dinner' : 'Karaoke Night',
              description: 'Enjoy Tokyo\'s unique nightlife',
              type: 'Nightlife',
              cost: i === 0 ? 80 : 35
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
              cost: i === 0 ? 25 : i === 1 ? 0 : 25
            },
            {
              time: '01:00 PM',
              title: i === 0 ? 'New York Pizza for Lunch' : i === 1 ? 'Gourmet Food Hall' : 'Deli Sandwich Classic',
              description: 'Try New York\'s famous food',
              type: 'Food',
              cost: 15
            },
            {
              time: '03:30 PM',
              title: i === 0 ? 'Times Square & Broadway' : i === 1 ? 'Brooklyn Bridge Walk' : 'High Line & Chelsea Market',
              description: 'Experience the city\'s unique atmosphere',
              type: i === 1 ? 'Adventure' : 'Culture',
              cost: i === 0 ? 0 : i === 1 ? 0 : 0
            },
            {
              time: '07:00 PM',
              title: i === 0 ? 'Broadway Show' : i === 1 ? 'Rooftop Bar Experience' : 'Chinatown Dinner',
              description: 'Enjoy New York\'s vibrant nightlife',
              type: i === 0 ? 'Culture' : 'Nightlife',
              cost: i === 0 ? 120 : i === 1 ? 40 : 25
            }
          ];
        }
        // Generic activities for any other destination
        else {
          activities = [
            {
              time: '09:00 AM',
              title: tripData.interests.includes('nature') 
                ? `${tripData.destination.split(',')[0]} Nature Exploration` 
                : `${tripData.destination.split(',')[0]} City Tour`,
              description: 'Explore the beautiful surroundings',
              type: tripData.interests.includes('nature') ? 'Nature' : 'Culture',
              cost: 20
            },
            {
              time: '12:30 PM',
              title: tripData.interests.includes('food') 
                ? 'Local Food Tasting' 
                : 'Lunch at Restaurant',
              description: 'Enjoy delicious local cuisine',
              type: 'Food',
              cost: 25
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
              cost: tripData.interests.includes('adventure') ? 50 : 15
            },
            {
              time: '07:00 PM',
              title: tripData.interests.includes('nightlife') 
                ? 'Nightlife Tour'
                : 'Dinner and Relaxation',
              description: 'Unwind after a day of exploration',
              type: tripData.interests.includes('nightlife') ? 'Nightlife' : 'Relaxation',
              cost: tripData.interests.includes('nightlife') ? 40 : 30
            }
          ];
        }

        return {
          day: i + 1,
          activities
        };
      });
      
      // Calculate total trip cost
      const totalCost = mockItinerary.reduce((total, day) => {
        // Sum activity costs
        const activitiesCost = day.activities.reduce((sum, activity) => sum + (activity.cost || 0), 0);
        
        // Add accommodation cost 
        const accommodationCost = tripData.destination.toLowerCase().includes('bali') ? 40 : 
                              tripData.destination.toLowerCase().includes('paris') ? 120 : 
                              tripData.destination.toLowerCase().includes('tokyo') ? 100 : 
                              tripData.destination.toLowerCase().includes('new york') ? 150 : 80;
        
        // Add transportation cost
        const transportationCost = 20; // Generic daily transportation cost
        
        return total + activitiesCost + accommodationCost + transportationCost;
      }, 0);
      
      setTotalTripCost(totalCost);
      setItinerary(mockItinerary);
      setStep(6); // Move to results
      setShowAdditionalOptions(true); // Show additional recommendations
      toast.success("Your itinerary for " + tripData.destination + " has been generated!");
    } catch (error) {
      toast.error("Failed to generate itinerary. Please try again.");
      console.error("Error generating itinerary:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    loading,
    tripData,
    itinerary,
    suggestedBudget,
    totalTripCost,
    showAdditionalOptions,
    setStep,
    nextStep,
    prevStep,
    updateOrigin,
    updateDestination,
    updateStartDate,
    updateEndDate,
    updateBudgetType,
    updateBudget,
    updateInterests,
    updateTransportation,
    saveTrip,
    generateItinerary
  };
};

export default useTripPlanner;
