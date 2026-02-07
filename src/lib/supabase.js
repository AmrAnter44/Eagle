import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Print environment variables
console.log('🔍 Supabase URL:', supabaseUrl);
console.log('🔍 Supabase Key:', supabaseAnonKey ? 'Found ✅' : 'Missing ❌');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get public URL for images from Supabase Storage
export const getImageUrl = (path) => {
  if (!path) return null;

  // If path is already a full URL, return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If path starts with /, remove it for Supabase storage
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Get public URL from Supabase Storage
  const { data } = supabase.storage
    .from('gym-media')
    .getPublicUrl(cleanPath);

  return data.publicUrl;
};
