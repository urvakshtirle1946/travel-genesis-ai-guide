
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DocumentCard from './DocumentCard';

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

interface DocumentListProps {
  documents: Document[];
  documentTypes: any[];
  onView: (doc: Document) => void;
  onDelete: (id: number) => void;
  onUpload: () => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ 
  documents, 
  documentTypes, 
  onView, 
  onDelete, 
  onUpload 
}) => {
  return (
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
              <Button onClick={onUpload}>Upload Your First Document</Button>
            </div>
          ) : (
            documents.map(doc => (
              <DocumentCard 
                key={doc.id} 
                document={doc} 
                documentTypes={documentTypes}
                onView={() => onView(doc)}
                onDelete={() => onDelete(doc.id)}
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
                <Button onClick={onUpload}>
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
                    onView={() => onView(doc)}
                    onDelete={() => onDelete(doc.id)}
                  />
                ))
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DocumentList;
