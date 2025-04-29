
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks to prevent errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate that we have the required configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please check your .env file or environment configuration.',
    { supabaseUrl: !!supabaseUrl, supabaseAnonKey: !!supabaseAnonKey }
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
