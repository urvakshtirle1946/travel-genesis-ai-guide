
import React from 'react';
import { Wifi, Utensils, AirVent, Car } from 'lucide-react';

export const getAmenityIcon = (amenity: string): JSX.Element | null => {
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

export default { getAmenityIcon };
