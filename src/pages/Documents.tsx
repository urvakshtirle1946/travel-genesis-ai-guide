
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Documents = () => {
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access your Travel Document Vault");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-travel-navy">
            Travel Document Vault
          </h1>
          
          {!user ? (
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h2 className="text-xl font-medium text-travel-navy mb-2">Sign In Required</h2>
              <p className="text-gray-600">Please sign in to access your travel document vault.</p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600">Document upload functionality will be implemented soon.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documents;
