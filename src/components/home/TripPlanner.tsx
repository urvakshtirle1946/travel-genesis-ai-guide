
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, BadgeDollarSign, Zap } from "lucide-react";

const features = [
  {
    icon: <CalendarDays className="h-8 w-8 text-travel-teal" />,
    title: 'Smart Itineraries',
    description: 'AI-powered trip planning that creates personalized day-by-day itineraries based on your interests.'
  },
  {
    icon: <MapPin className="h-8 w-8 text-travel-teal" />,
    title: 'Location Intelligence',
    description: 'Discover hidden gems and must-see attractions with local insights and crowd-sourced recommendations.'
  },
  {
    icon: <BadgeDollarSign className="h-8 w-8 text-travel-teal" />,
    title: 'Budget Optimization',
    description: 'Track expenses and get AI suggestions to optimize your spending while traveling.'
  },
  {
    icon: <Zap className="h-8 w-8 text-travel-teal" />,
    title: 'Smart Recommendations',
    description: 'Receive real-time recommendations based on your location, preferences, and travel history.'
  }
];

const TripPlanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-travel-navy">
              Plan Your Perfect Trip with AI
            </h2>
            <p className="text-gray-600 mb-8">
              Our AI-powered trip planner creates customized itineraries based on your preferences, budget, and travel style. Get personalized recommendations and maximize your travel experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-travel-navy">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={() => navigate('/planner')}
              className="bg-travel-blue hover:bg-travel-blue/90 text-white"
              size="lg"
            >
              Create Your Itinerary
            </Button>
          </div>
          
          {/* Right side - Image/Illustration */}
          <div className="bg-travel-sand rounded-2xl p-6 shadow-lg overflow-hidden">
            <div className="relative">
              {/* Mockup placeholder */}
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-bold text-travel-navy">Bali Adventure</h4>
                    <p className="text-sm text-gray-500">May 15-22, 2023</p>
                  </div>
                  <Button variant="outline" size="sm">Edit Plan</Button>
                </div>
                
                {/* Sample itinerary item */}
                {[1, 2, 3].map((day) => (
                  <div key={day} className="mb-4 pb-4 border-b last:border-0">
                    <h5 className="font-semibold text-travel-blue mb-2">Day {day}</h5>
                    <div className="pl-4 border-l-2 border-travel-teal/30">
                      <div className="mb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Morning: {day === 1 ? 'Ubud Sacred Monkey Forest' : day === 2 ? 'Tegallalang Rice Terraces' : 'Uluwatu Temple'}</p>
                            <p className="text-xs text-gray-500">{day === 1 ? '9:00 AM - 11:30 AM' : day === 2 ? '8:30 AM - 11:00 AM' : '9:30 AM - 12:00 PM'}</p>
                          </div>
                          <Badge variant="outline" size="sm" className="text-xs bg-travel-teal/10 text-travel-teal border-0">
                            {day === 1 ? 'Wildlife' : day === 2 ? 'Nature' : 'Culture'}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Additional activities would go here */}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 h-24 w-24 bg-travel-teal/10 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-travel-blue/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripPlanner;
