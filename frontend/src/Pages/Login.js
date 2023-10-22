import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthProvider'; // Import the useAuth hook

function Login() {
    const { handleLogin } = useAuth(); // Access the handleLogin function
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the handleLogin function from useAuth
            const response = await handleLogin(formData);

            if (response.status === 200) {
                // Login successful, you can redirect to the user dashboard or another page
                navigate('/')
            } else if (response.status === 401) {
                setErrorMessage('Invalid email or password');
            } else {
                // Handle other response statuses as needed
                setErrorMessage('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during login.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
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
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
