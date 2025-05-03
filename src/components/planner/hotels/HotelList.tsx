
import React from 'react';
import { HotelOption } from '@/types/planner';
import { getAmenityIcon } from '@/components/planner/hotels/HotelAmenityIcons';

interface HotelListProps {
  hotels: HotelOption[];
  loading: boolean;
  destination: string;
}

const HotelList: React.FC<HotelListProps> = ({ hotels, loading, destination }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-travel-blue"></div>
        <p className="mt-2 text-gray-500">Finding the best hotel options...</p>
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No hotel recommendations found for {destination}.</p>
        <p className="mt-2">Try a different destination.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

const HotelCard: React.FC<{ hotel: HotelOption }> = ({ hotel }) => {
  return (
    <div className="border rounded-lg p-4 hover:border-travel-teal hover:bg-travel-teal/5">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{hotel.name}</h3>
          <div className="flex items-center mt-1">
            <HotelRating rating={hotel.rating} reviews={hotel.reviews} />
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-travel-blue">${hotel.pricePerNight}</div>
          <div className="text-xs text-gray-500">per night</div>
        </div>
      </div>
      
      <div className="flex gap-2 mt-2">
        <HotelTypeBadge type={hotel.type} />
        <HotelDistance distance={hotel.distance} />
      </div>
      
      <p className="text-sm text-gray-600 mt-2">{hotel.description}</p>
      
      <HotelAmenities amenities={hotel.amenities} />
      
      <HotelDeals deals={hotel.deals} />
      
      <div className="mt-3 flex justify-end">
        <ViewDetailsButton />
      </div>
    </div>
  );
};

const HotelRating: React.FC<{ rating: number; reviews: number }> = ({ rating, reviews }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            filled={star <= Math.floor(rating)}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500 ml-1">
        {rating.toFixed(1)} ({reviews} reviews)
      </span>
    </div>
  );
};

const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg 
    className={`h-3 w-3 ${filled ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const HotelTypeBadge: React.FC<{ type: string }> = ({ type }) => (
  <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
    {type}
  </span>
);

const HotelDistance: React.FC<{ distance: string }> = ({ distance }) => (
  <div className="flex items-center text-xs text-gray-500">
    <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
    {distance}
  </div>
);

const HotelAmenities: React.FC<{ amenities: string[] }> = ({ amenities }) => (
  <div className="mt-3">
    <div className="text-xs text-gray-500">Amenities:</div>
    <div className="flex flex-wrap gap-1 mt-1">
      {amenities.map((amenity, i) => (
        <span 
          key={i} 
          className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
        >
          {getAmenityIcon(amenity)}
          {amenity}
        </span>
      ))}
    </div>
  </div>
);

const HotelDeals: React.FC<{ deals: string[] }> = ({ deals }) => {
  if (deals.length === 0) return null;
  
  return (
    <div className="mt-3 p-2 bg-green-50 rounded-md border border-green-100">
      <div className="flex items-center text-green-700 text-xs font-medium">
        <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 8l-8 8"></path>
          <path d="M8.5 8.5h.01"></path>
          <path d="M15.5 15.5h.01"></path>
        </svg>
        Special Deals:
      </div>
      <ul className="text-xs text-green-700 mt-1">
        {deals.map((deal, i) => (
          <li key={i} className="list-disc list-inside">{deal}</li>
        ))}
      </ul>
    </div>
  );
};

const ViewDetailsButton: React.FC = () => (
  <button 
    className="px-3 py-1.5 text-xs font-medium rounded border border-travel-teal text-travel-teal hover:bg-travel-teal/10 transition-colors"
  >
    View Details
  </button>
);

export default HotelList;
