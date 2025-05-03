
export type TripData = {
  origin: string;
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  budgetType: 'fixed' | 'flexible';
  budget: number;
  totalBudget: number;
  interests: string[];
  selectedTransportation?: TransportOption;
};

export type ItineraryDay = {
  day: number;
  activities: {
    time: string;
    title: string;
    description: string;
    type: string;
    cost?: number;
  }[];
};

export type TransportOption = {
  id: string;
  type: string;
  name: string;
  provider: string;
  price: number;
  duration: string;
  departure: string;
  arrival: string;
  stops: number;
  icon: React.ReactNode;
  rating?: number;
  reviews?: number;
  availability?: 'available' | 'limited' | 'full';
  status?: 'on-time' | 'delayed' | 'cancelled';
  delayMinutes?: number;
  distance?: string;
  livePrice?: boolean;
};

export type Interest = {
  id: string;
  label: string;
};

export type HotelOption = {
  id: string;
  name: string;
  price: number;
  pricePerNight: number;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  amenities: string[];
  checkInAvailable: boolean;
  images: string[];
  availability: 'high' | 'medium' | 'low';
};

export type ShoppingOption = {
  id: string;
  name: string;
  type: 'mall' | 'market' | 'street' | 'boutique';
  priceRange: {
    min: number;
    max: number;
  };
  address: string;
  distance: string;
  closingTime: string;
  hoursLeft: number;
  crowdedness: 'low' | 'medium' | 'high';
  offers?: string[];
  categories: string[];
};

export type FoodOption = {
  id: string;
  name: string;
  cuisine: string[];
  priceForTwo: number;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  closingTime: string;
  availability: 'high' | 'medium' | 'low';
  offers?: string[];
  bestDishes?: string[];
};

export type LiveRecommendation = {
  transport: TransportOption[];
  hotels: HotelOption[];
  shopping: ShoppingOption[];
  food: FoodOption[];
};
