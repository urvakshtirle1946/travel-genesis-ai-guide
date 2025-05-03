
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BadgeIndianRupee, 
  Clock, 
  MapPin, 
  Calendar,
  AlarmClock,
  AlertTriangle,
  CircleDollarSign,
  Bus,
  Train,
  TrainFront,
  Cab,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { TransportOption } from '@/types/planner';
import { format } from 'date-fns';
import { generateLiveTransportOptions } from '@/services/liveTransport';

interface RealTimeTripSuggestionsProps {
  origin: string;
  destination: string;
  onSelectOption: (option: TransportOption) => void;
}

const RealTimeTripSuggestions: React.FC<RealTimeTripSuggestionsProps> = ({
  origin,
  destination,
  onSelectOption
}) => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<TransportOption[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filterType, setFilterType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'departure' | 'price' | 'duration'>('departure');

  // Fetch real-time transport options
  useEffect(() => {
    const fetchTransportOptions = async () => {
      setLoading(true);
      try {
        // In a real application, this would call an API
        const options = await generateLiveTransportOptions(origin, destination);
        setOptions(options);
      } catch (error) {
        console.error("Error fetching transport options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransportOptions();

    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [origin, destination]);

  // Apply filters and sorting
  const filteredOptions = options
    .filter(option => !filterType || option.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return parseDuration(a.duration) - parseDuration(b.duration);
        case 'departure':
        default:
          return parseTime(a.departure) - parseTime(b.departure);
      }
    });

  // Helper function to parse duration string like "2h 15m" into minutes
  const parseDuration = (duration: string): number => {
    const hours = duration.match(/(\d+)h/);
    const minutes = duration.match(/(\d+)m/);
    return (hours ? parseInt(hours[1]) * 60 : 0) + (minutes ? parseInt(minutes[1]) : 0);
  };

  // Helper function to parse time string like "10:30 AM" into minutes since midnight
  const parseTime = (timeStr: string): number => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    return hours * 60 + minutes;
  };

  // Card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-lg text-travel-navy flex items-center gap-2">
            <AlarmClock className="h-5 w-5 text-travel-teal" />
            <span>Departing Now</span>
            <Badge className="ml-2 bg-travel-blue/20 text-travel-blue hover:bg-travel-blue/30">
              {format(currentTime, 'h:mm a')}
            </Badge>
          </h3>
          <p className="text-sm text-gray-500">
            Live transport options from {origin.split(',')[0]} to {destination.split(',')[0]}
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Transport Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setFilterType(null)}>
                  <span>All Types</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType('train')}>
                  <TrainFront className="mr-2 h-4 w-4" />
                  <span>Train</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType('bus')}>
                  <Bus className="mr-2 h-4 w-4" />
                  <span>Bus</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType('cab')}>
                  <Cab className="mr-2 h-4 w-4" />
                  <span>Cab</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <ArrowUpDown className="h-4 w-4" />
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setSortBy('departure')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Departure Time</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price')}>
                  <CircleDollarSign className="mr-2 h-4 w-4" />
                  <span>Price</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('duration')}>
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Duration</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="flex justify-between">
                  <Skeleton className="h-10 w-1/3" />
                  <Skeleton className="h-10 w-1/4" />
                </div>
                <div className="mt-3 flex justify-between">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-10 w-1/4" />
                </div>
              </div>
            ))
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <motion.div
                key={option.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-travel-blue/10 rounded-full">
                        {option.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{option.name}</h4>
                        <p className="text-sm text-gray-600">{option.provider}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-travel-teal flex items-center justify-end gap-1">
                        <BadgeIndianRupee className="h-4 w-4" />
                        {option.price.toLocaleString('en-IN')}
                        {option.livePrice && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge className="ml-1 bg-green-100 text-green-800 text-xs">Live</Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Live pricing based on current demand</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{option.duration}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex-1">
                      <div className="relative flex justify-between text-sm">
                        <div className="w-full h-[1px] bg-gray-300 absolute top-4"></div>
                        
                        <div className="bg-white pr-3 z-10">
                          <div className="font-medium">{option.departure}</div>
                          <div className="text-xs text-gray-500">{origin.split(',')[0]}</div>
                        </div>
                        
                        <div className="bg-white px-3 z-10 flex flex-col items-center">
                          {option.stops > 0 ? (
                            <Badge className="bg-amber-100 text-amber-800 border-0 mb-1">
                              {option.stops} {option.stops === 1 ? 'stop' : 'stops'}
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800 border-0 mb-1">Direct</Badge>
                          )}
                        </div>
                        
                        <div className="bg-white pl-3 z-10 text-right">
                          <div className="font-medium">{option.arrival}</div>
                          <div className="text-xs text-gray-500">{destination.split(',')[0]}</div>
                        </div>
                      </div>
                      
                      {option.status && option.status !== 'on-time' && (
                        <div className="mt-2">
                          {option.status === 'delayed' ? (
                            <div className="flex items-center text-amber-600 text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              <span>Delayed by {option.delayMinutes} minutes</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600 text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              <span>Cancelled</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {option.distance && (
                        <div className="mt-1 flex items-center text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {option.distance}
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4">
                      <Button 
                        onClick={() => onSelectOption(option)}
                        className="bg-travel-teal hover:bg-travel-teal/90"
                        disabled={option.status === 'cancelled'}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-2 border-t flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {option.rating && (
                      <div className="flex items-center">
                        <Badge className="bg-blue-100 text-blue-800 border-0">
                          {option.rating.toFixed(1)} ★
                        </Badge>
                        {option.reviews && (
                          <span className="text-xs text-gray-500 ml-1">({option.reviews})</span>
                        )}
                      </div>
                    )}
                    
                    {option.availability && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge 
                              className={
                                option.availability === 'available' ? 'bg-green-100 text-green-800 border-0' :
                                option.availability === 'limited' ? 'bg-amber-100 text-amber-800 border-0' :
                                'bg-red-100 text-red-800 border-0'
                              }
                            >
                              {option.availability === 'available' ? 'Available' : 
                               option.availability === 'limited' ? 'Limited Seats' : 'Almost Full'}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Current seat availability status</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  
                  {option.type === 'cab' && (
                    <Badge className="bg-green-100 text-green-800 border-0">Book Instantly</Badge>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="text-center py-10"
            >
              <p className="text-gray-500">No transport options available right now.</p>
              <p className="text-gray-500 mt-1">Try adjusting your filters or check back later.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RealTimeTripSuggestions;
