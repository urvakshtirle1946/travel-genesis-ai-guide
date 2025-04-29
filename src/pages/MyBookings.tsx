
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Plane, Hotel } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      toast.error("Please sign in to view your bookings");
    }
  }, [user]);

  // Sample bookings data for UI demonstration
  const sampleBookings = [
    {
      id: 'bk-001',
      type: 'Flight',
      destination: 'Paris, France',
      dates: 'May 15, 2023 - May 22, 2023',
      status: 'Confirmed',
      icon: <Plane className="h-4 w-4" />
    },
    {
      id: 'bk-002',
      type: 'Hotel',
      destination: 'Paris, France',
      dates: 'May 15, 2023 - May 22, 2023',
      status: 'Confirmed',
      icon: <Hotel className="h-4 w-4" />
    }
  ];

  const handleNewBooking = () => {
    navigate('/booking');
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800 hover:bg-green-100/80';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-100/80';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100/80';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-travel-navy">
              My Bookings
            </h1>
            {user && (
              <Button 
                onClick={handleNewBooking}
                className="bg-travel-blue hover:bg-travel-blue/90"
              >
                Make New Booking
              </Button>
            )}
          </div>
          
          {!user ? (
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h2 className="text-xl font-medium text-travel-navy mb-2">Sign In Required</h2>
              <p className="text-gray-600 mb-4">Please sign in to view your bookings.</p>
              <Button onClick={() => navigate('/')} variant="outline">Return to Home</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {sampleBookings.length > 0 ? (
                sampleBookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="bg-gray-50 border-b p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-white rounded-full border">
                            {booking.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{booking.type} Booking</h3>
                            <p className="text-sm text-gray-500">#{booking.id}</p>
                          </div>
                        </div>
                        <Badge className={getBadgeColor(booking.status)} variant="outline">
                          {booking.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{booking.destination}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{booking.dates}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                  <h2 className="text-xl font-medium text-travel-navy mb-2">No Bookings Found</h2>
                  <p className="text-gray-600 mb-6">You don't have any bookings yet. Start planning your next adventure!</p>
                  <Button 
                    onClick={handleNewBooking}
                    className="bg-travel-blue hover:bg-travel-blue/90"
                  >
                    Make Your First Booking
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyBookings;
