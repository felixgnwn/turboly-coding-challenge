import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDeviceType } from '@/hooks/useDeviceType';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { TabletLayout } from '@/components/layout/TabletLayout';
import { DesktopLayout } from '@/components/layout/DesktopLayout';
import { LoginForm } from '@/components/features/auth/LoginForm';

export default function App() {
  const { user, isLoading, signIn, signOut } = useAuth();
  const device = useDeviceType();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (email: string, password: string) => {
    setError(null);
    setPending(true);
    const { error: authError } = await signIn(email, password);
    setPending(false);
    if (authError) {
      setError(authError.message);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  if (user) {
    switch (device) {
      case 'mobile':
        return <MobileLayout user={user} onSignOut={signOut} />;
      case 'tablet':
        return <TabletLayout user={user} onSignOut={signOut} />;
      case 'desktop':
        return <DesktopLayout user={user} onSignOut={signOut} />;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Turboly Coding Challenge
        </h1>
        <LoginForm
          onSubmit={handleSubmit}
          submitLabel="Log in"
          error={error}
          isLoading={pending}
        />
      </div>
    </main>
  );
}