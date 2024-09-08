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

const fetcher = async () => {
  const accessToken = Cookies.get('access_token');
  if (!accessToken) throw new Error('No access token found');

  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user, mutate, error } = useSWR('user', fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const [loading, setLoading] = useState<boolean>(!user && !error);

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
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
