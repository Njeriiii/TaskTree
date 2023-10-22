import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthProvider';

// export { PrivateRoute };

function PrivateRoute() {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated)

    if (!isAuthenticated) {
        // Not logged in, so redirect to the login page with the return URL
        return <Navigate to="/login" />;
    }

    // Authorized, so return child components
    return <Outlet />;
}

export default PrivateRoute