
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BadgeIndianRupee, 
  MapPin, 
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { TransportOption } from '@/types/planner';

interface TransportListItemProps {
  option: TransportOption;
  origin: string;
  destination: string;
  onSelectOption: (option: TransportOption) => void;
  index: number;
}

const TransportListItem: React.FC<TransportListItemProps> = ({
  option,
  origin,
  destination,
  onSelectOption,
  index
}) => {
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
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-travel-blue/10 rounded-full">
              {option.icon}
            </div>
            <div>
              <h4 className="font-semibold text-lg">{option.name}</h4>
              <p className="text-sm text-gray-600">{option.provider}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-travel-teal flex items-center justify-end gap-1">
              <BadgeIndianRupee className="h-4 w-4" />
              {option.price.toLocaleString('en-IN')}
              {option.livePrice && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge className="ml-1 bg-green-100 text-green-800 text-xs">Live</Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Live pricing based on current demand</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="text-sm text-gray-500">{option.duration}</div>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex-1">
            <div className="relative flex justify-between text-sm">
              <div className="w-full h-[1px] bg-gray-300 absolute top-4"></div>
              
              <div className="bg-white pr-3 z-10">
                <div className="font-medium">{option.departure}</div>
                <div className="text-xs text-gray-500">{origin.split(',')[0]}</div>
              </div>
              
              <div className="bg-white px-3 z-10 flex flex-col items-center">
                {option.stops > 0 ? (
                  <Badge className="bg-amber-100 text-amber-800 border-0 mb-1">
                    {option.stops} {option.stops === 1 ? 'stop' : 'stops'}
                  </Badge>
                ) : (
                  <Badge className="bg-green-100 text-green-800 border-0 mb-1">Direct</Badge>
                )}
              </div>
              
              <div className="bg-white pl-3 z-10 text-right">
                <div className="font-medium">{option.arrival}</div>
                <div className="text-xs text-gray-500">{destination.split(',')[0]}</div>
              </div>
            </div>
            
            {option.status && option.status !== 'on-time' && (
              <div className="mt-2">
                {option.status === 'delayed' ? (
                  <div className="flex items-center text-amber-600 text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    <span>Delayed by {option.delayMinutes} minutes</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    <span>Cancelled</span>
                  </div>
                )}
              </div>
            )}
            
            {option.distance && (
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                {option.distance}
              </div>
            )}
          </div>
          
          <div className="ml-4">
            <Button 
              onClick={() => onSelectOption(option)}
              className="bg-travel-teal hover:bg-travel-teal/90"
              disabled={option.status === 'cancelled'}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-2 border-t flex items-center justify-between">
        <div className="flex items-center gap-2">
          {option.rating && (
            <div className="flex items-center">
              <Badge className="bg-blue-100 text-blue-800 border-0">
                {option.rating.toFixed(1)} ★
              </Badge>
              {option.reviews && (
                <span className="text-xs text-gray-500 ml-1">({option.reviews})</span>
              )}
            </div>
          )}
          
          {option.availability && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge 
                    className={
                      option.availability === 'available' ? 'bg-green-100 text-green-800 border-0' :
                      option.availability === 'limited' ? 'bg-amber-100 text-amber-800 border-0' :
                      'bg-red-100 text-red-800 border-0'
                    }
                  >
                    {option.availability === 'available' ? 'Available' : 
                     option.availability === 'limited' ? 'Limited Seats' : 'Almost Full'}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Current seat availability status</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {option.type === 'cab' && (
          <Badge className="bg-green-100 text-green-800 border-0">Book Instantly</Badge>
        )}
      </div>
    </motion.div>
  );
};

export default TransportListItem;
