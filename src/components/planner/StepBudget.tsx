
import React, { useState, useEffect } from 'react';
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BadgeDollarSign, BadgeIndianRupee, Info, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { calculateTripDuration } from '@/utils/dateUtils';

interface StepBudgetProps {
  budgetType: 'fixed' | 'flexible';
  budget: number;
  totalBudget: number;
  suggestedBudget: { min: number; max: number; average: number };
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onBudgetTypeChange: (value: 'fixed' | 'flexible') => void;
  onBudgetChange: (value: number[]) => void;
  onTotalBudgetChange: (value: number[]) => void;
}

const StepBudget: React.FC<StepBudgetProps> = ({
  budgetType,
  budget,
  totalBudget,
  suggestedBudget,
  destination,
  startDate,
  endDate,
  onBudgetTypeChange,
  onBudgetChange,
  onTotalBudgetChange
}) => {
  // Show detailed budget breakdown based on travel days
  const [showDetails, setShowDetails] = useState(false);
  
  // Extract destination city name for display
  const destinationCity = destination.split(',')[0];
  
  // Calculate trip duration
  const tripDuration = calculateTripDuration(startDate, endDate);
  
  // Calculate suggested total budgets based on trip duration
  const totalSuggestedBudget = {
    min: suggestedBudget.min * (tripDuration || 1),
    max: suggestedBudget.max * (tripDuration || 1),
    average: suggestedBudget.average * (tripDuration || 1)
  };
  
  // Calculate daily budget from total budget
  useEffect(() => {
    if (tripDuration && tripDuration > 0) {
      onBudgetChange([Math.round(totalBudget / tripDuration)]);
    }
  }, [totalBudget, tripDuration]);
  
  const budgetRange = {
    low: { 
      label: 'Budget', 
      value: totalSuggestedBudget.min, 
      description: 'Basic accommodations and local food',
      icon: '🛌'
    },
    medium: { 
      label: 'Standard', 
      value: totalSuggestedBudget.average, 
      description: 'Mid-range hotels and dining options',
      icon: '🏨'
    },
    high: { 
      label: 'Premium', 
      value: totalSuggestedBudget.max, 
      description: 'Luxury accommodations and fine dining',
      icon: '✨'
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-travel-navy bg-clip-text text-transparent bg-gradient-to-r from-travel-blue to-travel-teal">
            Choose Your Budget
          </h2>
          <p className="text-gray-600">
            Set your total budget for {tripDuration} {tripDuration === 1 ? 'day' : 'days'} in {destinationCity}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Need help?</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-travel-teal cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-white/90 backdrop-blur-sm border border-blue-100">
                <p>Choose your budget type and total amount for your {tripDuration}-day trip to {destinationCity}.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="space-y-8">
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 opacity-70"></div>
          <RadioGroup 
            value={budgetType} 
            onValueChange={onBudgetTypeChange}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 relative"
          >
            <div className={`flex items-center space-x-3 p-4 rounded-lg transition-all cursor-pointer group ${budgetType === 'fixed' ? 'bg-white shadow border border-travel-teal/30' : 'bg-white/60 border border-gray-200 hover:bg-white/80'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${budgetType === 'fixed' ? 'bg-travel-teal text-white' : 'border border-gray-300'}`}>
                {budgetType === 'fixed' && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                )}
              </div>
              <Label className="flex-1 cursor-pointer">
                <div className="font-medium text-travel-navy">Fixed Budget</div>
                <div className="text-sm text-gray-500">I have a specific budget that I want to stick to</div>
              </Label>
            </div>
            
            <div className={`flex items-center space-x-3 p-4 rounded-lg transition-all cursor-pointer group ${budgetType === 'flexible' ? 'bg-white shadow border border-travel-teal/30' : 'bg-white/60 border border-gray-200 hover:bg-white/80'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${budgetType === 'flexible' ? 'bg-travel-teal text-white' : 'border border-gray-300'}`}>
                {budgetType === 'flexible' && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                )}
              </div>
              <Label className="flex-1 cursor-pointer">
                <div className="font-medium text-travel-navy">Flexible Budget</div>
                <div className="text-sm text-gray-500">I'm open to different price ranges based on experiences</div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BadgeIndianRupee className="h-5 w-5 text-travel-teal" />
              <Label className="font-medium text-lg text-travel-navy">Total Trip Budget</Label>
            </div>
            <motion.div 
              key={totalBudget}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-travel-teal/10 text-travel-teal px-4 py-1.5 rounded-full font-medium"
            >
              ₹{totalBudget.toLocaleString('en-IN')}
            </motion.div>
          </div>

          <div className="px-2">
            <Slider
              id="total-budget"
              min={totalSuggestedBudget.min}
              max={totalSuggestedBudget.max}
              step={1000}
              value={[totalBudget]}
              onValueChange={onTotalBudgetChange}
              className="my-6"
            />

            <div className="grid grid-cols-3 gap-2 text-sm text-gray-500 mb-4">
              {Object.entries(budgetRange).map(([key, { label, value }]) => (
                <div key={key} className="flex flex-col items-center">
                  <span className={`font-medium ${value === totalBudget ? 'text-travel-teal' : ''}`}>
                    {label}
                  </span>
                  <span className="text-xs">₹{value.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between bg-blue-50/50 p-3 rounded-lg border border-travel-blue/10">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-travel-teal" />
              <span className="text-gray-700">Daily budget (calculated)</span>
            </div>
            <span className="text-travel-blue font-medium">
              ₹{budget.toLocaleString('en-IN')}/day
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(budgetRange).map(([key, { label, value, description, icon }]) => (
              <motion.div 
                key={key} 
                whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className={`p-4 rounded-lg cursor-pointer transition-all
                  ${totalBudget === value ? 'bg-gradient-to-br from-travel-teal/10 to-travel-blue/5 border border-travel-teal/30' : 'border border-gray-200 bg-white hover:border-gray-300'}`}
                onClick={() => onTotalBudgetChange([value])}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-travel-navy flex items-center gap-1.5">
                    <span className="text-lg">{icon}</span> {label}
                  </span>
                  <span className="font-bold text-travel-teal">₹{value.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-gray-500">{description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="cursor-pointer relative overflow-hidden rounded-xl"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 opacity-70"></div>
            <div 
              className="p-6 bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-lg relative"
              onClick={() => setShowDetails(!showDetails)}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gradient-to-br from-travel-blue/10 to-travel-teal/10 rounded-full">
                  <BadgeIndianRupee className="h-6 w-6 text-travel-teal" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-lg text-travel-navy">Budget Tip</h4>
                    <TrendingUp className="h-4 w-4 text-travel-teal" />
                  </div>
                  <p className="text-gray-600 mt-1">
                    The average cost for {tripDuration} days in {destinationCity} is around ₹{totalSuggestedBudget.average.toLocaleString('en-IN')}, 
                    including accommodation, meals, and attractions.
                  </p>
                  
                  <button 
                    className="text-xs text-travel-teal mt-2 flex items-center gap-1 hover:underline"
                  >
                    {showDetails ? 'Hide details' : 'View detailed breakdown'}
                    <svg className={`w-3 h-3 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-gray-200 text-sm"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-travel-blue opacity-70 mr-2"></span>
                            <span className="text-gray-600">Accommodation ({tripDuration} {tripDuration === 1 ? 'night' : 'nights'})</span>
                          </div>
                          <span className="text-travel-navy font-medium">₹{Math.round(totalSuggestedBudget.average * 0.45).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-travel-teal opacity-70 mr-2"></span>
                            <span className="text-gray-600">Food &amp; Drinks</span>
                          </div>
                          <span className="text-travel-navy font-medium">₹{Math.round(totalSuggestedBudget.average * 0.30).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-amber-400 opacity-70 mr-2"></span>
                            <span className="text-gray-600">Activities</span>
                          </div>
                          <span className="text-travel-navy font-medium">₹{Math.round(totalSuggestedBudget.average * 0.15).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-purple-400 opacity-70 mr-2"></span>
                            <span className="text-gray-600">Transportation</span>
                          </div>
                          <span className="text-travel-navy font-medium">₹{Math.round(totalSuggestedBudget.average * 0.10).toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="w-full h-6 bg-gray-100 rounded-full mt-4 overflow-hidden">
                        <div className="flex h-full">
                          <div className="bg-travel-blue opacity-70 h-full" style={{ width: "45%" }}></div>
                          <div className="bg-travel-teal opacity-70 h-full" style={{ width: "30%" }}></div>
                          <div className="bg-amber-400 opacity-70 h-full" style={{ width: "15%" }}></div>
                          <div className="bg-purple-400 opacity-70 h-full" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StepBudget;
