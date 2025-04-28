
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Map, MessageSquare, User, Menu } from "lucide-react";
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300", 
        scrolled ? "bg-white/95 shadow-sm backdrop-blur-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className={cn(
            "font-bold text-2xl",
            scrolled ? "text-travel-navy" : "text-white"
          )}>
            Travel<span className="text-travel-teal">Genesis</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/explore" className={cn(
            "transition-colors hover:text-travel-teal",
            scrolled ? "text-gray-700" : "text-white"
          )}>
            Explore
          </Link>
          <Link to="/planner" className={cn(
            "transition-colors hover:text-travel-teal",
            scrolled ? "text-gray-700" : "text-white"
          )}>
            Trip Planner
          </Link>
          <Link to="/marketplace" className={cn(
            "transition-colors hover:text-travel-teal", 
            scrolled ? "text-gray-700" : "text-white"
          )}>
            Marketplace
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className={scrolled ? "text-gray-700" : "text-white"}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className={scrolled ? "text-gray-700" : "text-white"}>
            <Map className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className={scrolled ? "text-gray-700" : "text-white"}>
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="outline" className={scrolled ? "bg-white text-travel-navy" : "bg-white/20 text-white border-white/30 hover:bg-white/30"}>
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
          <Menu className={scrolled ? "h-6 w-6 text-gray-700" : "h-6 w-6 text-white"} />
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full py-4">
          <nav className="container flex flex-col space-y-4 pb-4">
            <Link to="/explore" className="text-gray-700 hover:text-travel-teal">
              Explore
            </Link>
            <Link to="/planner" className="text-gray-700 hover:text-travel-teal">
              Trip Planner
            </Link>
            <Link to="/marketplace" className="text-gray-700 hover:text-travel-teal">
              Marketplace
            </Link>
            <div className="pt-2 flex space-x-4">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button variant="default" size="sm" className="bg-travel-teal hover:bg-travel-teal/90">
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
