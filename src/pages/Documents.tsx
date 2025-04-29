
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileIcon, FileText, Passport, Upload, FileCheck, FilePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Documents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      toast.error("Please sign in to access your Travel Document Vault");
    }
  }, [user]);

  // Sample documents for UI demonstration
  const sampleDocuments = [
    {
      id: 1,
      name: 'Passport Scan',
      type: 'Identification',
      date: '2023-03-15',
      expires: '2028-03-14',
      icon: <Passport className="h-8 w-8 text-travel-navy" />
    },
    {
      id: 2,
      name: 'Travel Insurance',
      type: 'Insurance',
      date: '2023-05-01',
      expires: '2023-06-30',
      icon: <FileCheck className="h-8 w-8 text-travel-teal" />
    },
    {
      id: 3,
      name: 'Hotel Booking Confirmation',
      type: 'Booking',
      date: '2023-04-20',
      icon: <FileText className="h-8 w-8 text-travel-blue" />
    }
  ];

  const documentTypes = [
    {
      id: 'identification',
      name: 'Identification Documents',
      description: 'Passport, ID card, Driver\'s license',
      icon: <Passport className="h-6 w-6" />
    },
    {
      id: 'insurance',
      name: 'Insurance Documents',
      description: 'Travel insurance, health insurance',
      icon: <FileCheck className="h-6 w-6" />
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
    toast.info("Document upload functionality will be available soon!");
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
                      <Upload className="h-8 w-8 text-travel-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Upload a Document</h3>
                      <p className="text-gray-500">Drag and drop files here or click to browse</p>
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
                    {sampleDocuments.map(doc => (
                      <Card key={doc.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="mb-2">{doc.icon}</div>
                          <CardTitle>{doc.name}</CardTitle>
                          <CardDescription>Type: {doc.type}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-sm">Uploaded: {doc.date}</p>
                          {doc.expires && (
                            <p className="text-sm">Expires: {doc.expires}</p>
                          )}
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button variant="outline" className="w-full">View Document</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                {['identification', 'insurance', 'bookings'].map(tabValue => (
                  <TabsContent key={tabValue} value={tabValue}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sampleDocuments
                        .filter(doc => doc.type.toLowerCase() === tabValue || 
                          (tabValue === 'identification' && doc.type === 'Identification') ||
                          (tabValue === 'insurance' && doc.type === 'Insurance') ||
                          (tabValue === 'bookings' && doc.type === 'Booking')
                        )
                        .map(doc => (
                          <Card key={doc.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <div className="mb-2">{doc.icon}</div>
                              <CardTitle>{doc.name}</CardTitle>
                              <CardDescription>Type: {doc.type}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <p className="text-sm">Uploaded: {doc.date}</p>
                              {doc.expires && (
                                <p className="text-sm">Expires: {doc.expires}</p>
                              )}
                            </CardContent>
                            <CardFooter className="pt-2">
                              <Button variant="outline" className="w-full">View Document</Button>
                            </CardFooter>
                          </Card>
                        ))}
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
                        onClick={handleUploadDocument}
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
    </div>
  );
};

export default Documents;
