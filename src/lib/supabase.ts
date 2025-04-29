
import { createClient } from '@supabase/supabase-js';
import { supabase as integrationsSupabase } from '@/integrations/supabase/client';

// This file is maintained for backward compatibility
// Use the official client from @/integrations/supabase/client instead
export const supabase = integrationsSupabase;

console.log("Using Supabase client from integrations/supabase/client.ts");
