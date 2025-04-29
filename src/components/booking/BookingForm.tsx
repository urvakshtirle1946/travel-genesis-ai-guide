
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarDays, Plane, Hotel, MapPin } from "lucide-react";
import { toast } from "sonner";

interface BookingFormProps {
  bookingType: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ bookingType }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [hotelName, setHotelName] = useState('');
  const [rooms, setRooms] = useState('1');
  const [activityName, setActivityName] = useState('');
  const [participants, setParticipants] = useState('1');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create booking object based on booking type
    let bookingDetails = {};
    switch(bookingType) {
      case 'Flight Booking':
        bookingDetails = {
          type: 'flight',
          departure: location,
          destination: destination,
          departureDate: date,
          returnDate: returnDate,
          passengers: Number(passengers)
        };
        break;
      case 'Hotel Booking':
        bookingDetails = {
          type: 'hotel',
          location: destination,
          hotelName: hotelName,
          checkIn: date,
          checkOut: returnDate,
          rooms: Number(rooms)
        };
        break;
      case 'Activity Booking':
        bookingDetails = {
          type: 'activity',
          location: destination,
          activityName: activityName,
          date: date,
          participants: Number(participants)
        };
        break;
    }
    
    // In a real app, this would be sent to an API
    console.log('Booking details:', bookingDetails);
    
    // Save to localStorage for demonstration
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({
      id: Date.now(),
      ...bookingDetails,
      status: 'confirmed'
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    toast.success(`${bookingType} has been confirmed!`);
    
    // Reset form
    setLocation('');
    setDestination('');
    setHotelName('');
    setActivityName('');
    setPassengers('1');
    setRooms('1');
    setParticipants('1');
  };
  
  // Render different forms based on booking type
  const renderForm = () => {
    switch(bookingType) {
      case 'Flight Booking':
        return (
          <>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">Departure City</Label>
                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-travel-teal/50 focus-within:border-travel-teal">
                    <Plane className="ml-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="from"
                      placeholder="From (e.g. London, New York)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">Destination City</Label>
                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-travel-teal/50 focus-within:border-travel-teal">
                    <MapPin className="ml-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="to"
                      placeholder="To (e.g. Paris, Tokyo)"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departure">Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="departure"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="return">Return Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="return"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passengers">Passengers</Label>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger id="passengers">
                      <SelectValue placeholder="Number of passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'passenger' : 'passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </>
        );
      
      case 'Hotel Booking':
        return (
          <>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Destination</Label>
                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-travel-teal/50 focus-within:border-travel-teal">
                    <MapPin className="ml-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="City (e.g. Paris, Tokyo)"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hotel">Hotel Name</Label>
                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-travel-teal/50 focus-within:border-travel-teal">
                    <Hotel className="ml-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="hotel"
                      placeholder="Hotel name"
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkin">Check-in Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="checkin"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="checkout">Check-out Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="checkout"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rooms">Number of Rooms</Label>
                  <Select value={rooms} onValueChange={setRooms}>
                    <SelectTrigger id="rooms">
                      <SelectValue placeholder="Number of rooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'room' : 'rooms'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </>
        );
      
      case 'Activity Booking':
        return (
          <>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="activityLocation">Location</Label>
                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-travel-teal/50 focus-within:border-travel-teal">
                    <MapPin className="ml-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="activityLocation"
                      placeholder="City (e.g. Paris, Tokyo)"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activity">Activity Name</Label>
                  <Input
                    id="activity"
                    placeholder="Activity name"
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="activityDate">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="activityDate"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="participants">Number of Participants</Label>
                  <Select value={participants} onValueChange={setParticipants}>
                    <SelectTrigger id="participants">
                      <SelectValue placeholder="Number of participants" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">{bookingType}</h3>
        {renderForm()}
        <Button 
          type="submit" 
          className="w-full bg-travel-blue hover:bg-travel-blue/90"
        >
          Book Now
        </Button>
      </form>
    </Card>
  );
};

export default BookingForm;
