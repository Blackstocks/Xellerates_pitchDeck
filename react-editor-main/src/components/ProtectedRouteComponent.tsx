// src/components/PrivateRoute.tsx in Canva Clone
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            // Redirect to an external URL (main project login page)
            window.location.href = 'https://www.portal-xellerates.com';
        }
    }, [loading, user]);

    if (loading) {
        return <div>Loading...</div>; // Show loading while checking authentication
    }

    // If the user is authenticated, render the children
    return <>{children}</>;
};

export default PrivateRoute;
