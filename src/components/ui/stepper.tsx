
import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: number;
  currentStep: number;
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, steps, currentStep, ...props }, ref) => {
    return (
      <div
        className={cn("flex items-center justify-between w-full", className)}
        ref={ref}
        {...props}
      >
        {Array.from({ length: steps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep >= stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    isActive
                      ? "bg-travel-blue text-white"
                      : "bg-gray-200 text-gray-500"
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <div className="text-xs mt-1 text-gray-500">Step {stepNumber}</div>
              </div>
              {index < steps - 1 && (
                <div
                  className={cn(
                    "h-1 flex-grow mx-2",
                    isActive && stepNumber !== steps
                      ? "bg-travel-blue"
                      : "bg-gray-200"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

Stepper.displayName = "Stepper";

export { Stepper };
