/**
 * Supabase Client für Markilia
 * Zentrale Datenbank-Verbindung für alle Markilia-Services
 */

import { createClient } from '@supabase/supabase-js';

// Supabase Credentials aus Environment-Variablen
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Supabase credentials missing! Please check your .env.local file.'
  );
}

// Erstelle Supabase Client (Browser & Server)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server-side Supabase Client für API Routes
 * Nutzt Service Role Key für privilegierte Operationen
 */
export const supabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceRoleKey) {
    console.warn('⚠️  No service role key found. Using anon key instead.');
    return supabase;
  }
  
  return createClient(supabaseUrl, serviceRoleKey);
};

