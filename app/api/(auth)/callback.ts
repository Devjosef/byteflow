import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export default async function callbackHandler(request) {
  try {
    // Extract the code and next parameters from the URL query string
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const nextUrl = searchParams.get('next') || '/';

    // If the code parameter is missing, redirect the user to an error page
    if (!code) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    const cookieStore = cookies(request.headers);

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get: (name: string) => cookieStore.get(name)?.value,
          set: (name: string, value: string, options: any) => cookieStore.set(name, value, options),
          remove: (name: string, options: any) => cookieStore.remove(name, options),
        },
      }
    );

    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    // If there is an error during the exchange, throw an error
    if (error) {
      throw new Error('Failed to exchange code for session');
    }

    // Redirect the user to the specified next URL
    return NextResponse.redirect(`${origin}${nextUrl}`);
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
