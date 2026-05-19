import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoginForm } from '@/components/features/LoginForm';

export default function App() {
  const { user, isLoading, signIn, signOut } = useAuth();
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
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
        <p className="text-gray-600">You are logged in.</p>
        <button
          onClick={() => signOut()}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Log out
        </button>
      </main>
    );
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