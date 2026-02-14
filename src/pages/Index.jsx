import React from 'react';
import { base44 } from '@/api/base44Client';
import { Loader2 } from 'lucide-react';

export default function Index() {
  const [isAuthed, setIsAuthed] = React.useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = await base44.auth.isAuthenticated();
        setIsAuthed(auth);
        if (auth) {
          window.location.href = '/Dashboard';
        }
      } catch {
        setIsAuthed(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button 
        onClick={() => base44.auth.redirectToLogin()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
      >
        Fazer Login
      </button>
    </div>
  );
}