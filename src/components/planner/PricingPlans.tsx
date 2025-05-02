
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PricingPlans: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Basic Plan */}
      <Card className="relative overflow-hidden border-border">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Basic Plan</CardTitle>
          <CardDescription>Perfect for casual travellers</CardDescription>
          <div className="mt-4">
            <span className="text-3xl font-bold">₹499</span>
            <span className="text-sm text-muted-foreground ml-2">/ month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>3 trip plans per month</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>Basic itinerary creation</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>Standard AI recommendations</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>Email support</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-travel-blue hover:bg-travel-blue/90">
            Get Started
          </Button>
        </CardFooter>
      </Card>

      {/* Premium Plan */}
      <Card className="relative overflow-hidden border-travel-teal shadow-md">
        <div className="absolute top-0 right-0">
          <Badge className="rounded-tl-none rounded-br-none bg-travel-teal text-white">Popular</Badge>
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Premium Plan</CardTitle>
          <CardDescription>For regular travellers</CardDescription>
          <div className="mt-4">
            <span className="text-3xl font-bold">₹999</span>
            <span className="text-sm text-muted-foreground ml-2">/ month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>Unlimited trip plans</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>Advanced itinerary customization</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>Priority AI recommendations</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>Priority support (24-hour response)</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>Budget tracking tools</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-travel-teal hover:bg-travel-teal/90">
            Subscribe Now
          </Button>
        </CardFooter>
      </Card>

      {/* Enterprise Plan */}
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Business Plan</CardTitle>
          <CardDescription>For travel agencies & professionals</CardDescription>
          <div className="mt-4">
            <span className="text-3xl font-bold">₹3,999</span>
            <span className="text-sm text-muted-foreground ml-2">/ month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>Everything in Premium</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>White-label solutions</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>API access</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>Dedicated account manager</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-travel-teal mr-2 flex-shrink-0" />
              <span>Group booking management</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full border-travel-teal text-travel-teal hover:bg-travel-teal/10">
            Contact Sales
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingPlans;
