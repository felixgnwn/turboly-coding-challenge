import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
  });

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setState({
          user: data.session?.user ?? null,
          session: data.session,
          isLoading: false,
        });
      })
      .catch(() => {
        setState((prev) => ({ ...prev, isLoading: false }));
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user ?? null,
        session,
        isLoading: false,
      });
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return { ...state, signIn, signOut };
}
