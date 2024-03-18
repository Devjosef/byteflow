import { createClient, SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js';

// Define custom Supabase client options
interface CustomSupabaseClientOptions extends SupabaseClientOptions<"public"> {
  headers: {
    Authorization: string;
  };
}

// Initialize Supabase client with Auth context
export const initSupabaseClient = (authHeader: string): SupabaseClient => {
  // Create custom Supabase client options with Authorization header
  const clientOptions: CustomSupabaseClientOptions = {
    headers: { Authorization: authHeader },
  };

  // Initialize Supabase client with custom options
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '', clientOptions);
};

// Fetch user data
export const fetchUserData = async (supabaseClient: SupabaseClient) => {
  try {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
    return data?.user;
  } catch (error: any) {
    console.error('Error fetching user:', error.message);
    return null;
  }
};

