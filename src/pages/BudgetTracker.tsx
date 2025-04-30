
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from '@/components/budget/ExpenseForm';
import BudgetOverview from '@/components/budget/BudgetOverview';
import CategorySpending from '@/components/budget/CategorySpending';
import TransactionsList from '@/components/budget/TransactionsList';
import useBudgetData from '@/hooks/useBudgetData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const BudgetTracker = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    budgetData, 
    expenseCategories, 
    handleAddExpense, 
    handleEditBudget 
  } = useBudgetData(user?.id || null);

  const totalSpent = budgetData.spent;
  const totalBudget = budgetData.total;
  const remainingBudget = totalBudget - totalSpent;

  React.useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access your Budget Tracker");
    }
  }, [user]);

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
                <BudgetOverview 
                  totalBudget={totalBudget}
                  totalSpent={totalSpent}
                  remainingBudget={remainingBudget}
                />

                <CategorySpending 
                  categories={budgetData.categories}
                />
              </div>

              <TransactionsList 
                transactions={budgetData.transactions}
                categories={expenseCategories}
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BudgetTracker;
