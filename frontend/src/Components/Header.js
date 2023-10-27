import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useAuth } from '../Contexts/AuthProvider';
import Spinner from 'react-bootstrap/Spinner';
import Logout from './Logout';

// The Header component provides a dynamic header that adapts based on the user's authentication status and loading state.
// It offers navigation links and options for signing up or logging in when not authenticated, 
// and user details and a logout option when authenticated.

function Header() {
    // Access user information and authentication status from the AuthProvider context
    const { user, isAuthenticated } = useAuth();
    // Initialize a state to control the loading state
    const [isLoading, setIsLoading] = useState(true);

    // Use the effect hook to handle user data loading state
    useEffect(() => {
        // If the user is available, loading is complete
        if (user !== null) {
            setIsLoading(false);
        }
        else(
            // Otherwise, it's still loading
            setIsLoading(true)
        )
    }, [user]);

    return (
        <div className="header">
            <Link to="/" className="link-button">
                <Typography variant="h6">Home</Typography>
            </Link>
            <Link to="/task_archive" className="link-button">
                <Typography variant="h6" className="header-link">Task Archive</Typography>
            </Link>
            
            {/* Conditional rendering based on loading and authentication status */}
            {isLoading ? (
                <div>
                    {/* Loading spinner */}
                    <Spinner animation="border" className="spinner" />
                    <p className="not-logged-in-message">You are not logged in</p>

                    {/* Sign up and login links when not authenticated */}
                    <Link to="/register" className="link-button">
                        <Typography variant="h7" className="header-link">Sign Up</Typography>
                    </Link>
                    <Link to="/login" className="link-button">
                        <Typography variant="h7" className="header-link">Login</Typography>
                    </Link>
                </div>
            ) : (
                <div>
                    {isAuthenticated ? (
                        <div>
                            {/* User information when authenticated */}
                            <h2 className="logged-in-title">Logged in</h2>
                            <h3 className="user-id">ID: {user.first_name}</h3>
                            <h3 className="user-email">Email: {user.email}</h3>

                            {/* Logout button */}
                            <Logout/>
                        </div>
                    ) : (
                        // Loading spinner while checking authentication status
                        <Spinner animation="border" className="spinner" />
                    )}
                </div>
            )}
        </div>

    );
}

export default Header;
