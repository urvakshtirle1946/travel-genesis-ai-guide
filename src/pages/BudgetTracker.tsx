
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    { id: 1, date: '2023-05-15', category: 'Accommodation', description: 'Hotel Paris', amount: 800 },
    { id: 2, date: '2023-05-15', category: 'Transportation', description: 'Flight Tickets', amount: 600 },
    { id: 3, date: '2023-05-16', category: 'Food', description: 'Restaurant Le Meurice', amount: 120 },
    { id: 4, date: '2023-05-17', category: 'Activities', description: 'Louvre Museum', amount: 50 },
    { id: 5, date: '2023-05-17', category: 'Food', description: 'Cafe de Flore', amount: 30 },
    { id: 6, date: '2023-05-18', category: 'Transportation', description: 'Metro Pass', amount: 20 },
    { id: 7, date: '2023-05-18', category: 'Food', description: 'Grocery Shopping', amount: 40 },
    { id: 8, date: '2023-05-19', category: 'Activities', description: 'Eiffel Tower', amount: 50 },
    { id: 9, date: '2023-05-20', category: 'Accommodation', description: 'Additional Hotel Night', amount: 400 },
    { id: 10, date: '2023-05-20', category: 'Food', description: 'Dinner at Bistro', amount: 80 }
  ]
};

const BudgetTracker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [newTransaction, setNewTransaction] = useState({
    category: '',
    description: '',
    amount: '',
  });

  React.useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access the Budget Tracker");
    }
  }, [user]);

  const handleAddTransaction = () => {
    if (!newTransaction.category || !newTransaction.description || !newTransaction.amount) {
      toast.error("Please fill in all fields");
      return;
    }

    // In a real app, this would save to a database
    toast.success("Transaction added successfully!");
    
    // Reset form fields
    setNewTransaction({
      category: '',
      description: '',
      amount: '',
    });
  };

  // Helper function to calculate progress
  const calculateProgress = (spent: number, budget: number) => {
    return (spent / budget) * 100;
  };

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
              <p className="text-gray-600 mb-4">Please sign in to access the Budget Tracker feature.</p>
              <Button onClick={() => navigate('/')} variant="outline">Return to Home</Button>
            </div>
          ) : (
            <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Wallet className="h-6 w-6 text-travel-blue" />
                        </div>
                        <CardTitle>Total Budget</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">${sampleBudgetData.total.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-teal-100 rounded-full">
                          <BadgeDollarSign className="h-6 w-6 text-travel-teal" />
                        </div>
                        <CardTitle>Total Spent</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">${sampleBudgetData.spent.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">
                        {Math.round((sampleBudgetData.spent / sampleBudgetData.total) * 100)}% of budget
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-green-100 rounded-full">
                          <CreditCard className="h-6 w-6 text-green-600" />
                        </div>
                        <CardTitle>Remaining</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">
                        ${(sampleBudgetData.total - sampleBudgetData.spent).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {Math.round(((sampleBudgetData.total - sampleBudgetData.spent) / sampleBudgetData.total) * 100)}% 
                        of budget left
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Spending by Category</CardTitle>
                      <PieChart className="h-5 w-5 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleBudgetData.categories.map((category) => (
                        <div key={category.id} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              {category.icon}
                              <span>{category.name}</span>
                            </div>
                            <div className="text-sm">
                              ${category.spent} / ${category.budget}
                            </div>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                calculateProgress(category.spent, category.budget) > 90 
                                  ? 'bg-red-500' 
                                  : calculateProgress(category.spent, category.budget) > 70 
                                    ? 'bg-yellow-500' 
                                    : 'bg-green-500'
                              }`}
                              style={{ width: `${calculateProgress(category.spent, category.budget)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Transaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={newTransaction.category}
                          onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {sampleBudgetData.categories.map((category) => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input 
                          id="description" 
                          placeholder="What did you spend on?"
                          value={newTransaction.description}
                          onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount ($)</Label>
                        <Input 
                          id="amount" 
                          type="number" 
                          placeholder="0.00"
                          value={newTransaction.amount}
                          onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                        />
                      </div>
                      
                      <Button 
                        className="w-full bg-travel-teal hover:bg-travel-teal/90" 
                        onClick={handleAddTransaction}
                      >
                        Add Transaction
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="categories">
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {sampleBudgetData.categories.map((category) => (
                        <div key={category.id} className="border p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="p-2 bg-gray-100 rounded-full">
                              {category.icon}
                            </div>
                            <h3 className="font-semibold">{category.name}</h3>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-500">Budget</p>
                              <p className="font-bold">${category.budget}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Spent</p>
                              <p className="font-bold">${category.spent}</p>
                            </div>
                          </div>
                          
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                calculateProgress(category.spent, category.budget) > 90 
                                  ? 'bg-red-500' 
                                  : calculateProgress(category.spent, category.budget) > 70 
                                    ? 'bg-yellow-500' 
                                    : 'bg-green-500'
                              }`}
                              style={{ width: `${calculateProgress(category.spent, category.budget)}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            ${category.budget - category.spent} remaining 
                            ({Math.round(((category.budget - category.spent) / category.budget) * 100)}% left)
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="transactions">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleBudgetData.transactions.map((transaction) => (
                        <div key={transaction.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <div className="flex space-x-2 text-sm text-gray-500">
                              <p>{transaction.date}</p>
                              <span>•</span>
                              <p>{transaction.category}</p>
                            </div>
                          </div>
                          <p className="font-semibold">${transaction.amount}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BudgetTracker;
