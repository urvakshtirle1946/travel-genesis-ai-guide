
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Map, MessageSquare, User, Menu, LogOut, Settings, MapPin, Bookmark, FileText, Wallet } from "lucide-react";
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Always use contrasted navbar on these pages (white background)
  const forceContrastPages = ['/explore', '/planner', '/booking', '/my-bookings', '/budget-tracker', '/documents', '/group-expenses'];
  const isContrastPage = forceContrastPages.includes(location.pathname);
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = () => {
    setAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300", 
        (scrolled || isContrastPage) ? "bg-white/90 backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className={cn(
            "font-bold text-2xl",
            (scrolled || isContrastPage) ? "text-travel-navy" : "text-white"
          )}>
            Travel<span className="text-travel-teal">Genesis</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/explore" className={cn(
            "transition-colors hover:text-travel-teal font-medium relative group",
            (scrolled || isContrastPage) ? "text-gray-700" : "text-white"
          )}>
            Explore
            <span className="absolute -bottom-1 left-0 h-0.5 bg-travel-teal w-0 group-hover:w-full transition-all duration-300"></span>
          </Link>
          {user && (
            <>
              <Link to="/planner" className={cn(
                "transition-colors hover:text-travel-teal font-medium relative group",
                (scrolled || isContrastPage) ? "text-gray-700" : "text-white"
              )}>
                Trip Planner
                <span className="absolute -bottom-1 left-0 h-0.5 bg-travel-teal w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/booking" className={cn(
                "transition-colors hover:text-travel-teal font-medium relative group", 
                (scrolled || isContrastPage) ? "text-gray-700" : "text-white"
              )}>
                Bookings
                <span className="absolute -bottom-1 left-0 h-0.5 bg-travel-teal w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/budget-tracker" className={cn(
                "transition-colors hover:text-travel-teal font-medium relative group", 
                (scrolled || isContrastPage) ? "text-gray-700" : "text-white"
              )}>
                Budget
                <span className="absolute -bottom-1 left-0 h-0.5 bg-travel-teal w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/documents" className={cn(
                "transition-colors hover:text-travel-teal font-medium relative group", 
                (scrolled || isContrastPage) ? "text-gray-700" : "text-white"
              )}>
                Documents
                <span className="absolute -bottom-1 left-0 h-0.5 bg-travel-teal w-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <>
              <Button variant="ghost" size="icon" className={cn(
                "hover:bg-gray-100/60 rounded-full transition-all duration-300", 
                (scrolled || isContrastPage) ? "text-gray-700" : "text-white"
              )}>
                <Search className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className={cn(
                    "hover:bg-gray-100/60 rounded-full transition-all duration-300", 
                    (scrolled || isContrastPage) ? "text-gray-700" : "text-white"
                  )}>
                    <Map className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 backdrop-blur-md bg-white/95 border border-gray-100 shadow-lg rounded-xl p-2 animate-in fade-in-80 slide-in-from-top-5">
                  <DropdownMenuLabel className="font-normal text-sm text-gray-500">Quick Access</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/planner" className="flex items-center gap-2 cursor-pointer">
                      <MapPin className="h-4 w-4 text-travel-teal" />
                      <span>Trip Planner</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/booking" className="flex items-center gap-2 cursor-pointer">
                      <Bookmark className="h-4 w-4 text-travel-blue" />
                      <span>Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/documents" className="flex items-center gap-2 cursor-pointer">
                      <FileText className="h-4 w-4 text-travel-navy" />
                      <span>Documents</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/budget-tracker" className="flex items-center gap-2 cursor-pointer">
                      <Wallet className="h-4 w-4 text-green-600" />
                      <span>Budget Tracker</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="ghost" size="icon" className={cn(
                "hover:bg-gray-100/60 rounded-full transition-all duration-300", 
                (scrolled || isContrastPage) ? "text-gray-700" : "text-white"
              )}>
                <MessageSquare className="h-5 w-5" />
              </Button>
            </>
          )}
          
          {user ? (
            <Button 
              variant="outline" 
              className={(scrolled || isContrastPage) 
                ? "bg-white/90 text-travel-navy border border-gray-200 hover:bg-gray-50 transition-all duration-300" 
                : "bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"}
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className={(scrolled || isContrastPage) 
                ? "bg-white/90 text-travel-navy border border-gray-200 hover:bg-gray-50 transition-all duration-300" 
                : "bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"}
              onClick={handleSignIn}
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className={(scrolled || isContrastPage) ? "h-6 w-6 text-gray-700" : "h-6 w-6 text-white"} />
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg absolute w-full py-4"
          >
            <nav className="container flex flex-col space-y-4 pb-4">
              <Link to="/explore" className="text-gray-700 hover:text-travel-teal transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Explore
              </Link>
              {user && (
                <>
                  <Link to="/planner" className="text-gray-700 hover:text-travel-teal transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Trip Planner
                  </Link>
                  <Link to="/booking" className="text-gray-700 hover:text-travel-teal transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Bookings
                  </Link>
                  <Link to="/my-bookings" className="text-gray-700 hover:text-travel-teal transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    My Bookings
                  </Link>
                  <Link to="/budget-tracker" className="text-gray-700 hover:text-travel-teal transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Budget Tracker
                  </Link>
                  <Link to="/documents" className="text-gray-700 hover:text-travel-teal transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Documents
                  </Link>
                  <Link to="/group-expenses" className="text-gray-700 hover:text-travel-teal transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Group Expenses
                  </Link>
                </>
              )}
              
              <div className="pt-2 flex space-x-4">
                {user ? (
                  <Button variant="default" size="sm" onClick={handleSignOut} className="bg-travel-teal hover:bg-travel-teal/90 transition-colors">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <Button variant="default" size="sm" onClick={handleSignIn} className="bg-travel-teal hover:bg-travel-teal/90 transition-colors">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  );
};

export default Navbar;
