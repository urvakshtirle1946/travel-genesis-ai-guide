
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { generateDestinationIdeas } from '@/lib/aiService';
import { toast } from 'sonner';

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error("Please enter a destination or interest");
      return;
    }
    
    setIsSearching(true);
    
    try {
      console.log("Generating destination ideas for:", searchQuery);
      const ideas = await generateDestinationIdeas(searchQuery);
      console.log("Generated ideas:", ideas);
      
      if (ideas) {
        toast.success("Search completed successfully!");
        navigate(`/explore?query=${encodeURIComponent(searchQuery)}`);
      } else {
        toast.error("Failed to process search. Please try again.");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Sorry, we couldn't process your search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="hero-section min-h-screen flex items-center bg-gradient-to-b from-travel-navy/80 to-travel-navy/60">
      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl text-white/90 mb-8">
              AI-powered travel recommendations and itineraries customized just for you
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
              <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full overflow-hidden shadow-lg">
                <div className="px-4 text-gray-500">
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  type="text"
                  placeholder="Where would you like to go? (e.g., Bali, Mountains, Cultural Experience)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 bg-transparent py-6 text-base"
                />
                <Button 
                  type="submit" 
                  disabled={isSearching}
                  className="bg-travel-teal hover:bg-travel-teal/90 text-white rounded-full px-6 py-2 m-1 h-12"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Inspire Me
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-10 flex flex-wrap justify-center gap-2 text-sm">
              <span className="text-white/70">Popular:</span>
              {["Beach Getaway", "Mountain Retreat", "Cultural Experience", "Adventure Trip"].map((item) => (
                <button
                  key={item}
                  onClick={() => setSearchQuery(item)}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
