
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarRange, Hotel, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access the Booking system");
    }
  }, [user]);

  const bookingOptions = [
    {
      title: 'Flight Booking',
      description: 'Search and book flights to your destination',
      icon: <Plane className="h-8 w-8 text-travel-blue" />,
    },
    {
      title: 'Hotel Booking',
      description: 'Find hotels, apartments, and other accommodations',
      icon: <Hotel className="h-8 w-8 text-travel-teal" />,
    },
    {
      title: 'Activity Booking',
      description: 'Discover and book tours, attractions, and activities',
      icon: <CalendarRange className="h-8 w-8 text-travel-navy" />,
    }
  ];

  const handleBookNow = (bookingType: string) => {
    if (!user) {
      toast.error("Please sign in to book a " + bookingType.toLowerCase());
      return;
    }
    toast.info(`${bookingType} feature coming soon!`);
  };

  const handlePlanTrip = () => {
    navigate('/planner');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-travel-navy">
            Booking System
          </h1>
          
          {!user ? (
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h2 className="text-xl font-medium text-travel-navy mb-2">Sign In Required</h2>
              <p className="text-gray-600 mb-4">Please sign in to access the Booking system.</p>
              <Button onClick={() => navigate('/')} variant="outline">Return to Home</Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold text-travel-navy mb-4">Book Your Travel Services</h2>
                <p className="text-gray-600 mb-6">Find and book the best flights, hotels, and activities for your trip.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {bookingOptions.map((option, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="mb-2">{option.icon}</div>
                        <CardTitle>{option.title}</CardTitle>
                        <CardDescription>{option.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-2">
                        <Button 
                          className="w-full bg-travel-blue hover:bg-travel-blue/90"
                          onClick={() => handleBookNow(option.title)}
                        >
                          Book Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-travel-navy">Need help planning your trip?</h3>
                    <p className="text-gray-600">Use our AI-powered Trip Planner to create a personalized itinerary.</p>
                  </div>
                  <Button 
                    className="bg-travel-teal hover:bg-travel-teal/90"
                    onClick={handlePlanTrip}
                  >
                    Create Itinerary
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
