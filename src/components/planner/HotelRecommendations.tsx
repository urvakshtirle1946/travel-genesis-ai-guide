import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HotelList from './hotels/HotelList';
import HotelSortControls from './hotels/HotelSortControls';
import { HotelOption } from '@/types/planner';

interface HotelRecommendationsProps {
  destination: string;
}

const HotelRecommendations: React.FC<HotelRecommendationsProps> = ({ destination }) => {
  const [hotels, setHotels] = React.useState<HotelOption[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sortBy, setSortBy] = React.useState<'price' | 'rating'>('price');

  React.useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockHotels = generateMockHotels(destination);
      // Sort hotels based on selected criteria
      let sortedHotels = [...mockHotels];
      if (sortBy === 'price') {
        sortedHotels.sort((a, b) => a.pricePerNight - b.pricePerNight);
      } else {
        sortedHotels.sort((a, b) => b.rating - a.rating);
      }
      setHotels(sortedHotels);
      setLoading(false);
    }, 1000);
  }, [destination, sortBy]);

  // Generate mock hotels based on destination
  const generateMockHotels = (location: string): HotelOption[] => {
    const dest = location.toLowerCase().split(',')[0];
    const hotels: HotelOption[] = [];
    
    // Destination-specific hotels
    if (dest.includes('bali')) {
      hotels.push(
        {
          id: 'hotel-1',
          name: 'Affordable Bali Villa',
          type: 'Villa',
          pricePerNight: 65,
          rating: 4.3,
          reviews: 842,
          amenities: ['Pool', 'Free Wi-Fi', 'Breakfast included'],
          description: 'Cozy villa with private pool and garden, close to the beach.',
          location: 'Ubud, Bali',
          distance: '1.2 km from center',
          deals: ['20% off for 5+ night stays', 'Free airport pickup']
        },
        {
          id: 'hotel-2',
          name: 'Seminyak Budget Resort',
          type: 'Resort',
          pricePerNight: 45,
          rating: 4.0,
          reviews: 635,
          amenities: ['Pool', 'Restaurant', 'Air conditioning'],
          description: 'Affordable resort with great amenities and friendly staff.',
          location: 'Seminyak, Bali',
          distance: '0.8 km from beach',
          deals: ['Breakfast included', 'Free welcome drink']
        },
        {
          id: 'hotel-3',
          name: 'Luxury Beachfront Resort',
          type: 'Luxury Resort',
          pricePerNight: 250,
          rating: 4.8,
          reviews: 1245,
          amenities: ['Private Beach', 'Spa', 'Multiple Pools', '24/7 Service'],
          description: 'Premium beachfront resort with world-class amenities and service.',
          location: 'Nusa Dua, Bali',
          distance: 'Beachfront',
          deals: ['Spa credit included', 'Half-board option available']
        }
      );
    } else if (dest.includes('paris')) {
      hotels.push(
        {
          id: 'hotel-1',
          name: 'Budget Montmartre Hotel',
          type: 'Boutique Hotel',
          pricePerNight: 85,
          rating: 4.1,
          reviews: 756,
          amenities: ['Free Wi-Fi', 'Continental Breakfast', 'Metro nearby'],
          description: 'Charming small hotel in artistic Montmartre with excellent location.',
          location: 'Montmartre, Paris',
          distance: '3.5 km from city center',
          deals: ['Stay 3, pay for 2 nights']
        },
        {
          id: 'hotel-2',
          name: 'Latin Quarter Guesthouse',
          type: 'Guesthouse',
          pricePerNight: 70,
          rating: 4.2,
          reviews: 542,
          amenities: ['Free Wi-Fi', 'Shared kitchen', 'Luggage storage'],
          description: 'Cozy guesthouse in the historic Latin Quarter with friendly hosts.',
          location: 'Latin Quarter, Paris',
          distance: '1.2 km from Notre Dame',
          deals: ['Weekly discount', 'Student special rates']
        },
        {
          id: 'hotel-3',
          name: 'Luxury Champs-Élysées Hotel',
          type: 'Luxury Hotel',
          pricePerNight: 320,
          rating: 4.7,
          reviews: 1890,
          amenities: ['5-Star Service', 'Fine Dining', 'Spa', 'Concierge'],
          description: 'Elegant luxury hotel near the famous Champs-Élysées with stunning views.',
          location: 'Champs-Élysées, Paris',
          distance: 'Central location',
          deals: ['Free champagne on arrival', 'Spa credit included']
        }
      );
    } else if (dest.includes('tokyo')) {
      hotels.push(
        {
          id: 'hotel-1',
          name: 'Budget Capsule Hotel',
          type: 'Capsule Hotel',
          pricePerNight: 35,
          rating: 4.0,
          reviews: 1245,
          amenities: ['Free Wi-Fi', '24/7 Access', 'Shared Bathroom'],
          description: 'Modern capsule hotel with comfortable pods and excellent location.',
          location: 'Shinjuku, Tokyo',
          distance: '0.3 km from Shinjuku Station',
          deals: ['Weekly stay discount', 'Free locker usage']
        },
        {
          id: 'hotel-2',
          name: 'Asakusa Business Hotel',
          type: 'Business Hotel',
          pricePerNight: 75,
          rating: 4.2,
          reviews: 890,
          amenities: ['Free Wi-Fi', 'Breakfast', 'Laundry Service'],
          description: 'Clean and efficient business hotel near major attractions.',
          location: 'Asakusa, Tokyo',
          distance: '0.5 km from Sensoji Temple',
          deals: ['Business travelers discount', 'Extended stay rates']
        },
        {
          id: 'hotel-3',
          name: 'Luxury Shibuya Suites',
          type: 'Luxury Hotel',
          pricePerNight: 280,
          rating: 4.7,
          reviews: 1560,
          amenities: ['Rooftop Pool', 'Multiple Restaurants', 'Spa', 'Gym'],
          description: 'Contemporary luxury hotel in the heart of trendy Shibuya.',
          location: 'Shibuya, Tokyo',
          distance: 'Central location',
          deals: ['Executive lounge access', 'Spa treatment included']
        }
      );
    } else {
      // Generic hotels for any destination
      hotels.push(
        {
          id: 'hotel-1',
          name: `${dest} Budget Stay`,
          type: 'Budget Hotel',
          pricePerNight: Math.floor(Math.random() * 40) + 30,
          rating: 3.8 + (Math.random() * 0.5),
          reviews: Math.floor(Math.random() * 500) + 300,
          amenities: ['Free Wi-Fi', 'Air Conditioning', 'TV'],
          description: `Affordable accommodation in ${dest} with basic amenities and clean rooms.`,
          location: `${dest} City Area`,
          distance: `${(Math.random() * 3 + 0.5).toFixed(1)} km from center`,
          deals: ['Early booking discount', 'Extended stay rates']
        },
        {
          id: 'hotel-2',
          name: `${dest} Comfort Inn`,
          type: 'Mid-range Hotel',
          pricePerNight: Math.floor(Math.random() * 60) + 60,
          rating: 4.0 + (Math.random() * 0.5),
          reviews: Math.floor(Math.random() * 800) + 400,
          amenities: ['Free Wi-Fi', 'Breakfast', 'Room Service', 'Parking'],
          description: `Comfortable hotel with good amenities and convenient location in ${dest}.`,
          location: `${dest} Main District`,
          distance: `${(Math.random() * 2 + 0.2).toFixed(1)} km from center`,
          deals: ['Free breakfast included', 'Family room discounts']
        },
        {
          id: 'hotel-3',
          name: `${dest} Premium Suites`,
          type: 'Luxury Hotel',
          pricePerNight: Math.floor(Math.random() * 150) + 180,
          rating: 4.5 + (Math.random() * 0.5),
          reviews: Math.floor(Math.random() * 1000) + 600,
          amenities: ['Pool', 'Spa', 'Fine Dining', 'Concierge', 'Gym'],
          description: `High-end accommodations in ${dest} with premium services and facilities.`,
          location: `${dest} Prime Location`,
          distance: 'Central location',
          deals: ['Spa credit included', 'Late checkout option']
        }
      );
    }
    
    return hotels;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hotel Recommendations</CardTitle>
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <HotelSortControls sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </CardHeader>
      <CardContent>
        <HotelList 
          hotels={hotels}
          loading={loading}
          destination={destination}
        />
      </CardContent>
    </Card>
  );
};

export default HotelRecommendations;
