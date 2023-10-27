import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '../Contexts/ApiProvider';

// Create a context for managing user authentication
const AuthContext = createContext();

// Custom hook to access the authentication context
export function useAuth() {
    return useContext(AuthContext);
}

// AuthProvider is a component that wraps its children with the authentication context
export function AuthProvider({ children }) {
    const api = useApi(); // Initialize the API client using the custom hook
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to handle the login
    const handleLogin = async (formData) => {
        try {
            const response = await api.post('/login', formData);

            if (response.status === 200) {
                // Login was successful
                fetchData(); // Fetch user data if needed
                setIsAuthenticated(true);
            } else if (response.status === 401) {
                console.error('Invalid email or password');
            } else {
                console.error('Login failed. Please try again.');
            }
            return response; // Return the HTTP response object
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to handle the sign-up
    const handleSignUp = async (formData) => {
        try {
            const response = await api.post('/register', formData);

            if (response.status === 200) {
                // Sign-up was successful
                fetchData();
            } else {
                console.error('Sign-up failed. Please try again.');
            }
            return response; // Return the HTTP response object
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to handle the logout
    const handleLogout = async () => {
        try {
            // Send a GET request to the logout route
            const response = await api.get('/logout');

            if (response.status === 200) {
                // Logout was successful
                setIsAuthenticated(false);
                setUser(null); // Clear user data
            } else {
                // Handle other response statuses if needed
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to fetch user data if needed
    const fetchData = async () => {
        try {
            const response = await api.get('/current_user');

            if (response.status === 200) {
                const userData = response.body;
                setUser(userData);
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Use an effect to check if the user is authenticated on component mount
    useEffect(() => {
        (async () => {
            try {
                const response = await api.get('/check_authentication');
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    fetchData();
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        })();
    }, [api]);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, handleLogin, handleSignUp, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;