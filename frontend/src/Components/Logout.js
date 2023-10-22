import React from 'react';
import { useAuth } from '../Contexts/AuthProvider'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { user, handleLogout } = useAuth(); // Access user and handleLogout
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        try {
            await handleLogout(); // Call the handleLogout function from useAuth

            // Redirect to the login page or any other route
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Welcome, {user ? user.first_name : 'Guest'}</h2>
            <button onClick={handleLogoutClick}>Logout</button>
        </div>
    );
}

export default Logout;
