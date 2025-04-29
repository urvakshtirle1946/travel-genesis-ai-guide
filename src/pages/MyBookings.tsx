
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Hotel, Plane, CalendarRange } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface Booking {
  id: number;
  type: string;
  departure?: string;
  destination?: string;
  location?: string;
  hotelName?: string;
  activityName?: string;
  departureDate?: string;
  returnDate?: string;
  checkIn?: string;
  checkOut?: string;
  date?: string;
  passengers?: number;
  rooms?: number;
  participants?: number;
  status: string;
}

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to view your bookings");
      return;
    }
    
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, [user]);

  const getBookingIcon = (type: string) => {
    switch(type) {
      case 'flight': 
        return <Plane className="h-5 w-5 text-travel-blue" />;
      case 'hotel': 
        return <Hotel className="h-5 w-5 text-travel-teal" />;
      case 'activity': 
        return <CalendarRange className="h-5 w-5 text-travel-navy" />;
      default: 
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'confirmed': 
        return "bg-green-100 text-green-800";
      case 'pending': 
        return "bg-yellow-100 text-yellow-800";
      case 'cancelled': 
        return "bg-red-100 text-red-800";
      default: 
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelBooking = (id: number) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? {...booking, status: 'cancelled'} : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    toast.success("Booking cancelled successfully");
  };

  const handleNewBooking = () => {
    navigate('/booking');
  };

  const formatDateString = (dateStr: string | undefined) => {
    if (!dateStr) return 'N/A';
    try {
      return format(new Date(dateStr), 'PP');
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 text-travel-navy">
              My Bookings
            </h1>
            <Button 
              onClick={handleNewBooking}
              className="bg-travel-blue hover:bg-travel-blue/90"
            >
              New Booking
            </Button>
          </div>
          
          {!user ? (
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h2 className="text-xl font-medium text-travel-navy mb-2">Sign In Required</h2>
              <p className="text-gray-600 mb-4">Please sign in to view your bookings.</p>
              <Button onClick={() => navigate('/')} variant="outline">Return to Home</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <Tabs defaultValue="all">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Bookings</TabsTrigger>
                  <TabsTrigger value="flight">Flights</TabsTrigger>
                  <TabsTrigger value="hotel">Hotels</TabsTrigger>
                  <TabsTrigger value="activity">Activities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {bookings.length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-gray-500 mb-4">You don't have any bookings yet.</p>
                        <Button onClick={handleNewBooking}>Make Your First Booking</Button>
                      </CardContent>
                    </Card>
                  ) : (
                    bookings.map((booking) => (
                      <BookingCard 
                        key={booking.id}
                        booking={booking}
                        getBookingIcon={getBookingIcon}
                        getStatusColor={getStatusColor}
                        formatDateString={formatDateString}
                        onCancel={() => handleCancelBooking(booking.id)}
                      />
                    ))
                  )}
                </TabsContent>
                
                {['flight', 'hotel', 'activity'].map(type => (
                  <TabsContent key={type} value={type} className="space-y-4">
                    {bookings.filter(b => b.type === type).length === 0 ? (
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="text-gray-500 mb-4">You don't have any {type} bookings yet.</p>
                          <Button onClick={handleNewBooking}>Book a {type === 'flight' ? 'Flight' : type === 'hotel' ? 'Hotel' : 'Activity'}</Button>
                        </CardContent>
                      </Card>
                    ) : (
                      bookings
                        .filter(booking => booking.type === type)
                        .map(booking => (
                          <BookingCard 
                            key={booking.id}
                            booking={booking}
                            getBookingIcon={getBookingIcon}
                            getStatusColor={getStatusColor}
                            formatDateString={formatDateString}
                            onCancel={() => handleCancelBooking(booking.id)}
                          />
                        ))
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface BookingCardProps {
  booking: Booking;
  getBookingIcon: (type: string) => JSX.Element | null;
  getStatusColor: (status: string) => string;
  formatDateString: (date: string | undefined) => string;
  onCancel: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ 
  booking, 
  getBookingIcon, 
  getStatusColor, 
  formatDateString,
  onCancel 
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2 flex-row items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          {getBookingIcon(booking.type)}
          <div>
            <CardTitle className="text-lg">
              {booking.type === 'flight' ? (
                <>Flight: {booking.departure} to {booking.destination}</>
              ) : booking.type === 'hotel' ? (
                <>{booking.hotelName || 'Hotel'} in {booking.location}</>
              ) : (
                <>{booking.activityName} in {booking.location}</>
              )}
            </CardTitle>
            <CardDescription>
              Booking #{booking.id}
            </CardDescription>
          </div>
        </div>
        <Badge className={getStatusColor(booking.status)}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        {booking.type === 'flight' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Departure</p>
              <p className="font-medium">{formatDateString(booking.departureDate as string)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Return</p>
              <p className="font-medium">{formatDateString(booking.returnDate as string)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="font-medium">{booking.departure}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">To</p>
              <p className="font-medium">{booking.destination}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Passengers</p>
              <p className="font-medium">{booking.passengers}</p>
            </div>
          </div>
        )}
        
        {booking.type === 'hotel' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Hotel</p>
              <p className="font-medium">{booking.hotelName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{booking.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Check-in</p>
              <p className="font-medium">{formatDateString(booking.checkIn as string)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Check-out</p>
              <p className="font-medium">{formatDateString(booking.checkOut as string)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rooms</p>
              <p className="font-medium">{booking.rooms}</p>
            </div>
          </div>
        )}
        
        {booking.type === 'activity' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Activity</p>
              <p className="font-medium">{booking.activityName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{booking.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{formatDateString(booking.date as string)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Participants</p>
              <p className="font-medium">{booking.participants}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 justify-end">
        {booking.status !== 'cancelled' && (
          <Button variant="outline" onClick={onCancel} className="text-red-500 hover:text-red-700">
            Cancel Booking
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MyBookings;
