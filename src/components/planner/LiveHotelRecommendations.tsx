import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BadgeIndianRupee, 
  Clock, 
  MapPin, 
  Star, 
  Filter, 
  ArrowUpDown,
  Wifi,
  Utensils,
  AirVent,
  Car
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
import { HotelOption } from '@/types/planner';

interface LiveHotelRecommendationsProps {
  destination: string;
}

const LiveHotelRecommendations: React.FC<LiveHotelRecommendationsProps> = ({ destination }) => {
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState<HotelOption[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('price');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [onlyAvailable, setOnlyAvailable] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        // In a real application, this would call an API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock hotel data
        const mockHotels: HotelOption[] = [
          {
            id: 'hotel-1',
            name: 'Hotel Shubham',
            price: 1200,
            pricePerNight: 1200,
            address: `Koramangala, ${destination.split(',')[0]}`,
            distance: '2 km',
            rating: 4.2,
            reviews: 128,
            amenities: ['WiFi', 'AC', 'Parking', 'Restaurant'],
            checkInAvailable: true,
            images: ['/placeholder.svg'],
            availability: 'high'
          },
          {
            id: 'hotel-2',
            name: 'The Grand Residency',
            price: 3400,
            pricePerNight: 3400,
            address: `MG Road, ${destination.split(',')[0]}`,
            distance: '1.5 km',
            rating: 4.7,
            reviews: 324,
            amenities: ['WiFi', 'AC', 'Parking', 'Restaurant', 'Pool', 'Gym'],
            checkInAvailable: true,
            images: ['/placeholder.svg'],
            availability: 'medium'
          },
          {
            id: 'hotel-3',
            name: 'Budget Inn',
            price: 850,
            pricePerNight: 850,
            address: `Indiranagar, ${destination.split(',')[0]}`,
            distance: '3.2 km',
            rating: 3.5,
            reviews: 67,
            amenities: ['WiFi', 'AC'],
            checkInAvailable: false,
            images: ['/placeholder.svg'],
            availability: 'low'
          },
          {
            id: 'hotel-4',
            name: 'Royal Heritage',
            price: 4500,
            pricePerNight: 4500,
            address: `JP Nagar, ${destination.split(',')[0]}`,
            distance: '4.1 km',
            rating: 4.8,
            reviews: 210,
            amenities: ['WiFi', 'AC', 'Parking', 'Restaurant', 'Pool', 'Gym', 'Spa'],
            checkInAvailable: true,
            images: ['/placeholder.svg'],
            availability: 'high'
          },
        ];
        
        setHotels(mockHotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [destination]);

  // Apply filters and sorting
  const filteredHotels = hotels
    .filter(hotel => 
      (!onlyAvailable || hotel.checkInAvailable) && 
      hotel.pricePerNight >= priceRange[0] && 
      hotel.pricePerNight <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
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

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'ac':
        return <AirVent className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-lg text-travel-navy">Hotels in {destination.split(',')[0]}</h3>
          <p className="text-sm text-gray-500">
            {onlyAvailable ? 'Hotels with check-in available now' : 'All hotels'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button 
            variant={onlyAvailable ? "default" : "outline"} 
            size="sm"
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            className={onlyAvailable ? "bg-travel-teal hover:bg-travel-teal/90" : ""}
          >
            Check-in Now
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Price</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Price Range (₹)</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setPriceRange([0, 10000])}>
                  <span>All Prices</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceRange([0, 1000])}>
                  <span>Under ₹1,000</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceRange([1000, 3000])}>
                  <span>₹1,000 - ₹3,000</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriceRange([3000, 10000])}>
                  <span>Above ₹3,000</span>
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
                <DropdownMenuItem onClick={() => setSortBy('price')}>
                  <BadgeIndianRupee className="mr-2 h-4 w-4" />
                  <span>Price</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('rating')}>
                  <Star className="mr-2 h-4 w-4" />
                  <span>Rating</span>
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
                <Skeleton className="h-40 w-full rounded-md mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex justify-between mt-2">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-10 w-1/4" />
                  </div>
                </div>
              </div>
            ))
          ) : filteredHotels.length > 0 ? (
            filteredHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  <img 
                    src={hotel.images[0]} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover"
                  />
                  {hotel.checkInAvailable && (
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white border-0">
                      Check-in Now
                    </Badge>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between">
                    <h4 className="font-semibold text-lg">{hotel.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{hotel.rating.toFixed(1)}</span>
                      <span className="text-sm text-gray-500">({hotel.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    {hotel.address} • {hotel.distance}
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {hotel.amenities.slice(0, 4).map((amenity, i) => (
                      <Badge key={i} variant="outline" className="flex items-center gap-1 bg-gray-50">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </Badge>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <Badge variant="outline" className="bg-gray-50">
                        +{hotel.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-lg text-travel-teal flex items-center gap-1">
                        <BadgeIndianRupee className="h-4 w-4" />
                        {hotel.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-gray-500">per night</div>
                    </div>
                    
                    <Button className="bg-travel-teal hover:bg-travel-teal/90">
                      Book Now
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Instant confirmation</span>
                    </div>
                    
                    <Badge 
                      className={
                        hotel.availability === 'high' ? 'bg-green-100 text-green-800 border-0' :
                        hotel.availability === 'medium' ? 'bg-amber-100 text-amber-800 border-0' :
                        'bg-red-100 text-red-800 border-0'
                      }
                    >
                      {hotel.availability === 'high' ? 'High Availability' : 
                       hotel.availability === 'medium' ? 'Limited Rooms' : 
                       'Almost Full'}
                    </Badge>
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
              <p className="text-gray-500">No hotels match your current filters.</p>
              <p className="text-gray-500 mt-1">Try adjusting your filters to see more options.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveHotelRecommendations;
