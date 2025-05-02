
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DocumentUploader from '@/components/documents/DocumentUploader';
import DocumentUploadButton from '@/components/documents/DocumentUploadButton';
import DocumentList from '@/components/documents/DocumentList';
import DocumentTypesGrid from '@/components/documents/DocumentTypesGrid';
import DocumentViewer from '@/components/documents/DocumentViewer';
import useDocuments from '@/hooks/useDocuments';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const Documents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    documents,
    viewingDocument,
    isUploadDialogOpen,
    documentTypes,
    handleUploadDocument,
    handleAddDocument,
    handleViewDocument,
    handleDeleteDocument,
    handleCloseViewer,
    setIsUploadDialogOpen
  } = useDocuments(user?.id || null);

  React.useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access your Travel Document Vault");
    }
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container max-w-6xl">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-travel-navy">
                Travel Document Vault
              </h1>
              <p className="text-gray-600 mt-2">Keep all your travel documents organized in one secure place</p>
            </div>
            {user && (
              <div className="mt-4 md:mt-0">
                <DocumentUploadButton onUpload={handleUploadDocument} />
              </div>
            )}
          </motion.div>
          
          {!user ? (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-travel-teal/10 p-4 rounded-full">
                  <FileText className="h-12 w-12 text-travel-teal" />
                </div>
              </div>
              <h2 className="text-xl font-medium text-travel-navy mb-2">Sign In Required</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Please sign in to access your travel document vault for secure storage and easy access to all your travel documents.
              </p>
              <Button 
                onClick={() => navigate('/')} 
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gray-50 transition-all"
              >
                Return to Home
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <DocumentList 
                    documents={documents}
                    documentTypes={documentTypes}
                    onView={handleViewDocument}
                    onDelete={handleDeleteDocument}
                    onUpload={handleUploadDocument}
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-travel-navy mb-6">Document Categories</h2>
                  <DocumentTypesGrid 
                    documentTypes={documentTypes}
                    onTypeClick={handleUploadDocument}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />

      {/* Document Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-4xl bg-white/95 backdrop-blur-md rounded-xl border border-gray-100">
          <DialogHeader>
            <DialogTitle>Upload Travel Document</DialogTitle>
          </DialogHeader>
          <DocumentUploader 
            documentTypes={documentTypes}
            onUpload={handleAddDocument}
          />
        </DialogContent>
      </Dialog>

      {/* Document Viewer with enhanced styling */}
      <DocumentViewer 
        document={viewingDocument}
        documentTypes={documentTypes}
        onClose={handleCloseViewer}
        onDelete={handleDeleteDocument}
      />
    </div>
  );
};

export default Documents;
