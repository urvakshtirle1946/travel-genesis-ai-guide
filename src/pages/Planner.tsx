
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIAssistant from '@/components/ai/AIAssistant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Clock,
  BadgeDollarSign,
  CheckIcon,
  Edit,
  Save,
} from 'lucide-react';
import { generateItinerary } from '@/lib/aiService';
import { toast } from 'sonner';
import { Stepper } from '@/components/ui/stepper';

// Define interests options
const interestOptions = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'culture', label: 'Culture & History' },
  { value: 'food', label: 'Food & Cuisine' },
  { value: 'nature', label: 'Nature' },
  { value: 'relaxation', label: 'Relaxation' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'nightlife', label: 'Nightlife' },
  { value: 'family', label: 'Family Activities' },
];

const Planner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState('');
  
  // Form state
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [budgetType, setBudgetType] = useState('fixed');
  const [budget, setBudget] = useState('medium');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const handleNextStep = () => {
    // Simple validation before moving to next step
    if (currentStep === 1) {
      if (!destination) {
        toast.error('Please enter a destination');
        return;
      }
      if (!startDate || !endDate) {
        toast.error('Please select travel dates');
        return;
      }
    } else if (currentStep === 2) {
      if (!budgetType) {
        toast.error('Please select a budget type');
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };
  
  const handleGenerateItinerary = async () => {
    if (selectedInterests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }
    
    setLoading(true);
    try {
      const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : '';
      const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : '';
      
      const response = await generateItinerary(
        destination,
        formattedStartDate,
        formattedEndDate,
        selectedInterests,
        budget
      );
      
      setItinerary(response);
      setCurrentStep(4); // Move to results step
      toast.success("Your itinerary has been created!");
    } catch (error) {
      console.error('Error generating itinerary:', error);
      toast.error('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveTrip = () => {
    toast.success("Trip saved successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-travel-sand/30 pt-20">
        <div className="container py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-travel-navy">
              AI Trip Planner
            </h1>
            <p className="text-gray-600 mb-8">
              Let our AI create a personalized travel itinerary based on your preferences
            </p>
            
            {/* Stepper component */}
            <div className="mb-8">
              <Stepper steps={4} currentStep={currentStep} />
            </div>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                {/* Step 1: Destination & Dates */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4 text-travel-navy">
                      Where and When?
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="destination">Destination</Label>
                        <Input
                          id="destination"
                          placeholder="City, Country or Region"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Start Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                {startDate ? (
                                  format(startDate, "PPP")
                                ) : (
                                  <span className="text-muted-foreground">Pick a start date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div>
                          <Label>End Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                                disabled={!startDate}
                              >
                                {endDate ? (
                                  format(endDate, "PPP")
                                ) : (
                                  <span className="text-muted-foreground">Pick an end date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                disabled={(date) => date < (startDate || new Date())}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button
                        onClick={handleNextStep}
                        className="bg-travel-blue hover:bg-travel-blue/90"
                      >
                        Next Step <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Budget */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4 text-travel-navy">
                      What's Your Budget?
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="budget-type" className="text-base font-medium mb-2 block">Budget Type</Label>
                        <RadioGroup value={budgetType} onValueChange={setBudgetType} className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="fixed" id="fixed" />
                            <Label htmlFor="fixed">Fixed Budget (Set a specific amount)</Label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="flexible" id="flexible" />
                            <Label htmlFor="flexible">Flexible Budget (Range-based)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <Label htmlFor="budget">Budget Level</Label>
                        <Select value={budget} onValueChange={setBudget}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select budget level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="budget">Budget-friendly</SelectItem>
                            <SelectItem value="medium">Mid-range</SelectItem>
                            <SelectItem value="luxury">Luxury</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <Card 
                        className={`border cursor-pointer transition-all ${
                          budget === 'budget' ? 'border-travel-blue bg-blue-50/50 shadow-sm' : 'border-gray-200'
                        }`}
                        onClick={() => setBudget('budget')}
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <BadgeDollarSign className="h-8 w-8 mb-2 text-gray-600" />
                          <h3 className="font-medium">Budget</h3>
                          <p className="text-sm text-gray-500">Hostels, public transit, budget eats</p>
                        </CardContent>
                      </Card>
                      
                      <Card 
                        className={`border cursor-pointer transition-all ${
                          budget === 'medium' ? 'border-travel-blue bg-blue-50/50 shadow-sm' : 'border-gray-200'
                        }`}
                        onClick={() => setBudget('medium')}
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <BadgeDollarSign className="h-8 w-8 mb-2 text-gray-600" />
                          <BadgeDollarSign className="h-8 w-8 -mt-6 text-gray-600" />
                          <h3 className="font-medium mt-2">Mid-range</h3>
                          <p className="text-sm text-gray-500">Hotels, occasional taxis, good restaurants</p>
                        </CardContent>
                      </Card>
                      
                      <Card 
                        className={`border cursor-pointer transition-all ${
                          budget === 'luxury' ? 'border-travel-blue bg-blue-50/50 shadow-sm' : 'border-gray-200'
                        }`}
                        onClick={() => setBudget('luxury')}
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="flex">
                            <BadgeDollarSign className="h-8 w-8 text-gray-600" />
                            <BadgeDollarSign className="h-8 w-8 -ml-4 text-gray-600" />
                            <BadgeDollarSign className="h-8 w-8 -ml-4 text-gray-600" />
                          </div>
                          <h3 className="font-medium mt-2">Luxury</h3>
                          <p className="text-sm text-gray-500">Upscale hotels, private transport, fine dining</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button
                        variant="outline"
                        onClick={handlePrevStep}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button
                        onClick={handleNextStep}
                        className="bg-travel-blue hover:bg-travel-blue/90"
                      >
                        Next Step <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Interests */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold mb-4 text-travel-navy">
                      What are your interests?
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Select the activities and experiences you're interested in (choose at least one)
                    </p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {interestOptions.map((interest) => (
                        <div
                          key={interest.value}
                          className={`border rounded-md p-3 cursor-pointer transition-all ${
                            selectedInterests.includes(interest.value)
                              ? 'bg-travel-teal/10 border-travel-teal text-travel-teal'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => toggleInterest(interest.value)}
                        >
                          <div className="flex items-center justify-center flex-col text-center">
                            <div className="mb-2">
                              {selectedInterests.includes(interest.value) && (
                                <CheckIcon className="h-5 w-5" />
                              )}
                            </div>
                            <span className="font-medium">{interest.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button
                        variant="outline"
                        onClick={handlePrevStep}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <Button
                        onClick={handleGenerateItinerary}
                        className="bg-travel-blue hover:bg-travel-blue/90"
                        disabled={loading || selectedInterests.length === 0}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Crafting your journey...
                          </>
                        ) : (
                          <>Generate Itinerary</>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Step 4: Results */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-travel-navy">
                        Your Personalized Itinerary
                      </h2>
                      
                      <Tabs defaultValue="itinerary">
                        <TabsList>
                          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                          <TabsTrigger value="map">Map</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <TabsContent value="itinerary" className="m-0">
                        <div className="bg-white rounded-md">
                          <div className="flex items-center justify-between mb-4 p-4">
                            <div>
                              <h3 className="font-bold text-lg text-travel-navy">
                                {destination} Trip
                              </h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>
                                  {startDate && endDate && `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`}
                                </span>
                              </div>
                            </div>
                            
                            <Button variant="outline" size="sm" onClick={saveTrip}>
                              <Save className="h-4 w-4 mr-2" />
                              Save Itinerary
                            </Button>
                          </div>
                          
                          {/* Timeline itinerary view */}
                          <div className="prose max-w-none p-4">
                            {itinerary ? (
                              <div className="space-y-6">
                                {/* This would be replaced with a proper timeline component */}
                                {Array.from({ length: 3 }).map((_, index) => (
                                  <div key={index} className="border-l-2 border-travel-teal pl-4 pb-6 relative">
                                    <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-travel-teal"></div>
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-lg font-bold mb-2 text-travel-navy">Day {index + 1}</h4>
                                      <Button variant="ghost" size="sm">
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <p className="text-sm text-gray-700">
                                      {index === 0 ? "Morning: Explore the historic old town and visit local museums." : 
                                       index === 1 ? "Morning: Take a scenic hike in the nearby mountains." : 
                                                   "Morning: Relax at the beach and enjoy water activities."}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                      {index === 0 ? "Afternoon: Enjoy local cuisine at popular restaurants." : 
                                       index === 1 ? "Afternoon: Visit the famous marketplace for shopping." : 
                                                   "Afternoon: Take a boat tour around the coastline."}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                      {index === 0 ? "Evening: Attend a cultural show or local entertainment." : 
                                       index === 1 ? "Evening: Fine dining experience at a top-rated restaurant." : 
                                                   "Evening: Beach bonfire and stargazing."}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                                {itinerary || "Generating your itinerary..."}
                              </pre>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="map" className="m-0">
                        <div className="flex items-center justify-center py-16 bg-gray-50 rounded-md">
                          <p className="text-gray-500">
                            Map view coming soon...
                          </p>
                        </div>
                      </TabsContent>
                    </div>
                    
                    <div className="pt-4 flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                      >
                        Plan Another Trip
                      </Button>
                      <Button className="bg-travel-teal hover:bg-travel-teal/90" onClick={() => toast.success("Itinerary shared successfully!")}>
                        Share Itinerary
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Planner;
