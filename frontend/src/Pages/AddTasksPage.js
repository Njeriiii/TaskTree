import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthProvider';
import AddTask from '../Components/AddTask';


function AddTasksPage() {
    const { isAuthenticated } = useAuth();
    console.log(isAuthenticated)

    // if (!isAuthenticated) {
    //     // Redirect to the login page if not authenticated
    //     return <Navigate to="/login" />;
    // }

    return (
        <AddTask/>
    );
}

export default AddTasksPage;
