
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Loader2, Filter, MapPin, Star, PlaneTakeoff } from 'lucide-react';
import { generateDestinationIdeas } from '@/lib/aiService';
import { toast } from "sonner";
import { motion } from "framer-motion";

// Placeholder destination data
const initialDestinations = [
  {
    id: '1',
    name: 'Goa, India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
    description: 'Pristine beaches, vibrant nightlife, and Portuguese heritage in this coastal paradise.',
    rating: 4.8,
    priceLevel: '₹₹',
    tags: ['Beach', 'Culture', 'Nightlife']
  },
  {
    id: '2',
    name: 'Jaipur, India',
    image: 'https://images.unsplash.com/photo-1477586957327-847a0f3f4fe3',
    description: 'The Pink City with magnificent palaces, forts, and vibrant bazaars.',
    rating: 4.9,
    priceLevel: '₹₹',
    tags: ['Culture', 'History', 'Architecture']
  },
  {
    id: '3',
    name: 'Kerala Backwaters',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
    description: 'Serene waterways, lush landscapes, and traditional houseboats.',
    rating: 4.7,
    priceLevel: '₹₹',
    tags: ['Nature', 'Relaxation', 'Scenic']
  },
  {
    id: '4',
    name: 'Ladakh',
    image: 'https://images.unsplash.com/photo-1589891685253-35215fad1a64',
    description: 'Breathtaking mountain landscapes, Buddhist monasteries, and adventure activities.',
    rating: 4.9,
    priceLevel: '₹₹₹',
    tags: ['Mountains', 'Adventure', 'Culture']
  },
  {
    id: '5',
    name: 'Varanasi',
    image: 'https://images.unsplash.com/photo-1561361058-c24e06f36d1a',
    description: 'Sacred ghats, ancient temples, and spiritual experiences along the Ganges.',
    rating: 4.6,
    priceLevel: '₹',
    tags: ['Culture', 'Spiritual', 'History']
  },
  {
    id: '6',
    name: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7',
    description: 'Bustling metropolis with colonial architecture, Bollywood glamour, and vibrant street life.',
    rating: 4.7,
    priceLevel: '₹₹₹',
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
  const [filterPrice, setFilterPrice] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // AI generation based on query param
  useEffect(() => {
    const fetchDestinationIdeas = async () => {
      if (query) {
        setIsLoading(true);
        try {
          console.log("Fetching ideas for:", query);
          const suggestions = await generateDestinationIdeas(query);
          console.log("Got suggestions:", suggestions ? "yes" : "no");
          setAiSuggestion(suggestions);
          toast.success("AI suggestions generated successfully!");
        } catch (error) {
          console.error('Error fetching ideas:', error);
          toast.error("Could not generate AI suggestions. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDestinationIdeas();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    
    // Update the URL with the search query
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('query', searchQuery);
    
    // In a real app, this would filter destinations or fetch from API
    setIsLoading(true);
    toast.info("Searching for destinations...");
    
    // Create new URL with the updated search parameters
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    
    // Fetch new AI suggestions
    generateDestinationIdeas(searchQuery)
      .then(suggestions => {
        setAiSuggestion(suggestions);
        toast.success(`Found results for "${searchQuery}"`);
      })
      .catch(error => {
        console.error('Error fetching ideas:', error);
        toast.error("Could not generate AI suggestions. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Function to handle filtering
  const handleFilterChange = () => {
    let filteredResults = [...initialDestinations];
    
    // Apply price filter
    if (filterPrice !== 'all') {
      filteredResults = filteredResults.filter(dest => dest.priceLevel === filterPrice);
    }
    
    // Apply category filter
    if (filterCategory !== 'all') {
      filteredResults = filteredResults.filter(dest => 
        dest.tags.some(tag => tag.toLowerCase() === filterCategory.toLowerCase())
      );
    }
    
    setDestinations(filteredResults);
  };

  // Apply filters when they change
  useEffect(() => {
    handleFilterChange();
  }, [filterPrice, filterCategory]);

  // Function to handle "View Details" button click
  const handleViewDetails = (destination: string) => {
    // In a real app, this would navigate to a destination details page
    // For now, let's offer to plan a trip for this destination
    if (confirm(`Would you like to plan a trip to ${destination}?`)) {
      window.location.href = `/planner?destination=${encodeURIComponent(destination)}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 pt-16 md:pt-24">
        <div className="container py-8">
          {/* Hero section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-travel-navy to-travel-blue rounded-xl p-8 mb-8 text-white shadow-lg"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Your Perfect Destination</h1>
            <p className="text-lg md:max-w-2xl mb-6">
              Explore handpicked destinations across India and the world. Find your next adventure with personalized recommendations.
            </p>
            
            {/* Enhanced Search section */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                <Input 
                  type="text"
                  placeholder="Search destinations, activities, or interests..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              <Button 
                type="submit" 
                className="bg-travel-teal hover:bg-travel-teal/90 text-white"
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
          </motion.div>
          
          {/* AI-generated suggestions */}
          {aiSuggestion && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-travel-sand/50 border border-travel-sand rounded-xl p-6 mb-8"
            >
              <h2 className="text-xl font-bold mb-3 text-travel-navy flex items-center">
                <span className="bg-travel-teal text-white p-1 rounded-md mr-2">AI</span>
                Suggestions based on "{query}"
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{aiSuggestion}</p>
              </div>
              
              {/* Add quick buttons to plan a trip */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = `/planner?destination=${encodeURIComponent(query)}`}
                  className="bg-white border-travel-teal text-travel-teal hover:bg-travel-teal/10"
                >
                  <PlaneTakeoff className="mr-2 h-4 w-4" />
                  Plan a trip based on this search
                </Button>
              </div>
            </motion.div>
          )}
          
          {/* Filter section - Enhanced */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h3 className="text-travel-navy font-medium flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </h3>
              
              <div className="flex flex-wrap gap-3">
                <Select value={filterPrice} onValueChange={setFilterPrice}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="₹">Budget (₹)</SelectItem>
                    <SelectItem value="₹₹">Mid-Range (₹₹)</SelectItem>
                    <SelectItem value="₹₹₹">Luxury (₹₹₹)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="beach">Beach</SelectItem>
                    <SelectItem value="culture">Culture</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="spiritual">Spiritual</SelectItem>
                    <SelectItem value="urban">Urban</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Tab navigation */}
          <Tabs defaultValue="all" className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="m-0">
              {/* Destinations grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.length > 0 ? destinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card 
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
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="default" 
                            className="w-full bg-travel-blue hover:bg-travel-blue/90"
                            onClick={() => handleViewDetails(destination.name)}
                          >
                            View Details
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            className="border-travel-teal text-travel-teal hover:bg-travel-teal/10"
                            onClick={() => window.location.href = `/planner?destination=${encodeURIComponent(destination.name)}`}
                          >
                            Plan Trip
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )) : (
                  <div className="col-span-3 py-12 text-center">
                    <p className="text-gray-500">No destinations match your filters. Try different criteria.</p>
                  </div>
                )}
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
