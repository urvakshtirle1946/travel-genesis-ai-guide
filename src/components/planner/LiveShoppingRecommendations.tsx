
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BadgeIndianRupee, 
  Clock, 
  MapPin, 
  ShoppingBag,
  Store,
  Filter, 
  ArrowUpDown,
  Percent,
  Tag
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
import { ShoppingOption } from '@/types/planner';
import { format } from 'date-fns';

interface LiveShoppingRecommendationsProps {
  destination: string;
}

const LiveShoppingRecommendations: React.FC<LiveShoppingRecommendationsProps> = ({ destination }) => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<ShoppingOption[]>([]);
  const [sortBy, setSortBy] = useState<'hoursLeft' | 'priceRange' | 'distance'>('hoursLeft');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [currentTime] = useState(new Date());

  useEffect(() => {
    const fetchShoppingOptions = async () => {
      setLoading(true);
      try {
        // In a real application, this would call an API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock shopping data
        const mockOptions: ShoppingOption[] = [
          {
            id: 'shop-1',
            name: 'Phoenix Mall',
            type: 'mall',
            priceRange: {
              min: 500,
              max: 5000
            },
            address: `Whitefield, ${destination.split(',')[0]}`,
            distance: '3.4 km',
            closingTime: '10:00 PM',
            hoursLeft: 5,
            crowdedness: 'medium',
            offers: ['20% off on selected brands', 'Buy 1 Get 1 on food court'],
            categories: ['Fashion', 'Electronics', 'Food', 'Entertainment']
          },
          {
            id: 'shop-2',
            name: 'Commercial Street',
            type: 'street',
            priceRange: {
              min: 200,
              max: 3000
            },
            address: `Central Bangalore, ${destination.split(',')[0]}`,
            distance: '2.1 km',
            closingTime: '9:00 PM',
            hoursLeft: 4,
            crowdedness: 'high',
            categories: ['Fashion', 'Jewelry', 'Accessories', 'Traditional']
          },
          {
            id: 'shop-3',
            name: 'Garuda Mall',
            type: 'mall',
            priceRange: {
              min: 400,
              max: 4000
            },
            address: `Magrath Road, ${destination.split(',')[0]}`,
            distance: '1.8 km',
            closingTime: '11:00 PM',
            hoursLeft: 6,
            crowdedness: 'low',
            offers: ['End of season sale - Up to 50% off'],
            categories: ['Fashion', 'Electronics', 'Food']
          },
          {
            id: 'shop-4',
            name: 'Jayanagar 4th Block',
            type: 'market',
            priceRange: {
              min: 100,
              max: 2000
            },
            address: `Jayanagar, ${destination.split(',')[0]}`,
            distance: '5.6 km',
            closingTime: '8:30 PM',
            hoursLeft: 3.5,
            crowdedness: 'medium',
            categories: ['Traditional', 'Food', 'Household']
          },
          {
            id: 'shop-5',
            name: 'The Collective',
            type: 'boutique',
            priceRange: {
              min: 2000,
              max: 20000
            },
            address: `Vittal Mallya Road, ${destination.split(',')[0]}`,
            distance: '2.9 km',
            closingTime: '9:00 PM',
            hoursLeft: 4,
            crowdedness: 'low',
            offers: ['New collection launch'],
            categories: ['Luxury', 'Designer', 'Fashion']
          }
        ];
        
        setOptions(mockOptions);
      } catch (error) {
        console.error("Error fetching shopping options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShoppingOptions();
  }, [destination]);

  // Apply filters and sorting
  const filteredOptions = options
    .filter(option => !filterType || option.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'hoursLeft':
          return a.hoursLeft - b.hoursLeft;
        case 'priceRange':
          return a.priceRange.min - b.priceRange.min;
        case 'distance':
          return parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0]);
        default:
          return 0;
      }
    });

  // Card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Get icon based on shopping type
  const getShoppingIcon = (type: string) => {
    switch (type) {
      case 'mall':
        return <Store className="h-5 w-5 text-blue-600" />;
      case 'boutique':
        return <ShoppingBag className="h-5 w-5 text-purple-600" />;
      case 'street':
      case 'market':
      default:
        return <ShoppingBag className="h-5 w-5 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-lg text-travel-navy flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-travel-teal" />
            <span>Shopping in {destination.split(',')[0]}</span>
            <Badge className="ml-2 bg-travel-blue/20 text-travel-blue hover:bg-travel-blue/30">
              {format(currentTime, 'h:mm a')}
            </Badge>
          </h3>
          <p className="text-sm text-gray-500">
            Shopping places open now
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Type</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Shopping Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setFilterType(null)}>
                  <span>All Types</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType('mall')}>
                  <Store className="mr-2 h-4 w-4" />
                  <span>Malls</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType('market')}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>Markets</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType('street')}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>Street Shopping</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType('boutique')}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>Boutiques</span>
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
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setSortBy('hoursLeft')}>
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Closing Soon</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('priceRange')}>
                  <BadgeIndianRupee className="mr-2 h-4 w-4" />
                  <span>Price (Low to High)</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('distance')}>
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Distance</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border shadow-sm">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-between mt-2">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-10 w-1/4" />
                  </div>
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
                        {getShoppingIcon(option.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{option.name}</h4>
                        <Badge className="bg-gray-100 text-gray-800 border-0 capitalize">
                          {option.type}
                        </Badge>
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge 
                            className={
                              option.hoursLeft > 4 ? 'bg-green-100 text-green-800 border-0' :
                              option.hoursLeft > 2 ? 'bg-amber-100 text-amber-800 border-0' :
                              'bg-red-100 text-red-800 border-0'
                            }
                          >
                            {option.hoursLeft > 0 
                              ? `${option.hoursLeft} ${option.hoursLeft === 1 ? 'hour' : 'hours'} left` 
                              : 'Closing soon'}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Closing at {option.closingTime}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    {option.address} • {option.distance}
                  </div>
                  
                  <div className="mt-3 flex items-center">
                    <div className="font-medium text-travel-navy flex items-center gap-1">
                      <BadgeIndianRupee className="h-4 w-4" />
                      {option.priceRange.min.toLocaleString('en-IN')} - {option.priceRange.max.toLocaleString('en-IN')}
                    </div>
                    <span className="mx-2 text-gray-400">•</span>
                    <Badge 
                      className={
                        option.crowdedness === 'low' ? 'bg-green-100 text-green-800 border-0' :
                        option.crowdedness === 'medium' ? 'bg-amber-100 text-amber-800 border-0' :
                        'bg-red-100 text-red-800 border-0'
                      }
                    >
                      {option.crowdedness === 'low' ? 'Not Crowded' : 
                       option.crowdedness === 'medium' ? 'Moderately Busy' : 
                       'Very Crowded'}
                    </Badge>
                  </div>
                  
                  {option.offers && option.offers.length > 0 && (
                    <div className="mt-3">
                      {option.offers.map((offer, i) => (
                        <div key={i} className="flex items-center text-sm text-green-600 mt-1">
                          <Percent className="h-3 w-3 mr-1" />
                          <span>{offer}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {option.categories.map((category, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-50 flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        <span>{category}</span>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Open until {option.closingTime}</span>
                    </div>
                    
                    <Button className="bg-travel-teal hover:bg-travel-teal/90">
                      Directions
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="col-span-full text-center py-10"
            >
              <p className="text-gray-500">No shopping options match your filters.</p>
              <p className="text-gray-500 mt-1">Try adjusting your filters or check back later.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveShoppingRecommendations;
