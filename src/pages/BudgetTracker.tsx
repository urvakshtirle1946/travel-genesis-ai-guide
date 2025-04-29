
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Hotel, MapPin, ShoppingBag, Utensils, PlaneTakeoff } from 'lucide-react';
import { BadgeDollarSign, CreditCard, PieChart, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '@/components/budget/ExpenseForm';
import { PieChart as PieChartIcon, BarChart, ArrowDown, ArrowUp } from 'lucide-react';

// Define the category types with their icons
const expenseCategories = [
  { id: 1, name: 'Accommodation', icon: <Hotel className="h-4 w-4" /> },
  { id: 2, name: 'Transportation', icon: <PlaneTakeoff className="h-4 w-4" /> },
  { id: 3, name: 'Food', icon: <Utensils className="h-4 w-4" /> },
  { id: 4, name: 'Activities', icon: <MapPin className="h-4 w-4" /> },
  { id: 5, name: 'Shopping', icon: <ShoppingBag className="h-4 w-4" /> }
];

// Define the budget data type
interface BudgetCategory {
  id: number;
  name: string;
  budget: number;
  spent: number;
  icon: JSX.Element;
}

interface Transaction {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
}

interface BudgetData {
  total: number;
  spent: number;
  categories: BudgetCategory[];
  transactions: Transaction[];
}

const BudgetTracker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [budgetData, setBudgetData] = useState<BudgetData>({
    total: 5000,
    spent: 0,
    categories: expenseCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      budget: cat.id === 1 ? 2000 : cat.id === 2 ? 1000 : cat.id === 3 ? 1000 : cat.id === 4 ? 800 : 200,
      spent: 0,
      icon: cat.icon
    })),
    transactions: []
  });

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access your Budget Tracker");
      return;
    }

    // Load budget data from localStorage
    const savedBudgetData = localStorage.getItem('budgetData');
    if (savedBudgetData) {
      setBudgetData(JSON.parse(savedBudgetData));
    }
  }, [user]);

  // Save budget data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('budgetData', JSON.stringify(budgetData));
    }
  }, [budgetData, user]);

  const handleAddExpense = (expense: any) => {
    // Find the category
    const categoryObj = expenseCategories.find(cat => cat.name === expense.category);
    if (!categoryObj) return;

    // Create a new transaction
    const newTransaction: Transaction = {
      id: expense.id,
      date: expense.date,
      category: expense.category,
      description: expense.description,
      amount: expense.amount
    };

    // Update the budget data
    const updatedCategories = budgetData.categories.map(cat => 
      cat.name === expense.category 
        ? { ...cat, spent: cat.spent + expense.amount } 
        : cat
    );

    const updatedBudgetData: BudgetData = {
      ...budgetData,
      spent: budgetData.spent + expense.amount,
      categories: updatedCategories,
      transactions: [newTransaction, ...budgetData.transactions].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    };

    setBudgetData(updatedBudgetData);
  };

  const handleEditBudget = (categoryId: number, newBudget: number) => {
    const updatedCategories = budgetData.categories.map(cat => 
      cat.id === categoryId ? { ...cat, budget: newBudget } : cat
    );

    const newTotal = updatedCategories.reduce((sum, cat) => sum + cat.budget, 0);

    setBudgetData({
      ...budgetData,
      total: newTotal,
      categories: updatedCategories
    });

    toast.success("Budget updated successfully");
  };

  const totalSpent = budgetData.spent;
  const totalBudget = budgetData.total;
  const remainingBudget = totalBudget - totalSpent;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-travel-navy">
            Budget Tracker
          </h1>

          {!user ? (
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h2 className="text-xl font-medium text-travel-navy mb-2">Sign In Required</h2>
              <p className="text-gray-600 mb-4">Please sign in to access your budget tracker.</p>
              <Button onClick={() => navigate('/')} variant="outline">Return to Home</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Expense</CardTitle>
                  <CardDescription>Track your spending by adding expenses as they occur</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpenseForm 
                    onAddExpense={handleAddExpense}
                    categories={expenseCategories}
                  />
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Overview</CardTitle>
                    <CardDescription>Total budget vs. amount spent</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total Budget:</span>
                      <span className="font-medium">${totalBudget.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Spent:</span>
                      <span className="font-medium">${totalSpent.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Remaining Budget:</span>
                      <span className={`font-medium ${remainingBudget < 0 ? 'text-red-500' : ''}`}>
                        ${remainingBudget.toFixed(2)}
                      </span>
                    </div>
                    <Progress 
                      value={(totalSpent / totalBudget) * 100} 
                      className={remainingBudget < 0 ? 'bg-red-100' : ''}
                    />
                  </CardContent>
                  <CardFooter className="text-sm text-gray-500">
                    Updated as of today
                  </CardFooter>
                </Card>

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
                      {budgetData.categories.map(category => (
                        <li key={category.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            {category.icon}
                            <span className="ml-2">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <div>${category.spent.toFixed(2)} <span className="text-gray-400">/ ${category.budget.toFixed(2)}</span></div>
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
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest spending activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    {budgetData.transactions.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>No transactions yet. Add your first expense!</p>
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {budgetData.transactions.map(transaction => (
                            <tr key={transaction.id}>
                              <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {expenseCategories.find(cat => cat.name === transaction.category)?.icon}
                                  <span className="ml-2">{transaction.category}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">{transaction.description}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                ${transaction.amount.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BudgetTracker;
