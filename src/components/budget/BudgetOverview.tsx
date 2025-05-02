
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface BudgetOverviewProps {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ 
  totalBudget, 
  totalSpent, 
  remainingBudget 
}) => {
  const percentSpent = (totalSpent / totalBudget) * 100;
  
  return (
    <Card className="overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/80 to-teal-50/50 rounded-lg -z-10"></div>
      <CardHeader>
        <CardTitle className="text-2xl text-travel-navy">Budget Overview</CardTitle>
        <CardDescription>Total budget vs. amount spent</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-gray-600">Total Budget:</span>
          <span className="font-medium text-travel-navy text-lg">₹{totalBudget.toLocaleString('en-IN')}</span>
        </motion.div>
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-gray-600">Total Spent:</span>
          <span className="font-medium text-travel-navy text-lg">₹{totalSpent.toLocaleString('en-IN')}</span>
        </motion.div>
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-gray-600">Remaining Budget:</span>
          <span className={`font-medium text-lg ${remainingBudget < 0 ? 'text-red-500' : 'text-green-500'}`}>
            ₹{remainingBudget.toLocaleString('en-IN')}
          </span>
        </motion.div>
        
        <div className="pt-2">
          <div className="flex justify-between text-xs mb-1 text-gray-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ originX: 0 }}
          >
            <Progress 
              value={percentSpent > 100 ? 100 : percentSpent} 
              className={remainingBudget < 0 ? 'bg-red-100 h-3 rounded-lg' : 'h-3 rounded-lg bg-gray-100'}
              indicatorClassName={remainingBudget < 0 ? 'bg-red-500' : 'bg-green-500'}
            />
          </motion.div>
          
          <div className="flex justify-end mt-2">
            <span className="text-xs text-gray-500">
              {percentSpent.toFixed(0)}% spent
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500 bg-gray-50/50 border-t">
        <div className="flex items-center">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Updated as of today
        </div>
      </CardFooter>
    </Card>
  );
};

export default BudgetOverview;
