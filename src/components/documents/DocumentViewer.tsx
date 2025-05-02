
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileIcon, Download, Calendar, FileType, HardDrive, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

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

interface DocumentViewerProps {
  document: Document | null;
  documentTypes: any[];
  onClose: () => void;
  onDelete: (id: number) => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  document, 
  documentTypes, 
  onClose, 
  onDelete 
}) => {
  if (!document) return null;
  
  const docType = documentTypes.find(t => t.id === document.type);
  const isExpired = document.expires && new Date(document.expires) < new Date();
  
  return (
    <Dialog open={!!document} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white/95 backdrop-blur-md rounded-xl border border-gray-100 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-md">
                {docType?.icon}
              </div>
              <div>
                <DialogTitle className="text-xl">{document.name}</DialogTitle>
                <p className="text-sm text-gray-500 mt-1">{docType?.name || 'Unknown Type'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1" asChild>
                <a href={document.fileUrl} download={document.filename}>
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <h4 className="text-sm text-gray-500">Upload Date</h4>
              </div>
              <p className="font-medium text-gray-700">{format(new Date(document.date), "MMMM d, yyyy")}</p>
            </div>
            
            {document.expires && (
              <div className={`${isExpired ? 'bg-red-50' : 'bg-gray-50'} p-4 rounded-lg`}>
                <div className="flex items-center mb-3">
                  <Calendar className={`h-4 w-4 ${isExpired ? 'text-red-400' : 'text-gray-400'} mr-2`} />
                  <h4 className={`text-sm ${isExpired ? 'text-red-500' : 'text-gray-500'}`}>Expiry Date</h4>
                </div>
                <p className={`font-medium ${isExpired ? 'text-red-600' : 'text-gray-700'}`}>
                  {format(new Date(document.expires), "MMMM d, yyyy")}
                  {isExpired && <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded">Expired</span>}
                </p>
              </div>
            )}
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <FileType className="h-4 w-4 text-gray-400 mr-2" />
                <h4 className="text-sm text-gray-500">File Type</h4>
              </div>
              <p className="font-medium text-gray-700">{document.fileType || 'Unknown'}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <HardDrive className="h-4 w-4 text-gray-400 mr-2" />
                <h4 className="text-sm text-gray-500">File Size</h4>
              </div>
              <p className="font-medium text-gray-700">{(document.fileSize / 1024).toFixed(2)} KB</p>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border rounded-lg overflow-hidden bg-white mb-6"
          >
            <div className="min-h-[300px] flex items-center justify-center p-6">
              {document.fileType.startsWith('image/') ? (
                <img 
                  src={document.fileUrl} 
                  alt={document.name}
                  className="max-w-full max-h-[400px] object-contain rounded"
                />
              ) : (
                <div className="text-center">
                  <FileIcon className="h-16 w-16 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 break-all max-w-md">{document.filename}</p>
                </div>
              )}
            </div>
          </motion.div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-gray-200"
            >
              Close
            </Button>
            <Button 
              variant="outline" 
              className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
              onClick={() => {
                onDelete(document.id);
                onClose();
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Document
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
