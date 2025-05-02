
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart } from 'lucide-react';

interface BudgetCategory {
  id: number;
  name: string;
  budget: number;
  spent: number;
  icon: React.ReactNode;
}

interface CategorySpendingProps {
  categories: BudgetCategory[];
}

const CategorySpending: React.FC<CategorySpendingProps> = ({ categories }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Visualize spending across different categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <PieChart className="h-48 w-48" />
        </div>
        <ul className="space-y-2 mt-4">
          {categories.map(category => (
            <li key={category.id} className="flex items-center justify-between">
              <div className="flex items-center">
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </div>
              <div className="text-right">
                <div>₹{category.spent.toFixed(2)} <span className="text-gray-400">/ ₹{category.budget.toFixed(2)}</span></div>
                <Progress 
                  value={(category.spent / category.budget) * 100} 
                  className={`h-1 w-24 ${category.spent > category.budget ? 'bg-red-100' : ''}`}
                />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CategorySpending;
