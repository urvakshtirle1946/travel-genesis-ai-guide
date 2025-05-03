
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlarmClock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from "@/components/ui/skeleton";
import { TransportOption } from '@/types/planner';
import { format } from 'date-fns';
import { generateLiveTransportOptions } from '@/services/liveTransport';

// Import refactored components
import TransportListItem from './transport/TransportListItem';
import TransportControls from './transport/TransportControls';
import { parseDuration, parseTime } from './transport/utils';

interface RealTimeTripSuggestionsProps {
  origin: string;
  destination: string;
  onSelectOption: (option: TransportOption) => void;
}

const RealTimeTripSuggestions: React.FC<RealTimeTripSuggestionsProps> = ({
  origin,
  destination,
  onSelectOption
}) => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<TransportOption[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filterType, setFilterType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'departure' | 'price' | 'duration'>('departure');

  // Fetch real-time transport options
  useEffect(() => {
    const fetchTransportOptions = async () => {
      setLoading(true);
      try {
        // In a real application, this would call an API
        const options = await generateLiveTransportOptions(origin, destination);
        setOptions(options);
      } catch (error) {
        console.error("Error fetching transport options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransportOptions();

    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [origin, destination]);

  // Apply filters and sorting
  const filteredOptions = options
    .filter(option => !filterType || option.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          return parseDuration(a.duration) - parseDuration(b.duration);
        case 'departure':
        default:
          return parseTime(a.departure) - parseTime(b.departure);
      }
    });

  // Card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-lg text-travel-navy flex items-center gap-2">
            <AlarmClock className="h-5 w-5 text-travel-teal" />
            <span>Departing Now</span>
            <Badge className="ml-2 bg-travel-blue/20 text-travel-blue hover:bg-travel-blue/30">
              {format(currentTime, 'h:mm a')}
            </Badge>
          </h3>
          <p className="text-sm text-gray-500">
            Live transport options from {origin.split(',')[0]} to {destination.split(',')[0]}
          </p>
        </div>

        <TransportControls
          filterType={filterType}
          sortBy={sortBy}
          setFilterType={setFilterType}
          setSortBy={setSortBy}
        />
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="flex justify-between">
                  <Skeleton className="h-10 w-1/3" />
                  <Skeleton className="h-10 w-1/4" />
                </div>
                <div className="mt-3 flex justify-between">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-10 w-1/4" />
                </div>
              </div>
            ))
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <TransportListItem
                key={option.id}
                option={option}
                origin={origin}
                destination={destination}
                onSelectOption={onSelectOption}
                index={index}
              />
            ))
          ) : (
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="text-center py-10"
            >
              <p className="text-gray-500">No transport options available right now.</p>
              <p className="text-gray-500 mt-1">Try adjusting your filters or check back later.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RealTimeTripSuggestions;
