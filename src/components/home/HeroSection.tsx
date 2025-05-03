
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Loader2, MapPin, Compass, Route } from "lucide-react";
import { generateDestinationIdeas } from '@/lib/aiService';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Particle animation component
const ParticleAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-travel-teal/30"
          initial={{ 
            x: Math.random() * 100 - 50 + "%", 
            y: Math.random() * 100 - 50 + "%" 
          }}
          animate={{ 
            x: [
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%"
            ],
            y: [
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%"
            ],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handlePlanTrip = (destination: string) => {
    navigate(`/planner?destination=${encodeURIComponent(destination)}`);
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="hero-section relative min-h-screen flex items-center overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(10, 58, 103, 0.6), rgba(10, 58, 103, 0.4)), url('https://images.unsplash.com/photo-1576487236390-dbc3201924f0?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&h=1080')`,
        backgroundSize: 'cover',
        backgroundPosition: `center ${scrollY * 0.5}px` 
      }}
    >
      <ParticleAnimation />
      
      <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex justify-center items-center mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                type: "spring",
                stiffness: 100 
              }}
            >
              <div className="relative">
                <Compass className="h-16 w-16 md:h-24 md:w-24 text-travel-teal rotate-12" />
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-travel-teal/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "loop" 
                  }}
                />
              </div>
              <h1 className="font-['Orbitron'] text-3xl md:text-5xl lg:text-6xl font-bold text-white ml-4">
                Travel<span className="text-travel-teal">Genesis</span>
              </h1>
            </motion.div>

            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Explore India, Live in the Moment – <br className="hidden md:block" />
              <span className="text-travel-teal">Your Real-Time Trip Companion</span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Transport. Stay. Shop. Eat. Experience. <br className="hidden md:block" />
              All in real-time, personalized for you.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-8">
                <div className="backdrop-blur-md bg-white/10 flex items-center rounded-full overflow-hidden shadow-2xl border border-white/20">
                  <div className="px-4 text-white">
                    <Search className="h-5 w-5" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Where would you like to go? (e.g., Shimla, Coorg, Delhi)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 bg-transparent py-6 text-base text-white placeholder:text-white/70"
                  />
                  <Button 
                    type="submit" 
                    disabled={isSearching}
                    className="bg-gradient-to-r from-travel-teal to-travel-blue hover:from-travel-teal/90 hover:to-travel-blue/90 text-white rounded-full px-6 py-2 m-1 h-12 shadow-lg shadow-travel-teal/20"
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

                <motion.div 
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4/5 h-16 bg-travel-teal/20 blur-2xl rounded-full"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </form>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => navigate('/planner')}
                  className="bg-travel-teal hover:bg-travel-teal/90 text-white px-6 py-2 rounded-full shadow-lg shadow-travel-teal/20 text-lg"
                >
                  Start Planning
                  <motion.div 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <MapPin className="ml-2 h-5 w-5" />
                  </motion.div>
                </Button>

                <Button
                  onClick={scrollToFeatures}
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 px-6 py-2 rounded-full text-lg"
                >
                  Explore Features
                  <Route className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            <div className="mt-12 flex flex-wrap justify-center gap-2 text-sm">
              <span className="text-white/90">Popular Destinations:</span>
              {["Himachal", "Goa", "Kerala", "Rajasthan", "Uttarakhand"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => setSearchQuery(item)}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
            
            <div className="mt-10">
              <p className="text-white/80 mb-3">Quick plan popular trips:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Shimla, India', 'Munnar, Kerala', 'Darjeeling, West Bengal', 'Coorg, Karnataka'].map((destination) => (
                  <motion.div
                    key={destination}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => handlePlanTrip(destination)}
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
                    >
                      Plan {destination.split(',')[0]} Trip
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white flex justify-center items-start p-1">
          <motion.div 
            className="w-1 h-3 bg-white rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.2
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
