
import React from 'react';
import { Filter, ArrowUpDown, Calendar, CircleDollarSign, Clock, Bus, TrainFront, Car } from 'lucide-react';
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

interface TransportControlsProps {
  filterType: string | null;
  sortBy: 'departure' | 'price' | 'duration';
  setFilterType: (type: string | null) => void;
  setSortBy: (sort: 'departure' | 'price' | 'duration') => void;
}

const TransportControls: React.FC<TransportControlsProps> = ({
  filterType,
  sortBy,
  setFilterType,
  setSortBy
}) => {
  return (
    <div className="flex items-center gap-2 self-end sm:self-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Transport Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setFilterType(null)}>
              <span>All Types</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType('train')}>
              <TrainFront className="mr-2 h-4 w-4" />
              <span>Train</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType('bus')}>
              <Bus className="mr-2 h-4 w-4" />
              <span>Bus</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType('cab')}>
              <Car className="mr-2 h-4 w-4" />
              <span>Cab</span>
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
            <DropdownMenuItem onClick={() => setSortBy('departure')}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Departure Time</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('price')}>
              <CircleDollarSign className="mr-2 h-4 w-4" />
              <span>Price</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('duration')}>
              <Clock className="mr-2 h-4 w-4" />
              <span>Duration</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TransportControls;
