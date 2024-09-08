// src/Router.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DesignEditor from '~/views/DesignEditor';
import Dashboard from '~/views/Dashboard';
import Home from './Home';
import PrivateRoute from './components/ProtectedRouteComponent'; // Import the PrivateRoute component

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protect the /manage route with PrivateRoute */}
        <Route
          path="/manage"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Protect the /editor route with PrivateRoute */}
        <Route
          path="/editor"
          element={
            // <PrivateRoute>
            // </PrivateRoute>
            <DesignEditor />
          }
        />

        {/* Public route */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
