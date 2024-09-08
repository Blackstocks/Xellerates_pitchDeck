import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Ensure this is correctly set up
import useSWR from 'swr';
import Cookies from 'js-cookie';

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

// Function to fetch the user data using the JWT token
const fetcher = async () => {
  const token = Cookies.get('pitchdeck_token');
  if (!token) throw new Error('No pitchdeck token found');

  try {
    // Use the deployed API endpoint for verifying the token
    const response = await fetch('https://xellerates-pitch-deck.vercel.app/api/verifyToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Token verification failed');
    }

    const { userId } = await response.json();

    // Use the verified user ID to fetch the user from Supabase
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user, mutate, error } = useSWR('user', fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const [loading, setLoading] = useState<boolean>(!user && !error);

  useEffect(() => {
    const token = Cookies.get('pitchdeck_token');
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
