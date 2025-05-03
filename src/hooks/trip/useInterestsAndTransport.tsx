
import { useState } from 'react';
import { toast } from 'sonner';
import { TransportOption } from '@/types/planner';

export const useInterestsAndTransport = () => {
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedTransportation, setSelectedTransportation] = useState<TransportOption | undefined>(undefined);

  const updateInterests = (interest: string, checked: boolean) => {
    if (checked) {
      setInterests(prev => [...prev, interest]);
    } else {
      setInterests(prev => prev.filter((i) => i !== interest));
    }
  };

  const updateTransportation = (option: TransportOption) => {
    setSelectedTransportation(option);
    toast.success(`Selected ${option.type} transportation option`);
  };

  return {
    interests,
    selectedTransportation,
    updateInterests,
    updateTransportation,
    setInterests,
    setSelectedTransportation
  };
};

export default useInterestsAndTransport;
