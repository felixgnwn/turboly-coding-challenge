import type { User } from '@supabase/supabase-js';

export interface LayoutProps {
  user: User;
  onSignOut: () => Promise<{ error: Error | null }>;
}
