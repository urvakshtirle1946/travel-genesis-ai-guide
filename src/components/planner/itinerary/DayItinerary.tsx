
import React from 'react';
import { motion } from 'framer-motion';
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { BadgeIndianRupee } from 'lucide-react';
import { ItineraryDay } from '@/types/planner';

interface DayItineraryProps {
  day: ItineraryDay;
  startDate: Date | undefined;
  destination: string;
}

const DayItinerary: React.FC<DayItineraryProps> = ({ 
  day, 
  startDate, 
  destination 
}) => {
  return (
    <motion.div 
      className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100 mb-6 relative"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-travel-blue/5 to-travel-teal/5 -z-10"></div>
      
      <div className="bg-gradient-to-r from-travel-blue to-travel-teal text-white p-4">
        <h3 className="text-xl font-medium">Day {day.day}</h3>
        {startDate && (
          <p className="text-sm opacity-90">
            {format(
              new Date(startDate.getTime() + (day.day - 1) * 24 * 60 * 60 * 1000), 
              "EEEE, MMMM d, yyyy"
            )}
          </p>
        )}
      </div>
      
      <div className="divide-y">
        {day.activities.map((activity, index) => (
          <motion.div 
            key={index} 
            className="p-4 hover:bg-gray-50 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex justify-between">
              <span className="font-medium text-travel-navy bg-travel-blue/10 px-2 py-0.5 rounded">{activity.time}</span>
              <div className="flex items-center space-x-2">
                {activity.cost !== undefined && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center">
                    <BadgeIndianRupee className="h-3 w-3 mr-0.5" />
                    {activity.cost.toLocaleString('en-IN')}
                  </span>
                )}
                <Badge className="bg-travel-teal/10 text-travel-teal hover:bg-travel-teal/20 border-0">
                  {activity.type}
                </Badge>
              </div>
            </div>
            <h4 className="font-semibold mt-2 text-lg">{activity.title}</h4>
            <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
          </motion.div>
        ))}

        <div className="p-4 bg-gray-50/80">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg className="h-4 w-4 text-travel-teal mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Accommodation</span>
            </div>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center">
              <BadgeIndianRupee className="h-3 w-3 mr-0.5" />
              {destination.toLowerCase().includes('bali') ? '2,800' : 
               destination.toLowerCase().includes('paris') ? '8,400' : 
               destination.toLowerCase().includes('tokyo') ? '7,000' : 
               destination.toLowerCase().includes('new york') ? '10,500' : '5,600'}
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-1 ml-6">
            {destination.toLowerCase().includes('bali') ? 'Standard Villa' : 
             destination.toLowerCase().includes('paris') ? 'Boutique Hotel' : 
             destination.toLowerCase().includes('tokyo') ? 'Business Hotel' : 
             destination.toLowerCase().includes('new york') ? 'Manhattan Hotel' : 'Standard Hotel'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DayItinerary;
