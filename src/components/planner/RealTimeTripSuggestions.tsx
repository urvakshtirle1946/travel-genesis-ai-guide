
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, AlertTriangle, Train, Bus, Timer, Zap, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';

interface TripSuggestion {
  id: string;
  mode: 'train' | 'bus';
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  route: string;
  platform?: string;
  status: 'on-time' | 'delayed' | 'cancelled';
  delayMinutes?: number;
  operator: string;
  transferCount: number;
  transferTime?: number;
}

interface RealTimeTripSuggestionsProps {
  origin: string;
  destination: string;
  onSelectOption: (option: any) => void;
}

const RealTimeTripSuggestions: React.FC<RealTimeTripSuggestionsProps> = ({
  origin,
  destination,
  onSelectOption
}) => {
  const [suggestions, setSuggestions] = useState<TripSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'train' | 'bus'>('all');
  const [sortBy, setSortBy] = useState<'departure' | 'price' | 'duration'>('departure');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM AM/PM
  const formatTimeString = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Get a formatted time string from a Date
  const getFormattedTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  // Calculate real-time data based on current time
  useEffect(() => {
    setLoading(true);
    
    // Get current hours and minutes for generating realistic departure times
    const now = currentTime;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Generate mock real-time data based on current time
    const generateMockData = () => {
      const mockData: TripSuggestion[] = [];
      
      // Create a set of departure times starting from the current time
      for (let i = 0; i < 10; i++) {
        const departureMinutesFromNow = Math.floor(Math.random() * 180) + 10;
        const departureTime = new Date(now.getTime() + departureMinutesFromNow * 60000);
        const departureHour = departureTime.getHours();
        const departureMinute = departureTime.getMinutes();
        
        const durationMinutes = Math.floor(Math.random() * 120) + 60;
        const arrivalTime = new Date(departureTime.getTime() + durationMinutes * 60000);
        const arrivalHour = arrivalTime.getHours();
        const arrivalMinute = arrivalTime.getMinutes();
        
        // Format times as strings (HH:MM)
        const departureTimeStr = `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`;
        const arrivalTimeStr = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;
        
        // Duration as HH:MM
        const durationHours = Math.floor(durationMinutes / 60);
        const durationMins = durationMinutes % 60;
        const durationStr = `${durationHours}h ${durationMins}m`;
        
        // Random status with bias towards on-time
        const statusRandom = Math.random();
        let status: 'on-time' | 'delayed' | 'cancelled' = 'on-time';
        let delayMinutes: number | undefined = undefined;
        
        if (statusRandom > 0.85) {
          status = 'delayed';
          delayMinutes = Math.floor(Math.random() * 30) + 10;
        } else if (statusRandom > 0.95) {
          status = 'cancelled';
        }
        
        // Transport mode
        const mode = Math.random() > 0.5 ? 'train' : 'bus';
        
        // Operators based on mode
        const trainOperators = ['Indian Railways', 'Express Rail', 'Metro Link', 'Rapid Rail'];
        const busOperators = ['KSRTC', 'State Express', 'Private Tours', 'City Connect'];
        
        const operator = mode === 'train' 
          ? trainOperators[Math.floor(Math.random() * trainOperators.length)]
          : busOperators[Math.floor(Math.random() * busOperators.length)];
        
        // Base price with some randomness, trains slightly more expensive than buses
        const basePrice = mode === 'train' ? 800 : 500;
        const priceVariation = (Math.random() * 0.4 + 0.8); // 80% to 120% of base price
        const price = Math.round(basePrice * priceVariation);
        
        // Transfer information
        const transferCount = Math.random() > 0.7 ? (Math.floor(Math.random() * 2) + 1) : 0;
        const transferTime = transferCount > 0 ? Math.floor(Math.random() * 30) + 15 : undefined;
        
        mockData.push({
          id: `trip-${i}`,
          mode,
          departureTime: departureTimeStr,
          arrivalTime: arrivalTimeStr,
          duration: durationStr,
          price,
          route: `${origin.split(',')[0]} to ${destination.split(',')[0]}${transferCount > 0 ? ` (${transferCount} transfer${transferCount > 1 ? 's' : ''})` : ''}`,
          platform: mode === 'train' ? `Platform ${Math.floor(Math.random() * 10) + 1}` : undefined,
          status,
          delayMinutes,
          operator,
          transferCount,
          transferTime
        });
      }
      
      return mockData;
    };
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const mockData = generateMockData();
      setSuggestions(mockData);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [currentTime, origin, destination]);

  // Filter and sort suggestions
  const filteredSuggestions = React.useMemo(() => {
    let filtered = [...suggestions];
    
    // Apply mode filter
    if (filter !== 'all') {
      filtered = filtered.filter(suggestion => suggestion.mode === filter);
    }
    
    // Apply sorting
    if (sortBy === 'departure') {
      filtered.sort((a, b) => {
        return a.departureTime.localeCompare(b.departureTime);
      });
    } else if (sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'duration') {
      filtered.sort((a, b) => {
        const durationA = a.duration.split('h ')[0];
        const durationB = b.duration.split('h ')[0];
        return parseInt(durationA) - parseInt(durationB);
      });
    }
    
    return filtered;
  }, [suggestions, filter, sortBy]);

  // Convert suggestion to transport option format for selection
  const convertToTransportOption = (suggestion: TripSuggestion) => {
    return {
      id: suggestion.id,
      type: suggestion.mode,
      name: `${suggestion.mode === 'train' ? 'Train' : 'Bus'} to ${destination.split(',')[0]}`,
      provider: suggestion.operator,
      price: suggestion.price,
      duration: suggestion.duration,
      departure: formatTimeString(suggestion.departureTime),
      arrival: formatTimeString(suggestion.arrivalTime),
      stops: suggestion.transferCount,
      icon: suggestion.mode === 'train' ? <Train className="h-5 w-5" /> : <Bus className="h-5 w-5" />
    };
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-travel-blue/5 to-travel-teal/5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-travel-navy flex items-center gap-2">
              <Clock className="h-5 w-5 text-travel-teal" />
              Real-Time Trip Suggestions
            </CardTitle>
            <CardDescription>
              Showing options based on current time: <span className="font-medium">{getFormattedTime(currentTime)}</span>
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-travel-teal/10 border-travel-teal/20 text-travel-teal">
            Live Updates
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Tabs defaultValue="all" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setFilter('all')}>All</TabsTrigger>
              <TabsTrigger value="train" onClick={() => setFilter('train')}>
                <Train className="mr-1 h-4 w-4" />
                Train
              </TabsTrigger>
              <TabsTrigger value="bus" onClick={() => setFilter('bus')}>
                <Bus className="mr-1 h-4 w-4" />
                Bus
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-500">Sort by:</span>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as any)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="departure">Departure Time</SelectItem>
                <SelectItem value="price">Lowest Price</SelectItem>
                <SelectItem value="duration">Shortest Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border-4 border-travel-teal/20 border-t-travel-teal animate-spin"></div>
              <p className="mt-4 text-travel-navy">Loading real-time suggestions...</p>
            </div>
          </div>
        ) : filteredSuggestions.length > 0 ? (
          <div className="space-y-4">
            {filteredSuggestions.map((suggestion, index) => (
              <motion.div 
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`rounded-lg border p-4 hover:border-travel-teal hover:bg-travel-teal/5 transition-all cursor-pointer ${suggestion.status === 'cancelled' ? 'bg-red-50 border-red-200' : ''}`}
                onClick={() => suggestion.status !== 'cancelled' && onSelectOption(convertToTransportOption(suggestion))}
              >
                <div className="flex justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full ${
                      suggestion.mode === 'train' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'bg-green-50 text-green-600'
                    }`}>
                      {suggestion.mode === 'train' ? (
                        <Train className="h-6 w-6" />
                      ) : (
                        <Bus className="h-6 w-6" />
                      )}
                    </div>
                    
                    <div>
                      <div className="font-medium text-travel-navy">{suggestion.route}</div>
                      <div className="text-sm text-gray-500">{suggestion.operator}</div>
                      
                      {suggestion.status === 'delayed' && (
                        <div className="mt-1 flex items-center text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Delayed by {suggestion.delayMinutes} minutes
                        </div>
                      )}
                      
                      {suggestion.status === 'cancelled' && (
                        <div className="mt-1 flex items-center text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Cancelled
                        </div>
                      )}
                      
                      {suggestion.transferCount > 0 && (
                        <div className="mt-1 text-xs text-gray-500">
                          {suggestion.transferCount} transfer{suggestion.transferCount > 1 ? 's' : ''} • {suggestion.transferTime} min wait time
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-travel-teal flex items-center justify-end">
                      <IndianRupee className="h-3 w-3" />
                      {suggestion.price}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center justify-end">
                      <Timer className="mr-1 h-3 w-3" />
                      {suggestion.duration}
                    </div>
                    {suggestion.platform && (
                      <div className="text-xs text-gray-500 mt-1">
                        {suggestion.platform}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 border-t border-gray-100 pt-3 flex justify-between items-center">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-sm text-gray-500">Departure</div>
                      <div className="font-medium">{formatTimeString(suggestion.departureTime)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Arrival</div>
                      <div className="font-medium">{formatTimeString(suggestion.arrivalTime)}</div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="border-travel-teal text-travel-teal"
                    disabled={suggestion.status === 'cancelled'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectOption(convertToTransportOption(suggestion));
                    }}
                  >
                    <Zap className="mr-1 h-4 w-4" />
                    Select
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Clock className="h-12 w-12 text-gray-300 mb-4" />
            <p>No {filter !== 'all' ? filter : ''} options available at this time.</p>
            <p className="mt-2">Try changing your filter or check back later.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeTripSuggestions;
