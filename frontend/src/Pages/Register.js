import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthProvider'; // Import the useAuth hook

function Registration() {
    // Access the handleSignUp function from the AuthProvider context
    const { handleSignUp } = useAuth();

    // Access the navigate function from react-router-dom
    const navigate = useNavigate();

    // Initialize a state to hold registration form data (email, first_name, last_name, and password)
    const [formData, setFormData] = useState({
        password: '',
        email: '',
        first_name: '',
        last_name: '',
    });

    // Initialize state to manage error messages
    const [errorMessage, setErrorMessage] = useState(''); // Initialize with an empty string

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle registration form submission
    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            // Call the handleSignUp function from useAuth to perform user registration
            const response = await handleSignUp(formData);

            if (response.status === 201) {
                
                // Registration is successful, redirect to the login page
                navigate('/login')
            } else if (response.status === 400) {
                // Handle validation errors
                const data = await response.json();
                setErrorMessage(data.message);
            } else {
                // Handle other response statuses
                setErrorMessage('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during registration.');
        }
    };

    return (
        <div className="registration-container">
            <h2 className="registration-title">Registration</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleRegistration} className="registration-form">
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
                    <label className="form-label">First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="input-field"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
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
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>

    );
}

export default Registration;
