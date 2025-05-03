
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import { HotelOption } from '@/types/planner';

// Import refactored components
import HotelListItem from './hotels/HotelListItem';
import HotelFilterControls from './hotels/HotelFilterControls';
import { getAmenityIcon } from './hotels/HotelAmenityIcons';

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-lg text-travel-navy">Hotels in {destination.split(',')[0]}</h3>
          <p className="text-sm text-gray-500">
            {onlyAvailable ? 'Hotels with check-in available now' : 'All hotels'}
          </p>
        </div>

        <HotelFilterControls
          onlyAvailable={onlyAvailable}
          setOnlyAvailable={setOnlyAvailable}
          setPriceRange={setPriceRange}
          setSortBy={setSortBy}
        />
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
              <HotelListItem 
                key={hotel.id}
                hotel={hotel}
                index={index}
                getAmenityIcon={getAmenityIcon}
              />
            ))
          ) : (
            <motion.div 
              className="col-span-full text-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
