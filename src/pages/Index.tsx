
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import TripPlanner from '@/components/home/TripPlanner';
import AIAssistant from '@/components/ai/AIAssistant';
import { useAuth } from '@/contexts/AuthContext';
import AuthPrompt from '@/components/auth/AuthPrompt';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        <div id="features-section">
          {user ? (
            <>
              <FeaturedDestinations />
              <TripPlanner />
            </>
          ) : (
            <AuthPrompt />
          )}
        </div>
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
