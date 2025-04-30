
import { useState, useEffect } from 'react';
import { FileIcon, FileText, IdCard } from 'lucide-react';
import { toast } from 'sonner';

export interface Document {
  id: number;
  name: string;
  type: string;
  date: string;
  expires?: string;
  filename: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
}

export const documentTypes = [
  {
    id: 'identification',
    name: 'Identification Documents',
    description: 'Passport, ID card, Driver\'s license',
    icon: <IdCard className="h-6 w-6" />
  },
  {
    id: 'insurance',
    name: 'Insurance Documents',
    description: 'Travel insurance, health insurance',
    icon: <FileText className="h-6 w-6" />
  },
  {
    id: 'bookings',
    name: 'Booking Confirmations',
    description: 'Hotels, flights, activities',
    icon: <FileText className="h-6 w-6" />
  },
  {
    id: 'other',
    name: 'Other Documents',
    description: 'Visas, vaccination certificates, etc.',
    icon: <FileIcon className="h-6 w-6" />
  }
];

export const useDocuments = (userId: string | null) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // Load documents from localStorage
  useEffect(() => {
    if (!userId) return;
    
    const savedDocuments = localStorage.getItem('documents');
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
  }, [userId]);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    if (userId && documents.length > 0) {
      localStorage.setItem('documents', JSON.stringify(documents));
    }
  }, [documents, userId]);

  const handleUploadDocument = () => {
    setIsUploadDialogOpen(true);
  };

  const handleAddDocument = (document: Document) => {
    setDocuments([...documents, document]);
    setIsUploadDialogOpen(false);
  };

  const handleViewDocument = (document: Document) => {
    setViewingDocument(document);
  };

  const handleDeleteDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast.success("Document deleted successfully");
  };

  const handleCloseViewer = () => {
    setViewingDocument(null);
  };

  return {
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
  };
};

export default useDocuments;
