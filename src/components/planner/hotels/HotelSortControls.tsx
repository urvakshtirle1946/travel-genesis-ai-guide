
import React from 'react';
import { Button } from '@/components/ui/button';

interface HotelSortControlsProps {
  sortBy: 'price' | 'rating';
  setSortBy: (sort: 'price' | 'rating') => void;
}

const HotelSortControls: React.FC<HotelSortControlsProps> = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex gap-2">
      <Button 
        size="sm" 
        variant={sortBy === 'price' ? 'default' : 'outline'}
        onClick={() => setSortBy('price')}
        className={sortBy === 'price' ? 'bg-travel-teal' : ''}
      >
        Best Price
      </Button>
      <Button 
        size="sm" 
        variant={sortBy === 'rating' ? 'default' : 'outline'}
        onClick={() => setSortBy('rating')}
        className={sortBy === 'rating' ? 'bg-travel-teal' : ''}
      >
        Top Rated
      </Button>
    </div>
  );
};

export default HotelSortControls;
