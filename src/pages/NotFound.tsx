
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-travel-sand/30 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-9xl font-bold text-travel-blue">404</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-travel-navy">Page not found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="bg-travel-blue hover:bg-travel-blue/90 w-full">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> 
              Return to Home
            </Link>
          </Button>
          
          <div className="text-sm text-gray-500">
            Need help? <Link to="#" className="text-travel-teal hover:underline">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
