
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Loader, MapPin, Search, BadgeDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

type TripData = {
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  budgetType: 'fixed' | 'flexible';
  budget: number;
  interests: string[];
};

type ItineraryDay = {
  day: number;
  activities: {
    time: string;
    title: string;
    description: string;
    type: string;
    cost?: number;
  }[];
};

const interests = [
  { id: 'adventure', label: 'Adventure' },
  { id: 'nature', label: 'Nature' },
  { id: 'culture', label: 'Culture' },
  { id: 'food', label: 'Food & Dining' },
  { id: 'relaxation', label: 'Relaxation' },
  { id: 'history', label: 'History' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'nightlife', label: 'Nightlife' },
];

// Sample destinations for autocomplete
const popularDestinations = [
  'Bali, Indonesia',
  'Paris, France',
  'Tokyo, Japan',
  'New York, USA',
  'Rome, Italy',
  'Santorini, Greece',
  'Bangkok, Thailand',
  'London, UK',
  'Sydney, Australia',
  'Dubai, UAE'
];

// Budget ranges by destination (approximate daily costs in USD)
const destinationBudgetRanges: Record<string, { min: number; max: number; average: number }> = {
  'Bali': { min: 30, max: 200, average: 70 },
  'Paris': { min: 80, max: 400, average: 150 },
  'Tokyo': { min: 70, max: 350, average: 120 },
  'New York': { min: 100, max: 500, average: 200 },
  'Rome': { min: 70, max: 300, average: 120 },
  'Santorini': { min: 90, max: 400, average: 150 },
  'Bangkok': { min: 30, max: 150, average: 60 },
  'London': { min: 90, max: 400, average: 170 },
  'Sydney': { min: 80, max: 350, average: 130 },
  'Dubai': { min: 100, max: 500, average: 200 }
};

const Planner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tripData, setTripData] = useState<TripData>({
    destination: '',
    startDate: undefined,
    endDate: undefined,
    budgetType: 'fixed',
    budget: 100,
    interests: [],
  });
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>([]);
  const [showDestinations, setShowDestinations] = useState(false);
  const [suggestedBudget, setSuggestedBudget] = useState({ min: 50, max: 300, average: 100 });
  const [totalTripCost, setTotalTripCost] = useState(0);

  // Check for query parameters when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryDestination = params.get('destination');
    
    if (queryDestination) {
      setTripData(prev => ({
        ...prev,
        destination: decodeURIComponent(queryDestination)
      }));

      // Update the suggested budget based on destination
      updateSuggestedBudget(decodeURIComponent(queryDestination));
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

  const handleDestinationChange = (value: string) => {
    setTripData({
      ...tripData,
      destination: value
    });

    if (value.length > 1) {
      const filtered = popularDestinations.filter(dest => 
        dest.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDestinations(filtered);
      setShowDestinations(true);
      
      // Update suggested budget when destination changes
      updateSuggestedBudget(value);
    } else {
      setShowDestinations(false);
    }
  };

  const selectDestination = (destination: string) => {
    setTripData({
      ...tripData,
      destination
    });
    setShowDestinations(false);
    
    // Update suggested budget when destination is selected
    updateSuggestedBudget(destination);
  };

  const nextStep = () => {
    if (step === 1 && !tripData.destination.trim()) {
      toast.error("Please enter a destination");
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

  const handleBudgetChange = (value: string) => {
    setTripData({
      ...tripData,
      budgetType: value as 'fixed' | 'flexible',
    });
  };

  const handleBudgetSliderChange = (value: number[]) => {
    setTripData({
      ...tripData,
      budget: value[0]
    });
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
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

  const generateItinerary = async () => {
    if (!user) {
      toast.error("Please sign in to generate an itinerary");
      return;
    }

    if (!tripData.destination) {
      toast.error("Please select a destination");
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
        let dailyBudget = tripData.budget; // Daily budget in dollars
        
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

        // Calculate daily costs and adjust activities based on budget
        let dailyCost = activities.reduce((sum, act) => sum + (act.cost || 0), 0);
        
        // Add accommodation cost (very roughly estimated)
        const accommodationCost = destination.includes('bali') ? 40 : 
                                  destination.includes('paris') ? 120 : 
                                  destination.includes('tokyo') ? 100 : 
                                  destination.includes('new york') ? 150 : 80;
        
        dailyCost += accommodationCost;
        
        // Add transportation cost
        const transportationCost = 20; // Generic daily transportation cost
        dailyCost += transportationCost;
        
        // Calculate total trip cost
        setTotalTripCost(prevTotal => prevTotal + dailyCost);
        
        return {
          day: i + 1,
          activities
        };
      });
      
      setItinerary(mockItinerary);
      setStep(6); // Move to results
      toast.success("Your itinerary for " + tripData.destination + " has been generated!");
    } catch (error) {
      toast.error("Failed to generate itinerary. Please try again.");
      console.error("Error generating itinerary:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveTrip = async () => {
    if (!user) {
      toast.error("Please sign in to save your trip");
      return;
    }

    toast.success("Trip saved successfully!");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-travel-navy">Where would you like to go?</h2>
            
            <div className="relative">
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-travel-teal/50 focus-within:border-travel-teal">
                <MapPin className="ml-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter a destination (e.g. Bali, Paris, Tokyo...)"
                  value={tripData.destination}
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
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-travel-navy">Select Your Travel Dates</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !tripData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tripData.startDate ? format(tripData.startDate, "PPP") : <span>Pick a start date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={tripData.startDate}
                      onSelect={(date) => setTripData({ ...tripData, startDate: date })}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !tripData.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tripData.endDate ? format(tripData.endDate, "PPP") : <span>Pick an end date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={tripData.endDate}
                      onSelect={(date) => setTripData({ ...tripData, endDate: date })}
                      disabled={(date) => 
                        tripData.startDate ? date < tripData.startDate : false
                      }
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-travel-navy">Choose Your Budget</h2>
            <p className="text-gray-600 mb-4">
              Set your daily budget for {tripData.destination.split(',')[0]}
            </p>
            
            <div className="space-y-8">
              <RadioGroup 
                value={tripData.budgetType} 
                onValueChange={handleBudgetChange}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <Label htmlFor="fixed" className="flex-1 cursor-pointer">
                    <div className="font-medium">Fixed Budget</div>
                    <div className="text-sm text-gray-500">I have a specific budget that I want to stick to</div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value="flexible" id="flexible" />
                  <Label htmlFor="flexible" className="flex-1 cursor-pointer">
                    <div className="font-medium">Flexible Budget</div>
                    <div className="text-sm text-gray-500">I'm open to different price ranges based on experiences</div>
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label htmlFor="budget" className="font-medium">Daily Budget</Label>
                  <div className="bg-travel-teal/10 text-travel-teal px-3 py-1 rounded-full font-medium">
                    ${tripData.budget}/day
                  </div>
                </div>

                <Slider
                  id="budget"
                  min={suggestedBudget.min}
                  max={suggestedBudget.max}
                  step={10}
                  value={[tripData.budget]}
                  onValueChange={handleBudgetSliderChange}
                  className="my-4"
                />

                <div className="flex justify-between text-sm text-gray-500">
                  <div>Budget ({tripData.destination.split(',')[0]})</div>
                  <div className="flex space-x-4">
                    <span>Min: ${suggestedBudget.min}</span>
                    <span>Avg: ${suggestedBudget.average}</span>
                    <span>Max: ${suggestedBudget.max}</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-start space-x-3">
                    <BadgeDollarSign className="h-5 w-5 text-travel-teal mt-0.5" />
                    <div>
                      <h4 className="font-medium text-travel-navy">Budget Tip</h4>
                      <p className="text-sm text-gray-600">
                        The average daily cost in {tripData.destination.split(',')[0]} is around ${suggestedBudget.average}, 
                        including accommodation, meals, and attractions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-travel-navy">Select Your Travel Interests</h2>
            <p className="text-gray-600">Choose at least one interest to personalize your trip</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {interests.map((interest) => (
                <div key={interest.id} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                  <Checkbox 
                    id={interest.id} 
                    checked={tripData.interests.includes(interest.id)}
                    onCheckedChange={(checked) => 
                      handleInterestChange(interest.id, checked === true)
                    }
                  />
                  <Label htmlFor={interest.id} className="flex-1 cursor-pointer">
                    {interest.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold text-travel-navy">Ready to Create Your Trip?</h2>
            <p className="text-gray-600 mb-4">We'll craft a personalized itinerary based on your selections:</p>
            
            <div className="bg-gray-50 p-4 rounded-md text-left space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Destination:</span>
                <span>{tripData.destination || "Not specified"}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Travel Dates:</span>
                <span>
                  {tripData.startDate && tripData.endDate
                    ? `${format(tripData.startDate, "MMM d")} - ${format(tripData.endDate, "MMM d, yyyy")}`
                    : "Not specified"}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Budget Type:</span>
                <span className="capitalize">{tripData.budgetType}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Daily Budget:</span>
                <span>${tripData.budget}/day</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Interests:</span>
                <span>
                  {tripData.interests.length > 0
                    ? tripData.interests.map(id => 
                        interests.find(interest => interest.id === id)?.label
                      ).join(", ")
                    : "None selected"}
                </span>
              </div>
            </div>
            
            <p className="text-gray-500 italic">Click "Generate Itinerary" to proceed</p>
          </div>
        );
        
      case 6:
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-travel-navy">Your {tripData.destination} Itinerary</h2>
                {tripData.startDate && tripData.endDate && (
                  <p className="text-gray-500">
                    {format(tripData.startDate, "MMM d")} - {format(tripData.endDate, "MMM d, yyyy")}
                  </p>
                )}
              </div>
              <Button onClick={saveTrip} className="bg-travel-teal hover:bg-travel-teal/90">
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
            
            <div className="space-y-8 mt-6">
              {itinerary.map((day) => (
                <div key={day.day} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
                  <div className="bg-travel-blue text-white p-4">
                    <h3 className="text-xl font-medium">Day {day.day}</h3>
                    {tripData.startDate && (
                      <p className="text-sm opacity-90">
                        {format(
                          new Date(tripData.startDate.getTime() + (day.day - 1) * 24 * 60 * 60 * 1000), 
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
                          {tripData.destination.toLowerCase().includes('bali') ? '40' : 
                           tripData.destination.toLowerCase().includes('paris') ? '120' : 
                           tripData.destination.toLowerCase().includes('tokyo') ? '100' : 
                           tripData.destination.toLowerCase().includes('new york') ? '150' : '80'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {tripData.destination.toLowerCase().includes('bali') ? 'Standard Villa' : 
                         tripData.destination.toLowerCase().includes('paris') ? 'Boutique Hotel' : 
                         tripData.destination.toLowerCase().includes('tokyo') ? 'Business Hotel' : 
                         tripData.destination.toLowerCase().includes('new york') ? 'Manhattan Hotel' : 'Standard Hotel'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-travel-navy">
            Plan Your Perfect Trip
          </h1>
          
          {step < 6 && (
            <div className="mb-10">
              <Stepper steps={5} currentStep={step} className="mb-8" />
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex flex-col items-center"
              >
                <Loader className="h-16 w-16 text-travel-teal animate-spin mb-4" />
                <h3 className="text-xl font-medium text-travel-navy">Creating your {tripData.destination} itinerary...</h3>
                <p className="text-gray-500 mt-2">This might take a moment</p>
              </motion.div>
            </div>
          ) : (
            <>
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                {renderStep()}
              </div>
              
              {step < 6 && (
                <div className="flex justify-between mt-6">
                  {step > 1 ? (
                    <Button variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button 
                    onClick={nextStep} 
                    className="bg-travel-blue hover:bg-travel-blue/90"
                  >
                    {step === 5 ? 'Generate Itinerary' : 'Next'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Planner;
