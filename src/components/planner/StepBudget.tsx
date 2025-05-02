
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BadgeDollarSign, Info, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  // Show detailed budget breakdown based on travel days
  const [showDetails, setShowDetails] = useState(false);
  
  // Extract destination city name for display
  const destinationCity = destination.split(',')[0];
  
  const budgetRange = {
    low: { label: 'Budget', value: suggestedBudget.min, description: 'Basic accommodations and local food' },
    medium: { label: 'Standard', value: suggestedBudget.average, description: 'Mid-range hotels and dining options' },
    high: { label: 'Premium', value: suggestedBudget.max, description: 'Luxury accommodations and fine dining' }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-travel-navy">Choose Your Budget</h2>
          <p className="text-gray-600">
            Set your daily budget for {destinationCity}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Need help?</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-travel-teal cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Choose your budget type and amount. The suggested budget is based on typical travel costs in {destinationCity}.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-4 border border-blue-100">
          <RadioGroup 
            value={budgetType} 
            onValueChange={onBudgetTypeChange}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <div className={`flex items-center space-x-2 border p-4 rounded-md hover:bg-white/80 cursor-pointer transition-all ${budgetType === 'fixed' ? 'bg-white shadow-sm border-travel-teal/30' : 'bg-transparent'}`}>
              <RadioGroupItem value="fixed" id="fixed" className="text-travel-teal" />
              <Label htmlFor="fixed" className="flex-1 cursor-pointer">
                <div className="font-medium text-travel-navy">Fixed Budget</div>
                <div className="text-sm text-gray-500">I have a specific budget that I want to stick to</div>
              </Label>
            </div>
            
            <div className={`flex items-center space-x-2 border p-4 rounded-md hover:bg-white/80 cursor-pointer transition-all ${budgetType === 'flexible' ? 'bg-white shadow-sm border-travel-teal/30' : 'bg-transparent'}`}>
              <RadioGroupItem value="flexible" id="flexible" className="text-travel-teal" />
              <Label htmlFor="flexible" className="flex-1 cursor-pointer">
                <div className="font-medium text-travel-navy">Flexible Budget</div>
                <div className="text-sm text-gray-500">I'm open to different price ranges based on experiences</div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Label htmlFor="budget" className="font-medium text-lg text-travel-navy">Daily Budget</Label>
            <motion.div 
              key={budget}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-travel-teal/10 text-travel-teal px-4 py-2 rounded-full font-medium"
            >
              ₹{budget}/day
            </motion.div>
          </div>

          <div className="px-2">
            <Slider
              id="budget"
              min={suggestedBudget.min}
              max={suggestedBudget.max}
              step={500}
              value={[budget]}
              onValueChange={onBudgetChange}
              className="my-6"
            />

            <div className="grid grid-cols-3 gap-2 text-sm text-gray-500 mb-4">
              {Object.entries(budgetRange).map(([key, { label, value }]) => (
                <div key={key} className="flex flex-col items-center">
                  <span className={`font-medium ${value === budget ? 'text-travel-teal' : ''}`}>
                    {label}
                  </span>
                  <span className="text-xs">₹{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(budgetRange).map(([key, { label, value, description }]) => (
              <div 
                key={key} 
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm
                  ${budget === value ? 'border-travel-teal bg-travel-teal/5' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => onBudgetChange([value])}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-travel-navy">{label}</span>
                  <span className="font-bold text-travel-teal">₹{value}</span>
                </div>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            ))}
          </div>

          <div 
            className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-travel-teal/30 hover:bg-travel-teal/5 transition-all"
          >
            <div className="flex items-start space-x-3">
              <BadgeDollarSign className="h-5 w-5 text-travel-teal mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-travel-navy">Budget Tip</h4>
                  <TrendingUp className="h-3.5 w-3.5 text-travel-teal" />
                </div>
                <p className="text-sm text-gray-600">
                  The average daily cost in {destinationCity} is around ₹{suggestedBudget.average}, 
                  including accommodation, meals, and attractions.
                </p>
                
                <button 
                  onClick={() => setShowDetails(!showDetails)} 
                  className="text-xs text-travel-teal mt-2 hover:underline"
                >
                  {showDetails ? 'Hide details' : 'View detailed breakdown'}
                </button>
                
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-gray-200 text-sm"
                  >
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Accommodation</span>
                        <span className="text-travel-navy">₹{Math.round(suggestedBudget.average * 0.45)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Food &amp; Drinks</span>
                        <span className="text-travel-navy">₹{Math.round(suggestedBudget.average * 0.30)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Activities</span>
                        <span className="text-travel-navy">₹{Math.round(suggestedBudget.average * 0.15)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transportation</span>
                        <span className="text-travel-navy">₹{Math.round(suggestedBudget.average * 0.10)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StepBudget;
