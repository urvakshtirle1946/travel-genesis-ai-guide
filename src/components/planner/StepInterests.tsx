
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { interests } from '@/constants/plannerData';

interface StepInterestsProps {
  selectedInterests: string[];
  onInterestChange: (interest: string, checked: boolean) => void;
}

const StepInterests: React.FC<StepInterestsProps> = ({
  selectedInterests,
  onInterestChange
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-travel-navy">Select Your Travel Interests</h2>
      <p className="text-gray-600">Choose at least one interest to personalize your trip</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {interests.map((interest) => (
          <div key={interest.id} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
            <Checkbox 
              id={interest.id} 
              checked={selectedInterests.includes(interest.id)}
              onCheckedChange={(checked) => 
                onInterestChange(interest.id, checked === true)
              }
            />
            <Label htmlFor={interest.id} className="flex-1 cursor-pointer">
              {interest.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepInterests;
