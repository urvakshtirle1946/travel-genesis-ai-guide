
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, FilePlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";

interface DocumentType {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

interface DocumentUploaderProps {
  documentTypes: DocumentType[];
  onUpload: (document: any) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ documentTypes, onUpload }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [expiryDate, setExpiryDate] = useState<Date | undefined>();
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !type) {
      toast.error("Please provide a name and type for your document");
      return;
    }
    
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    
    // Create document object
    const newDocument = {
      id: Date.now(),
      name: name,
      type: type,
      date: format(new Date(), "yyyy-MM-dd"),
      expires: expiryDate ? format(expiryDate, "yyyy-MM-dd") : undefined,
      filename: file.name,
      fileType: file.type,
      fileSize: file.size,
      // In a real app, we'd upload the file to storage and get a URL
      fileUrl: URL.createObjectURL(file)
    };
    
    onUpload(newDocument);
    
    // Reset form
    setName('');
    setType('');
    setExpiryDate(undefined);
    setFile(null);
    
    toast.success("Document uploaded successfully!");
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="documentName">Document Name</Label>
              <Input
                id="documentName"
                placeholder="e.g. Passport, Insurance Policy"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="documentType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(docType => (
                    <SelectItem key={docType.id} value={docType.id}>
                      <div className="flex items-center">
                        <span className="mr-2">{docType.icon}</span>
                        <span>{docType.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date (if applicable)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="expiryDate"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {expiryDate ? format(expiryDate, "PPP") : <span>Select expiry date (optional)</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={setExpiryDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Upload File</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6">
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-4">Drag and drop or click to browse</p>
                <Input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file')?.click()}
                >
                  Select File
                </Button>
                {file && (
                  <div className="mt-2 text-sm text-gray-500">
                    Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-travel-blue hover:bg-travel-blue/90"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;
