
// Helper function to parse duration string like "2h 15m" into minutes
export const parseDuration = (duration: string): number => {
  const hours = duration.match(/(\d+)h/);
  const minutes = duration.match(/(\d+)m/);
  return (hours ? parseInt(hours[1]) * 60 : 0) + (minutes ? parseInt(minutes[1]) : 0);
};

// Helper function to parse time string like "10:30 AM" into minutes since midnight
export const parseTime = (timeStr: string): number => {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  return hours * 60 + minutes;
};
