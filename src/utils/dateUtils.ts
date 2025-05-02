
/**
 * Calculates the duration of a trip in days
 * @param startDate Start date of the trip
 * @param endDate End date of the trip
 * @returns Number of days between start and end dates (inclusive)
 */
export const calculateTripDuration = (startDate: Date | undefined, endDate: Date | undefined): number => {
  if (!startDate || !endDate) return 0;
  
  // Calculate the difference in milliseconds
  const differenceInTime = endDate.getTime() - startDate.getTime();
  
  // Convert to days and add 1 to include both start and end dates
  return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)) + 1;
};

/**
 * Format a currency value to INR notation
 * @param value The currency value to format
 * @returns Formatted string with INR notation
 */
export const formatINR = (value: number): string => {
  return value.toLocaleString('en-IN');
};
