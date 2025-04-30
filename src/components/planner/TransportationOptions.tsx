
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaneTakeoff, Route, Navigation } from 'lucide-react';

interface TransportationOptionsProps {
  origin: string;
  destination: string;
  onSelectOption: (option: TransportOption) => void;
}

export interface TransportOption {
  id: string;
  type: string;
  icon: JSX.Element;
  name: string;
  price: number;
  duration: string;
  departure: string;
  arrival: string;
  stops: number;
  provider: string;
}

const TransportationOptions: React.FC<TransportationOptionsProps> = ({ 
  origin, 
  destination,
  onSelectOption
}) => {
  const [options, setOptions] = React.useState<TransportOption[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // In a real app, this would be an API call to get transportation options
    // For this demo, we'll generate mock data
    setTimeout(() => {
      const mockOptions = generateMockTransportOptions(origin, destination);
      setOptions(mockOptions);
      setLoading(false);
    }, 1000);
  }, [origin, destination]);

  const generateMockTransportOptions = (from: string, to: string): TransportOption[] => {
    // Generate different transportation options based on origin and destination
    const options: TransportOption[] = [];
    
    // Add flights
    options.push({
      id: 'flight-1',
      type: 'flight',
      icon: <PlaneTakeoff className="h-5 w-5" />,
      name: `${from.split(',')[0]} to ${to.split(',')[0]} Direct Flight`,
      price: Math.floor(Math.random() * 300) + 100,
      duration: `${Math.floor(Math.random() * 5) + 1}h ${Math.floor(Math.random() * 60)}m`,
      departure: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      arrival: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      stops: 0,
      provider: ['Air France', 'Lufthansa', 'Emirates', 'Singapore Airlines', 'Delta'][Math.floor(Math.random() * 5)]
    });
    
    options.push({
      id: 'flight-2',
      type: 'flight',
      icon: <PlaneTakeoff className="h-5 w-5" />,
      name: `${from.split(',')[0]} to ${to.split(',')[0]} Connection Flight`,
      price: Math.floor(Math.random() * 200) + 80,
      duration: `${Math.floor(Math.random() * 8) + 3}h ${Math.floor(Math.random() * 60)}m`,
      departure: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      arrival: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      stops: Math.floor(Math.random() * 2) + 1,
      provider: ['British Airways', 'United Airlines', 'American Airlines', 'Qatar Airways', 'KLM'][Math.floor(Math.random() * 5)]
    });
    
    // Add train or bus options for certain destinations
    if (Math.random() > 0.3) {
      options.push({
        id: 'train-1',
        type: 'train',
        icon: <Route className="h-5 w-5" />,
        name: `${from.split(',')[0]} to ${to.split(',')[0]} Express Train`,
        price: Math.floor(Math.random() * 100) + 30,
        duration: `${Math.floor(Math.random() * 10) + 2}h ${Math.floor(Math.random() * 60)}m`,
        departure: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        arrival: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        stops: Math.floor(Math.random() * 5),
        provider: ['Eurostar', 'Amtrak', 'Deutsche Bahn', 'TGV', 'JR East'][Math.floor(Math.random() * 5)]
      });
    }
    
    if (Math.random() > 0.6) {
      options.push({
        id: 'bus-1',
        type: 'bus',
        icon: <Navigation className="h-5 w-5" />,
        name: `${from.split(',')[0]} to ${to.split(',')[0]} Bus Service`,
        price: Math.floor(Math.random() * 50) + 15,
        duration: `${Math.floor(Math.random() * 15) + 5}h ${Math.floor(Math.random() * 60)}m`,
        departure: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        arrival: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        stops: Math.floor(Math.random() * 3) + 1,
        provider: ['Greyhound', 'Flixbus', 'Megabus', 'National Express', 'ALSA'][Math.floor(Math.random() * 5)]
      });
    }
    
    return options;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transportation Options</CardTitle>
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
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-travel-blue">${option.price}</div>
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
