
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaneTakeoff, Route, Navigation, Star, IndianRupee } from 'lucide-react';
import { TransportOption } from '@/types/planner';

interface TransportationOptionsProps {
  origin: string;
  destination: string;
  onSelectOption: (option: TransportOption) => void;
}

const TransportationOptions: React.FC<TransportationOptionsProps> = ({ 
  origin, 
  destination,
  onSelectOption
}) => {
  const [options, setOptions] = React.useState<TransportOption[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sortBy, setSortBy] = React.useState<'price' | 'duration' | 'rating'>('price');

  React.useEffect(() => {
    // In a real app, this would be an API call to get transportation options
    // For this demo, we'll generate mock data
    setTimeout(() => {
      const mockOptions = generateMockTransportOptions(origin, destination);
      
      // Sort options based on selected criteria
      let sortedOptions = [...mockOptions];
      if (sortBy === 'price') {
        sortedOptions.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'duration') {
        sortedOptions.sort((a, b) => {
          const durationA = getDurationInMinutes(a.duration);
          const durationB = getDurationInMinutes(b.duration);
          return durationA - durationB;
        });
      } else if (sortBy === 'rating') {
        sortedOptions.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }

      setOptions(sortedOptions);
      setLoading(false);
    }, 1000);
  }, [origin, destination, sortBy]);

  // Helper function to convert duration string to minutes for sorting
  const getDurationInMinutes = (duration: string): number => {
    const parts = duration.split('h ');
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    return hours * 60 + minutes;
  };

  const generateMockTransportOptions = (from: string, to: string): TransportOption[] => {
    // Generate different transportation options based on origin and destination
    const options: TransportOption[] = [];
    
    // Add flights
    options.push({
      id: 'flight-1',
      type: 'flight',
      icon: <PlaneTakeoff className="h-5 w-5" />,
      name: `${from.split(',')[0]} to ${to.split(',')[0]} Direct Flight`,
      price: Math.floor(Math.random() * 15000) + 8000,
      duration: `${Math.floor(Math.random() * 5) + 1}h ${Math.floor(Math.random() * 60)}m`,
      departure: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      arrival: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      stops: 0,
      provider: ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'Air Asia'][Math.floor(Math.random() * 5)],
      rating: Math.floor(Math.random() * 2) + 3.5,
      reviews: Math.floor(Math.random() * 2000) + 500
    });
    
    options.push({
      id: 'flight-2',
      type: 'flight',
      icon: <PlaneTakeoff className="h-5 w-5" />,
      name: `${from.split(',')[0]} to ${to.split(',')[0]} Connection Flight`,
      price: Math.floor(Math.random() * 12000) + 6000,
      duration: `${Math.floor(Math.random() * 8) + 3}h ${Math.floor(Math.random() * 60)}m`,
      departure: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      arrival: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      stops: Math.floor(Math.random() * 2) + 1,
      provider: ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'Go Air'][Math.floor(Math.random() * 5)],
      rating: Math.floor(Math.random() * 2) + 3,
      reviews: Math.floor(Math.random() * 1500) + 300
    });
    
    // Add train or bus options for certain destinations
    if (Math.random() > 0.3) {
      options.push({
        id: 'train-1',
        type: 'train',
        icon: <Route className="h-5 w-5" />,
        name: `${from.split(',')[0]} to ${to.split(',')[0]} Express Train`,
        price: Math.floor(Math.random() * 5000) + 1500,
        duration: `${Math.floor(Math.random() * 10) + 2}h ${Math.floor(Math.random() * 60)}m`,
        departure: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        arrival: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        stops: Math.floor(Math.random() * 5),
        provider: ['Indian Railways', 'Rajdhani Express', 'Shatabdi Express', 'Duronto Express', 'Jan Shatabdi'][Math.floor(Math.random() * 5)],
        rating: Math.floor(Math.random() * 15) / 10 + 3.5,
        reviews: Math.floor(Math.random() * 1000) + 200
      });
    }
    
    if (Math.random() > 0.6) {
      options.push({
        id: 'bus-1',
        type: 'bus',
        icon: <Navigation className="h-5 w-5" />,
        name: `${from.split(',')[0]} to ${to.split(',')[0]} Bus Service`,
        price: Math.floor(Math.random() * 3000) + 800,
        duration: `${Math.floor(Math.random() * 15) + 5}h ${Math.floor(Math.random() * 60)}m`,
        departure: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        arrival: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        stops: Math.floor(Math.random() * 3) + 1,
        provider: ['KSRTC', 'APSRTC', 'MSRTC', 'RedBus', 'VRL Travels'][Math.floor(Math.random() * 5)],
        rating: Math.floor(Math.random() * 10) / 10 + 3,
        reviews: Math.floor(Math.random() * 800) + 100
      });
    }
    
    return options;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transportation Options</CardTitle>
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-sm text-gray-500">Sort by:</span>
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
              variant={sortBy === 'duration' ? 'default' : 'outline'}
              onClick={() => setSortBy('duration')}
              className={sortBy === 'duration' ? 'bg-travel-teal' : ''}
            >
              Shortest
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
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-travel-blue"></div>
            <p className="mt-2 text-gray-500">Finding the best transportation options...</p>
          </div>
        ) : options.length > 0 ? (
          <div className="space-y-4">
            {options.map(option => (
              <div 
                key={option.id}
                className="border rounded-lg p-4 hover:border-travel-teal hover:bg-travel-teal/5 cursor-pointer transition-colors"
                onClick={() => onSelectOption(option)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{option.name}</h3>
                      <div className="text-sm text-gray-500">
                        <span>Provider: {option.provider}</span>
                        {option.stops > 0 && <span> • {option.stops} stop{option.stops > 1 ? 's' : ''}</span>}
                      </div>
                      {option.rating && (
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={`h-3 w-3 ${star <= Math.floor(option.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">
                            {option.rating.toFixed(1)} ({option.reviews} reviews)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-travel-blue flex items-center justify-end">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      {option.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm">{option.duration}</div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <div>
                    <div className="font-medium">{option.departure}</div>
                    <div className="text-gray-500">{origin.split(',')[0]}</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center px-4">
                    <div className="w-full h-[1px] bg-gray-300 relative">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white px-2 text-xs text-gray-500">
                        {option.duration}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{option.arrival}</div>
                    <div className="text-gray-500">{destination.split(',')[0]}</div>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-travel-teal border-travel-teal"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectOption(option);
                    }}
                  >
                    Select Option
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No transportation options found between {origin} and {destination}.</p>
            <p className="mt-2">Try different locations or dates.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransportationOptions;
