
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Stepper } from '@/components/ui/stepper';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

type TripData = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  budgetType: 'fixed' | 'flexible';
  interests: string[];
};

type ItineraryDay = {
  day: number;
  activities: {
    time: string;
    title: string;
    description: string;
    type: string;
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

const Planner = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tripData, setTripData] = useState<TripData>({
    startDate: undefined,
    endDate: undefined,
    budgetType: 'fixed',
    interests: [],
  });
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);

  const nextStep = () => {
    if (step === 1 && (!tripData.startDate || !tripData.endDate)) {
      toast.error("Please select both start and end dates");
      return;
    }
    
    if (step === 3 && tripData.interests.length === 0) {
      toast.error("Please select at least one interest");
      return;
    }

    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
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

    setLoading(true);
    try {
      // In a real app, we'd make an API call here
      // await fetch('/api/generateItinerary', {
      //   method: 'POST',
      //   body: JSON.stringify(tripData),
      // });
      
      // For demo, let's create a mock itinerary after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const dayCount = tripData.endDate && tripData.startDate 
        ? Math.ceil((tripData.endDate.getTime() - tripData.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
        : 3;
      
      const mockItinerary: ItineraryDay[] = Array.from({ length: dayCount }, (_, i) => ({
        day: i + 1,
        activities: [
          {
            time: '09:00 AM',
            title: tripData.interests.includes('nature') 
              ? 'Hiking at National Park' 
              : 'City Tour',
            description: 'Explore the beautiful surroundings',
            type: tripData.interests.includes('nature') ? 'Nature' : 'Culture'
          },
          {
            time: '12:30 PM',
            title: tripData.interests.includes('food') 
              ? 'Local Food Tasting' 
              : 'Lunch at Restaurant',
            description: 'Enjoy delicious local cuisine',
            type: 'Food'
          },
          {
            time: '03:00 PM',
            title: tripData.interests.includes('culture') 
              ? 'Museum Visit'
              : tripData.interests.includes('adventure')
                ? 'Water Sports'
                : 'Shopping',
            description: 'Immerse yourself in the local experience',
            type: tripData.interests.includes('culture') 
              ? 'Culture' 
              : tripData.interests.includes('adventure')
                ? 'Adventure'
                : 'Shopping'
          },
          {
            time: '07:00 PM',
            title: tripData.interests.includes('nightlife') 
              ? 'Nightlife Tour'
              : 'Dinner and Relaxation',
            description: 'Unwind after a day of exploration',
            type: tripData.interests.includes('nightlife') ? 'Nightlife' : 'Relaxation'
          }
        ]
      }));
      
      setItinerary(mockItinerary);
      setStep(5); // Move to results
      toast.success("Your itinerary has been generated!");
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
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-travel-navy">Choose Your Budget Type</h2>
            
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
          </div>
        );
        
      case 3:
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
        
      case 4:
        return (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold text-travel-navy">Ready to Create Your Trip?</h2>
            <p className="text-gray-600 mb-4">We'll craft a personalized itinerary based on your selections:</p>
            
            <div className="bg-gray-50 p-4 rounded-md text-left space-y-3">
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
        
      case 5:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-travel-navy">Your Custom Itinerary</h2>
              <Button onClick={saveTrip} className="bg-travel-teal hover:bg-travel-teal/90">
                Save Trip
              </Button>
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
                          <span className="text-xs bg-travel-teal/10 text-travel-teal px-2 py-1 rounded-full">
                            {activity.type}
                          </span>
                        </div>
                        <h4 className="font-semibold mt-1">{activity.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                      </div>
                    ))}
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-travel-navy">
            Plan Your Perfect Trip
          </h1>
          
          {step < 5 && (
            <div className="mb-10">
              <Stepper steps={4} currentStep={step} className="mb-8" />
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
                <h3 className="text-xl font-medium text-travel-navy">Crafting your journey...</h3>
                <p className="text-gray-500 mt-2">This might take a moment</p>
              </motion.div>
            </div>
          ) : (
            <>
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                {renderStep()}
              </div>
              
              {step < 5 && (
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
                    {step === 4 ? 'Generate Itinerary' : 'Next'}
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
