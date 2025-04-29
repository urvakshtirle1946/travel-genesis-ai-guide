
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LockOpen } from "lucide-react";
import AuthModal from './AuthModal';

const AuthPrompt: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-travel-navy">
          Unlock All Features
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sign in to access personalized trip recommendations, save your favorite destinations, 
          and create custom travel itineraries.
        </p>
        
        <Button 
          onClick={() => setAuthModalOpen(true)}
          className="bg-travel-teal hover:bg-travel-teal/90 text-white"
          size="lg"
        >
          <LockOpen className="mr-2 h-4 w-4" />
          Sign In to Continue
        </Button>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Personalized Recommendations",
              description: "Get travel suggestions based on your preferences and past trips."
            },
            {
              title: "Save Favorites",
              description: "Bookmark destinations and activities to build your dream itinerary."
            },
            {
              title: "Custom Itineraries",
              description: "Plan your perfect trip with our AI-powered travel assistant."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-3 text-travel-navy">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </section>
  );
};

export default AuthPrompt;
