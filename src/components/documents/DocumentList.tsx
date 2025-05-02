
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DocumentCard from './DocumentCard';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 }
    }
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="border-b border-gray-100 px-6 pt-6">
        <TabsList className="w-full max-w-md mx-auto mb-4 bg-gray-100/70 backdrop-blur-sm">
          <TabsTrigger value="all" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-travel-navy data-[state=active]:shadow-sm transition-all duration-200">
            All Documents
          </TabsTrigger>
          <TabsTrigger value="identification" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-travel-navy data-[state=active]:shadow-sm transition-all duration-200">
            Identification
          </TabsTrigger>
          <TabsTrigger value="insurance" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-travel-navy data-[state=active]:shadow-sm transition-all duration-200">
            Insurance
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:text-travel-navy data-[state=active]:shadow-sm transition-all duration-200">
            Bookings
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="p-6">
        <TabsContent value="all">
          {documents.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16 px-6 rounded-xl bg-gray-50/80 border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gray-100 rounded-full p-4">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <p className="text-gray-500 mb-4 max-w-md mx-auto">You haven't uploaded any documents yet. Add your important travel documents for safekeeping.</p>
              <Button onClick={onUpload} className="bg-travel-teal hover:bg-travel-teal/90 text-white transition-all">
                Upload Your First Document
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {documents.map(doc => (
                <motion.div key={doc.id} variants={itemVariants}>
                  <DocumentCard 
                    document={doc} 
                    documentTypes={documentTypes}
                    onView={() => onView(doc)}
                    onDelete={() => onDelete(doc.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </TabsContent>
        
        {documentTypes.map(docType => (
          <TabsContent key={docType.id} value={docType.id}>
            {documents.filter(doc => doc.type === docType.id).length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16 px-6 rounded-xl bg-gray-50/80 border border-gray-100"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 rounded-full p-4">
                    {docType.icon}
                  </div>
                </div>
                <p className="text-gray-500 mb-4 max-w-md mx-auto">You haven't uploaded any {docType.name.toLowerCase()} yet.</p>
                <Button onClick={onUpload} className="bg-travel-teal hover:bg-travel-teal/90 text-white transition-all">
                  Upload {docType.name}
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {documents
                  .filter(doc => doc.type === docType.id)
                  .map(doc => (
                    <motion.div key={doc.id} variants={itemVariants}>
                      <DocumentCard 
                        document={doc} 
                        documentTypes={documentTypes}
                        onView={() => onView(doc)}
                        onDelete={() => onDelete(doc.id)}
                      />
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default DocumentList;
