
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BadgeIndianRupee, 
  Clock, 
  MapPin, 
  Star, 
  Utensils,
  Filter, 
  ArrowUpDown,
  Percent,
  ChevronDown
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
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';
import { FoodOption } from '@/types/planner';

interface LiveFoodRecommendationsProps {
  destination: string;
}

const LiveFoodRecommendations: React.FC<LiveFoodRecommendationsProps> = ({ destination }) => {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<FoodOption[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'distance'>('rating');
  const [filterCuisine, setFilterCuisine] = useState<string | null>(null);
  const [currentTime] = useState(new Date());

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        // In a real application, this would call an API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock restaurant data
        const mockRestaurants: FoodOption[] = [
          {
            id: 'rest-1',
            name: 'Kamat Hotel',
            cuisine: ['South Indian', 'North Indian'],
            priceForTwo: 350,
            address: `Jayanagar, ${destination.split(',')[0]}`,
            distance: '850 m',
            rating: 4.3,
            reviews: 1248,
            closingTime: '11:00 PM',
            availability: 'high',
            offers: ['20% off on bill value above ₹500'],
            bestDishes: ['Masala Dosa', 'Filter Coffee', 'Bisi Bele Bath']
          },
          {
            id: 'rest-2',
            name: 'Punjab Grill',
            cuisine: ['North Indian', 'Mughlai'],
            priceForTwo: 1200,
            address: `MG Road, ${destination.split(',')[0]}`,
            distance: '1.5 km',
            rating: 4.5,
            reviews: 867,
            closingTime: '11:30 PM',
            availability: 'medium',
            bestDishes: ['Butter Chicken', 'Naan', 'Dal Makhani']
          },
          {
            id: 'rest-3',
            name: 'Mainland China',
            cuisine: ['Chinese', 'Asian'],
            priceForTwo: 1500,
            address: `Indiranagar, ${destination.split(',')[0]}`,
            distance: '3.2 km',
            rating: 4.2,
            reviews: 1022,
            closingTime: '10:30 PM',
            availability: 'low',
            offers: ['15% off on HDFC Bank cards'],
            bestDishes: ['Dim Sum', 'Kung Pao Chicken', 'Shanghai Noodles']
          },
          {
            id: 'rest-4',
            name: 'Toit Brewpub',
            cuisine: ['Continental', 'Italian', 'Pub Food'],
            priceForTwo: 1600,
            address: `Indiranagar, ${destination.split(',')[0]}`,
            distance: '3.5 km',
            rating: 4.6,
            reviews: 3245,
            closingTime: '11:30 PM',
            availability: 'low',
            bestDishes: ['Craft Beer', 'Pizzas', 'Burgers']
          },
          {
            id: 'rest-5',
            name: 'Udupi Gardenia',
            cuisine: ['South Indian', 'Vegetarian'],
            priceForTwo: 400,
            address: `Koramangala, ${destination.split(',')[0]}`,
            distance: '2.1 km',
            rating: 4.1,
            reviews: 782,
            closingTime: '10:30 PM',
            availability: 'high',
            offers: ['10% cashback on Paytm'],
            bestDishes: ['Masala Dosa', 'Idli Vada', 'South Indian Thali']
          }
        ];
        
        setRestaurants(mockRestaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [destination]);

  // Get all unique cuisines
  const allCuisines = Array.from(
    new Set(restaurants.flatMap(restaurant => restaurant.cuisine))
  );

  // Apply filters and sorting
  const filteredRestaurants = restaurants
    .filter(restaurant => !filterCuisine || restaurant.cuisine.includes(filterCuisine))
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.priceForTwo - b.priceForTwo;
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-lg text-travel-navy flex items-center gap-2">
            <Utensils className="h-5 w-5 text-travel-teal" />
            <span>Restaurants in {destination.split(',')[0]}</span>
            <Badge className="ml-2 bg-travel-blue/20 text-travel-blue hover:bg-travel-blue/30">
              {format(currentTime, 'h:mm a')}
            </Badge>
          </h3>
          <p className="text-sm text-gray-500">
            Food options open now
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Cuisine</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Cuisine</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setFilterCuisine(null)}>
                  <span>All Cuisines</span>
                </DropdownMenuItem>
                {allCuisines.map((cuisine, index) => (
                  <DropdownMenuItem key={index} onClick={() => setFilterCuisine(cuisine)}>
                    <span>{cuisine}</span>
                  </DropdownMenuItem>
                ))}
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
                <DropdownMenuItem onClick={() => setSortBy('rating')}>
                  <Star className="mr-2 h-4 w-4" />
                  <span>Rating</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price')}>
                  <BadgeIndianRupee className="mr-2 h-4 w-4" />
                  <span>Price</span>
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

      <div className="space-y-4">
        <AnimatePresence>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
                <Skeleton className="h-4 w-1/2 mt-2" />
                <div className="mt-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-10 w-1/4" />
                </div>
              </div>
            ))
          ) : filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">{restaurant.name}</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {restaurant.cuisine.map((type, i) => (
                          <Badge 
                            key={i} 
                            variant="outline"
                            className={filterCuisine === type ? "bg-travel-blue/10 text-travel-blue border-travel-blue/30" : ""}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                      <span className="font-medium text-green-700">{restaurant.rating}</span>
                      <Star className="h-4 w-4 text-green-700 fill-current ml-1" />
                      <span className="text-xs text-gray-500 ml-1">({restaurant.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    {restaurant.address} • {restaurant.distance}
                  </div>
                  
                  {restaurant.bestDishes && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-500">Famous for:</p>
                      <p className="text-sm font-medium">{restaurant.bestDishes.join(', ')}</p>
                    </div>
                  )}
                  
                  {restaurant.offers && restaurant.offers.length > 0 && (
                    <div className="mt-3">
                      {restaurant.offers.map((offer, i) => (
                        <div key={i} className="flex items-center text-sm text-green-600 mt-1">
                          <Percent className="h-3 w-3 mr-1" />
                          <span>{offer}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-lg text-travel-teal flex items-center gap-1">
                        <BadgeIndianRupee className="h-4 w-4" />
                        {restaurant.priceForTwo.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-gray-500">for two people</div>
                    </div>
                    
                    <Button className="bg-travel-teal hover:bg-travel-teal/90">
                      Reserve Now
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-2 border-t flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">Open until {restaurant.closingTime}</span>
                  </div>
                  
                  <Badge 
                    className={
                      restaurant.availability === 'high' ? 'bg-green-100 text-green-800 border-0' :
                      restaurant.availability === 'medium' ? 'bg-amber-100 text-amber-800 border-0' :
                      'bg-red-100 text-red-800 border-0'
                    }
                  >
                    {restaurant.availability === 'high' ? 'Tables Available' : 
                     restaurant.availability === 'medium' ? 'Limited Tables' : 
                     'Few Tables Left'}
                  </Badge>
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
              <p className="text-gray-500">No restaurants match your current filters.</p>
              <p className="text-gray-500 mt-1">Try adjusting your filters to see more options.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveFoodRecommendations;
