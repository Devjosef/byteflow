import { usePathname } from 'next/navigation';
import { FaXTwitter } from 'react-icons/fa6';
import { Button } from '../ui/button';
import { createBrowserClient } from '@supabase/ssr';

export default function LoginForm() {
  // Get the current pathname
  const pathname = usePathname();

  // Create a Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Handle login when Twitter button is clicked
  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: `${location.origin}auth/callback?next=${pathname}`,
      },
    });
  };

  return (
    <div>
      <Button variant="outline" className="flex items-center gap-2">
        <FaXTwitter />
        Login
      </Button>
    </div>
  );
}

