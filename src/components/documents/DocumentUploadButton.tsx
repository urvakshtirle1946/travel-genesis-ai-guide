
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IdCard, FilePlus } from 'lucide-react';

interface DocumentUploadButtonProps {
  onUpload: () => void;
}

const DocumentUploadButton: React.FC<DocumentUploadButtonProps> = ({ onUpload }) => {
  return (
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
            onClick={onUpload}
            className="bg-travel-blue hover:bg-travel-blue/90"
          >
            <FilePlus className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadButton;
