import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Ensure this is correctly set up
import useSWR from 'swr';
import jwt from 'jsonwebtoken'; // Import JWT library

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
  // Read the token from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (!token) throw new Error('No pitchdeck token found');

  // Verify and decode the JWT token to extract user information
  let decoded: any;
  try {
    decoded = jwt.verify(token, import.meta.env.VITE_JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }

  // Use the decoded user ID to fetch the user from Supabase
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', decoded.userId)
    .single();

  if (error) throw error;
  return data;
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
