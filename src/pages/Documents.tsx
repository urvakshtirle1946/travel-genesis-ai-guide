
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-travel-navy">
            Travel Document Vault
          </h1>
          
          {!user ? (
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <h2 className="text-xl font-medium text-travel-navy mb-2">Sign In Required</h2>
              <p className="text-gray-600 mb-4">Please sign in to access your travel document vault.</p>
              <Button onClick={() => navigate('/')} variant="outline">Return to Home</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <DocumentUploadButton onUpload={handleUploadDocument} />
              
              <DocumentList 
                documents={documents}
                documentTypes={documentTypes}
                onView={handleViewDocument}
                onDelete={handleDeleteDocument}
                onUpload={handleUploadDocument}
              />
              
              <DocumentTypesGrid 
                documentTypes={documentTypes}
                onTypeClick={handleUploadDocument}
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />

      {/* Document Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Upload Travel Document</DialogTitle>
          </DialogHeader>
          <DocumentUploader 
            documentTypes={documentTypes}
            onUpload={handleAddDocument}
          />
        </DialogContent>
      </Dialog>

      {/* Document Viewer */}
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
