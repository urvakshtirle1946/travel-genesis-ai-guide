
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIAssistant from '@/components/ai/AIAssistant';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Loader2, Filter, MapPin, Star } from 'lucide-react';
import { generateDestinationIdeas } from '@/lib/aiService';

// Placeholder destination data
const initialDestinations = [
  {
    id: '1',
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    description: 'Tropical paradise with beautiful beaches, vibrant culture, and stunning temples.',
    rating: 4.8,
    priceLevel: '$$',
    tags: ['Beach', 'Culture', 'Adventure']
  },
  {
    id: '2',
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    description: 'Ancient temples, traditional gardens, and authentic cultural experiences.',
    rating: 4.9,
    priceLevel: '$$$',
    tags: ['Culture', 'History', 'Food']
  },
  {
    id: '3',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1469796466635-455ede028aca',
    description: 'Iconic white buildings, stunning sunsets, and crystal-clear waters.',
    rating: 4.7,
    priceLevel: '$$$',
    tags: ['Beach', 'Romance', 'Scenic']
  },
  {
    id: '4',
    name: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6',
    description: 'Breathtaking mountain landscapes, hiking trails, and winter sports.',
    rating: 4.9,
    priceLevel: '$$$',
    tags: ['Mountains', 'Adventure', 'Nature']
  },
  {
    id: '5',
    name: 'Marrakech, Morocco',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b',
    description: 'Vibrant markets, historic palaces, and rich cultural heritage.',
    rating: 4.6,
    priceLevel: '$$',
    tags: ['Culture', 'History', 'Shopping']
  },
  {
    id: '6',
    name: 'New York City, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    description: 'Iconic skyline, world-class museums, diverse culinary scene, and vibrant nightlife.',
    rating: 4.7,
    priceLevel: '$$$',
    tags: ['Urban', 'Culture', 'Food']
  }
];

const Explore: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  
  const [destinations, setDestinations] = useState(initialDestinations);
  const [searchQuery, setSearchQuery] = useState(query);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  // AI generation based on query param
  useEffect(() => {
    const fetchDestinationIdeas = async () => {
      if (query) {
        setIsLoading(true);
        try {
          const suggestions = await generateDestinationIdeas(query);
          setAiSuggestion(suggestions);
        } catch (error) {
          console.error('Error fetching ideas:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDestinationIdeas();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter destinations or fetch from API
    // For now, we'll just simulate a search with a delay
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 pt-16 md:pt-24">
        <div className="container py-8">
          {/* Search section */}
          <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search destinations, activities, or interests..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                type="submit" 
                className="bg-travel-blue hover:bg-travel-blue/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  'Search'
                )}
              </Button>
            </form>
          </div>
          
          {/* AI-generated suggestions */}
          {aiSuggestion && (
            <div className="bg-travel-sand/50 border border-travel-sand rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold mb-3 text-travel-navy flex items-center">
                <span className="bg-travel-teal text-white p-1 rounded-md mr-2">AI</span>
                Suggestions based on "{query}"
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{aiSuggestion}</p>
              </div>
            </div>
          )}
          
          {/* Tab navigation */}
          <Tabs defaultValue="all" className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm" className="text-gray-600">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
            
            <TabsContent value="all" className="m-0">
              {/* Destinations grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map(destination => (
                  <Card 
                    key={destination.id} 
                    className="overflow-hidden hover-card-scale border-none shadow-md"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={destination.image} 
                        alt={destination.name} 
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">{destination.name}</span>
                          </div>
                          <div className="flex items-center bg-white/20 rounded-full px-2 py-0.5 backdrop-blur-sm">
                            <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-medium">{destination.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 text-travel-navy">{destination.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{destination.description}</p>
                      
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-travel-navy">{destination.priceLevel}</span>
                        <div className="space-x-1">
                          {destination.tags.map(tag => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="bg-travel-teal/10 text-travel-teal hover:bg-travel-teal/20 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        variant="default" 
                        className="w-full bg-travel-blue hover:bg-travel-blue/90"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="m-0">
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">Popular destinations coming soon...</p>
              </div>
            </TabsContent>
            
            <TabsContent value="recommended" className="m-0">
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">Recommended destinations coming soon...</p>
              </div>
            </TabsContent>
            
            <TabsContent value="trending" className="m-0">
              <div className="flex items-center justify-center py-12">
                <p className="text-gray-500">Trending destinations coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Explore;
