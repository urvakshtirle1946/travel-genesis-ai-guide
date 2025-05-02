
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <CardDescription>Total budget vs. amount spent</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Total Budget:</span>
          <span className="font-medium">₹{totalBudget.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total Spent:</span>
          <span className="font-medium">₹{totalSpent.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Remaining Budget:</span>
          <span className={`font-medium ${remainingBudget < 0 ? 'text-red-500' : ''}`}>
            ₹{remainingBudget.toFixed(2)}
          </span>
        </div>
        <Progress 
          value={(totalSpent / totalBudget) * 100} 
          className={remainingBudget < 0 ? 'bg-red-100' : ''}
          indicatorClassName={remainingBudget < 0 ? 'bg-red-500' : ''}
        />
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        Updated as of today
      </CardFooter>
    </Card>
  );
};

export default BudgetOverview;
