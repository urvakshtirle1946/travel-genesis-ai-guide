
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileIcon } from 'lucide-react';
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
  
  return (
    <Dialog open={!!document} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{document.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <p className="text-sm text-gray-500">Document Type</p>
                <p className="font-medium">
                  {documentTypes.find(t => t.id === document.type)?.name || 'Unknown'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Upload Date</p>
                <p className="font-medium">{format(new Date(document.date), "PPP")}</p>
              </div>
              {document.expires && (
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p className="font-medium">{format(new Date(document.expires), "PPP")}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">File Size</p>
                <p className="font-medium">{(document.fileSize / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          </div>
          
          <div className="border rounded-md p-4 min-h-[200px] flex items-center justify-center">
            {document.fileType.startsWith('image/') ? (
              <img 
                src={document.fileUrl} 
                alt={document.name}
                className="max-w-full max-h-[400px]"
              />
            ) : (
              <div className="text-center">
                <FileIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">{document.filename}</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                onDelete(document.id);
                onClose();
              }}
            >
              Delete Document
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewer;
