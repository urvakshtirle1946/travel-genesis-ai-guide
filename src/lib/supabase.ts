
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks to prevent errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock client or a real one based on available credentials
let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please check your .env file or environment configuration.',
    { supabaseUrl: !!supabaseUrl, supabaseAnonKey: !!supabaseAnonKey }
  );
  
  // Create a mock client with dummy methods to prevent runtime errors
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
      signUp: async () => ({ error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: new Error('Supabase not configured') })
    },
    from: () => ({
      select: () => ({ error: new Error('Supabase not configured'), data: null }),
      insert: () => ({ error: new Error('Supabase not configured'), data: null }),
      update: () => ({ error: new Error('Supabase not configured'), data: null }),
      delete: () => ({ error: new Error('Supabase not configured'), data: null })
    })
  };
} else {
  // Initialize the real Supabase client if credentials are available
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
