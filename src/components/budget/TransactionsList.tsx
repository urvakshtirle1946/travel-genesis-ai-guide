
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ListFilter, Inbox, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface Transaction {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
}

interface TransactionsListProps {
  transactions: Transaction[];
  categories: { id: number; name: string; icon: React.ReactNode }[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  
  const getSortLabel = () => {
    switch (sortOrder) {
      case 'newest': return 'Newest First';
      case 'oldest': return 'Oldest First';
      case 'highest': return 'Highest Amount';
      case 'lowest': return 'Lowest Amount';
    }
  };
  
  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort transactions based on selected order
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.amount - a.amount;
      case 'lowest':
        return a.amount - b.amount;
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border border-gray-100">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle className="text-travel-navy">Recent Transactions</CardTitle>
              <CardDescription>Your latest spending activity</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-8 h-9 w-full md:w-[180px] bg-gray-50 border-gray-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 bg-gray-50 border-gray-100">
                    <ListFilter className="h-3.5 w-3.5 mr-1.5" />
                    {getSortLabel()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setSortOrder('newest')}>
                    Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSortOrder('oldest')}>
                    Oldest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSortOrder('highest')}>
                    Highest Amount
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSortOrder('lowest')}>
                    Lowest Amount
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-6">
            {sortedTransactions.length === 0 ? (
              <div className="text-center py-10 px-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-50 rounded-full p-4">
                    <Inbox className="h-6 w-6 text-gray-300" />
                  </div>
                </div>
                <p className="text-gray-500">No transactions found. {searchTerm ? 'Try a different search term.' : 'Add your first expense!'}</p>
              </div>
            ) : (
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
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
                <tbody>
                  {sortedTransactions.map((transaction, index) => {
                    const categoryObj = categories.find(cat => cat.name === transaction.category);
                    const dateObj = new Date(transaction.date);
                    const formattedDate = new Intl.DateTimeFormat('en-US', { 
                      month: 'short', day: 'numeric', year: 'numeric' 
                    }).format(dateObj);
                    
                    return (
                      <motion.tr 
                        key={transaction.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="bg-white hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formattedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-gray-50 p-1 rounded mr-2 flex-shrink-0">
                              {categoryObj && categoryObj.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-700">{transaction.category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-700">
                          ₹{transaction.amount.toFixed(2)}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TransactionsList;
