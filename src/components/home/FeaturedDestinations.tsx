
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  tags: string[];
}

const destinations: Destination[] = [
  {
    id: '1',
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    description: 'Tropical paradise with beautiful beaches, vibrant culture, and stunning temples.',
    tags: ['Beach', 'Culture', 'Adventure']
  },
  {
    id: '2',
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    description: 'Ancient temples, traditional gardens, and authentic cultural experiences.',
    tags: ['Culture', 'History', 'Food']
  },
  {
    id: '3',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1469796466635-455ede028aca',
    description: 'Iconic white buildings, stunning sunsets, and crystal-clear waters.',
    tags: ['Beach', 'Romance', 'Scenic']
  },
  {
    id: '4',
    name: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6',
    description: 'Breathtaking mountain landscapes, hiking trails, and winter sports.',
    tags: ['Mountains', 'Adventure', 'Nature']
  }
];

const FeaturedDestinations: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-travel-sand">
      <div className="container">
        <div className="mb-10 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-travel-navy">
              Featured Destinations
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our handpicked destinations with AI-enhanced recommendations tailored to your travel preferences.
            </p>
          </div>
          <button 
            onClick={() => navigate('/explore')}
            className="mt-4 md:mt-0 group flex items-center text-travel-teal hover:text-travel-blue transition-colors"
          >
            View all destinations
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Card 
              key={destination.id}
              className="overflow-hidden hover-card-scale border-none shadow-md"
              onClick={() => navigate(`/destination/${destination.id}`)}
            >
              <div className="h-48 w-full relative overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-travel-navy">{destination.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{destination.description}</p>
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-travel-teal/10 text-travel-teal hover:bg-travel-teal/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
