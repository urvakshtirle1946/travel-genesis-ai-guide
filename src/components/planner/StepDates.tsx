
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StepDatesProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
}

const StepDates: React.FC<StepDatesProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => {
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

  const getDaysBetween = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 0;
  };

  const dayCount = getDaysBetween();

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="text-2xl font-semibold text-travel-navy bg-clip-text text-transparent bg-gradient-to-r from-travel-blue to-travel-teal"
        variants={itemVariants}
      >
        Select Your Travel Dates
      </motion.h2>
      
      <motion.div 
        className="relative" 
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-teal-50/50 rounded-lg blur-md"></div>
        <div className="p-6 backdrop-blur-sm bg-white/80 rounded-lg border border-blue-100/50 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="text-lg font-medium text-travel-navy">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal pl-3 h-14 group transition-all duration-200 hover:shadow-md",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-travel-blue/10 flex items-center justify-center mr-3 group-hover:bg-travel-blue/20 transition-colors">
                        <CalendarIcon className="mr-0 h-5 w-5 text-travel-blue" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Departure</span>
                        {startDate ? format(startDate, "EEEE, MMMM d, yyyy") : <span>Choose departure date</span>}
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-2 border-blue-100" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={onStartDateChange}
                    initialFocus
                    className={cn("p-3 pointer-events-auto rounded-md")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-3">
              <Label className="text-lg font-medium text-travel-navy">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal pl-3 h-14 group transition-all duration-200 hover:shadow-md",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-travel-teal/10 flex items-center justify-center mr-3 group-hover:bg-travel-teal/20 transition-colors">
                        <CalendarIcon className="mr-0 h-5 w-5 text-travel-teal" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Return</span>
                        {endDate ? format(endDate, "EEEE, MMMM d, yyyy") : <span>Choose return date</span>}
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-2 border-teal-100" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={onEndDateChange}
                    disabled={(date) => 
                      startDate ? date < startDate : false
                    }
                    initialFocus
                    className={cn("p-3 pointer-events-auto rounded-md")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {startDate && endDate && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 pt-4 border-t border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-travel-blue/10 to-travel-teal/10 flex items-center justify-center">
                    <span className="text-travel-navy font-medium">{dayCount}</span>
                  </div>
                  <div className="ml-3">
                    <span className="text-sm font-medium text-travel-navy">
                      {dayCount === 1 ? '1 Day Trip' : `${dayCount} Days Trip`}
                    </span>
                    <div className="text-xs text-gray-500">
                      {startDate && format(startDate, "MMM d")} - {endDate && format(endDate, "MMM d, yyyy")}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-travel-teal font-medium">
                  Perfect timing!
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StepDates;
