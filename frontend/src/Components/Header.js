import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useAuth } from '../Contexts/AuthProvider';
import Spinner from 'react-bootstrap/Spinner';

function Header() {
    const { user, isAuthenticated, handleLogout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user !== null) {
            setIsLoading(false);
        }
        else(
            setIsLoading(true)
        )
    }, [user]);

    console.log(isAuthenticated)
    console.log(user)
    console.log(isLoading)

    return (
        <div className="header">
            <Link to="/add_task" className="link-button">
                <Typography variant="h6">Add Task</Typography>
            </Link>
            <Link to="/task_archive" className="link-button">
                <Typography variant="h6">Task Archive</Typography>
            </Link>
            {isLoading ? (
                <div>
                    <Spinner animation="border" />
                    <p>You are not logged in</p>
                    <Link to="/register" className="link-button">
                        <Typography variant="h6">Sign Up</Typography>
                    </Link>
                    <Link to="/login" className="link-button">
                        <Typography variant="h6">Login</Typography>
                    </Link>
                </div>
            ) : (
                <div>
                    {isAuthenticated ? (
                        <div>
                            <h2>Logged in</h2>
                            <h3>ID: {user.first_name}</h3>
                            <h3>Email: {user.email}</h3>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ):(
                        <Spinner animation="border" />
                    )}
                </div>
            )}
        </div>
    );
}

export default Header;
