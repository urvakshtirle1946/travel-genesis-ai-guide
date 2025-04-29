
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileIcon, FileText, IdCard, FilePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DocumentUploader from '@/components/documents/DocumentUploader';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';

interface Document {
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

const Documents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access your Travel Document Vault");
      return;
    }
    
    // Load documents from localStorage
    const savedDocuments = localStorage.getItem('documents');
    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
  }, [user]);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    if (user && documents.length > 0) {
      localStorage.setItem('documents', JSON.stringify(documents));
    }
  }, [documents, user]);

  // Document types with icons
  const documentTypes = [
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
              <Card className="border-dashed border-2">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="mx-auto bg-gray-100 rounded-full p-4 w-fit">
                      <IdCard className="h-8 w-8 text-travel-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Upload a Document</h3>
                      <p className="text-gray-500">Store important travel documents securely</p>
                    </div>
                    <Button 
                      onClick={handleUploadDocument}
                      className="bg-travel-blue hover:bg-travel-blue/90"
                    >
                      <FilePlus className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="w-full max-w-md mx-auto mb-6">
                  <TabsTrigger value="all" className="flex-1">All Documents</TabsTrigger>
                  <TabsTrigger value="identification" className="flex-1">Identification</TabsTrigger>
                  <TabsTrigger value="insurance" className="flex-1">Insurance</TabsTrigger>
                  <TabsTrigger value="bookings" className="flex-1">Bookings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.length === 0 ? (
                      <div className="col-span-full text-center py-10">
                        <p className="text-gray-500 mb-4">You haven't uploaded any documents yet.</p>
                        <Button onClick={handleUploadDocument}>Upload Your First Document</Button>
                      </div>
                    ) : (
                      documents.map(doc => (
                        <DocumentCard 
                          key={doc.id} 
                          document={doc} 
                          documentTypes={documentTypes}
                          onView={() => handleViewDocument(doc)}
                          onDelete={() => handleDeleteDocument(doc.id)}
                        />
                      ))
                    )}
                  </div>
                </TabsContent>
                
                {documentTypes.map(docType => (
                  <TabsContent key={docType.id} value={docType.id}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {documents.filter(doc => doc.type === docType.id).length === 0 ? (
                        <div className="col-span-full text-center py-10">
                          <p className="text-gray-500 mb-4">You haven't uploaded any {docType.name.toLowerCase()} yet.</p>
                          <Button onClick={handleUploadDocument}>
                            Upload {docType.name}
                          </Button>
                        </div>
                      ) : (
                        documents
                          .filter(doc => doc.type === docType.id)
                          .map(doc => (
                            <DocumentCard 
                              key={doc.id} 
                              document={doc} 
                              documentTypes={documentTypes}
                              onView={() => handleViewDocument(doc)}
                              onDelete={() => handleDeleteDocument(doc.id)}
                            />
                          ))
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
              
              <Card>
                <CardHeader>
                  <CardTitle>Document Types</CardTitle>
                  <CardDescription>Upload and organize your travel documents by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {documentTypes.map(type => (
                      <div 
                        key={type.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setIsUploadDialogOpen(true);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-full">
                            {type.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{type.name}</h3>
                            <p className="text-xs text-gray-500">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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

      {/* Document Viewer Dialog */}
      <Dialog open={!!viewingDocument} onOpenChange={() => setViewingDocument(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{viewingDocument?.name}</DialogTitle>
          </DialogHeader>
          {viewingDocument && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Document Type</p>
                    <p className="font-medium">
                      {documentTypes.find(t => t.id === viewingDocument.type)?.name || 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Upload Date</p>
                    <p className="font-medium">{format(new Date(viewingDocument.date), "PPP")}</p>
                  </div>
                  {viewingDocument.expires && (
                    <div>
                      <p className="text-sm text-gray-500">Expiry Date</p>
                      <p className="font-medium">{format(new Date(viewingDocument.expires), "PPP")}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">File Size</p>
                    <p className="font-medium">{(viewingDocument.fileSize / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4 min-h-[200px] flex items-center justify-center">
                {viewingDocument.fileType.startsWith('image/') ? (
                  <img 
                    src={viewingDocument.fileUrl} 
                    alt={viewingDocument.name}
                    className="max-w-full max-h-[400px]"
                  />
                ) : (
                  <div className="text-center">
                    <FileIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">{viewingDocument.filename}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setViewingDocument(null)}>
                  Close
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    if (viewingDocument) {
                      handleDeleteDocument(viewingDocument.id);
                      setViewingDocument(null);
                    }
                  }}
                >
                  Delete Document
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface DocumentCardProps {
  document: Document;
  documentTypes: any[];
  onView: () => void;
  onDelete: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, documentTypes, onView, onDelete }) => {
  const docType = documentTypes.find(t => t.id === document.type);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="mb-2">{docType?.icon}</div>
        <CardTitle>{document.name}</CardTitle>
        <CardDescription>Type: {docType?.name || document.type}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm">Uploaded: {format(new Date(document.date), "PP")}</p>
        {document.expires && (
          <p className="text-sm">Expires: {format(new Date(document.expires), "PP")}</p>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" onClick={onView}>View Document</Button>
        <Button variant="ghost" size="icon" className="text-red-500" onClick={onDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Documents;
