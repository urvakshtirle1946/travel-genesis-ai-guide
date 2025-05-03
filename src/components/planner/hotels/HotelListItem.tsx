
import React from 'react';
import { motion } from 'framer-motion';
import {
  BadgeIndianRupee,
  MapPin,
  Star,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HotelOption } from '@/types/planner';

interface HotelListItemProps {
  hotel: HotelOption;
  index: number;
  getAmenityIcon: (amenity: string) => JSX.Element | null;
}

const HotelListItem: React.FC<HotelListItemProps> = ({ hotel, index, getAmenityIcon }) => {
  // Card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
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
  );
};

export default HotelListItem;
