import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export default async function callbackHandler(request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const nextUrl = searchParams.get('next') || '/';

    if (!code) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    const cookieStore = cookies(request.headers);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get: (name) => cookieStore.get(name)?.value,
          set: (name, value, options) => cookieStore.set(name, value, options),
          remove: (name, options) => cookieStore.remove(name, options),
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      throw new Error('Failed to exchange code for session');
    }

    return NextResponse.redirect(`${origin}${nextUrl}`);
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
