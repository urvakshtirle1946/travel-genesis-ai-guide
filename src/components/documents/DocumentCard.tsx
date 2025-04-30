
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

export default DocumentCard;
