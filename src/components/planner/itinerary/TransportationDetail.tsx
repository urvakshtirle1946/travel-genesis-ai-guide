
import React from 'react';
import { motion } from 'framer-motion';
import { BadgeIndianRupee, Plane } from 'lucide-react';
import { TransportOption } from '@/types/planner';

interface TransportationDetailProps {
  transportation: TransportOption;
  origin: string;
  destination: string;
}

const TransportationDetail: React.FC<TransportationDetailProps> = ({ 
  transportation, 
  origin, 
  destination 
}) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-travel-blue/5 to-travel-teal/5"></div>
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-travel-blue/20 relative">
        <h3 className="font-semibold text-lg text-travel-navy mb-4 flex items-center gap-2">
          <Plane className="h-5 w-5 text-travel-teal" />
          Selected Transportation
        </h3>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-travel-blue/10 to-travel-teal/10 rounded-full">
              {transportation.icon}
            </div>
            <div>
              <h4 className="font-medium text-lg text-travel-navy">{transportation.name}</h4>
              <div className="text-sm text-gray-500 mt-1">
                Provider: {transportation.provider}
                {transportation.stops > 0 && <span> • {transportation.stops} stop{transportation.stops > 1 ? 's' : ''}</span>}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-travel-blue flex items-center gap-1 justify-end">
              <BadgeIndianRupee className="h-4 w-4" />
              {transportation.price.toLocaleString('en-IN')}
            </div>
            <div className="text-sm text-gray-500">{transportation.duration}</div>
          </div>
        </div>
        <div className="mt-6 flex justify-between text-sm relative">
          <div className="w-full h-[1px] bg-gray-300 absolute top-4"></div>
          
          <div className="bg-white px-3 z-10">
            <div className="font-medium">{transportation.departure}</div>
            <div className="text-gray-500">{origin.split(',')[0]}</div>
          </div>
          
          <div className="z-10 bg-white px-4">
            <div className="text-xs text-center text-gray-500 -mt-2 mb-2">{transportation.duration}</div>
          </div>
          
          <div className="bg-white px-3 z-10">
            <div className="font-medium text-right">{transportation.arrival}</div>
            <div className="text-gray-500 text-right">{destination.split(',')[0]}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransportationDetail;
