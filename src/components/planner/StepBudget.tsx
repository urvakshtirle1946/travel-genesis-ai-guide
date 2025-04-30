
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BadgeDollarSign } from "lucide-react";

interface StepBudgetProps {
  budgetType: 'fixed' | 'flexible';
  budget: number;
  suggestedBudget: { min: number; max: number; average: number };
  destination: string;
  onBudgetTypeChange: (value: 'fixed' | 'flexible') => void;
  onBudgetChange: (value: number[]) => void;
}

const StepBudget: React.FC<StepBudgetProps> = ({
  budgetType,
  budget,
  suggestedBudget,
  destination,
  onBudgetTypeChange,
  onBudgetChange
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-travel-navy">Choose Your Budget</h2>
      <p className="text-gray-600 mb-4">
        Set your daily budget for {destination.split(',')[0]}
      </p>
      
      <div className="space-y-8">
        <RadioGroup 
          value={budgetType} 
          onValueChange={onBudgetTypeChange}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="fixed" id="fixed" />
            <Label htmlFor="fixed" className="flex-1 cursor-pointer">
              <div className="font-medium">Fixed Budget</div>
              <div className="text-sm text-gray-500">I have a specific budget that I want to stick to</div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="flexible" id="flexible" />
            <Label htmlFor="flexible" className="flex-1 cursor-pointer">
              <div className="font-medium">Flexible Budget</div>
              <div className="text-sm text-gray-500">I'm open to different price ranges based on experiences</div>
            </Label>
          </div>
        </RadioGroup>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Label htmlFor="budget" className="font-medium">Daily Budget</Label>
            <div className="bg-travel-teal/10 text-travel-teal px-3 py-1 rounded-full font-medium">
              ${budget}/day
            </div>
          </div>

          <Slider
            id="budget"
            min={suggestedBudget.min}
            max={suggestedBudget.max}
            step={10}
            value={[budget]}
            onValueChange={onBudgetChange}
            className="my-4"
          />

          <div className="flex justify-between text-sm text-gray-500">
            <div>Budget ({destination.split(',')[0]})</div>
            <div className="flex space-x-4">
              <span>Min: ${suggestedBudget.min}</span>
              <span>Avg: ${suggestedBudget.average}</span>
              <span>Max: ${suggestedBudget.max}</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-start space-x-3">
              <BadgeDollarSign className="h-5 w-5 text-travel-teal mt-0.5" />
              <div>
                <h4 className="font-medium text-travel-navy">Budget Tip</h4>
                <p className="text-sm text-gray-600">
                  The average daily cost in {destination.split(',')[0]} is around ${suggestedBudget.average}, 
                  including accommodation, meals, and attractions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepBudget;
