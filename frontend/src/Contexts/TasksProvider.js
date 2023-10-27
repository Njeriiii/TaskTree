import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from '../Contexts/ApiProvider';

// Create a context for managing tasks
const TasksContext = createContext();

// Custom hook to access the tasks context
export function useTasksContext() {
    return useContext(TasksContext);
}

// TasksProvider component responsible for providing tasks data to the application
export function TasksProvider({ children }) {
    const api = useApi(); // Initialize the API client using the custom hook
    const [tasks, setTasks] = useState([]); // State to store tasks

    // Function to fetch tasks data from the API
    const fetchData = async () => {
        try {
        
        // Fetch tasks data from the API
        const response = await api.get('/get_tasks');

        if (response.status === 200) {
            
            // Set the retrieved tasks in the component's state
            setTasks(response.body.tasks);
            
        } else {
            console.error('Failed to fetch tasks');
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    },[]);

    // Provide the tasks data and custom functions to children components
    return (
        <TasksContext.Provider value={tasks}>
        {children}
        </TasksContext.Provider>
    );
    }
