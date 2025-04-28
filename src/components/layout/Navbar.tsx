
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Map, MessageSquare, User, Menu } from "lucide-react";
import { cn } from '@/lib/utils';
import { toast } from "sonner";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  // Determine if we're on a page that needs a contrasted navbar
  const isExploreOrPlanner = location.pathname === '/explore' || location.pathname === '/planner';
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = () => {
    toast.success("Sign in feature will be available in the next update!");
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300", 
        (scrolled || isExploreOrPlanner) ? "bg-white/95 shadow-sm backdrop-blur-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className={cn(
            "font-bold text-2xl",
            (scrolled || isExploreOrPlanner) ? "text-travel-navy" : "text-white"
          )}>
            Travel<span className="text-travel-teal">Genesis</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/explore" className={cn(
            "transition-colors hover:text-travel-teal",
            (scrolled || isExploreOrPlanner) ? "text-gray-700" : "text-white"
          )}>
            Explore
          </Link>
          <Link to="/planner" className={cn(
            "transition-colors hover:text-travel-teal",
            (scrolled || isExploreOrPlanner) ? "text-gray-700" : "text-white"
          )}>
            Trip Planner
          </Link>
          <Link to="/booking" className={cn(
            "transition-colors hover:text-travel-teal", 
            (scrolled || isExploreOrPlanner) ? "text-gray-700" : "text-white"
          )}>
            Bookings
          </Link>
          <Link to="/budget-tracker" className={cn(
            "transition-colors hover:text-travel-teal", 
            (scrolled || isExploreOrPlanner) ? "text-gray-700" : "text-white"
          )}>
            Budget
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className={(scrolled || isExploreOrPlanner) ? "text-gray-700" : "text-white"}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className={(scrolled || isExploreOrPlanner) ? "text-gray-700" : "text-white"}>
            <Map className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className={(scrolled || isExploreOrPlanner) ? "text-gray-700" : "text-white"}>
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            className={(scrolled || isExploreOrPlanner) ? "bg-white text-travel-navy" : "bg-white/20 text-white border-white/30 hover:bg-white/30"}
            onClick={handleSignIn}
          >
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className={(scrolled || isExploreOrPlanner) ? "h-6 w-6 text-gray-700" : "h-6 w-6 text-white"} />
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full py-4">
          <nav className="container flex flex-col space-y-4 pb-4">
            <Link to="/explore" className="text-gray-700 hover:text-travel-teal" onClick={() => setMobileMenuOpen(false)}>
              Explore
            </Link>
            <Link to="/planner" className="text-gray-700 hover:text-travel-teal" onClick={() => setMobileMenuOpen(false)}>
              Trip Planner
            </Link>
            <Link to="/booking" className="text-gray-700 hover:text-travel-teal" onClick={() => setMobileMenuOpen(false)}>
              Bookings
            </Link>
            <Link to="/budget-tracker" className="text-gray-700 hover:text-travel-teal" onClick={() => setMobileMenuOpen(false)}>
              Budget Tracker
            </Link>
            <Link to="/documents" className="text-gray-700 hover:text-travel-teal" onClick={() => setMobileMenuOpen(false)}>
              Documents
            </Link>
            <Link to="/group-expenses" className="text-gray-700 hover:text-travel-teal" onClick={() => setMobileMenuOpen(false)}>
              Group Expenses
            </Link>
            <div className="pt-2 flex space-x-4">
              <Button variant="ghost" size="sm" onClick={handleSignIn}>
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-travel-teal hover:bg-travel-teal/90"
                onClick={() => toast.success("Sign up feature will be available in the next update!")}
              >
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
