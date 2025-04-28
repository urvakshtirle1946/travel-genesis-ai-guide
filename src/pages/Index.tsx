
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import TripPlanner from '@/components/home/TripPlanner';
import AIAssistant from '@/components/ai/AIAssistant';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturedDestinations />
        <TripPlanner />
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
