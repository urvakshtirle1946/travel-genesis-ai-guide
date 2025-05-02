
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

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

const COLORS = ['#26a69a', '#2c88cf', '#0a3a67', '#7e57c2', '#ec407a', '#ef5350', '#ffa726'];

const CategorySpending: React.FC<CategorySpendingProps> = ({ categories }) => {
  // Calculate percentages for the pie chart
  const data = categories.map((category, index) => ({
    name: category.name,
    value: category.spent,
    color: COLORS[index % COLORS.length],
    icon: category.icon
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 inline-block rounded-full" style={{ backgroundColor: item.color }} />
            <span className="font-medium text-gray-700">{item.name}</span>
          </div>
          <p className="text-sm text-gray-600">₹{item.value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border border-gray-100">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-travel-navy">Spending by Category</CardTitle>
              <CardDescription>Visualize spending across categories</CardDescription>
            </div>
            <div className="bg-gray-50 rounded-full p-2">
              <PieChartIcon className="h-5 w-5 text-travel-teal" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48 mb-4">
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 text-sm">No spending data available</p>
              </div>
            )}
          </div>
          
          <ul className="space-y-3 mt-2">
            {categories.map((category, index) => {
              const percentage = (category.spent / category.budget) * 100;
              const isOverBudget = category.spent > category.budget;
              
              return (
                <motion.li 
                  key={category.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center">
                    <div className="bg-gray-50 rounded-md p-1.5 mr-2 text-gray-600 group-hover:bg-gray-100 transition-colors">
                      {category.icon}
                    </div>
                    <span className="text-gray-700 group-hover:text-travel-navy transition-colors">
                      {category.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span className={`${isOverBudget ? 'text-red-600' : 'text-gray-700'}`}>
                        ₹{category.spent.toFixed(2)}
                      </span>
                      <span className="text-gray-400">/ ₹{category.budget.toFixed(2)}</span>
                    </div>
                    <div className="w-24 mt-1">
                      <Progress 
                        value={percentage > 100 ? 100 : percentage} 
                        className={isOverBudget ? 'bg-red-100' : ''}
                        indicatorClassName={isOverBudget ? 'bg-red-500' : ''}
                      />
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CategorySpending;
