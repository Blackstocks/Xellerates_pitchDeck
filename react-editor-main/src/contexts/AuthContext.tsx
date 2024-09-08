import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Ensure this is correctly set up
import useSWR from 'swr';

interface User {
  id: string;
  email: string;
  // Add other fields as necessary
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Function to fetch the user data using the backend API
const fetcher = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (!token) throw new Error('No pitchdeck token found');

  // Send token to backend API to verify and get user data
  const response = await fetch('https://xellerates-pitch-deck.vercel.app/api/verify-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error('Token verification failed');
  }

  const data = await response.json();
  return data.user; // Assuming your backend returns the user data
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user, mutate, error } = useSWR('user', fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const [loading, setLoading] = useState<boolean>(!user && !error);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      mutate();
    } else {
      mutate(undefined, false);
    }
  }, [mutate]);

  useEffect(() => {
    if (user || error) {
      setLoading(false);
    }
  }, [user, error]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
