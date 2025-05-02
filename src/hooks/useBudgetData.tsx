
import { useState, useEffect } from 'react';
import { Hotel, PlaneTakeoff, Utensils, MapPin, ShoppingBag } from 'lucide-react';
import React from 'react';

// Define the category types with their icons
const expenseCategories = [
  { id: 1, name: 'Accommodation', icon: <Hotel className="h-4 w-4" /> },
  { id: 2, name: 'Transportation', icon: <PlaneTakeoff className="h-4 w-4" /> },
  { id: 3, name: 'Food', icon: <Utensils className="h-4 w-4" /> },
  { id: 4, name: 'Activities', icon: <MapPin className="h-4 w-4" /> },
  { id: 5, name: 'Shopping', icon: <ShoppingBag className="h-4 w-4" /> }
];

// Define the budget data type
export interface BudgetCategory {
  id: number;
  name: string;
  budget: number;
  spent: number;
  icon: React.ReactNode;
}

export interface Transaction {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
}

export interface BudgetData {
  total: number;
  spent: number;
  categories: BudgetCategory[];
  transactions: Transaction[];
}

export const useBudgetData = (userId: string | null) => {
  
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
    if (!userId) return;

    // Load budget data from localStorage
    const savedBudgetData = localStorage.getItem('budgetData');
    if (savedBudgetData) {
      try {
        // Parse the saved data
        const parsed = JSON.parse(savedBudgetData);
        
        // We need to reattach the React icon components since they can't be serialized
        const restoredData = {
          ...parsed,
          categories: parsed.categories.map((cat: any) => {
            // Find the matching category from our predefined list to get the icon
            const originalCat = expenseCategories.find(c => c.id === cat.id);
            return {
              ...cat,
              icon: originalCat ? originalCat.icon : null
            };
          })
        };
        
        setBudgetData(restoredData);
      } catch (error) {
        console.error("Error restoring budget data:", error);
      }
    }
  }, [userId]);

  // Save budget data to localStorage whenever it changes
  useEffect(() => {
    if (userId) {
      try {
        // We need to remove the icon components before saving as they can't be serialized
        const dataForStorage = {
          ...budgetData,
          categories: budgetData.categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            budget: cat.budget,
            spent: cat.spent
            // Omit the icon property
          }))
        };
        
        localStorage.setItem('budgetData', JSON.stringify(dataForStorage));
      } catch (error) {
        console.error("Error saving budget data:", error);
      }
    }
  }, [budgetData, userId]);

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
  };

  return {
    budgetData,
    expenseCategories,
    handleAddExpense,
    handleEditBudget
  };
};

export default useBudgetData;
