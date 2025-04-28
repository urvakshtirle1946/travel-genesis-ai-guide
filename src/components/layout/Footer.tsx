
import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-travel-navy text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-xl mb-4">
              Travel<span className="text-travel-teal">Genesis</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Your AI-powered travel companion. Discover, plan, and book your perfect trip with ease.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-300 hover:text-white">
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                <InstagramIcon className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-white">
                <YoutubeIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Discover</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-gray-300 hover:text-white">Destinations</Link></li>
              <li><Link to="/planner" className="text-gray-300 hover:text-white">Trip Planner</Link></li>
              <li><Link to="/marketplace" className="text-gray-300 hover:text-white">Experiences</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Travel Guides</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white">AI Trip Planning</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Budget Tracking</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Document Storage</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Group Expenses</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-300 hover:text-white">Help Center</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Safety Resources</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Emergency Services</Link></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} TravelGenesis. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
