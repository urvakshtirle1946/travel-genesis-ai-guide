
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DocumentTypesGridProps {
  documentTypes: any[];
  onTypeClick: () => void;
}

const DocumentTypesGrid: React.FC<DocumentTypesGridProps> = ({ documentTypes, onTypeClick }) => {
  return (
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
              onClick={onTypeClick}
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
  );
};

export default DocumentTypesGrid;
