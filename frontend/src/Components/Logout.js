import React from 'react';
import { useAuth } from '../Contexts/AuthProvider'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';

function Logout() {

    // Access user and handleLogout functions from the AuthProvider context
    const { user, handleLogout } = useAuth();

    // Access the navigate function from react-router-dom
    const navigate = useNavigate();

    // Handle the logout process
    const handleLogoutClick = async () => {
        try {
            // Call the handleLogout function from useAuth to log the user out
            await handleLogout();
            console.log("Successfully Logged out!")

            // Redirect to the login page or any other route after logout
            navigate('/')
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="welcome-container">
            {/* Display a welcome message with the user's first name or 'Guest' */}
            <h2 className="welcome-message">Welcome, {user ? user.first_name : 'Guest'}</h2>
            {/* Button to trigger the logout process */}
            <button onClick={handleLogoutClick} className="logout-button">Logout</button>
        </div>
    );
}

export default Logout;
