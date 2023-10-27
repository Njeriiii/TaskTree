import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthProvider'; // Import the useAuth hook

function Login() {
    // Access the handleLogin function from the AuthProvider context
    const { handleLogin } = useAuth(); 

    // Access the navigate function from react-router-dom
    const navigate = useNavigate();

    // Initialize a state to hold form data (email and password)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Initialize state to manage error messages
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the handleLogin function from useAuth to perform login
            await handleLogin(formData);

            // Redirect to the home page after successful login
            navigate('/')
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during login.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;