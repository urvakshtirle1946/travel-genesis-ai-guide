
export type TripData = {
  origin: string;
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  budgetType: 'fixed' | 'flexible';
  budget: number;
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
};

export type Interest = {
  id: string;
  label: string;
};
