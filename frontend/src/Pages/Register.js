import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthProvider'; // Import the useAuth hook

function Registration() {
    const { handleSignUp } = useAuth(); // Access the handleSignUp function
    const [formData, setFormData] = useState({
        password: '',
        email: '',
        first_name: '',
        last_name: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); // Initialize with an empty string
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            // Call the handleSignUp function from useAuth
            const response = await handleSignUp(formData);

            if (response.status === 201) {
                // Registration successful, you can redirect to the login page
                navigate('/login')
            } else if (response.status === 400) {
                const data = await response.json();
                setErrorMessage(data.message);
            } else {
                // Handle other response statuses as needed
                setErrorMessage('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during registration.');
        }
    };

    return (
        <div>
            <h2>Registration</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleRegistration}>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;
