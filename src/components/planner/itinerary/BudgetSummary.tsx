
import React from 'react';
import { BadgeIndianRupee } from 'lucide-react';
import BudgetOverview from '@/components/budget/BudgetOverview';

interface BudgetSummaryProps {
  totalBudget: number;
  totalTripCost: number;
  dailyBudget: number;
  remainingBudget: number;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({
  totalBudget,
  totalTripCost,
  dailyBudget,
  remainingBudget
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 opacity-70"></div>
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-blue-100/50 relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <BadgeIndianRupee className="h-5 w-5 text-travel-teal" />
            <h3 className="font-semibold text-xl text-travel-navy">Trip Budget Summary</h3>
          </div>
          <div className="text-xl font-bold text-travel-teal bg-travel-teal/10 px-4 py-1.5 rounded-full">
            ₹{totalTripCost.toLocaleString('en-IN')} <span className="text-sm font-normal">total</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
            <div className="text-sm text-gray-500 mb-1">Total Budget</div>
            <div className="text-lg font-medium text-travel-navy">₹{totalBudget.toLocaleString('en-IN')}</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
            <div className="text-sm text-gray-500 mb-1">Daily Budget</div>
            <div className="text-lg font-medium text-travel-navy">₹{dailyBudget.toLocaleString('en-IN')}/day</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-50">
            <div className="text-sm text-gray-500 mb-1">Budget Status</div>
            <div className={`text-lg font-medium ${
              remainingBudget < 0 ? "text-red-500" : "text-green-500"}`
            }>
              {remainingBudget < 0 
                ? `₹${Math.abs(remainingBudget).toLocaleString('en-IN')} over budget` 
                : `₹${remainingBudget.toLocaleString('en-IN')} under budget`}
            </div>
          </div>
        </div>
        
        <BudgetOverview 
          totalBudget={totalBudget} 
          totalSpent={totalTripCost} 
          remainingBudget={remainingBudget} 
        />
      </div>
    </div>
  );
};

export default BudgetSummary;
