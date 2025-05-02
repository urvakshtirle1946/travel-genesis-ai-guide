
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Eye, Trash2, Calendar } from 'lucide-react';

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

interface DocumentCardProps {
  document: Document;
  documentTypes: any[];
  onView: () => void;
  onDelete: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, documentTypes, onView, onDelete }) => {
  const docType = documentTypes.find(t => t.id === document.type);
  
  const isExpiring = document.expires && 
    new Date(document.expires).getTime() - new Date().getTime() < 1000 * 60 * 60 * 24 * 30; // 30 days
  
  const isExpired = document.expires && new Date(document.expires) < new Date();

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2 relative">
          <div className="absolute top-4 right-4 bg-gray-100/80 backdrop-blur-sm rounded-full p-2">
            {docType?.icon}
          </div>
          <h3 className="font-semibold text-lg text-travel-navy line-clamp-1 pr-10">{document.name}</h3>
          <p className="text-sm text-gray-500">{docType?.name || document.type}</p>
        </CardHeader>
        
        <CardContent className="pb-3">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            <span>Added: {format(new Date(document.date), "MMM d, yyyy")}</span>
          </div>
          
          {document.expires && (
            <div className={`flex items-center text-sm ${isExpired ? 'text-red-600' : isExpiring ? 'text-amber-600' : 'text-gray-600'}`}>
              <Calendar className={`h-3.5 w-3.5 mr-1.5 ${isExpired ? 'text-red-400' : isExpiring ? 'text-amber-400' : 'text-gray-400'}`} />
              <span>Expires: {format(new Date(document.expires), "MMM d, yyyy")}</span>
            </div>
          )}
          
          <div className="mt-4">
            <div className="bg-gray-50 rounded-lg h-16 flex items-center justify-center overflow-hidden">
              {document.fileType.startsWith('image/') ? (
                <img 
                  src={document.fileUrl} 
                  alt={document.name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center p-2">
                  <p className="text-xs text-gray-400 truncate max-w-[180px]">{document.filename}</p>
                  <p className="text-xs text-gray-400">{(document.fileSize / 1024).toFixed(1)} KB</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2 border-t border-gray-50">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onView}
            className="text-travel-blue border-gray-200 hover:bg-travel-blue/5"
          >
            <Eye className="h-3.5 w-3.5 mr-1.5" />
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-500 border-gray-200 hover:bg-red-50 hover:border-red-100" 
            onClick={onDelete}
          >
            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DocumentCard;
