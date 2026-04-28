import { useEffect, useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2, ShieldAlert, RefreshCw } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch('https://music-api-gamma.vercel.app/check', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });

      // Handle non-JSON responses
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response from server');
      }

      const data = await res.json();

      if (res.ok && data && (data._id || data.authenticated)) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setError(err.message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Loading state with spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-gray-400 text-sm">Verifying your session...</p>
      </div>
    );
  }

  // Error state with retry
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-6 px-4">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
          <ShieldAlert className="w-8 h-8 text-red-500" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-white">Session Check Failed</h2>
          <p className="text-gray-400 text-sm max-w-md">
            We couldn't verify your login status. This might be a network issue.
          </p>
        </div>
        <button
          onClick={checkAuth}
          className="flex items-center gap-2 px-6 py-3 bg-[#2b2b2b] hover:bg-[#3b3b3b] rounded-xl text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
        <button
          onClick={() => window.location.href = '/login'}
          className="text-sm text-emerald-500 hover:text-emerald-400"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;