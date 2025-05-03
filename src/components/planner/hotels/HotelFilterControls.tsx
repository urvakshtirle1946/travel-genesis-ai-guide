
import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HotelFilterControlsProps {
  onlyAvailable: boolean;
  setOnlyAvailable: (value: boolean) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: 'price' | 'rating' | 'distance') => void;
}

const HotelFilterControls: React.FC<HotelFilterControlsProps> = ({
  onlyAvailable,
  setOnlyAvailable,
  setPriceRange,
  setSortBy
}) => {
  return (
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
              <span>Price</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('rating')}>
              <span>Rating</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('distance')}>
              <span>Distance</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HotelFilterControls;
