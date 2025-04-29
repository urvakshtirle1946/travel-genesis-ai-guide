import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { PieChart as PieChartIcon, BarChart, ArrowDown, ArrowUp } from 'lucide-react';
import { BadgeDollarSign, CreditCard, PieChart, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import these icons at the top of the file
import { Hotel, MapPin, ShoppingBag, Utensils, PlaneTakeoff } from 'lucide-react';

// Sample data for demonstration
const sampleBudgetData = {
  total: 5000,
  spent: 2500,
  categories: [
    { id: 1, name: 'Accommodation', budget: 2000, spent: 1200, icon: <Hotel className="h-4 w-4" /> },
    { id: 2, name: 'Transportation', budget: 1000, spent: 800, icon: <PlaneTakeoff className="h-4 w-4" /> },
    { id: 3, name: 'Food', budget: 1000, spent: 400, icon: <Utensils className="h-4 w-4" /> },
    { id: 4, name: 'Activities', budget: 800, spent: 100, icon: <MapPin className="h-4 w-4" /> },
    { id: 5, name: 'Shopping', budget: 200, spent: 0, icon: <ShoppingBag className="h-4 w-4" /> }
  ],
  transactions: [
    { id: 1, date: '2023-05-01', category: 'Accommodation', description: 'Hotel Booking', amount: 800 },
    { id: 2, date: '2023-05-02', category: 'Transportation', description: 'Flight Tickets', amount: 600 },
    { id: 3, date: '2023-05-03', category: 'Food', description: 'Grocery Shopping', amount: 50 },
    { id: 4, date: '2023-05-05', category: 'Activities', description: 'Museum Tour', amount: 30 },
    { id: 5, date: '2023-05-08', category: 'Accommodation', description: 'Resort Booking', amount: 400 },
    { id: 6, date: '2023-05-10', category: 'Transportation', description: 'Taxi', amount: 20 },
    { id: 7, date: '2023-05-12', category: 'Food', description: 'Restaurant', amount: 100 },
    { id: 8, date: '2023-05-15', category: 'Transportation', description: 'Car Rental', amount: 180 },
    { id: 9, date: '2023-05-18', category: 'Food', description: 'Cafe', amount: 25 },
    { id: 10, date: '2023-05-20', category: 'Food', description: 'Dinner at Bistro', amount: 80 }
  ]
};

const BudgetTracker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access your Budget Tracker");
    }
  }, [user]);

  const totalSpent = sampleBudgetData.spent;
  const totalBudget = sampleBudgetData.total;
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
              <Card className="border-dashed border-2">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="mx-auto bg-gray-100 rounded-full p-4 w-fit">
                      <BadgeDollarSign className="h-8 w-8 text-travel-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Track Your Expenses</h3>
                      <p className="text-gray-500">Visualize and manage your travel budget effectively</p>
                    </div>
                    <Button
                      onClick={() => toast.info("Expense tracking functionality will be available soon!")}
                      className="bg-travel-blue hover:bg-travel-blue/90"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Expense
                    </Button>
                  </div>
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
                      <span className="font-medium">${totalBudget}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Spent:</span>
                      <span className="font-medium">${totalSpent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Remaining Budget:</span>
                      <span className="font-medium">${remainingBudget}</span>
                    </div>
                    <Progress value={(totalSpent / totalBudget) * 100} />
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
                      {sampleBudgetData.categories.map(category => (
                        <li key={category.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            {category.icon}
                            <span className="ml-2">{category.name}</span>
                          </div>
                          <span>${category.spent}</span>
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
                        {sampleBudgetData.transactions.map(transaction => (
                          <tr key={transaction.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{transaction.category}</td>
                            <td className="px-6 py-4">{transaction.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              ${transaction.amount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
